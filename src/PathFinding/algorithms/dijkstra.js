import { isEnd, getFinalPath, getNeighbourNodes } from "./utils";
import BinaryHeap from "../DataStructure/BinaryHeap";

// following implementation is mixed with a little bit of UI logic
// visitedNodesOrder and shortestNodesOrder are for UI purposes
// see original impelementation at my repo: https://github.com/Kaung-HtetKyaw/Algorithm-Javascript-Implementation
// this implementation uses Binary Heap for Priority Queue
let priorityQueue = new BinaryHeap((x) => x?.g); // binary heap as priority queue

// will reset the node if the grid is used more than once
export default function dijkstra(grid, start, end, walls = {}, weights = {}) {
  let startNode = grid[start.x][start.y];

  let openList = priorityQueue;
  let visitedList = [];
  let closedList = [];
  let numNodes = 0; // num of nodes considered, not really important (for extra information)
  // push to the queue,  add to visited list

  openList.push(startNode);
  startNode.visited = true;
  visitedList.push(startNode);

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
    let neighbours = getNeighbourNodes(
      grid,
      currentNode,
      walls[currentNode.name]
    );
    let neighboursLength = neighbours.length;

    for (let x = 0; x < neighboursLength; x++) {
      let neighbour = neighbours[x];

      // continue to next neighbour if closed or wall
      if (neighbour.closed || walls[neighbour.name]) {
        continue;
      }
      // cur to neighbour cost from start node
      let currentG = currentNode.g + (weights[neighbour.name] ? 15 : 1);
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
  console.log("exhausted");
  return {
    path: [],
    visitedNodes: visitedList,
    closedNodes: closedList,
  };
}

// function addToVisitedList(visitedList, node) {
//   visitedList[node.name] = { node, order: visitedNodesCount };
//   visitedNodesCount++;
// }
