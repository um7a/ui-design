import { useState, useRef, useEffect } from "react";

import "./ProgressBars.css";
import HamburgerMenu from "./HamburgerMenu";
import CircularProgressBar from "./progressBars/CircularProgressBar";
import StraightProgressBar from "./progressBars/StraightProgressBar";
import WaterProgressBar from "./progressBars/WaterProgressBar";

const maxMSec = 10000;
const moveFps = 60;
const resetFps = 60;

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

const keepInRange = (value, min, max) => {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
};

const calcAllFromRemainingMSec = (newRemainingMSec) => {
  newRemainingMSec = keepInRange(newRemainingMSec, 0, maxMSec);

  const newRemainingSec = Math.ceil(newRemainingMSec / 1000);
  const newRemainingClockSec = newRemainingSec % 60;
  const newRemainingClockMin =
    Math.ceil((newRemainingSec - newRemainingClockSec) / 60) % 60;
  const newRemainingClockHour = Math.ceil(
    (newRemainingSec - newRemainingClockSec - newRemainingClockMin * 60) / 3600
  );
  const newPercentage = (newRemainingMSec / maxMSec) * 100;

  return {
    remainingMSec: newRemainingMSec,
    remainingSec: newRemainingSec,
    remainingClockSec: newRemainingClockSec,
    remainingClockMin: newRemainingClockMin,
    remainingClockHour: newRemainingClockHour,
    percentage: newPercentage,
  };
};

