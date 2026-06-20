import ButtonIcon from "./ButtonIcon";
import { MdOutlineDarkMode } from "react-icons/md";
import { useDarkMode } from "../context/DarkModeContext";
import { IoSunnyOutline } from "react-icons/io5";
function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <ButtonIcon onClick={() => toggleDarkMode()}>
      {isDarkMode ? <IoSunnyOutline /> : <MdOutlineDarkMode />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
