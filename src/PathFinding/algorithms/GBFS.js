import { manhattan_h } from "./heuristics";
import { isEnd, getFinalPath, getNeighbourNodes } from "./utils";

// object is used for openList because when removing an item , it's time complexity is O(1)
export default function greedy_best_first_search(
  grid,
  start,
  end,
  walls,
  weights,
  heuristics = manhattan_h
) {
  let startNode = grid[start.x][start.y];
  let visitedList = [];
  let closedList = [];
  let openList = { [startNode.name]: startNode };
  startNode.visited = true;
  visitedList.push(startNode);

  let numNodes = 0; // num of nodes considered, not really important (for extra information)

  while (Object.keys(openList).length > 0) {
    // get the shortest node from open list
    let currentNode = getShortestNode(openList);
    closedList.push(currentNode);
    numNodes++;
    // if reach end
    if (isEnd(currentNode, end)) {
      let path = getFinalPath(currentNode, grid, start);
      console.log("Number of nodes considered: ", numNodes);
      return { path, closedNodes: closedList, visitedNodes: visitedList };
    }

    // remove curretNode from openlist and set the flag to closed cuz currentNode is already considered
    delete openList[currentNode.name];
    currentNode.closed = true;

    // get neighbour nodes
    let neighbours = getNeighbourNodes(grid, currentNode, walls);
    let neighboursLength = neighbours.length;

    for (let x = 0; x < neighboursLength; x++) {
      let neighbour = neighbours[x];
      // continue to next neighbour if closed or wall
      if (neighbour.closed || walls[neighbour.name]) {
        continue;
      }
      let currentH =
        heuristics(neighbour, end) + (weights[neighbour.name] ? 15 : 0);

      // for first time visiting, there is no previous g so current g will be the best
      if (!neighbour.visited || currentH < neighbour.h) {
        neighbour.parent = { x: currentNode.x, y: currentNode.y };
        neighbour.h = currentH;

        if (!neighbour.visited) {
          neighbour.visited = true;
          openList[neighbour.name] = neighbour;
          visitedList.push(neighbour);
        }
      }
    }
  }
  // return empty array if there is no path
  return { path: [], closedNodes: closedList, visitedNodes: visitedList };
}

function getShortestNode(openList) {
  let shortest = null;
  for (let node in openList) {
    let isCurrentShortest =
      shortest === null || openList[node].h < openList[shortest].h;
    if (isCurrentShortest) {
      shortest = node;
    }
  }
  return openList[shortest];
}
