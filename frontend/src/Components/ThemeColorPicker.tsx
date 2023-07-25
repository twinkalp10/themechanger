import React, { useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const ThemeColorPicker = () => {
  const { theme, changeTheme } = useTheme();

  const handlePrimaryColorChange = (e: any) => {
    changeTheme({ ...theme, PRIMARY_COLOUR: e.target.value });
    socket.emit("send_theme", {
      theme: { ...theme, PRIMARY_COLOUR: e.target.value },
    });
    console.log("theme sent", { ...theme, PRIMARY_COLOUR: e.target.value });
  };

  const handleSecondaryColorChange = (e: any) => {
    changeTheme({ ...theme, SECONDARY_COLOUR: e.target.value });
    socket.emit("send_theme", {
      theme: { ...theme, SECONDARY_COLOUR: e.target.value },
    });
    console.log("theme sent", { ...theme, SECONDARY_COLOUR: e.target.value });
  };

  useEffect(() => {
    socket.on("received_theme", (data) => {
      changeTheme(data.theme);
      console.log("theme recieved", data.theme);
    });
  }, [socket]);

  console.log("theme", theme);

  return (
    <div>
      <div>
        <label>Primary color: </label>

        <input
          type="color"
          value={theme.PRIMARY_COLOUR}
          onChange={handlePrimaryColorChange}
        />
      </div>
      <div>
        <label>Secondary color: </label>
        <input
          type="color"
          value={theme.SECONDARY_COLOUR}
          onChange={handleSecondaryColorChange}
        />
      </div>
    </div>
  );
};

export default ThemeColorPicker;
