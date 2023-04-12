import { useEffect, useState, useRef } from "react";

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

function padByZero(uintStr, digit) {
  if (uintStr.length >= digit) {
    return uintStr;
  }
  while (uintStr.length < digit) {
    uintStr = "0" + uintStr;
  }
  return uintStr;
}

const keepInRange = (value, min, max) => {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
};

function parseColor(colorStr) {
  if (colorStr === undefined) {
    return { red: 0, green: 0, blue: 0 };
  }

  if (colorStr.length === 4) {
    const red = parseInt(colorStr.substr(1, 1));
    const green = parseInt(colorStr.substr(2, 1));
    const blue = parseInt(colorStr.substr(3, 1));
    return { red: red, green: green, blue: blue };
  }
  if (colorStr.length === 7) {
    const red = parseInt(colorStr.substr(1, 2), 16);
    const green = parseInt(colorStr.substr(3, 2), 16);
    const blue = parseInt(colorStr.substr(5, 2), 16);
    return { red: red, green: green, blue: blue };
  }
  return { red: 0, green: 0, blue: 0 };
}

function constructColorStr(rgb) {
  return (
    `#` +
    `${padByZero(rgb.red.toString(16), 2)}` +
    `${padByZero(rgb.green.toString(16), 2)}` +
    `${padByZero(rgb.blue.toString(16), 2)}`
  );
}

function StraightProgressBar(props) {
  const linearGradientId = useRef(makeId(10));
  const lineStrokeWidth = 5;

  const minX = 5;
  const maxX = 95;
  const endX = useRef(minX + props.percentage * (maxX - minX));

  const y = 50;

  const [colorLeft, setColorLeft] = useState(props.colorLeft);
  const [colorLeftCenter, setColorLeftCenter] = useState("#000000"); // calculated later
  const [colorCenter, setColorCenter] = useState("#000000"); // calculated later
  const [colorRightCenter, setColorRightCenter] = useState("#000000"); // calculated later
  const [colorRight, setColorRight] = useState(props.colorRight);

  const allColors = useRef([]); // calculated later

  const colorChangeStage = 30;
  const colorChangeCount = useRef(0);

  const [initialized, setInitialized] = useState(false);

  // initialization
  useEffect(() => {
    // calculate all colors of gradation.
    const edgeRgbLeft = parseColor(props.colorLeft);
    const edgeRgbRight = parseColor(props.colorRight);

    const diffRed = edgeRgbLeft.red - edgeRgbRight.red;
    const diffGreen = edgeRgbLeft.green - edgeRgbRight.green;
    const diffBlue = edgeRgbLeft.blue - edgeRgbRight.blue;

    const fragmentRed =
      diffRed > 0
        ? Math.ceil(diffRed / colorChangeStage)
        : Math.floor(diffRed / colorChangeStage);
    const fragmentGreen =
      diffGreen > 0
        ? Math.ceil(diffGreen / colorChangeStage)
        : Math.floor(diffGreen / colorChangeStage);
    const fragmentBlue =
      diffBlue > 0
        ? Math.ceil(diffBlue / colorChangeStage)
        : Math.floor(diffBlue / colorChangeStage);

    allColors.current = [];
    for (let i = 0; i < colorChangeStage; i++) {
      const red = keepInRange(edgeRgbLeft.red - fragmentRed * i, 0x00, 0xff);
      const green = keepInRange(
        edgeRgbLeft.green - fragmentGreen * i,
        0x00,
        0xff
      );
      const blue = keepInRange(edgeRgbLeft.blue - fragmentBlue * i, 0x00, 0xff);
      allColors.current.push(constructColorStr({ red, green, blue }));
    }
    for (let i = colorChangeStage - 1; i >= 0; i--) {
      const red = keepInRange(edgeRgbLeft.red - fragmentRed * i, 0x00, 0xff);
      const green = keepInRange(
        edgeRgbLeft.green - fragmentGreen * i,
        0x00,
        0xff
      );
      const blue = keepInRange(edgeRgbLeft.blue - fragmentBlue * i, 0x00, 0xff);
      allColors.current.push(constructColorStr({ red, green, blue }));
    }
    setInitialized(true);
  }, []);

  // rotate gradation
  useEffect(() => {
    if (initialized === false) {
      // CircularProgressBar has not initialized yet.
      // Do nothing.
      return;
    }

    const rotateGradation = () => {
      const colorPositionLeft = colorChangeCount.current;
      const colorPositionLeftCenter =
        (colorChangeCount.current + Math.floor(colorChangeStage / 4)) %
        (colorChangeStage * 2);
      const colorPositionCenter =
        (colorChangeCount.current + Math.floor(colorChangeStage / 2)) %
        (colorChangeStage * 2);
      const colorPositionRightCenter =
        (colorChangeCount.current + Math.floor((colorChangeStage / 4) * 3)) %
        (colorChangeStage * 2);
      const colorPositionRight =
        (colorChangeCount.current + colorChangeStage) % (colorChangeStage * 2);

      setColorLeft(allColors.current[colorPositionLeft]);
      setColorLeftCenter(allColors.current[colorPositionLeftCenter]);
      setColorCenter(allColors.current[colorPositionCenter]);
      setColorRightCenter(allColors.current[colorPositionRightCenter]);
      setColorRight(allColors.current[colorPositionRight]);

      colorChangeCount.current = colorChangeCount.current + 1;
      if (colorChangeCount.current >= colorChangeStage * 2) {
        colorChangeCount.current = 0;
      }
    };

    rotateGradation();
    const intervalId = setInterval(() => {
      rotateGradation();
    }, 500);

    return () => clearInterval(intervalId);
  }, [initialized]);

  useEffect(() => {
    endX.current = minX + (props.percentage / 100) * (maxX - minX);
  }, [props.percentage]);

  return (
    <div className="StraightProgressBar">
      <svg id="straight" width="100" height="100">
        <defs>
          <linearGradient
            id={linearGradientId.current}
            gradientUnits="userSpaceOnUse"
          >
            <stop className="stop1" offset="0%" stopColor={colorLeft} />
            <stop className="stop2" offset="25%" stopColor={colorLeftCenter} />
            <stop className="stop3" offset="50%" stopColor={colorCenter} />
            <stop className="stop4" offset="75%" stopColor={colorRightCenter} />
            <stop className="stop5" offset="100%" stopColor={colorRight} />
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
          stroke={`url(#${linearGradientId.current})`}
          strokeLinecap="round"
          strokeWidth={lineStrokeWidth}
          fillOpacity="0%"
        />
      </svg>
    </div>
  );
}

export default StraightProgressBar;
