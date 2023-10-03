import { useEffect } from "react";

export const useVhState = () => {
  useEffect(() => {
    const h = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${h}px`);
    window.addEventListener("resize", handleResizeEvent);
    return () => window.removeEventListener("resize", handleResizeEvent);
  }, []);

  const handleResizeEvent = () => {
    const h = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${h}px`);
  };

  return [];
};
