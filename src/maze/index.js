import randomMaze from "./randomMaze";
import recursive_division from "./recursive-division";
import stairCase from "./stairCase";
import randomWeightMaze from "./randomWeight";

const MAZES = {
  Random: {
    name: "Basic Random Maze",
    algorithm: randomMaze,
    about: "blah blah",
  },
  Stair: {
    algorithm: stairCase,
    name: "Simple Stair Pattern",
    about: "blah blah",
  },
  Recursive_Division: {
    name: "Recursive Division",
    algorithm: recursive_division,
    about: "blah blah",
  },
  WeightMaze: {
    name: "Basic Weight Maze",
    algorithm: randomWeightMaze,
    about: "blah blah",
  },
};

export default MAZES;
