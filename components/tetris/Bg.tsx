"use client";

import FullMoon from "@/assets/full_moon.svg";
import Rabbit1 from "@/assets/rabbit1.svg";
import Rabbit2 from "@/assets/rabbit2.svg";
import Rabbit3 from "@/assets/rabbit3.svg";
import Rabbit4 from "@/assets/rabbit4.svg";
import React from "react";

const Bg = () => {
  return (
    <>
      <div className="absolute z-20 top-16 left-24 scale-125 sepia brightness-200 drop-shadow-[0_0_10px_#ffffe1]">
        <FullMoon />
      </div>
      <div className="absolute z-10 top-0 left-0 w-full h-1/3">
        {Array(120)
          .fill(0)
          .map((_, idx) => {
            const w = Math.random() * 100;
            const h = Math.random() * 100;
            const random = Math.random();
            return (
              <i
                key={idx}
                className="absolute w-px h-px bg-white animate-pulse"
                style={{
                  top: `${~~h}%`,
                  left: `${~~w}%`,
                  opacity: random,
                  scale: random * 2,
                }}
              ></i>
            );
          })}
      </div>
      <div
        className="absolute z-10 bottom-0 left-0 w-full h-1/4 rounded-t-[50%] blur-[3px] "
        style={{ background: "linear-gradient(#1a692d 30px, #6f451c)" }}
      >
        <div className="absolute top-0 right-3/4">
          <Rabbit1 />
        </div>
        <div className="absolute bottom-1/2 right-2/3 scale-50">
          <Rabbit2 />
        </div>
        <div className="absolute bottom-1/2 left-[calc(75%-100px)] scale-75">
          <Rabbit3 />
        </div>
        <div className="absolute bottom-1/2 left-3/4 scale-75">
          <Rabbit4 />
        </div>
      </div>
    </>
  );
};

export default React.memo(Bg);
