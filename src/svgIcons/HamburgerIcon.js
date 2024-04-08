import { useEffect, useState, useRef } from "react";

function makeId(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    counter += 1;
  }
  return result;
}

function HamburgerIcon(props) {
  const lineColor = "#585858";
  const lineStrokeWidth = 1;

  const elemId = makeId(10);
  const [topLine, setTopLine] = useState(undefined);
  const [middleLine, setMiddleLine] = useState(undefined);
  const [bottomLine, setBottomLine] = useState(undefined);

  const middleOpacity = useRef(100);

  const expand = () => {
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

  const move = () => {
    if (props.expanded === false) {
      contract();
    } else {
      expand();
    }
  };

  useEffect(() => {
    const svg = document.getElementById(elemId);
    setTopLine(svg.getElementById("top"));
    setMiddleLine(svg.getElementById("middle"));
    setBottomLine(svg.getElementById("bottom"));
  }, []);

  useEffect(() => {
    move();
  }, [props.expanded]);

  return (
    <div className="HamburgerIcon">
      <svg id={elemId} width="22" height="22">
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
