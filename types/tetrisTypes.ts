export type CanvasControllerType = {
  ctx: CanvasRenderingContext2D | null;
  width: number;
  height: number;
  matrix: number[][];
  lastTime: number;
};

export type playerControllerType = {
  pos: { x: number; y: number };
  piece: number[][];
  nextPieces: number[][][];
  holdPiece: number[][];
  dropCounter: number;
  dropInterval: number;
  songpyeon: number;
  line: number;
  timer: number;
  cnt: number;
};
