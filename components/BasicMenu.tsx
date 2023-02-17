import { Popover, Slider, SliderProps, styled } from "@mui/material";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MouseEventHandler, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsMoon } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import darkMode from "@/atoms/darkModeAtom";
import { useRecoilState } from "recoil";

interface Props {
  logout: MouseEventHandler<HTMLButtonElement>;
}
export default function BasicMenu({ logout }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | SVGAElement>(null);
  const open = Boolean(anchorEl);
  const [mode, setMode] = useRecoilState(darkMode);

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
        <button onClick={() => setMode(!mode)} className="menuButton">
          Apparence <BsMoon />
        </button>

        <button className="menuButton" onClick={logout}>
          Logout
        </button>
      </Popover>
    </div>
  );
}
