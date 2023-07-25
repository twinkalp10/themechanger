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
  socket.on("send_theme", (data) => {
    console.log("received theme", data);
    socket.broadcast.emit("received_theme", data)
  })
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

    const token = jwt.sign(
      { userID: existingUser?.ID, name: existingUser?.USER_NAME },
      SECRET_KEY
    );

    return res
      .status(200)
      .json({ message: "login successful", token, existingUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong with login" });
  }
});

app.post("/theme-preferences/:id", async (req, res) => {
  const { id } = req.params;

  const { PRIMARY_COLOUR, SECONDARY_COLOUR, TEXT_COLOUR, FONT_SIZE, FONT } =
    req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { ID: Number(id) },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const themePreferences = await prisma.theme_Preference.create({
      data: {
        PRIMARY_COLOUR,
        SECONDARY_COLOUR,
        TEXT_COLOUR,
        FONT_SIZE,
        FONT,
        USER_ID: Number(id),
      },
    });

    return res.status(200).json({ message: "Theme preferences saved", themePreferences });


  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong with saving default theme preferences" });
  }
});

app.listen(port, () => {
  console.log(`Server Running at ${port} 🚀`);
});

httpServer.listen(3001, () => {
  console.log(`Socket.IO server listening on port 3001`);
});
