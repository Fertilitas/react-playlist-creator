import { MoonStar, SunDim } from "lucide-react";
import { Label } from "./ui/label";
// import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const SwitchDarkMode = () => {
  // const [darkMode, setDarkMode] = useState(false);

  const { theme, setTheme } = useTheme();
  // console.log({ darkMode });

  return (
    <Label className="absolute top-6 right-6 w-16 h-9">
      <input
        type="checkbox"
        className="checkbox opacity-0 w-0 h-0"
        // onChange={() => setDarkMode((prev) => !prev)}
        onChange={() =>
          setTheme((prev) => (prev === "light" ? "dark" : "light"))
        }
        // checked={theme === "dark"}
      />
      <span className="h-4/5 w-11/12 absolute top-0 left-0 right-0 bottom-0 px-1 flex justify-between items-center bg-secondary text-white/40 rounded-[40px] cursor-pointer">
        <span
          className={`h-4/5 w-6 absolute left-1 p-1  rounded-[50%] bg-primary transition-all ease-in-out duration-500 ${
            theme === "dark" ? "translate-x-7" : ""
          }`}
        >
          {theme === "dark" ? (
            <MoonStar className="text-white" size={16} />
          ) : (
            <SunDim className="text-white" size={16} />
          )}
        </span>
        <SunDim size={20} />
        <MoonStar size={20} />
      </span>
    </Label>
  );
};

export default SwitchDarkMode;
