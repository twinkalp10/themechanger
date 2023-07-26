import React, { useEffect, useState } from "react";
import { useTheme } from "../../Utils/ThemeContext";
import { io } from "socket.io-client";
import { getUserLocalStorage } from "../../Utils/getUserLocalStorage";
import "../../Pages/Dashboard/Dashboard.css";

const socket = io("http://localhost:3001", {
  transportOptions: {
    polling: {
      extraHeaders: {
        Authorization: `Bearer ${getUserLocalStorage()?.TOKEN}`,
      },
    },
  },
});

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
    <div className="themeContainer">
      <div className="themeInput">
        <label>Primary color: </label>
        <input
          type="color"
          className="inputcolor"
          value={theme.PRIMARY_COLOUR}
          onChange={handlePrimaryColorChange}
        />
      </div>

      <div className="themeInput">
        <label>Secondary color: </label>
        <input
          type="color"
          className="inputcolor"
          value={theme.SECONDARY_COLOUR}
          onChange={handleSecondaryColorChange}
        />
      </div>

      <div className="themeInput">
        <label>Text color: </label>
        <input
          type="color"
          className="inputcolor"
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
      <div className="themeInput">
        <label>Font Family: </label>
        <input
          type="text"
          value={theme.FONT}
          className="inputText"
          onChange={handleFontFamilyChange}
        />
      </div>
    </div>
  );
};

export default ThemeColorPicker;
