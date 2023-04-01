function ProgressBarIcon() {
  const lineColor = "#585858";
  const lineStrokeWidth = 1;
  const xAxisRotation = 90;
  const sweepFlag = 1;

  const centerX = 11;
  const centerY = 11;
  const radius = 8;
  const percentage = 85;

  const startX = centerX + radius;
  const startY = centerY;
  const angle = (2 * Math.PI * percentage) / 100;
  const endX = centerX + radius * Math.cos(angle);
  const endY = centerY + radius * Math.sin(angle);
  const largeArcFlag = angle > Math.PI ? 1 : 0;

  //      1 3     7  11 15    20 21
  //    +--------------------------> x
  //    |            ***
  //    |       +           + (endX, endY)
  //    |     +
  //    |    +
  //  9 |   *                   * (startX, startY)
  //    |    +                 +
  //    |     +               +
  //    |       +           +
  //    |            ***
  //    v
  //    y
  //
  return (
    <div className="ProgressBar">
      <svg id="circle" width="22" height="22">
        <path
          d={
            `M ${startX} ${startY}` +
            `A ${radius} ${radius} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${endX} ${endY}`
          }
          stroke={lineColor}
          strokeWidth={lineStrokeWidth}
          fillOpacity="0%"
        />
      </svg>
    </div>
  );
}

export default ProgressBarIcon;
