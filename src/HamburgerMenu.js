import "./HamburgerMenu.css";
import HamburgerIcon from "./svgIcons/HamburgerIcon";
import HomeIcon from "./svgIcons/HomeIcon";
import TileViewIcon from "./svgIcons/TileViewIcon";
import ProgressBarIcon from "./svgIcons/ProgressBarIcon";
import ButtonIcon from "./svgIcons/Button";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const widthMin = "20px";
const widthMax = "230px";
const contractedBgColor = "#1a1a1a";
const expandedBgColor = "#1e1e1e";

function HamburgerMenu() {
  // state for hamburger icon
  const [expanded, setExpanded] = useState(false);
  // state for button icon
  const [pressed, setPressed] = useState(false);

  const [width, setWidth] = useState(widthMin);

  useEffect(() => {
    if (expanded) {
      setWidth(widthMax);
    } else {
      setWidth(widthMin);
    }
    return;
  }, [expanded, width]);

  return (
    <div
      className="HamburgerMenu"
      style={{
        "--bg-color": `${expanded ? expandedBgColor : contractedBgColor}`,
        "--width": width,
      }}
    >
      <HamburgerIcon
        expanded={expanded}
        setExpanded={setExpanded}
        style={{ "text-align": "right" }}
      ></HamburgerIcon>

      {expanded ? (
        <>
          <div className="MenuItem" style={{ "--animation-delay": "0.5s" }}>
            <Link to="/">Home</Link>
          </div>

          <div className="MenuItem" style={{ "--animation-delay": "0.6s" }}>
            <Link to="/svg-icons">SVG icons</Link>
          </div>

          <div
            className="MenuItem"
            onMouseOver={() => {
              setPressed(true);
            }}
            onMouseLeave={() => {
              setPressed(false);
            }}
            style={{ "--animation-delay": "0.7s" }}
          >
            <Link to="/buttons">Buttons</Link>
          </div>

          <div className="MenuItem" style={{ "--animation-delay": "0.8s" }}>
            <Link to="/progress-bars">Progress Bars</Link>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default HamburgerMenu;
