import "./SvgIcons.css";
import HamburgerMenu from "./HamburgerMenu";
import HamburgerIcon from "./svgIcons/HamburgerIcon";
import HomeIcon from "./svgIcons/HomeIcon";
import TileViewIcon from "./svgIcons/TileViewIcon";
import ButtonIcon from "./svgIcons/Button";

import { useState } from "react";

function SvgIcons() {
  // state for hamburger icon
  const [expanded, setExpanded] = useState(false);
  // state for button icon
  const [pressed, setPressed] = useState(false);

  return (
    <div className="SvgIcons">
      <HamburgerMenu></HamburgerMenu>

      <div className="Main">
        <div className="TitleSpace">
          <p>SVG icons</p>
        </div>
        <div className="DescriptionSpace">
          <p>This page displays SVG icons.</p>
        </div>
        <div className="IconGridSpace">
          <div className="IconSpace">
            <HamburgerIcon
              expanded={expanded}
              setExpanded={setExpanded}
            ></HamburgerIcon>
            <p>hamburger</p>
          </div>

          <div className="IconSpace">
            <HomeIcon></HomeIcon>
            <p>home</p>
          </div>

          <div className="IconSpace">
            <TileViewIcon></TileViewIcon>
            <p>tile view</p>
          </div>

          <div
            className="IconSpace"
            onMouseOver={() => {
              setPressed(true);
            }}
            onMouseLeave={() => {
              setPressed(false);
            }}
          >
            <ButtonIcon pressed={pressed}></ButtonIcon>
            <p>button</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SvgIcons;
