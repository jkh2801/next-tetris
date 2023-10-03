"use client";

import Arrow from "@/assets/arrow.svg";

export const MobilePad = () => {
  return (
    <>
      <button
        className="absolute bottom-6 left-6 w-12 h-12 rounded-[50%] bg-[#fffa] flex justify-center items-center z-40 rotate-180"
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
        className="absolute bottom-24 left-6 w-12 h-12 rounded-[50%] bg-[#fffa] flex justify-center items-center z-40 rotate-90"
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
        className="absolute bottom-40 left-6 w-12 h-12 rounded-[50%] bg-[#fffa] flex justify-center items-center z-40 text-sm font-bold"
        onClick={() =>
          document.dispatchEvent(new KeyboardEvent("keydown", { key: " " }))
        }
      >
        Hold
      </button>
      <button
        className="absolute bottom-6 right-6 w-12 h-12 rounded-[50%] bg-[#fffa] flex justify-center items-center z-40"
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
        className="absolute bottom-24 right-6 w-12 h-12 rounded-[50%] bg-[#fffa] flex justify-center items-center z-40 text-sm font-bold"
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
