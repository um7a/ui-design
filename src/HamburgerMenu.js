import "./HamburgerMenu.css";
import HamburgerIcon from "./svgIcons/HamburgerIcon";

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const widthMin = "20px";
const widthMax = "230px";
const contractedBgColor = "#0000";
const expandedBgColor = "#1e1e1e";

function HamburgerMenu() {
  const [expanded, setExpanded] = useState(false);
  const [width, setWidth] = useState(widthMin);
  const hamburgerMenu = useRef();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (hamburgerMenu.current && !hamburgerMenu.current.contains(e.target)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

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
      ref={hamburgerMenu}
      style={{
        "--bg-color": `${expanded ? expandedBgColor : contractedBgColor}`,
        "--width": width,
      }}
    >
      <div
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <HamburgerIcon
          expanded={expanded}
          style={{ "text-align": "right" }}
        ></HamburgerIcon>
      </div>
      {expanded ? (
        <>
          <div className="MenuItem" style={{ "--animation-delay": "0.5s" }}>
            <Link to="/">Home</Link>
          </div>

          <div className="MenuItem" style={{ "--animation-delay": "0.6s" }}>
            <Link to="/svg-icons">SVG Icons</Link>
          </div>

          <div className="MenuItem" style={{ "--animation-delay": "0.7s" }}>
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
