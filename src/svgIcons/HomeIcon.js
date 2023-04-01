function HomeIcon() {
  const lineColor = "#585858";
  const lineStrokeWidth = 1;

  //      1 3     7  11 15    20 21
  //    +--------------------------> x
  //    |             *
  //    |          +     +
  //    |       +           +
  //    |    +                 +
  //  9 | *  *                 *  *
  //    |    +                 +
  // 13 |    +     *  +  *     +
  //    |    +     +     +     +
  // 21 |    *     *     *     *
  //    v
  //    y
  //
  return (
    <div className="HomeIcon">
      <svg id="home" width="22" height="22">
        <path
          d="M 11 1 L 21 9 L 20 9 L 20 21 L 15 21 L 15 13 L 7 13 L 7 21 L 2 21 L 2 9 L 1 9 Z"
          stroke={lineColor}
          strokeWidth={lineStrokeWidth}
          fillOpacity="0%"
        />
      </svg>
    </div>
  );
}

export default HomeIcon;
