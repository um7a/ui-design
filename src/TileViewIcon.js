import "./TileViewIcon.css";

function TileViewIcon() {
  const lineColor = "#585858";
  const lineStrokeWidth = 1;

  //      1    6   8    13  15   20
  //    +---------------------------> x
  //    | * ++ *   * ++ *   * ++ *
  //    | +    +   +    +   +    +
  //    | * ++ *   * ++ *   * ++ *
  //    |
  //    | * ++ *   * ++ *   * ++ *
  //    | +    +   +    +   +    +
  //    | * ++ *   * ++ *   * ++ *
  //    |
  //    | * ++ *   * ++ *   * ++ *
  //    | +    +   +    +   +    +
  // 21 | * ++ *   * ++ *   * ++ *
  //    |
  //    v
  //    y
  //
  return (
    <div className="TileViewIcon">
      <svg id="tileView" width="22" height="22">
        <path
          d="M 1 1 L 6 1 L 6 6 L 1 6 Z"
          id="upperLeftSquare"
          stroke={lineColor}
          strokeWidth={lineStrokeWidth}
          fillOpacity="0%"
        />
        <use x="8" id="upperCenterSquare" xlinkHref="#upperLeftSquare" />
        <use x="8" id="upperRightSquare" xlinkHref="#upperCenterSquare" />
        <use y="8" id="middleLeftSquare" xlinkHref="#upperLeftSquare" />
        <use x="8" id="middleCenterSquare" xlinkHref="#middleLeftSquare" />
        <use x="8" id="middleRightSquare" xlinkHref="#middleCenterSquare" />
        <use y="8" id="bottomLeftSquare" xlinkHref="#middleLeftSquare" />
        <use x="8" id="bottomCenterSquare" xlinkHref="#bottomLeftSquare" />
        <use x="8" id="bottomRightSquare" xlinkHref="#bottomCenterSquare" />
      </svg>
    </div>
  );
}

export default TileViewIcon;
