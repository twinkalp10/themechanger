import React, { useState } from "react";
import { useTheme } from "./ThemeContext";

const ThemeColorPicker = () => {
  const { theme, changeTheme } = useTheme();

  console.log(theme.SECONDARY_COLOUR, "from picker file");

  return (
    <div>
      <div>
        <label>Primary color: </label>
        <input
          type="color"
          value={theme.PRIMARY_COLOUR}
          onChange={(e) =>
            changeTheme({ ...theme, PRIMARY_COLOUR: e.target.value })
          }
        />
      </div>
      <div>
        <label>Secondary color: </label>
        <input
          type="color"
          value={theme.SECONDARY_COLOUR}
          onChange={(e) =>
            changeTheme({ ...theme, SECONDARY_COLOUR: e.target.value })
          }
        />
      </div>
    </div>
  );
};

export default ThemeColorPicker;
