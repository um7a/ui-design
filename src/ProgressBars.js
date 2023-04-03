import { useState, useRef, useEffect } from "react";

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
  const moveFps = 60;
  const resetFps = 60;

  const maxMSec = 5000;
  const [remainingMSec, setRemainingMSec] = useState(0);
  const [remainingSec, setRemainingSec] = useState(0);
  const [remainingClockSec, setRemainingClockSec] = useState(0);
  const [remainingClockMin, setRemainingClockMin] = useState(0);
  const [remainingClockHour, setRemainingClockHour] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const [remainingMSecUpdateIntervalId, setRemainingMSecUpdateIntervalId] =
    useState(undefined);

  const [isInitialized, setIsInitialized] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const calcAllFromRemainingMSec = (newRemainingMSec) => {
    if (newRemainingMSec < 0) {
      newRemainingMSec = 0;
    }
    if (newRemainingMSec >= maxMSec) {
      // FIXME
      // When the newRemainingMSec equals with startMSec,
      // the progress bar can not draw correctly.
      newRemainingMSec = maxMSec - 0.001;
    }
    const newRemainingSec = Math.ceil(newRemainingMSec / 1000);
    const newRemainingClockSec = newRemainingSec % 60;
    const newRemainingClockMin =
      Math.ceil((newRemainingSec - newRemainingClockSec) / 60) % 60;
    const newRemainingClockHour = Math.ceil(
      (newRemainingSec - newRemainingClockSec - newRemainingClockMin * 60) /
        3600
    );
    const newPercentage = (newRemainingMSec / maxMSec) * 100;

    setRemainingMSec(newRemainingMSec);
    setRemainingSec(newRemainingSec);
    setRemainingClockSec(newRemainingClockSec);
    setRemainingClockMin(newRemainingClockMin);
    setRemainingClockHour(newRemainingClockHour);
    setPercentage(newPercentage);
  };

  const calcAllFromPercentage = (newPercentage) => {
    if (newPercentage < 0) {
      newPercentage = 0;
    }
    if (newPercentage > 100) {
      newPercentage = 100;
    }
    const newRemainingMSec = (maxMSec * newPercentage) / 100;
    calcAllFromRemainingMSec(newRemainingMSec);
  };

  const resetAcceleratePercentageEnd = 10; // 0 ~ 10%
  const resetSlowDownPercentageStart = 20; // 20 ~ 100%
  const resetPercentagePerFrameStart = 0.1;
  const resetPercentagePerFrameMax = 5;
  const resetPercentagePerFrameEnd = 0.01;
  const resetPercentagePerFrameDiffStartToMax =
    resetPercentagePerFrameMax - resetPercentagePerFrameStart;
  const resetPercentagePerFrameDiffMaxToEnd =
    resetPercentagePerFrameMax - resetPercentagePerFrameEnd;
  const resetPercentagePerFrame = useRef(resetPercentagePerFrameStart);

  // Initialize when mounted.
  useEffect(() => {
    calcAllFromRemainingMSec(0);
    setIsResetting(true);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized === false) {
      // Application has not initialized yet.
      // Do nothing.
      return;
    }
    // This time, isResetting flag changed.
    clearInterval(remainingMSecUpdateIntervalId);
    let newIntervalId;
    if (isResetting === true) {
      // Start resetting remainingMSec.
      newIntervalId = setInterval(() => {
        // NOTE
        // This setPercentage seems not to necessary.
        // But to get the newest value of percentage, it is needed.
        setPercentage((percentage) => {
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
            setIsResetting(false);
          }
        });
      }, 1000 / resetFps);
    } else {
      // Start moving remainingMSec.
      newIntervalId = setInterval(() => {
        // NOTE
        // This setRemainingMSec seems not to necessary.
        // But to get the newest value of remainingMSec, it is needed.
        setRemainingMSec((remainingMSec) => {
          let newRemainingMSec = remainingMSec - 1000 / moveFps;
          calcAllFromRemainingMSec(newRemainingMSec);
          setIsResetting(newRemainingMSec <= 0);
          return newRemainingMSec;
        });
      }, 1000 / moveFps);
    }
    setRemainingMSecUpdateIntervalId(newIntervalId);
    return () => clearInterval(newIntervalId);
  }, [isResetting, isInitialized]);

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
              percentage={(remainingMSec / maxMSec) * 100}
              colorId="PinkAndOrange"
              colorLeft="#ff9500"
              colorRight="#ff0099"
              colorBase="#1a1a1a"
            ></CircularProgressBar>
            <div className="Label">
              <div className="Percentage">{Math.ceil(percentage)}</div>
              <div className="PercentUnit">%</div>
            </div>
          </div>

          <div className="CircularProgressBarSpace">
            <CircularProgressBar
              percentage={(remainingMSec / maxMSec) * 100}
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
              percentage={(remainingMSec / maxMSec) * 100}
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
              <div className="Percentage">{Math.ceil(percentage)}</div>
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
              <div className="Percentage">{Math.ceil(percentage)}</div>
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
