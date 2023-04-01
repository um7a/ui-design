import { useState } from "react";

import "./ProgressBars.css";
import HamburgerMenu from "./HamburgerMenu";
import CircularProgressBar from "./progressBars/CircularProgressBar";
import StraightProgressBar from "./progressBars/StraightProgressBar";
import WaterProgressBar from "./progressBars/WaterProgressBar";

function padByZero(unsignedInteger, digit) {
  let uintStr = String(unsignedInteger);
  if (uintStr.length >= digit) {
    return uintStr;
  }
  while (uintStr.length < digit) {
    uintStr = "0" + uintStr;
  }
  return uintStr;
}

function ProgressBars() {
  const fps = 20;
  const startMSec = 30000;
  const startSec = Math.ceil(startMSec / 1000);
  const startClockSec = startSec % 60;
  const startClockMin = Math.ceil((startSec - startClockSec) / 60) % 60;
  const startClockHour = Math.ceil(
    (startSec - startClockSec - startClockMin * 60) / 3600
  );

  const [remainingMSec, setRemainingMSec] = useState(startMSec);
  const [remainingSec, setRemainingSec] = useState(
    Math.ceil(remainingMSec / 1000)
  );
  const [remainingClockSec, setRemainingClockSec] = useState(remainingSec % 60);
  const [remainingClockMin, setRemainingClockMin] = useState(
    Math.ceil(remainingSec - remainingClockSec / 60) % 60
  );
  const [remainingClockHour, setRemainingClockHour] = useState(
    Math.ceil(
      remainingSec - remainingClockSec - (remainingClockMin * 60) / 3600
    )
  );

  const moveRemainingMSec = () => {
    setTimeout(() => {
      if (remainingMSec > startMSec) {
        setRemainingMSec(startMSec);
        setRemainingSec(startSec);
        setRemainingClockSec(startClockSec);
        setRemainingClockMin(startClockMin);
        setRemainingClockHour(startClockHour);
      }
      const newRemainingMSec = remainingMSec - 1000 / fps;
      const newRemainingSec = Math.ceil(newRemainingMSec / 1000);
      const newRemainingClockSec = newRemainingSec % 60;
      const newRemainingClockMin =
        Math.ceil((newRemainingSec - newRemainingClockSec) / 60) % 60;
      const newRemainingClockHour = Math.ceil(
        (newRemainingSec - newRemainingClockSec - newRemainingClockMin * 60) /
          3600
      );
      setRemainingMSec(newRemainingMSec);
      setRemainingSec(newRemainingSec);
      setRemainingClockSec(newRemainingClockSec);
      setRemainingClockMin(newRemainingClockMin);
      setRemainingClockHour(newRemainingClockHour);
      if (remainingMSec < 0) {
        setRemainingMSec(startMSec);
        setRemainingSec(Math.ceil(startMSec / 1000));
        setRemainingClockSec(startClockSec);
        setRemainingClockMin(startClockMin);
        setRemainingClockHour(startClockHour);
      }
    }, 1000 / fps);
  };

  requestAnimationFrame(() => {
    moveRemainingMSec();
  });

  return (
    <div className="ProgressBars">
      <HamburgerMenu></HamburgerMenu>

      <div className="Main">
        <div className="TitleSpace">
          <p>Progress Bars</p>
        </div>

        <div className="GridDescriptionSpace">
          <p>Circular</p>
        </div>

        <div className="ProgressBarGridSpace">
          <div className="CircularProgressBarSpace">
            <CircularProgressBar
              percentage={(remainingMSec / startMSec) * 100}
              colorId="PinkAndOrange"
              colorLeft="#ff9500"
              colorRight="#ff0099"
              colorBase="#1a1a1a"
            ></CircularProgressBar>
            <div className="Label">
              <div className="Percentage">
                {Math.ceil((remainingMSec / startMSec) * 100)}
              </div>
              <div className="PercentUnit">%</div>
            </div>
          </div>

          <div className="CircularProgressBarSpace">
            <CircularProgressBar
              percentage={(remainingMSec / startMSec) * 100}
              colorId="BlueAndGreen"
              colorLeft="#00b09b"
              colorRight="#96c93d"
              colorBase="#1a1a1a"
            ></CircularProgressBar>
            <div className="Label">
              <div className="Second">{remainingSec}</div>
              <div className="SecondUnit">Sec</div>
            </div>
          </div>

          <div className="CircularProgressBarSpace">
            <CircularProgressBar
              percentage={(remainingMSec / startMSec) * 100}
              colorId="BlueAndLightBlue"
              colorLeft="#00e1ff"
              colorRight="#7300ff"
              colorBase="#1a1a1a"
            ></CircularProgressBar>
            <div className="Label">
              <div className="ClockHour">
                {padByZero(remainingClockHour, 2)}
              </div>
              <div className="ClockColon">:</div>
              <div className="ClockMinute">
                {padByZero(remainingClockMin, 2)}
              </div>
              <div className="ClockColon">:</div>
              <div className="ClockSecond">
                {padByZero(remainingClockSec, 2)}
              </div>
            </div>
          </div>
        </div>

        <div className="GridDescriptionSpace">
          <p>Straight</p>
        </div>
        <div className="ProgressBarGridSpace">
          <div className="StraightProgressBarSpace">
            <StraightProgressBar
              percentage={(remainingMSec / startMSec) * 100}
              colorId="PinkAndOrange"
              colorLeft="#ff9500"
              colorRight="#ff0099"
              colorBase="#1a1a1a"
            ></StraightProgressBar>
            <div className="Label">
              <div className="Percentage">
                {Math.ceil((remainingMSec / startMSec) * 100)}
              </div>
              <div className="PercentUnit">%</div>
            </div>
          </div>

          <div className="StraightProgressBarSpace">
            <StraightProgressBar
              percentage={(remainingMSec / startMSec) * 100}
              colorId="BlueAndGreen"
              colorLeft="#00b09b"
              colorRight="#96c93d"
              colorBase="#1a1a1a"
            ></StraightProgressBar>
            <div className="Label">
              <div className="Second">{remainingSec}</div>
              <div className="SecondUnit">Sec</div>
            </div>
          </div>

          <div className="StraightProgressBarSpace">
            <StraightProgressBar
              percentage={(remainingMSec / startMSec) * 100}
              colorId="BlueAndLightBlue"
              colorLeft="#00e1ff"
              colorRight="#7300ff"
              colorBase="#1a1a1a"
            ></StraightProgressBar>
            <div className="Label">
              <div className="ClockHour">
                {padByZero(remainingClockHour, 2)}
              </div>
              <div className="ClockColon">:</div>
              <div className="ClockMinute">
                {padByZero(remainingClockMin, 2)}
              </div>
              <div className="ClockColon">:</div>
              <div className="ClockSecond">
                {padByZero(remainingClockSec, 2)}
              </div>
            </div>
          </div>
        </div>

        <div className="GridDescriptionSpace">
          <p>Water</p>
        </div>

        <div className="ProgressBarGridSpace">
          <div className="WaterProgressBarSpace">
            <WaterProgressBar
              percentage={(remainingMSec / startMSec) * 100}
              colorId="WaterPinkAndOrange"
              colorLeft="#ff9500"
              colorRight="#ff0099"
              colorBase="#1a1a1a"
            ></WaterProgressBar>
            <div className="Label">
              <div className="Percentage">
                {Math.ceil((remainingMSec / startMSec) * 100)}
              </div>
              <div className="PercentUnit">%</div>
            </div>
          </div>

          <div className="WaterProgressBarSpace">
            <WaterProgressBar
              percentage={(remainingMSec / startMSec) * 100}
              colorId="WaterBlueAndGreen"
              colorLeft="#00b09b"
              colorRight="#96c93d"
              colorBase="#1a1a1a"
            ></WaterProgressBar>
            <div className="Label">
              <div className="Second">{remainingSec}</div>
              <div className="SecondUnit">Sec</div>
            </div>
          </div>

          <div className="WaterProgressBarSpace">
            <WaterProgressBar
              percentage={(remainingMSec / startMSec) * 100}
              colorId="WaterBlueAndLightBlue"
              colorLeft="#00e1ff"
              colorRight="#7300ff"
              colorBase="#1a1a1a"
            ></WaterProgressBar>
            <div className="Label">
              <div className="ClockHour">
                {padByZero(remainingClockHour, 2)}
              </div>
              <div className="ClockColon">:</div>
              <div className="ClockMinute">
                {padByZero(remainingClockMin, 2)}
              </div>
              <div className="ClockColon">:</div>
              <div className="ClockSecond">
                {padByZero(remainingClockSec, 2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressBars;
