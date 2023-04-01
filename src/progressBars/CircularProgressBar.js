import { useEffect, useState, useRef } from "react";

function CircularProgressBar(props) {
  const lineStrokeWidth = 5;
  const xAxisRotation = 0;
  const sweepFlag = 1;
  const centerX = 50;
  const centerY = 50;
  const radius = 45;

  const startX = centerX + radius;
  const startY = centerY;

  const [percentage, setPercentage] = useState(props.percentage);

  const angle = useRef((2 * Math.PI * percentage) / 100);
  const endX = useRef(centerX + radius * Math.cos(angle.current));
  const endY = useRef(centerY + radius * Math.sin(angle.current));
  const largeArcFlag = useRef(angle.current > Math.PI ? 1 : 0);

  const baseAngle = 2 * Math.PI * 0.9999;
  const baseEndX = centerX + radius * Math.cos(baseAngle);
  const baseEndY = centerY + radius * Math.sin(baseAngle);

  useEffect(() => {
    setPercentage(props.percentage);
    angle.current = (2 * Math.PI * percentage) / 100;
    endX.current = centerX + radius * Math.cos(angle.current);
    endY.current = centerY + radius * Math.sin(angle.current);
    largeArcFlag.current = angle.current > Math.PI ? 1 : 0;
  }, [props.percentage]);

  return (
    <div className="CircularProgressBar">
      <svg id="circle" width="100" height="100">
        <defs>
          <linearGradient id={props.colorId} gradientUnits="userSpaceOnUse">
            <stop className="stop1" offset="0%" stopColor={props.colorRight} />
            <stop className="stop2" offset="100%" stopColor={props.colorLeft} />
          </linearGradient>
        </defs>

        <path
          d={
            `M ${startX} ${startY}` +
            `A ${radius} ${radius} ${xAxisRotation} 1 ${sweepFlag} ${baseEndX} ${baseEndY}`
          }
          stroke={props.colorBase}
          strokeWidth={lineStrokeWidth}
          fillOpacity="0%"
        />

        <path
          d={
            `M ${startX} ${startY}` +
            `A ${radius} ${radius} ${xAxisRotation} ${largeArcFlag.current} ${sweepFlag} ${endX.current} ${endY.current}`
          }
          stroke={`url(#${props.colorId})`}
          strokeLinecap="round"
          strokeWidth={lineStrokeWidth}
          fillOpacity="0%"
        />
      </svg>
    </div>
  );
}

export default CircularProgressBar;
