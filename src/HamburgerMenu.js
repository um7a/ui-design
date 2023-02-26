import "./HamburgerMenu.css";
import HamburgerIcon from "./HamburgerIcon";
import HomeIcon from "./HomeIcon";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TileViewIcon from "./TileViewIcon";
import ButtonIcon from "./Button";

const widthMin = "20px";
const widthMax = "230px";
const contractedBgColor = "#1a1a1a";
const expandedBgColor = "#1e1e1e";

function HamburgerMenu() {
  const [expanded, setExpanded] = useState(false);
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
            <Link to="/ui-design/">
              <HomeIcon></HomeIcon>
              Home
            </Link>
          </div>
          <div className="MenuItem" style={{ "--animation-delay": "0.6s" }}>
            <Link to="/ui-design/svg-icons">
              <TileViewIcon></TileViewIcon>
              SVG icons
            </Link>
          </div>
          <div className="MenuItem" style={{ "--animation-delay": "0.7s" }}>
            <Link to="/ui-design/buttons">
              <ButtonIcon></ButtonIcon>
              Buttons
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default HamburgerMenu;
