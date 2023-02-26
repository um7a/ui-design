import { useEffect, useState, useRef } from "react";

function ButtonIcon() {
  const lineColor = "#585858";
  const lineStrokeWidth = 1;

  const [buttonTop, setButtonTop] = useState(undefined);
  const [buttonLeftMiddle, setButtonLeftMiddle] = useState(undefined);
  const [buttonRightMiddle, setButtonRightMiddle] = useState(undefined);

  const pressCount = useRef(0);
  const pressCountMax = 4;
  const middleUpper = 13;

  const press = () => {
    if (pressCount.current >= pressCountMax) {
      return;
    }
    requestAnimationFrame(() => {
      pressCount.current++;
      buttonLeftMiddle.setAttribute(
        "d",
        `M 3 17 L 3 ${middleUpper + pressCount.current}`
      );
      buttonRightMiddle.setAttribute(
        "d",
        `M 19 17 L 19 ${middleUpper + pressCount.current}`
      );
      buttonTop.setAttribute(
        "transform",
        `translate(0, ${pressCount.current})`
      );
      press();
    });
  };

  const release = () => {
    if (pressCount.current <= 0) {
      return;
    }
    requestAnimationFrame(() => {
      pressCount.current--;
      buttonLeftMiddle.setAttribute(
        "d",
        `M 3 17 L 3 ${middleUpper + pressCount.current}`
      );
      buttonRightMiddle.setAttribute(
        "d",
        `M 19 17 L 19 ${middleUpper + pressCount.current}`
      );
      buttonTop.setAttribute(
        "transform",
        `translate(0, ${pressCount.current})`
      );
      release();
    });
  };

  useEffect(() => {
    const svg = document.getElementById("buttonForDemo");
    setButtonTop(svg.getElementById("buttonTop"));
    setButtonLeftMiddle(svg.getElementById("buttonLeftMiddle"));
    setButtonRightMiddle(svg.getElementById("buttonRightMiddle"));
  }, []);

  return (
    <div className="ButtonIconForDemo">
      <svg
        id="buttonForDemo"
        width="22"
        height="22"
        onMouseEnter={press}
        onMouseLeave={release}
      >
        <path
          id="arrow"
          d="
            M 9 1
            L 13 1
            L 13 5
            L 15 5
            L 11 9
            L 7 5
            L 9 5
            L 9 1
            Z
          "
          stroke={lineColor}
          strokeWidth={lineStrokeWidth}
          fillOpacity="0%"
        />

        <path
          id="buttonLeftMiddle"
          d="
            M 3 17
            L 3 13
          "
          stroke={lineColor}
          strokeWidth={lineStrokeWidth}
          fillOpacity="0%"
        />
        <path
          id="buttonTop"
          d="
            M 3 13
            S 3 11 5 11
            L 17 11
            S 19 11 19 13
          "
          stroke={lineColor}
          strokeWidth={lineStrokeWidth}
          fillOpacity="0%"
        />
        <path
          id="buttonRightMiddle"
          d="
            M 19 17
            L 19 13
          "
          stroke={lineColor}
          strokeWidth={lineStrokeWidth}
          fillOpacity="0%"
        />

        <rect
          id="buttonBottom"
          width="20"
          height="3"
          x="1"
          y="18"
          rx="1"
          stroke={lineColor}
          strokeWidth={lineStrokeWidth}
          fillOpacity="0%"
        />
      </svg>
    </div>
  );
}

export default ButtonIcon;
