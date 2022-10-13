import { useEffect, useRef } from "react";

export function useInterval({
  callback,
  intervalTime,
  isOn,
}: {
  callback: () => void;
  intervalTime: number;
  isOn: boolean;
}) {
  const savedCallback = useRef<() => void>();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      console.log("tick");
      if (!savedCallback.current) {
        return;
      }
      savedCallback.current();
    }
    if (isOn) {
      const id = setInterval(tick, intervalTime);
      return () => clearInterval(id);
    }
  }, [callback, intervalTime, isOn]);
}
