import { useEffect, useState, useRef } from "react";
import { BsGear } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"], weight: "500" });
const STATUS = {
  pause: 0,
  start: 1,
  default: 2,
};

const Timer = () => {
  const [today, setDate] = useState(new Date());
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [status, setStatus] = useState(STATUS.default);
  const intervalRef = useRef<NodeJS.Timer>();

  function countDown() {
    if (seconds === 0) {
      if (minutes !== 0) {
        setSeconds(59);
        setMinutes(min => min - 1);
      } else {
        let mins = displayMessage ? 24 : 4;
        let sec = 59;
        setSeconds(sec);
        setMinutes(mins);
        setDisplayMessage(value => !value);
      }
    } else {
      setSeconds(sec => sec - 1);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (status === STATUS.start) {
      intervalRef.current = setInterval(() => {
        countDown();
      }, 1000);
    } else if (status === STATUS.pause && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [minutes, seconds, status]);

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const start = () => setStatus(STATUS.start);
  const pause = () => setStatus(STATUS.pause);
  const stop = () => {
    setStatus(STATUS.pause);
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <div className="h-[60%] w-full bg-light rounded-3xl flex flex-col justify-between p-6">
      <div className="w-full">
        <div className="w-full flex items-center flex-col">
          <h1 className={inter.className} style={{ fontSize: "1.7rem" }}>
            Saat
          </h1>
          <h1 className={inter.className} style={{ fontSize: "1.5rem" }}>
            🕰️{today.toLocaleTimeString()}
          </h1>
        </div>
        <div className="w-full flex items-center flex-col mt-6">
          <h1 className={inter.className} style={{ fontSize: "1.7rem" }}>
            Zamanlayıcı
          </h1>
          <h1 className={inter.className} style={{ fontSize: "1.5rem" }}>
            ⏰{timerMinutes}:{timerSeconds}
          </h1>
        </div>
      </div>
      <div className="flex justify-between w-full">
        <BsGear
          className="text-3xl h-full hover:animate-spin duration-1000"
          onMouseOver={() => {}}
        />
        <button
          className="bg-[#bc4d3e] py-2 px-6 rounded-2xl text-white hover:opacity-90 transition-all duration-100"
          onClick={stop}
        >
          Sıfırla
        </button>
        <button
          className="bg-[#bc4d3e] py-2 px-6 rounded-2xl text-white hover:opacity-90 transition-all duration-100"
          onClick={status !== 1 ? start : pause}
        >
          {status !== 1 ? "Başlat" : "Durdur"}
        </button>
      </div>
    </div>
  );
};

export default Timer;
