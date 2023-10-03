export const pieces = ["I", "O", "T", "L", "J", "S", "Z"];
export const colors = [
  "#000",
  "#FF0000",
  "#FF00C7",
  "#43FFDA",
  "#00D1FF",
  "#B500FF",
  "#FFF500",
  "#FFB800",
];

export const getRandomPiece = () => {
  switch (pieces[~~(Math.random() * pieces.length)]) {
    case "I":
      return setSpecialPoint(I);
    case "O":
      return setSpecialPoint(O);
    case "T":
      return setSpecialPoint(T);
    case "L":
      return setSpecialPoint(L);
    case "J":
      return setSpecialPoint(J);
    case "S":
      return setSpecialPoint(S);
    case "Z":
      return setSpecialPoint(Z);

    default:
      return [];
  }
};

const setSpecialPoint = (matrix: number[][]) => {
  const piece = matrix.map((m) => [...m]);
  let cnt = 0;
  for (let y = 0; y < piece.length; y++) {
    for (let x = 0; x < piece[y].length; x++) {
      if (piece[y][x] !== 0 && cnt < 1 && Math.random() < 0.1) {
        piece[y][x] += 10;
        cnt++;
      }
    }
  }
  return piece;
};

export const I = [
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
];

export const O = [
  [2, 2],
  [2, 2],
];

export const T = [
  [0, 3, 0],
  [3, 3, 3],
  [0, 0, 0],
];

export const L = [
  [0, 4, 0],
  [0, 4, 0],
  [0, 4, 4],
];
export const J = [
  [0, 5, 0],
  [0, 5, 0],
  [5, 5, 0],
];
export const S = [
  [0, 6, 6],
  [6, 6, 0],
  [0, 0, 0],
];
export const Z = [
  [7, 7, 0],
  [0, 7, 7],
  [0, 0, 0],
];
