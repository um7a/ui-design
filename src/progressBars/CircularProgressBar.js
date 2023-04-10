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

function CircularProgressBar(props) {
  const linearGradientId = makeId(10);
  const circumference = props.radius * 2 * Math.PI;

  return (
    <div className="CircularProgressBar">
      <svg id="circle" width="100" height="100">
        <defs>
          <linearGradient id={linearGradientId} gradientUnits="userSpaceOnUse">
            <stop className="stop1" offset="0%" stopColor={props.colorRight} />
            <stop className="stop2" offset="100%" stopColor={props.colorLeft} />
          </linearGradient>
        </defs>

        <circle
          cx={props.centerX}
          cy={props.centerY}
          r={props.radius}
          stroke={props.colorBase}
          strokeLinecap="round"
          strokeWidth={props.strokeWidth}
          fillOpacity="0%"
        />

        <circle
          cx={props.centerX}
          cy={props.centerY}
          r={props.radius}
          stroke={`url(#${linearGradientId})`}
          strokeLinecap="round"
          strokeWidth={props.strokeWidth}
          fillOpacity="0%"
          strokeDasharray={circumference}
          strokeDashoffset={
            circumference - (circumference * props.percentage) / 100
          }
        ></circle>
      </svg>
    </div>
  );
}

export default CircularProgressBar;
