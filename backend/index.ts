import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { Server } from "socket.io";
import { createServer } from "http";

const port = 3000;
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
})

io.on("connection", (socket) => {
  console.log(`connected socket.id: ${socket.id}`);
  let token = socket.handshake.headers.authorization;
  if (token) {
    token = token?.replace("Bearer ", "");
    const decoded = jwt.decode(token) as JwtPayload;
    const userID = decoded?.userID;
    socket.on("send_theme", async (data) => {
      console.log("received theme", data);

      try {

        const existingTheme = await prisma.theme_Preference.findUnique({
          where: {
            USER_ID: userID,
          }
        })

        if (!existingTheme) {
          const newTheme = await prisma.theme_Preference.create({
            data: {
              ...data.theme,
              USER_ID: userID,
            }

          })
          console.log("new theme", newTheme);
        }
        else {
          const updatedTheme = await prisma.theme_Preference.update({
            where: {
              USER_ID: userID,
            },
            data: {
              ...data.theme,
            }
          })
          console.log("updated theme", updatedTheme);
        }
        socket.broadcast.emit("received_theme", data)
      } catch (error) {
        console.log(error);
      }

    })
  }
  else {
    console.log("no token found");
  }

});


const SECRET_KEY = "THEMECHANGERAPI";

app.get("/", async (req, res) => {
  const allUsers = await prisma.user.findMany();
  return res.json(allUsers);
});

app.post("/signup", async (req, res) => {
  const { USER_NAME, PASSWORD } = req.body;
  try {

    if (!USER_NAME) {
      return res.status(400).json({ message: "Username is required" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { USER_NAME: USER_NAME },
    });

    // const newThemeForExistingUSer = await prisma.theme_Preference.create({
    //   data: {
    //     ...req.body.theme,
    //   }
    // })
    // console.log("new theme for existing user", newThemeForExistingUSer);

    if (existingUser) {
      return res.status(400).json({
        message: "User name already exists, please choose a different username",
      });
    }

    const hashedPassword = await bcrypt.hash(PASSWORD, 10);

    const newUser = await prisma.user.create({
      data: { USER_NAME: USER_NAME, PASSWORD: hashedPassword },
    });

    const token = jwt.sign(
      { userID: newUser.ID, name: newUser.USER_NAME },
      SECRET_KEY
    );

    return res
      .status(200)
      .json({ message: "signup successful", token, newUser });

  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "something went wrong with signup" });
  }
});

app.post("/login", async (req, res) => {
  const { USER_NAME, PASSWORD } = req.body;

  try {
    if (!USER_NAME) {
      return res.status(400).json({ message: "Username is required" });
    }
    if (!PASSWORD) {
      return res.status(400).json({ message: "Password is required" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { USER_NAME: USER_NAME },
    });

    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const matchpassword = await bcrypt.compare(PASSWORD, existingUser.PASSWORD);

    if (!matchpassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const TOKEN = jwt.sign(
      { userID: existingUser?.ID, name: existingUser?.USER_NAME },
      SECRET_KEY
    );

    return res
      .status(200)
      .json({ message: "login successful", TOKEN, USER_NAME, ID: existingUser.ID });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong with login" });
  }
});

app.get("/theme/", async (req, res) => {
  const { USER_NAME, PASSWORD } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { USER_NAME: USER_NAME },
    });
    const existingTheme = await prisma.theme_Preference.findUnique({
      where: {
        USER_ID: existingUser?.ID,
      }
    })
    if (existingTheme) {
      return res.status(200).json(existingTheme);
    } else {
      return res.status(404).json({ message: "No theme found" })
    }
  } catch (error) {
    console.log(error);
  }

});

app.listen(port, () => {
  console.log(`Server Running at ${port} 🚀`);
});

httpServer.listen(3001, () => {
  console.log(`Socket.IO server listening on port 3001`);
});


interface JwtPayload {
  userID: number;
  name: string;
  iat?: number;
}
