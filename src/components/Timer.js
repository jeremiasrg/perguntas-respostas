import React, { useState, useEffect } from "react";

function Timer(props) {
  const [mins, setMins] = useState(
    props.minutes === undefined ? 90 : props.minutes
  );
  const [secs, setSecs] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (secs <= 0) {
        if (mins <= 0) {
          clearInterval(timerId);
          props.onTimeFinished();
          // console.log("Terminou");
        } else {
          setMins((m) => m - 1);
          setSecs(59);
        }
      } else setSecs((s) => s - 1);
    }, 1000);
    return () => clearInterval(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secs, mins]);

  return (
    <div>
      <p>
        Tempo: {mins}:{secs < 10 && 0}
        {secs}
      </p>
    </div>
  );
}
export default Timer;
