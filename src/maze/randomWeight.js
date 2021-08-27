import { randomInteger } from "../PathFinding/algorithms/utils";
import { isStart, isEnd } from "../utils/utils";

export default function randomWeightMaze(grid = [[]], start, end) {
  let rowLength = grid.length;
  let walls = {};
  let wallsOrder = [];

  for (let x = 0; x < rowLength; x++) {
    let colLength = grid[x].length;
    for (let y = 0; y < colLength; y++) {
      let node = grid[x][y];

      if (isStart(x, y, start) || isEnd(x, y, end)) continue;
      let randomNum = randomInteger(0, 3);
      if (!randomNum) {
        walls[node.name] = true;
        wallsOrder.push(node);
      }
    }
  }
  return { walls, order: wallsOrder };
}
