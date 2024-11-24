// app/components/ThemeSwitcher.tsx
"use client";

import { Input } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    setMounted(true);
    if (isChecked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [isChecked, setTheme]);

  const toggleTheme = () => {
    if (!theme) return; // Wait until theme is initialized
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!mounted) return null;

  return (
    <>
      {/* <button onClick={toggleTheme} className="text-black dark:text-white">
        The current theme is: {theme || "loading..."}
      </button> */}

      <label className="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="sr-only"
        />
        <span className="label flex items-center text-sm font-medium text-black dark:text-white">
          Light
        </span>
        <span
          className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${
            isChecked ? "bg-sky-600" : "bg-[#CCCCCE]"
          }`}
        >
          <span
            className={`dot h-6 w-6 rounded-full bg-white duration-200 ${
              isChecked ? "translate-x-[28px]" : ""
            }`}
          ></span>
        </span>
        <span className="label flex items-center text-sm font-medium text-black dark:text-white">
          Dark
        </span>
      </label>
    </>
  );
}
