import dijkstra from "./dijkstra";
import a_star from "./a-star";

const ALGORITHMS = {
  Dijkstra: {
    name: "Dijkstra",
    about: "blah blah",
    algorithm: dijkstra,
  },
  Astar: {
    name: "A*",
    about: "blah blah",
    algorithm: a_star,
  },
};

export default ALGORITHMS;
