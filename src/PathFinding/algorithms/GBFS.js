import { manhattan_h } from "./heuristics";
import { isEnd, getFinalPath, getNeighbourNodes } from "./utils";
import BinaryHeap from "../DataStructure/BinaryHeap";

// object is used for openList because when removing an item , it's time complexity is O(1)
let priorityQueue = new BinaryHeap((x) => x?.h);
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
  let openList = priorityQueue;
  openList.push(startNode);
  startNode.visited = true;
  visitedList.push(startNode);

  let numNodes = 0; // num of nodes considered, not really important (for extra information)

  while (openList.size() > 0) {
    // get the shortest node from open list
    let currentNode = openList.pop();
    closedList.push(currentNode);
    currentNode.closed = true;
    numNodes++;
    // if reach end
    if (isEnd(currentNode, end)) {
      let path = getFinalPath(currentNode, grid, start);
      console.log("Number of nodes considered: ", numNodes);
      return { path, closedNodes: closedList, visitedNodes: visitedList };
    }

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
      let visited = neighbour.visited;

      // for first time visiting or current g is smaller than the previous one
      if (!visited || currentH < neighbour.h) {
        neighbour.parent = { x: currentNode.x, y: currentNode.y };
        neighbour.h = currentH;

        if (!visited) {
          neighbour.visited = true;
          openList.push(neighbour);
          visitedList.push(neighbour);
        } else {
          // already visited the node, but this time it got smaller g value than the previous one
          // so we need to reorder the node in priorityQueue
          openList.reorderNode(neighbour);
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
