"use client";

import { useRef, useState } from "react";
import { TetrisBox } from "./TetrisBox";
import { playerControllerType } from "@/types/tetrisTypes";
import { formatTimer, getRandomPiece } from "@/utils/consts";
import { HoldBox } from "./HoldBox";
import Image from "next/image";
import { MobileScoreBox } from "./MobileScoreBox";
import { MobilePad } from "./MobilePad";

const Mobile = () => {
  const [gameStatus, setGameStatue] = useState("main");
  const playerController = useRef<playerControllerType>({
    pos: { x: 4, y: -1 },
    piece: getRandomPiece(),
    nextPieces: [getRandomPiece(), getRandomPiece(), getRandomPiece()],
    holdPiece: [],
    dropCounter: 0,
    dropInterval: 1000,
    songpyeon: 0,
    line: 0,
    timer: 0,
    cnt: 1,
  });
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      {gameStatus === "main" && (
        <div className="w-screen h-screen bg-black z-30 px-6 py-12 text-white text-sm overflow-y-scroll">
          <div className="text-2xl font-bold">Tetris</div>
          <div className="mt-12">
            누구나 아는 테트리스 게임입니다. 블록을 쌓으면서 한 줄이 꽉 채워지면
            그 줄은 사라지고 이런 식으로 블록이 맨 위까지 안 쌓이게 끝까지
            버티면서 플레이하는 게임이다. 빠른 게임을 위해 점차적으로 떨어지는
            블록 속도가 빨라집니다. 즐거운 게임을 해보세요!
          </div>
          <div className="mt-12">
            <Image
              src="/songpyeon.png"
              alt="songpyeon"
              width={24}
              height={24}
            />
          </div>
          <div className="mt-3">
            송편을 모아보세요!! 무작위의 블록에 송편들이 등장합니다. 송편은 한
            줄을 꽉 채우면 얻을 수 있으며 송편은 최종 점수 계산에서 1개의 라인과
            동일하게 계산됩니다.
          </div>
          <div className="mt-12">최종 점수</div>
          <div className="mt-3">
            최종 점수 = 한 줄 채운 라인 갯수 + 획득한 송편 수 + 플레이 시간{" "}
            {"(1초당 1점)"}
          </div>
          <div className="mt-20 flex justify-center items-center">
            <button
              className="w-full h-16 rounded bg-violet-500 hover:bg-violet-400"
              onClick={() => setGameStatue("start")}
            >
              게임 시작
            </button>
          </div>
        </div>
      )}
      {gameStatus === "start" && (
        <div className="rounded border-4 border-slate-200 bg-sky-600 overflow-hidden z-30">
          <div className="border-b-4 border-slate-200 flex">
            <div className="border-r-4">
              <div className="flex justify-center items-center h-12 text-white">
                Hold
              </div>
              <HoldBox playerController={playerController} />
            </div>
            <MobileScoreBox playerController={playerController} />
          </div>
          <TetrisBox
            playerController={playerController}
            setGameStatue={setGameStatue}
            unitSize={20}
          />
        </div>
      )}
      {gameStatus === "end" && (
        <div className="w-screen h-screen bg-black z-30 px-6 py-12 text-white text-sm overflow-y-scroll">
          <div className="text-2xl font-bold">최종 점수</div>
          <div className="mt-12 flex justify-between items-center px-6">
            <div>
              <Image
                src="/songpyeon.png"
                alt="songpyeon"
                width={24}
                height={24}
              />
            </div>
            <span>{playerController.current.songpyeon} 개</span>
          </div>
          <div className="mt-6 flex justify-between items-center px-6">
            <span>라인</span>
            <span>{playerController.current.line} 개</span>
          </div>
          <div className="mt-6 flex justify-between items-center px-6">
            <span>플레이 시간</span>
            <span>{formatTimer(playerController.current.timer)}</span>
          </div>
          <div className="w-full h-px bg-white mt-12" />
          <div className="mt-6 flex justify-between items-center px-6">
            <span>점수</span>
            <span>
              {playerController.current.songpyeon +
                playerController.current.line +
                ~~playerController.current.timer}
              점
            </span>
          </div>
          <div className="mt-12 flex justify-center items-center">
            <button
              className="w-full h-16 rounded bg-violet-500 hover:bg-violet-400"
              onClick={() => {
                playerController.current = {
                  pos: { x: 4, y: -1 },
                  piece: getRandomPiece(),
                  nextPieces: [
                    getRandomPiece(),
                    getRandomPiece(),
                    getRandomPiece(),
                  ],
                  holdPiece: [],
                  dropCounter: 0,
                  dropInterval: 1000,
                  songpyeon: 0,
                  line: 0,
                  timer: 0,
                  cnt: 1,
                };
                setGameStatue("start");
              }}
            >
              한판 더
            </button>
          </div>
        </div>
      )}
      {gameStatus === "start" && <MobilePad />}
    </main>
  );
};

export default Mobile;
