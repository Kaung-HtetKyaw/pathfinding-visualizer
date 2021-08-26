export const prefixNumberWithZero = (num) => {
  return num < 10 ? `0${num}` : num;
};

export const convertXYToName = (x, y) => {
  return `${prefixNumberWithZero(x)}${prefixNumberWithZero(y)}`;
};

export const isStart = (x, y, start) => start.x === x && start.y === y;
export const isEnd = (x, y, end) => end.x === x && end.y === y;
