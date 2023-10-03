"use client";

import { playerControllerType } from "@/types/tetrisTypes";
import { formatTimer } from "@/utils/consts";
import { useTimer } from "@/utils/hook";
import Image from "next/image";
import { FC, MutableRefObject, useEffect } from "react";

type PropType = {
  playerController: MutableRefObject<playerControllerType>;
};

export const MobileScoreBox: FC<PropType> = ({ playerController }) => {
  const [timer] = useTimer(500);

  useEffect(() => {
    playerController.current.timer += 0.5;
  }, [timer]);

  return (
    <div className="w-full flex flex-col justify-around items-center text-white text-sm ">
      <div className="w-full flex justify-evenly items-center">
        <div>
          <Image src="/songpyeon.png" alt="songpyeon" width={24} height={24} />
        </div>
        <span>{playerController.current.songpyeon} 개</span>
      </div>
      <div className="w-full flex justify-evenly items-center">
        <span>라인</span>
        <span>{playerController.current.line} 개</span>
      </div>
      <div className="w-full flex justify-evenly items-center">
        <span>플레이 시간</span>
        <span>{formatTimer(playerController.current.timer)}</span>
      </div>
    </div>
  );
};
