"use client";

import Arrow from "@/assets/arrow.svg";

export const TabletPad = () => {
  return (
    <>
      <button
        className="absolute bottom-16 left-16 w-24 h-24 rounded-[50%] bg-[#fffa] flex justify-center items-center z-40 rotate-180"
        onClick={() =>
          document.dispatchEvent(
            new KeyboardEvent("keydown", { key: "ArrowLeft" })
          )
        }
      >
        <div className="scale-150">
          <Arrow />
        </div>
      </button>
      <button
        className="absolute bottom-48 left-16 w-24 h-24 rounded-[50%] bg-[#fffa] flex justify-center items-center z-40 rotate-90"
        onClick={() =>
          document.dispatchEvent(
            new KeyboardEvent("keydown", { key: "ArrowDown" })
          )
        }
      >
        <div className="scale-150">
          <Arrow />
        </div>
      </button>
      <button
        className="absolute bottom-80 left-16 w-24 h-24 rounded-[50%] bg-[#fffa] flex justify-center items-center z-40 text-xl font-bold"
        onClick={() =>
          document.dispatchEvent(new KeyboardEvent("keydown", { key: " " }))
        }
      >
        Hold
      </button>
      <button
        className="absolute bottom-16 right-16 w-24 h-24 rounded-[50%] bg-[#fffa] flex justify-center items-center z-40"
        onClick={() =>
          document.dispatchEvent(
            new KeyboardEvent("keydown", { key: "ArrowRight" })
          )
        }
      >
        <div className="scale-150">
          <Arrow />
        </div>
      </button>
      <button
        className="absolute bottom-48 right-16 w-24 h-24 rounded-[50%] bg-[#fffa] flex justify-center items-center z-40 text-xl font-bold"
        onClick={() =>
          document.dispatchEvent(
            new KeyboardEvent("keydown", { key: "ArrowUp" })
          )
        }
      >
        Rotate
      </button>
    </>
  );
};
