"use client";

import {
  CanvasControllerType,
  playerControllerType,
} from "@/types/tetrisTypes";
import { colors, createMatrix } from "@/utils/consts";
import { FC, MutableRefObject, useEffect, useRef } from "react";

type PropType = {
  playerController: MutableRefObject<playerControllerType>;
};
const unitSize = 92 / 5;

export const HoldBox: FC<PropType> = ({ playerController }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasController = useRef<CanvasControllerType>({
    ctx: null,
    width: 0,
    height: 0,
    matrix: [],
    lastTime: 0,
  });
  const frame = new Image();

  useEffect(() => {
    if (canvasRef.current) {
      const canvasEle = canvasRef.current;
      canvasController.current.ctx = canvasEle.getContext("2d");
      canvasController.current.width = canvasEle.width = canvasEle.clientWidth;
      canvasController.current.height = canvasEle.height =
        canvasEle.clientHeight;
      canvasController.current.matrix = createMatrix(4, 6);
      frame.src = "songpyeon.png";
      animate();
    }
  }, []);

  const animate = () => {
    requestAnimationFrame(animate);
    draw();
  };

  const draw = () => {
    const { ctx, width, height, matrix } = canvasController.current;
    const { nextPieces, holdPiece } = playerController.current;
    if (ctx) {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);
      if (holdPiece.length > 0) drawMatrix(holdPiece, { x: 1, y: 1 });
      for (let x = 1; x < 92 / 5; x++) {
        ctx.beginPath();
        ctx.lineWidth = 0.5;
        ctx.moveTo(x * unitSize, 0);
        ctx.lineTo(x * unitSize, (432 / 5) * unitSize);
        ctx.strokeStyle = "#fff";
        ctx.stroke();
        ctx.closePath();
      }
      for (let y = 1; y < 432 / 5; y++) {
        ctx.beginPath();
        ctx.lineWidth = 0.5;
        ctx.moveTo(0, y * unitSize);
        ctx.lineTo((92 / 5) * unitSize, y * unitSize);
        ctx.strokeStyle = "#fff";
        ctx.stroke();
        ctx.closePath();
      }
    }
  };

  const drawMatrix = (matrix: number[][], offset: { x: number; y: number }) => {
    const { ctx } = canvasController.current;
    if (ctx) {
      matrix.forEach((row: number[], y: number) => {
        row.forEach((value: number, x: number) => {
          if (value) {
            ctx.fillStyle = colors[value % 10];
            ctx.fillRect(
              (x + offset.x) * unitSize,
              (y + offset.y) * unitSize,
              unitSize,
              unitSize
            );
          }
          if (value > 10)
            ctx.drawImage(
              frame,
              (x + offset.x) * unitSize,
              (y + offset.y) * unitSize,
              unitSize,
              unitSize
            );
        });
      });
    }
  };

  return (
    <div className="bg-black">
      <canvas width={92} height={108} ref={canvasRef}></canvas>
    </div>
  );
};
