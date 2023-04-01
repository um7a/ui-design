function TileViewIcon() {
  const lineColor = "#585858";
  const lineStrokeWidth = 1;

  //      1        9   12       20
  //    +---------------------------> x
  //    | * + ++ + *    * + ++ + *
  //    | +        +    +        +
  //    | +        +    +        +
  //    | +        +    +        +
  //    | * + ++ + *    * + ++ + *
  //
  //    | * ++ *   * ++ *   * ++ *
  //    |
  //    | * ++ *   * ++ *   * ++ *
  //    | +    +   +    +   +    +
  // 20 | * ++ *   * ++ *   * ++ *
  //    |
  //    v
  //    y
  //
  return (
    <div className="TileViewIcon">
      <svg id="tileView" width="22" height="22">
        <path
          d="M 1 1 L 9 1 L 9 9 L 1 9 Z"
          id="upperLeftSquare"
          stroke={lineColor}
          strokeWidth={lineStrokeWidth}
          fillOpacity="0%"
        />
        <use x="12" id="upperRightSquare" xlinkHref="#upperLeftSquare" />
        <use y="12" id="bottomLeftSquare" xlinkHref="#upperLeftSquare" />
        <use x="12" id="bottomRightSquare" xlinkHref="#bottomLeftSquare" />
      </svg>
    </div>
  );
}

export default TileViewIcon;
