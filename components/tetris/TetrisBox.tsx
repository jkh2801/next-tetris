"use client";

import { SetStateType } from "@/types/commonTypes";
import {
  CanvasControllerType,
  playerControllerType,
} from "@/types/tetrisTypes";
import { colors, createMatrix, getRandomPiece } from "@/utils/consts";
import { FC, MutableRefObject, useEffect, useRef } from "react";

type PropType = {
  playerController: MutableRefObject<playerControllerType>;
  setGameStatue: SetStateType<string>;
  unitSize: number;
};

export const TetrisBox: FC<PropType> = ({
  playerController,
  setGameStatue,
  unitSize,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasController = useRef<CanvasControllerType>({
    ctx: null,
    width: 0,
    height: 0,
    matrix: [],
    lastTime: 0,
  });
  const animateRef = useRef(0);
  const frame = new Image();

  useEffect(() => {
    if (canvasRef.current) {
      const canvasEle = canvasRef.current;
      canvasController.current.ctx = canvasEle.getContext("2d");
      canvasController.current.width = canvasEle.width = canvasEle.clientWidth;
      canvasController.current.height = canvasEle.height =
        canvasEle.clientHeight;
      canvasController.current.matrix = createMatrix(10, 20);
      frame.src = "songpyeon.png";
      document.addEventListener("keydown", handleKeyPress);
      animate();
    }
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      cancelAnimationFrame(animateRef.current);
    };
  }, []);

  const animate = (time = 0) => {
    animateRef.current = requestAnimationFrame(animate);
    const { dropCounter, dropInterval } = playerController.current;
    const deltaTime = time - canvasController.current.lastTime;
    canvasController.current.lastTime = time;
    playerController.current.dropCounter += deltaTime;
    if (dropCounter > dropInterval) playerDrop();
    draw();
  };

  const draw = () => {
    const { ctx, width, height, matrix } = canvasController.current;
    const { pos, piece } = playerController.current;
    if (ctx) {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);
      drawMatrix(matrix, { x: 0, y: 0 });
      drawMatrix(piece, pos);
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
      for (let x = 1; x < 10; x++) {
        ctx.beginPath();
        ctx.lineWidth = 0.5;
        ctx.moveTo(x * unitSize, 0);
        ctx.lineTo(x * unitSize, 20 * unitSize);
        ctx.strokeStyle = "#fff";
        ctx.stroke();
        ctx.closePath();
      }
      for (let y = 1; y < 20; y++) {
        ctx.beginPath();
        ctx.lineWidth = 0.5;
        ctx.moveTo(0, y * unitSize);
        ctx.lineTo(10 * unitSize, y * unitSize);
        ctx.strokeStyle = "#fff";
        ctx.stroke();
        ctx.closePath();
      }
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowLeft":
        playerMove(-1);
        break;
      case "ArrowRight":
        playerMove(1);
        break;
      case "ArrowDown":
        playerDrop();
        break;
      case "ArrowUp":
        playerRotate(1);
        break;
      case " ":
        playerHold();
        break;
      default:
        break;
    }
  };

  const playerHold = () => {
    const { holdPiece, piece } = playerController.current;
    if (holdPiece.length === 0) {
      playerController.current.holdPiece = piece;
      playerReset();
    } else {
      const dummyPiece = holdPiece.map((m) => [...m]);
      playerController.current.holdPiece = playerController.current.piece;
      playerController.current.piece = dummyPiece;
    }
  };

  const playerMove = (dir: number) => {
    const { pos } = playerController.current;
    pos.x += dir;
    if (collide()) pos.x -= dir;
  };

  const playerRotate = (dir: number) => {
    const { pos, piece } = playerController.current;
    const x = pos.x;
    let offset = 1;
    rotateMatrix(piece, dir);
    while (collide()) {
      pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > piece[0].length) {
        rotateMatrix(piece, -dir);
        pos.x = x;
        return;
      }
    }
  };

  const rotateMatrix = (piece: number[][], dir: number) => {
    for (let y = 0; y < piece.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [piece[x][y], piece[y][x]] = [piece[y][x], piece[x][y]];
      }
    }
    if (dir > 0) {
      piece.forEach((row) => row.reverse());
    } else {
      piece.reverse();
    }
  };

  const playerDrop = () => {
    const { pos, cnt, dropInterval } = playerController.current;
    pos.y++;
    if (collide()) {
      pos.y--;
      if (cnt % 3 === 0 && dropInterval > 100)
        playerController.current.dropInterval -= 100;
      merg();
      playerReset();
      swipe();
    }
    playerController.current.dropCounter = 0;
  };

  const swipe = () => {
    const { matrix } = canvasController.current;
    matrix.forEach((ele, i) => {
      if (ele.every((el) => el > 0)) {
        matrix.splice(i, 1);
        matrix.unshift(new Array(ele.length).fill(0));
        playerController.current.line++;
        playerController.current.songpyeon += ele.filter(
          (num) => num > 10
        ).length;
      }
    });
  };

  const playerReset = () => {
    const { nextPieces, pos } = playerController.current;
    playerController.current.piece = nextPieces[0];
    playerController.current.nextPieces = [
      ...nextPieces.slice(1),
      getRandomPiece(),
    ];
    pos.y = 0;
    pos.x = 4;
    playerController.current.cnt++;
    if (collide()) setGameStatue("end");
  };

  const merg = () => {
    const { piece, pos } = playerController.current;
    const { matrix } = canvasController.current;
    piece.forEach((row: number[], y: number) => {
      row.forEach((value: number, x: number) => {
        if (value) matrix[y + pos.y][x + pos.x] = value;
      });
    });
  };

  const collide = () => {
    const { piece, pos } = playerController.current;
    const { matrix } = canvasController.current;
    for (let y = 0; y < piece.length; y++)
      for (let x = 0; x < piece[y].length; x++)
        if (
          piece[y][x] !== 0 &&
          (matrix[y + pos.y] && matrix[y + pos.y][x + pos.x]) !== 0
        )
          return true;

    return false;
  };

  return (
    <div className="bg-black">
      <canvas
        width={10 * unitSize}
        height={20 * unitSize}
        ref={canvasRef}
      ></canvas>
    </div>
  );
};
