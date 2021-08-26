import { isStart, isEnd } from "../utils/utils";

let walls = {};
let wallsOrder = [];
let width, height;
let start, end;

export default function recursive_division(grid, startXY, endXY) {
  height = grid.length;
  width = grid[0].length;
  start = startXY;
  end = endXY;
  addOuterWalls(grid);
  let ent = addEntrance(grid);
  addInnerWalls(grid, true, 1, height - 2, 1, width - 2, ent);
  return { walls, order: wallsOrder };
}

function addOuterWalls(grid) {
  for (let i = 0; i < height; i++) {
    if (i == 0 || i == height - 1) {
      for (let j = 0; j < width; j++) {
        if (isStart(i, j, start) || isEnd(i, j, end)) {
          grid[i][j].isWall = true;
          walls[grid[i][j].name] = true;
          wallsOrder.push(grid[i][j]);
        }
      }
    } else {
      if (!isStart(i, 0, start) || !isEnd(i, 0, end)) {
        grid[i][0].isWall = true;
        walls[grid[i][0].name] = true;
        wallsOrder.push(grid[i][0]);
      }
      if (isStart(i, width - 1, start) || isEnd(i, width - 1, end)) {
        grid[i][width - 1].isWall = true;
        walls[grid[i][width - 1].name] = true;
        wallsOrder.push(grid[i][width - 1]);
      }
    }
  }
}

function addEntrance(grid) {
  let x = randomNumber(1, grid.length - 1);
  grid[grid.length - 1][x].entrance = true;
  return x;
}

function addInnerWalls(grid, h, minX, maxX, minY, maxY, gate) {
  if (h) {
    if (maxX - minX < 2) {
      return;
    }

    let x = Math.floor(randomNumber(minX, maxX) / 2) * 2;
    addHWall(grid, minY, maxY, x);

    addInnerWalls(grid, false, minX, x - 1, minY, maxY, gate);
    addInnerWalls(grid, false, x + 1, maxX, minY, maxY, gate);
  } else {
    if (maxY - minY < 2) {
      return;
    }

    let y = Math.floor(randomNumber(minY, maxY) / 2) * 2;
    addVWall(grid, minX, maxX, y);

    addInnerWalls(grid, true, minX, maxX, minY, y - 1, gate);
    addInnerWalls(grid, true, minX, maxX, y + 1, maxY, gate);
  }
}

function addHWall(grid, minY, maxY, y) {
  let hole = Math.floor(randomNumber(minY, maxY) / 2) * 2 + 1;

  for (let i = minY; i <= maxY; i++) {
    if (isStart(y, i, start) || isEnd(y, i, end)) return;
    if (i === hole) grid[y][i].isWall = false;
    else {
      grid[y][i].isWall = true;
      walls[grid[y][i].name] = true;
      wallsOrder.push(grid[y][i]);
    }
  }
}

function addVWall(grid, minxX, maxY, x) {
  let hole = Math.floor(randomNumber(minxX, maxY) / 2) * 2 + 1;

  for (let i = minxX; i <= maxY; i++) {
    if (isStart(i, x, start) || isEnd(i, x, end)) return;
    if (i === hole) grid[i][x].isWall = false;
    else {
      grid[i][x].isWall = true;
      walls[grid[i][x].name] = true;
      wallsOrder.push(grid[i][x]);
    }
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
