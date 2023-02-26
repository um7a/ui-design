import "./HamburgerIcon.css";
import { useEffect, useState, useRef } from "react";

function HamburgerIcon(props) {
  const lineColor = "#585858";
  const lineStrokeWidth = 1;

  const [topLine, setTopLine] = useState(undefined);
  const [middleLine, setMiddleLine] = useState(undefined);
  const [bottomLine, setBottomLine] = useState(undefined);

  const expanded = useRef(false);
  const middleOpacity = useRef(100);

  const expand = () => {
    props.setExpanded(true);

    if (middleOpacity.current <= 0) {
      return;
    }
    requestAnimationFrame(() => {
      middleOpacity.current -= 5;
      if (middleOpacity.current < 0) {
        middleOpacity.current = 0;
      }
      middleLine.setAttribute("stroke-opacity", `${middleOpacity.current}%`);

      topLine.setAttribute(
        "transform",
        `rotate(${45 - 0.01 * middleOpacity.current * 45}, 1, 3.85)`
      );

      bottomLine.setAttribute(
        "transform",
        `rotate(${-45 + 0.01 * middleOpacity.current * 45}, 1, 18.15)`
      );

      expand();
    });
  };

  const contract = () => {
    props.setExpanded(false);
    if (middleOpacity.current >= 100) {
      return;
    }
    requestAnimationFrame(() => {
      middleOpacity.current += 5;
      if (middleOpacity.current > 100) {
        middleOpacity.current = 100;
      }
      middleLine.setAttribute("stroke-opacity", `${middleOpacity.current}%`);

      topLine.setAttribute(
        "transform",
        `rotate(${45 - 0.01 * middleOpacity.current * 45}, 1, 3.85)`
      );

      bottomLine.setAttribute(
        "transform",
        `rotate(${-45 + 0.01 * middleOpacity.current * 45}, 1, 18.15)`
      );

      contract();
    });
  };

  useEffect(() => {
    const svg = document.getElementById("hamburger");
    setTopLine(svg.getElementById("top"));
    setMiddleLine(svg.getElementById("middle"));
    setBottomLine(svg.getElementById("bottom"));
  }, []);

  const move = () => {
    if (expanded.current === true) {
      contract();
      expanded.current = false;
    } else {
      expand();
      expanded.current = true;
    }
  };

  return (
    <div className="HamburgerIcon">
      <svg id="hamburger" width="22" height="22" onClick={move}>
        <line
          id="top"
          x1="1"
          y1="3.85"
          x2="21"
          y2="3.85"
          strokeLinecap="round"
          stroke={lineColor}
          strokeWidth={lineStrokeWidth}
        />
        <line
          id="middle"
          x1="1"
          y1="11"
          x2="21"
          y2="11"
          strokeLinecap="round"
          stroke={lineColor}
          strokeWidth={lineStrokeWidth}
        />
        <line
          id="bottom"
          x1="1"
          y1="18.15"
          x2="21"
          y2="18.15"
          strokeLinecap="round"
          stroke={lineColor}
          strokeWidth={lineStrokeWidth}
        />
      </svg>
    </div>
  );
}

export default HamburgerIcon;
