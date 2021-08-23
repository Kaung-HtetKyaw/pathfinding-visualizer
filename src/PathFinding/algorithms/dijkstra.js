import { isEnd, getFinalPath, getNeighbourNodes } from "./utils";
import BinaryHeap from "../DataStructure/BinaryHeap";

// see detail at my repo: https://github.com/Kaung-HtetKyaw/Algorithm-Javascript-Implementation
// this implementation uses Binary Heap for Priority Queue
let priorityQueue = new BinaryHeap((x) => x?.g); // binary heap as priority queue

export default function dijkstra(grid, start, end) {
  let startNode = grid[start.x][start.y];
  let openList = priorityQueue;
  let visitedList = [];
  openList.push(startNode);
  startNode.visited = true;
  let numNodes = 0; // num of nodes considered, not really important (for extra information)

  while (openList.size() > 0) {
    // get the shortest node from open list
    let currentNode = openList.pop();

    numNodes++;

    // if reach end
    if (isEnd(currentNode, end)) {
      console.log("Number of nodes considered: ", numNodes);
      return {
        path: getFinalPath(currentNode, grid, start),
        visitedNodes: visitedList,
      };
    }

    currentNode.closed = true;

    // get neighbour nodes
    let neighbours = getNeighbourNodes(grid, currentNode);
    let neighboursLength = neighbours.length;

    for (let x = 0; x < neighboursLength; x++) {
      let neighbour = neighbours[x];

      // continue to next neighbour if closed or wall
      if (neighbour.closed || neighbour.isWall) {
        continue;
      }
      // cur to neighbour cost from start node
      let currentG = currentNode.g + (currentNode.weights[neighbour.name] || 1);
      let visited = neighbour.visited;
      // for first time visiting or current g is smaller than the previous one
      if (!visited || currentG < neighbour.g) {
        neighbour.visited = true;
        neighbour.parent = { x: currentNode.x, y: currentNode.y };
        neighbour.g = currentG;

        if (!visited) {
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
  console.log("Number of nodes considered: ", numNodes);
  return { path: [], visitedNodes: visitedList };
}
