import { useState, useRef } from "react";

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
  //const moveFps = 60; // for test of resetting
  const moveFps = 20;
  const resetFps = 60;
  //const startMSec = 3000; // for test of resetting
  const startMSec = 30000;
  const startSec = Math.ceil(startMSec / 1000);
  const startClockSec = startSec % 60;
  const startClockMin = Math.ceil((startSec - startClockSec) / 60) % 60;
  const startClockHour = Math.ceil(
    (startSec - startClockSec - startClockMin * 60) / 3600
  );

  const [remainingMSec, setRemainingMSec] = useState(startMSec);
  const [remainingSec, setRemainingSec] = useState(startSec);
  const [remainingClockSec, setRemainingClockSec] = useState(startClockSec);
  const [remainingClockMin, setRemainingClockMin] = useState(startClockMin);
  const [remainingClockHour, setRemainingClockHour] = useState(startClockHour);
  const [percentage, setPercentage] = useState(
    (remainingMSec / startMSec) * 100
  );

  const calcAllFromRemainingMSec = (newRemainingMSec) => {
    if (newRemainingMSec < 0) {
      newRemainingMSec = 0;
    }
    if (newRemainingMSec >= startMSec) {
      newRemainingMSec = startMSec - 0.001;
    }
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
    setPercentage((remainingMSec / startMSec) * 100);
  };

  const calcAllFromPercentage = (newPercentage) => {
    if (newPercentage < 0) {
      newPercentage = 0;
    }
    if (newPercentage > 100) {
      newPercentage = 100;
    }
    const newRemainingMSec = (startMSec * newPercentage) / 100;
    calcAllFromRemainingMSec(newRemainingMSec);
  };

  const isResetting = useRef(false);

  const moveRemainingMSec = () => {
    setTimeout(() => {
      let newRemainingMSec = remainingMSec - 1000 / moveFps;
      calcAllFromRemainingMSec(newRemainingMSec);

      if (remainingMSec <= 0) {
        isResetting.current = true;
      }
    }, 1000 / moveFps);
  };

  const resetAcceleratePercentageEnd = 10;
  const resetSlowDownPercentageStart = 40;
  const resetPercentagePerFrameStart = 1;
  const resetPercentagePerFrameMax = 15;
  const resetPercentagePerFrameEnd = 0.01;
  const resetPercentagePerFrameDiffStartToMax =
    resetPercentagePerFrameMax - resetPercentagePerFrameStart;
  const resetPercentagePerFrameDiffMaxToEnd =
    resetPercentagePerFrameMax - resetPercentagePerFrameEnd;
  const resetPercentagePerFrame = useRef(resetPercentagePerFrameStart);
  const reset = () => {
    setTimeout(() => {
      if (percentage < resetAcceleratePercentageEnd) {
        resetPercentagePerFrame.current =
          resetPercentagePerFrameStart +
          (resetPercentagePerFrameDiffStartToMax /
            resetAcceleratePercentageEnd) *
            percentage;
      } else if (percentage < resetSlowDownPercentageStart) {
        resetPercentagePerFrame.current = resetPercentagePerFrameMax;
      } else {
        resetPercentagePerFrame.current =
          resetPercentagePerFrameMax -
          (resetPercentagePerFrameDiffMaxToEnd /
            (100 - resetSlowDownPercentageStart)) *
            (percentage - resetSlowDownPercentageStart);
      }
      const newPercentage = percentage + resetPercentagePerFrame.current;
      calcAllFromPercentage(newPercentage);

      if (newPercentage >= 100) {
        isResetting.current = false;
      }
    }, 1000 / resetFps);
  };

  requestAnimationFrame(() => {
    if (!isResetting.current) {
      moveRemainingMSec();
    } else {
      reset();
    }
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
              percentage={percentage}
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
              percentage={percentage}
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
              percentage={percentage}
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
              percentage={percentage}
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
              percentage={percentage}
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
              percentage={percentage}
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
              percentage={percentage}
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
              percentage={percentage}
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
              percentage={percentage}
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
