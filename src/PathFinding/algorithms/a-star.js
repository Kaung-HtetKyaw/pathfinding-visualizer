import BinaryHeap from "../DataStructure/BinaryHeap";
import { getFinalPath, getNeighbourNodes, isEnd } from "./utils";

const priorityQueue = new BinaryHeap((x) => x?.f);
export default function a_star(
  grid,
  start,
  end,
  walls = {},
  weights = {},
  heuristics = manhattan_h
) {
  let startNode = grid[start.x][start.y];
  let openList = priorityQueue;
  let visitedList = [];
  let closedList = [];
  // push to the queue,  add to visited list
  openList.push(startNode);
  startNode.visited = true;
  visitedList.push(startNode);
  let numNodes = 0; // num of nodes considered, not really important (for extra information)

  while (openList.size() > 0) {
    // get the shortest node from open list
    let currentNode = openList.pop();
    closedList.push(currentNode);
    numNodes++;
    // if reach end
    if (isEnd(currentNode, end)) {
      const path = getFinalPath(currentNode, grid, start);
      console.log("considered nodes: ", numNodes);
      return {
        path,
        visitedNodes: visitedList,
        closedNodes: closedList,
      };
    }

    currentNode.closed = true;

    // get neighbour nodes
    let neighbours = getNeighbourNodes(grid, currentNode, walls);
    let neighboursLength = neighbours.length;
    // console.log("current: ", { x: currentNode.x, y: currentNode.y });
    for (let x = 0; x < neighboursLength; x++) {
      let neighbour = neighbours[x];

      // continue to next neighbour if closed or wall
      if (neighbour.closed || walls[neighbour.name]) {
        continue;
      }
      // cur to neighbour cost from start node
      let currentG = currentNode.g + (weights[neighbour.name] ? 15 : 1);
      let visited = neighbour.visited;
      // for first time visiting, there is no previous g so current g will be the best
      if (!visited || currentG < neighbour.g) {
        neighbour.parent = { x: currentNode.x, y: currentNode.y };
        neighbour.h = neighbour.h || Math.pow(heuristics(neighbour, end), 1.1);
        neighbour.g = currentG;
        neighbour.f = neighbour.g + neighbour.h;

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

  return { path: [], visitedNodes: visitedList, closedNodes: closedList };
}

function manhattan_h(node, end) {
  let D = 1;
  let d1 = Math.abs(node.x - end.x);
  let d2 = Math.abs(node.y - end.y);
  return D * (d1 + d2);
}
