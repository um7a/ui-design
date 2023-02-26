import "./Button.css";

function ButtonIcon() {
  const lineColor = "#585858";
  const lineStrokeWidth = 1;

  return (
    <div className="ButtonIcon">
      <svg id="button" width="22" height="22">
        <path
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
          d="
            M 3 17
            L 3 15
          "
          stroke={lineColor}
          strokeWidth={lineStrokeWidth}
          fillOpacity="0%"
        />
        <path
          d="
            M 3 15
            L 3 13
            S 3 11 5 11
            L 17 11
            S 19 11 19 13
            L 19 15
          "
          stroke={lineColor}
          strokeWidth={lineStrokeWidth}
          fillOpacity="0%"
        />
        <path
          d="
            M 19 15
            L 19 17
          "
          stroke={lineColor}
          strokeWidth={lineStrokeWidth}
          fillOpacity="0%"
        />

        <rect
          width="20"
          height="4"
          x="1"
          y="17"
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
