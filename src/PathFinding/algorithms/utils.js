// normalize 2D array to 2D with nodes returned from normalizeNode
import { convertXYToName } from "../../utils/utils";
export function generateGrid(row, column, start, end, weighted = false) {
  let outerArr = [];

  for (let x = 0; x < row; x++) {
    let xLength = column;
    let innerArr = [];
    for (let y = 0; y < xLength; y++) {
      innerArr.push(generateNode(1, x, y, start, end));
    }
    outerArr.push(innerArr);
  }
  // set weights
  if (weighted) setCosts(outerArr, weighted);

  return outerArr;
}

export function generateNode(value, x, y, start, end) {
  return {
    x,
    y,
    visited: false,
    closed: false,
    value: value,
    parent: null,
    f: 0,
    g: 0,
    h: 0,
    name: convertXYToName(x, y),
    weight: 0,
  };
}

// set the costs of all nodes to their respective neighbours
export function setCosts(inputGrid, weighted = false) {
  let length = inputGrid.length;
  for (let x = 0; x < length; x++) {
    let xLength = inputGrid[x].length;

    for (let y = 0; y < xLength; y++) {
      let node = inputGrid[x][y];
      this.setCostsToNeighbours(inputGrid, node, weighted);
    }
  }
}

// set the cost of a node to their neighbour
// 1, if not weighted,i.e, uniform movement costs
// random num between 1 and 5, if weighted
export function setCostsToNeighbours(grid, currentNode, weighted = false) {
  if (currentNode.value === 0) {
    return;
  }
  // get neighbours
  let neighbours = this.getNeighbourNodes(grid, currentNode);
  let neighbourLength = neighbours.length;
  // for each neighbour
  // if neighbour has [currentNode.name] as key in weights, add [neighbour.name]=that weight to currentNode weights
  // if not, generate random num and add [neighbour.name]=random num
  for (let i = 0; i < neighbourLength; i++) {
    let neighbour = neighbours[i];

    // if not weighted, set uniform movement cost
    if (!weighted) {
      currentNode.weights[neighbour.name] = 1;
    } else {
      // if weighted
      let weightToCur = neighbour.weights[currentNode.name];
      // if weighted and neighbour already has cost
      if (weightToCur) {
        currentNode.weights[neighbour.name] = weightToCur;
      } else {
        // weighted but neighbour doesnt have cost
        currentNode.weights[neighbour.name] = this.randomInteger(1, 5);
      }
    }
  }
}

export function getNeighbourNodes(grid, currentNode, isWall) {
  let { x, y } = currentNode;
  let dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
    // [-1, 1],
    // [1, 1],
    // [1, -1],
    // [-1, -1],
  ];
  let result = [];
  // get valid non-wall nodes
  for (let i = 0; i < dirs.length; i++) {
    let dir = dirs[i];
    let direction = Math.abs(dir[0] + dir[1]);
    let xGrid = grid[x + dir[0]];
    let neighbour = xGrid ? xGrid[y + dir[1]] : undefined;

    if (neighbour && !isWall) {
      // if the neighbour is diagonal and unvisited, add extra 0.414
      if (direction === 2) {
        neighbour.diagonal = true;
      }
      result.push(neighbour);
    }
  }

  // if (grid[x - 1] && grid[x - 1][y] && !grid[x - 1][y].isWall) {
  //   result.push(grid[x - 1][y]);
  // }
  // if (grid[x + 1] && grid[x + 1][y] && !grid[x + 1][y].isWall) {
  //   result.push(grid[x + 1][y]);
  // }
  // if (grid[x][y - 1] && grid[x][y - 1] && !grid[x][y - 1].isWall) {
  //   result.push(grid[x][y - 1]);
  // }
  // if (grid[x][y + 1] && grid[x][y + 1] && !grid[x][y + 1].isWall) {
  //   result.push(grid[x][y + 1]);
  // }
  return result;
}

export function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// will normally return []
// but, i need low time complexity so i return object, cuz it's O(1) for accessing the node by name
// downside of this is losing insertion order
// but i mimic the insertion order by adding index property to each node
export function getFinalPath(node, grid, start) {
  let result = [];

  let startNode = grid[start.x][start.y];

  let cur = node;
  while (cur.parent) {
    result.push(cur);

    let { x, y } = cur.parent;
    cur = grid[x][y];
  }
  result.push(startNode);

  return result.reverse();
}

export function isEnd(currentNode, end) {
  let { x: curX, y: curY } = currentNode;
  let { x, y } = end;
  return curX === x && curY === y;
}

export const resetNodeIfDirty = (node, prevVisited, curVisited) => {
  const { name } = node;
  //reset if not visited for cur search yet, but visited last search
  let isInPrev = prevVisited[name] !== undefined;
  let isInCur = curVisited[name] !== undefined;
  if ((isInPrev && !isInCur) || (!isInPrev && !isInCur)) {
    node.g = 0;
    node.f = 0;
    node.visited = false;
    node.closed = false;
    node.parent = null;
  }
  return node;
};
