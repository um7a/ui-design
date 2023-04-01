import { useEffect, useRef } from "react";

function StraightProgressBar(props) {
  const lineStrokeWidth = 5;
  const minX = 5;
  const maxX = 95;
  const y = 50;

  const endX = useRef(minX + props.percentage * (maxX - minX));

  useEffect(() => {
    endX.current = minX + (props.percentage / 100) * (maxX - minX);
  }, [props.percentage]);

  return (
    <div className="StraightProgressBar">
      <svg id="straight" width="100" height="100">
        <defs>
          <linearGradient id={props.colorId} gradientUnits="userSpaceOnUse">
            <stop className="stop1" offset="0%" stopColor={props.colorRight} />
            <stop className="stop2" offset="100%" stopColor={props.colorLeft} />
          </linearGradient>
        </defs>

        <path
          d={`M ${minX} ${y} L ${maxX} ${y}`}
          stroke={props.colorBase}
          strokeLinecap="round"
          strokeWidth={lineStrokeWidth}
          fillOpacity="0%"
        />

        <path
          d={`M ${minX} ${y} L ${endX.current} ${y}`}
          stroke={`url(#${props.colorId})`}
          strokeLinecap="round"
          strokeWidth={lineStrokeWidth}
          fillOpacity="0%"
        />
      </svg>
    </div>
  );
}

export default StraightProgressBar;
