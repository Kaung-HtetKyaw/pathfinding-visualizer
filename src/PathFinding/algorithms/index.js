import dijkstra from "./dijkstra";
import a_star from "./a-star";
import BFS from "./BFS";
import GBFS from "./GBFS";
import DFS from "./DFS";

const ALGORITHMS = {
  Dijkstra: {
    name: "Dijkstra",
    about:
      "is a father of path-finding algorithms and guarantees the shortest path.",
    algorithm: dijkstra,
    weighted: true,
    shortest: true,
  },
  Astar: {
    name: "A*",
    about:
      "is arguably the best path-finding algorithm. It combines the pieces of information that Dijkstra’s Algorithm uses (favoring vertices that are close to the starting point) and heuristics(estimated distance from the node's current positon to goal). It is faster than Dijkstra and guarantees shortest path. ",
    algorithm: a_star,
    weighted: true,
    shortest: true,
  },
  BFS: {
    name: "Breadth First Search",
    about:
      "is a graph traversal algorithm that starts traversing the graph from root node and explores all the neighbouring nodes. It is slower than both Dijkstra and A* but guarantees shortest path. ",
    algorithm: BFS,
    weighted: false,
    shortest: true,
  },
  GBFS: {
    name: "Greedy Best First Search",
    about:
      "is like A* but it only uses heuristics to search to find the goal. It is faster than A*, Dijkstra, Breadth First Search but does not guarantee shortest path. ",
    algorithm: GBFS,
    weighted: true,
    shortest: false,
  },
  DFS: {
    name: "Depth First Search",
    about:
      " starts at the root node (selecting some arbitrary node as the root node in the case of a graph) and explores as far as possible along each branch before backtracking. It is slower than all of the above algorithms and does not guarantee shortest path. ",
    algorithm: DFS,
    weighted: false,
    shortest: false,
  },
};

export default ALGORITHMS;
