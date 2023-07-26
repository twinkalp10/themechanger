import React, { useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001", {
  transportOptions: {
    polling: {
      extraHeaders: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user") || "").token
        }`,
      },
    },
  },
});

// JSON.parse(localStorage.getItem("user") || "").token;
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

  const handleTextColourChange = (e: any) => {
    changeTheme({ ...theme, TEXT_COLOUR: e.target.value });
    socket.emit("send_theme", {
      theme: { ...theme, TEXT_COLOUR: e.target.value },
    });
    console.log("text sent", { ...theme, TEXT_COLOUR: e.target.value });
  };

  const handleFontSizeChange = (e: any) => {
    changeTheme({ ...theme, FONT_SIZE: e.target.value });
    socket.emit("send_theme", {
      theme: { ...theme, FONT_SIZE: e.target.value },
    });
    console.log("fontsize sent", { ...theme, FONT_SIZE: e.target.value });
  };

  const handleFontFamilyChange = (e: any) => {
    changeTheme({ ...theme, FONT: e.target.value });
    socket.emit("send_theme", {
      theme: { ...theme, FONT: e.target.value },
    });
    console.log("font family sent", { ...theme, FONT: e.target.value });
  };

  useEffect(() => {
    socket.on("received_theme", (data) => {
      changeTheme(data.theme);
      console.log("theme received", data.theme);
    });
  }, [socket]);

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
      <div>
        <label>Text color: </label>
        <input
          type="color"
          value={theme.TEXT_COLOUR}
          onChange={handleTextColourChange}
        />
      </div>
      {/* <div>
        <label>Font Size: </label>
        <input
          type="number"
          value={theme.FONT_SIZE}
          onChange={handleFontSizeChange}
        />
      </div> */}
      <div>
        <label>Font Family: </label>
        <input
          type="text"
          value={theme.FONT}
          onChange={handleFontFamilyChange}
        />
      </div>
    </div>
  );
};

export default ThemeColorPicker;
