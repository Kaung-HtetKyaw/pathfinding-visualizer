import { getFinalPath, getNeighbourNodes } from "./utils";

export default function depth_first_search(grid, start, end, walls) {
  let startNode = grid[start.x][start.y];
  let visitedList = [];
  let closedList = [];
  let openList = [startNode];
  startNode.visited = true;
  visitedList.push(startNode);
  let numNodes = 0; // num of nodes considered, not really important (for extra information)

  while (Object.keys(openList).length > 0) {
    // get the first item
    let currentNode = openList.pop();

    currentNode.closed = true;
    closedList.push(currentNode);

    currentNode.visited = true;
    visitedList.push(currentNode);

    numNodes++;
    // reach end
    if (currentNode.x === end.x && currentNode.y === end.y) {
      let path = getFinalPath(currentNode, grid, start);
      console.log("Number of nodes considered: ", numNodes);
      return {
        path,
        visitedNodes: visitedList,
        closedNodes: closedList,
      };
    }

    let neighbours = getNeighbourNodes(grid, currentNode, walls, true);
    let neighbourLength = neighbours.length;

    for (let x = 0; x < neighbourLength; x++) {
      let neighbour = neighbours[x];

      // if neighbour is already considered or wall, continue to next neighbour
      if (neighbour.closed || walls[neighbour.name]) {
        continue;
      }
      // if the neighbour is visited very first time
      if (!neighbour.visited) {
        neighbour.parent = { x: currentNode.x, y: currentNode.y };
        openList.push(neighbour);
      }
    }
  }
  return {
    path: [],
    visitedNodes: visitedList,
    closedNodes: closedList,
  };
}