function ProgressBars() {
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

  const calcAllFromPercentage = (newPercentage) => {
    const newRemainingMSec = (maxMSec * newPercentage) / 100;
    return calcAllFromRemainingMSec(newRemainingMSec);
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
    const newValues = calcAllFromRemainingMSec(0);
    setRemainingMSec(newValues.remainingMSec);
    setRemainingSec(newValues.remainingSec);
    setRemainingClockSec(newValues.remainingClockSec);
    setRemainingClockMin(newValues.remainingClockMin);
    setRemainingClockHour(newValues.remainingClockHour);
    setPercentage(newValues.percentage);
    setIsResetting(newValues.percentage < 100);

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized === false) {
      // Application has not initialized yet.
      // Do nothing.
      return;
    }
    // Reaching this code means that isResetting flag has been changed.
    clearInterval(remainingMSecUpdateIntervalId);
    let newIntervalId;
    if (isResetting === true) {
      // reset to 100 %
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
          let newPercentage = percentage + resetPercentagePerFrame.current;
          const newValues = calcAllFromPercentage(newPercentage);
          setRemainingMSec(newValues.remainingMSec);
          setRemainingSec(newValues.remainingSec);
          setRemainingClockSec(newValues.remainingClockSec);
          setRemainingClockMin(newValues.remainingClockMin);
          setRemainingClockHour(newValues.remainingClockHour);
          setPercentage(newValues.percentage);
          setIsResetting(newPercentage < 100);
          return newValues.percentage;
        });
      }, 1000 / resetFps);
    } else {
      // move to 0%
      newIntervalId = setInterval(() => {
        // NOTE
        // This setRemainingMSec seems not to necessary.
        // But to get the newest value of remainingMSec, it is needed.
        setRemainingMSec((remainingMSec) => {
          let newRemainingMSec = remainingMSec - 1000 / moveFps;
          const newValues = calcAllFromRemainingMSec(newRemainingMSec);
          setRemainingMSec(newValues.remainingMSec);
          setRemainingSec(newValues.remainingSec);
          setRemainingClockSec(newValues.remainingClockSec);
          setRemainingClockMin(newValues.remainingClockMin);
          setRemainingClockHour(newValues.remainingClockHour);
          setPercentage(newValues.percentage);
          setIsResetting(newValues.remainingMSec <= 0);
          return newValues.remainingMSec;
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
            <div className="Label"></div>
            <CircularProgressBar
              percentage={Math.max((remainingMSec / maxMSec) * 100, 0.5)}
              colorLeft="#ff9500"
              colorRight="#ff0099"
              colorBase="#2a1a1a"
              centerX={50}
              centerY={50}
              strokeWidth={5}
              radius={45}
            ></CircularProgressBar>
          </div>

          <div className="CircularProgressBarSpace">
            <div className="Label">
              <div className="Percentage">{Math.ceil(percentage)}</div>
              <div className="PercentUnit">%</div>
            </div>
            <CircularProgressBar
              percentage={
                isResetting
                  ? Math.min(-(remainingMSec / maxMSec) * 100, -0.2)
                  : Math.max((remainingMSec / maxMSec) * 100, 0.5)
              }
              colorLeft="#00b09b"
              colorRight="#96c93d"
              colorBase="#1a201a"
              centerX={50}
              centerY={50}
              strokeWidth={5}
              radius={45}
            ></CircularProgressBar>
          </div>

          <div className="CircularProgressBarSpace">
            <div className="Label">
              <div className="Second">{remainingSec}</div>
              <div className="SecondUnit">Sec</div>
            </div>
            <CircularProgressBar
              percentage={Math.max(
                ((maxMSec - remainingMSec) / maxMSec) * 100,
                0.5
              )}
              colorLeft="#00e1ff"
              colorRight="#7300ff"
              colorBase="#1a1a2a"
              centerX={50}
              centerY={50}
              strokeWidth={5}
              radius={45}
            ></CircularProgressBar>
          </div>

          <div className="CircularProgressBarSpace">
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
            <CircularProgressBar
              percentage={
                isResetting
                  ? Math.min(-((maxMSec - remainingMSec) / maxMSec) * 100, -0.2)
                  : Math.max(((maxMSec - remainingMSec) / maxMSec) * 100, 0.5)
              }
              colorLeft="#0093e9"
              colorRight="#80d0c7"
              colorBase="#1a1a2a"
              centerX={50}
              centerY={50}
              strokeWidth={5}
              radius={45}
            ></CircularProgressBar>
          </div>
        </div>

        <div className="GridDescriptionSpace">
          <p>Straight</p>
        </div>
        <div className="ProgressBarGridSpace">
          <div className="StraightProgressBarSpace">
            <div className="Label"></div>
            <StraightProgressBar
              percentage={Math.max(percentage, 0.1)}
              colorLeft="#ff9500"
              colorRight="#ff0099"
              colorBase="#2a1a1a"
            ></StraightProgressBar>
          </div>

          <div className="StraightProgressBarSpace">
            <div className="Label">
              <div className="Percentage">{Math.ceil(percentage)}</div>
              <div className="PercentUnit">%</div>
            </div>
            <StraightProgressBar
              percentage={isResetting ? -percentage * 1.5 : percentage}
              colorLeft="#00b09b"
              colorRight="#96c93d"
              colorBase="#1a201a"
            ></StraightProgressBar>
          </div>

          <div className="StraightProgressBarSpace">
            <div className="Label">
              <div className="Second">{remainingSec}</div>
              <div className="SecondUnit">Sec</div>
            </div>
            <StraightProgressBar
              percentage={Math.max(100 - percentage, 0.1)}
              colorLeft="#00e1ff"
              colorRight="#7300ff"
              colorBase="#1a1a2a"
            ></StraightProgressBar>
          </div>

          <div className="StraightProgressBarSpace">
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
            <StraightProgressBar
              percentage={
                isResetting ? 100 + percentage * 1.05 : 100 - percentage
              }
              colorLeft="#0093e9"
              colorRight="#80d0c7"
              colorBase="#1a1a2a"
            ></StraightProgressBar>
          </div>
        </div>

        <div className="GridDescriptionSpace">
          <p>Water</p>
        </div>

        <div className="ProgressBarGridSpace">
          <div className="WaterProgressBarSpace">
            <div className="Label"></div>
            <WaterProgressBar
              percentage={percentage}
              colorLeft="#ff9500"
              colorRight="#ff0099"
              colorBase="#2a1a1a"
            ></WaterProgressBar>
          </div>

          <div className="WaterProgressBarSpace">
            <div className="Label">
              <div className="Percentage">{Math.ceil(percentage)}</div>
              <div className="PercentUnit">%</div>
            </div>
            <WaterProgressBar
              percentage={percentage}
              colorLeft="#00b09b"
              colorRight="#96c93d"
              colorBase="#1a201a"
            ></WaterProgressBar>
          </div>

          <div className="WaterProgressBarSpace">
            <div className="Label">
              <div className="Second">{remainingSec}</div>
              <div className="SecondUnit">Sec</div>
            </div>
            <WaterProgressBar
              percentage={100 - percentage}
              colorLeft="#00e1ff"
              colorRight="#7300ff"
              colorBase="#1a1a2a"
            ></WaterProgressBar>
          </div>

          <div className="WaterProgressBarSpace">
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
            <WaterProgressBar
              percentage={100 - percentage}
              colorLeft="#0093e9"
              colorRight="#80d0c7"
              colorBase="#1a1a2a"
            ></WaterProgressBar>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressBars;
