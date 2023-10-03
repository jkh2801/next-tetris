export const createMatrix = (w: number, h: number) => {
  const matrix: number[][] = [];
  while (h--) {
    matrix.push(new Array(w).fill(0));
  }
  return matrix;
};

export const formatTimer = (time: number) => {
  const minute = ~~(time / 60);
  const second = ~~(time % 60);
  return (
    (minute > 9 ? minute.toString() : "0" + minute) +
    ":" +
    (second > 9 ? second : "0" + second)
  );
};
