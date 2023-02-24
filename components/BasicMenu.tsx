import { Popover, Slider, SliderProps, styled } from "@mui/material";
import { MouseEventHandler, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsMoon } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import useColorMode from "@/hooks/useColorMode";

interface Props {
  logout: MouseEventHandler<HTMLButtonElement>;
}
export default function BasicMenu({ logout }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | SVGAElement>(null);
  const open = Boolean(anchorEl);
  const [colorMode, setColorMode] = useColorMode();
  const handleClick = (event: React.MouseEvent<SVGAElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="mt-auto">
      <AiOutlineMenu
        className=" menuIcon"
        id="basic-button"
        style={{ top: 100 }}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      />

      <Popover
        id="basic-button"
        anchorEl={anchorEl}
        open={open}
        anchorReference="anchorEl"
        onClose={handleClose}
        style={{ top: -40 }}
      >
        <button className="menuButton">
          Settings <FiSettings />
        </button>
        <button
          onClick={() => setColorMode(colorMode === "dark" ? "light" : "dark")}
          className="menuButton"
        >
          Apparence <BsMoon />
        </button>

        <button className="menuButton" onClick={logout}>
          Logout
        </button>
      </Popover>
    </div>
  );
}
