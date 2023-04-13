import { useEffect, useRef } from "react";

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

function WaterProgressBar(props) {
  const lineStrokeWidth = 1;
  const y = 2;

  const waveHight = 2;

  const startX = 100;
  const startY = y;

  const wave1X = 75;
  const wave1Y = y + waveHight;

  const centerW1W2X = 50;
  const centerW1W2Y = y;

  const wave2X = 25;
  const wave2Y = y - waveHight;

  const centerW2W3X = 0;
  const centerW2W3Y = y;

  const wave3X = -25;
  const wave3Y = wave1Y;

  const centerW3W4X = -50;
  const centerW3W4Y = y;

  const wave4X = -75;
  const wave4Y = wave2Y;

  const centerW4W5X = -100;
  const centerW4W5Y = y;

  const wave5X = -125;
  const wave5Y = wave1Y;

  const centerW5W6X = -150;
  const centerW5W6Y = y;

  const wave6X = -175;
  const wave6Y = wave2Y;

  const endX = -200;
  const endY = y;

  const linearGradientId = useRef(makeId(10));

  let moveX = useRef(Math.random() * 100);
  let moveY = useRef(0);
  const moveWave = () => {
    moveX.current += 1;
    moveX.current %= 200;
    setTimeout(moveWave, 50);
  };

  useEffect(() => {
    moveWave();
  }, []);

  useEffect(() => {
    moveY.current = ((100 - props.percentage) / 100) * 96;
  }, [props.percentage]);

  return (
    <div className="WaterProgressBar">
      <svg id="water" width="100" height="100">
        <defs>
          <linearGradient
            id={linearGradientId.current}
            gradientUnits="objectBoundingBox"
          >
            <stop className="s1" offset="0%" stopColor={props.colorRight} />
            <stop className="s3" offset="33.3%" stopColor={props.colorLeft} />
            <stop className="s5" offset="66.6%" stopColor={props.colorRight} />
            <stop className="s3" offset="100%" stopColor={props.colorLeft} />
          </linearGradient>
        </defs>

        <path
          d={
            `M ${startX} ${startY} ` +
            `S ${wave1X} ${wave1Y} ` +
            `${centerW1W2X} ${centerW1W2Y} ` +
            `M ${centerW1W2X} ${centerW1W2Y} ` +
            `S ${wave2X} ${wave2Y} ` +
            `${centerW2W3X} ${centerW2W3Y} ` +
            `M ${centerW2W3X} ${centerW2W3Y} ` +
            `S ${wave3X} ${wave3Y} ` +
            `${centerW3W4X} ${centerW3W4Y} ` +
            `M ${centerW3W4X} ${centerW3W4Y} ` +
            `S ${wave4X} ${wave4Y} ` +
            `${centerW4W5X} ${centerW4W5Y} ` +
            `M ${centerW4W5X} ${centerW4W5Y} ` +
            `S ${wave5X} ${wave5Y} ` +
            `${centerW5W6X} ${centerW5W6Y} ` +
            `M ${centerW5W6X} ${centerW5W6Y} ` +
            `S ${wave6X} ${wave6Y} ` +
            `${endX} ${endY}`
          }
          stroke={`url(#${linearGradientId.current})`}
          strokeWidth={lineStrokeWidth}
          transform={`translate(${moveX.current}, ${moveY.current})`}
          fillOpacity="0%"
        />
        <path
          d={
            // wave
            `M ${startX} ${startY} ` +
            `S ${wave1X} ${wave1Y} ` +
            `${centerW1W2X} ${centerW1W2Y} ` +
            `M ${centerW1W2X} ${centerW1W2Y} ` +
            `S ${wave2X} ${wave2Y} ` +
            `${centerW2W3X} ${centerW2W3Y} ` +
            `M ${centerW2W3X} ${centerW2W3Y} ` +
            `S ${wave3X} ${wave3Y} ` +
            `${centerW3W4X} ${centerW3W4Y} ` +
            `M ${centerW3W4X} ${centerW3W4Y} ` +
            `S ${wave4X} ${wave4Y} ` +
            `${centerW4W5X} ${centerW4W5Y} ` +
            `M ${centerW4W5X} ${centerW4W5Y} ` +
            `S ${wave5X} ${wave5Y} ` +
            `${centerW5W6X} ${centerW5W6Y} ` +
            `M ${centerW5W6X} ${centerW5W6Y} ` +
            `S ${wave6X} ${wave6Y} ` +
            `${endX} ${endY} ` +
            // outer lines (side and bottom)
            `M ${endX} ${endY} ` +
            `L ${endX} 100 ` +
            `L ${startX} 100 ` +
            `L ${startX} ${startY} `
          }
          strokeOpacity="0%"
          strokeWidth={lineStrokeWidth}
          transform={`translate(${moveX.current}, ${moveY.current})`}
          fill={`url(#${linearGradientId.current})`}
          fillOpacity="5%"
        />
      </svg>
    </div>
  );
}

export default WaterProgressBar;
