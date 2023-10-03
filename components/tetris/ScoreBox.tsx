"use client";

import { playerControllerType } from "@/types/tetrisTypes";
import { formatTimer } from "@/utils/consts";
import { useTimer } from "@/utils/hook";
import Image from "next/image";
import { FC, MutableRefObject, useEffect } from "react";

type PropType = {
  playerController: MutableRefObject<playerControllerType>;
};

export const ScoreBox: FC<PropType> = ({ playerController }) => {
  const [timer] = useTimer(500);

  useEffect(() => {
    playerController.current.timer += 0.5;
  }, [timer]);

  return (
    <div className="h-[calc(100%-160px)] py-12 flex flex-col justify-around items-center text-white">
      <Image src="/songpyeon.png" alt="songpyeon" width={30} height={30} />
      <div>{playerController.current.songpyeon}</div>
      <div>라인 갯수</div>
      <div>{playerController.current.line}</div>
      <div>플레이 시간</div>
      <div>{formatTimer(playerController.current.timer)}</div>
    </div>
  );
};
