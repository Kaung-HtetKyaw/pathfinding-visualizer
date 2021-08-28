import dijkstra from "./dijkstra";
import a_star from "./a-star";
import BFS from "./BFS";
import GBFS from "./GBFS";
import DFS from "./DFS";

const ALGORITHMS = {
  Dijkstra: {
    name: "Dijkstra",
    about: "blah blah",
    algorithm: dijkstra,
    weighted: true,
  },
  Astar: {
    name: "A*",
    about: "blah blah",
    algorithm: a_star,
    weighted: true,
  },
  BFS: {
    name: "Breadth First Search",
    about: "blah blah",
    algorithm: BFS,
    weighted: false,
  },
  GBFS: {
    name: "Greedy Best First Search",
    about: "blah blah",
    algorithm: GBFS,
    weighted: true,
  },
  DFS: {
    name: "Depth First Search",
    about: "blah blah",
    algorithm: DFS,
    weighted: false,
  },
};

export default ALGORITHMS;
