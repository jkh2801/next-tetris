import { SetStateType } from "@/types/commonTypes";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

export const useTimer = (
  init = 1000 * 60
): [dayjs.Dayjs, SetStateType<number>, () => void] => {
  const [intervalTime, setIntervalTime] = useState(init);
  const [date, setDate] = useState(dayjs());
  const timer = useRef<NodeJS.Timer>();

  useEffect(() => {
    if (timer.current !== undefined) clearInterval(timer.current);
    timer.current = setInterval(() => {
      setDate(dayjs());
    }, intervalTime);
  }, [date, intervalTime]);

  const resetEvent = () => {
    setDate(dayjs());
  };

  return [date, setIntervalTime, resetEvent];
};
