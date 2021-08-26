import { isStart, isEnd } from "../utils/utils";

export default function stairCase(grid = [[]], start, end) {
  let height = grid.length;

  let width = grid[0].length;
  let currentX = grid.length - 1;
  let currentY = 0;
  let walls = {};
  let wallsOrder = [];

  while (currentX > 0 && currentY < width) {
    let currentNode = grid[currentX][currentY];

    if (
      !isStart(currentX, currentY, start) &&
      !isEnd(currentX, currentY, end)
    ) {
      currentNode.isWall = true;
      walls[currentNode.name] = true;
      wallsOrder.push(currentNode);
    }
    currentX--;
    currentY++;
  }
  while (currentX < height - 2 && currentY < width) {
    let currentNode = grid[currentX][currentY];

    if (
      !isStart(currentX, currentY, start) &&
      !isEnd(currentX, currentY, end)
    ) {
      currentNode.isWall = true;
      walls[currentNode.name] = true;
      wallsOrder.push(currentNode);
    }
    currentX++;
    currentY++;
  }
  while (currentX > 0 && currentY < width - 1) {
    let currentNode = grid[currentX][currentY];
    if (
      !isStart(currentX, currentY, start) &&
      !isEnd(currentX, currentY, end)
    ) {
      currentNode.isWall = true;
      walls[currentNode.name] = true;
      wallsOrder.push(currentNode);
    }
    currentX--;
    currentY++;
  }
  return { walls, order: wallsOrder };
}
