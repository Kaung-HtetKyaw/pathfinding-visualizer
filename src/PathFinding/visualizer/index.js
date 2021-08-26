import React, { useState, useEffect } from "react";
import Node from "./Node/index";
import { generateGrid } from "../algorithms/utils";
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Select,
} from "@chakra-ui/react";
import dijkstra from "../algorithms/dijkstra";
import a_star from "../algorithms/a-star";

const ROW = 20;
const COL = 50;
const ALGORITHMS = {
  Dijkstra: { about: "Dijkstra br nyar", algorithm: dijkstra },
  Astar: { about: "A * br nyar", algorithm: a_star },
};

const Visualizer = () => {
  let [grid, setGrid] = useState([]);
  let [algorithm, setAlgorithm] = useState("Dijkstra");
  let [isMousePressed, setIsMousePressed] = useState(false);
  let [isWPressed, setIsWPressed] = useState(false);
  let [isStartSelected, setIsStartSelected] = useState(false);
  let [isEndSelected, setIsEndSelected] = useState(false);
  let [isGridDirty, setIsGridDirty] = useState(false);
  let [start, setStart] = useState({ x: 10, y: 15 });
  let [end, setEnd] = useState({ x: 10, y: 30 });
  let [isVisualizing, setIsVisualizing] = useState(false);

  useEffect(() => {
    setGrid(generateGrid(ROW, COL, start, end));
  }, []);

  // wall constructing
  const handleMouseDown = (row, col, event) => {
    // when mouse is being pressed
    setIsMousePressed(true);
    toggleWall(row, col);
    toggleWeight(row, col, event);
  };
  const handleMouseUp = () => {
    // when release the mouse
    setIsMousePressed(false);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleWDown);
    return () => document.removeEventListener("keydown", handleWDown);
  }, []);

  useEffect(() => {
    document.addEventListener("keyup", handleWUp);
    return () => document.removeEventListener("keyup", handleWUp);
  }, []);

  const handleWDown = (e) => {
    if (e.key !== "w") return;
    setIsWPressed(true);
  };

  const handleWUp = (e) => {
    if (e.key !== "w") return;
    setIsWPressed(false);
  };

  const handleMouseEnter = (row, col, event) => {
    // when cursor hover the node
    // if being press, draw wall.
    // else do nothing
    if (!isMousePressed) return;
    toggleWall(row, col);
    toggleWeight(row, col, event);
  };

  const relocateStart = (row, col) => {
    setStart({ x: row, y: col });
    setIsStartSelected(false);
  };
  const relocateEnd = (row, col) => {
    setEnd({ x: row, y: col });
    setIsEndSelected(false);
  };

  const toggleSelectSpecialNode = (isStart, isEnd) => {
    if (isVisualizing) return;
    if (isStart) {
      setIsStartSelected((v) => !v);
      setIsEndSelected(false);
    }
    if (isEnd) {
      setIsStartSelected(false);
      setIsEndSelected((v) => !v);
    }
  };

  const [gridRerenderCount, setGridRerenderCount] = useState(false);
  const toggleWall = (row, col) => {
    // dont let us draw the wall, when grid is dirty
    if (isGridDirty) return;
    if (isVisualizing) return;
    if (isStartSelected || isEndSelected) return;
    if (isStart(row, col) || isEnd(row, col)) return;
    if (isWPressed) return;

    let node = grid[row][col];
    grid[row][col] = {
      ...node,
      isWall: !node.isWall,
    };
    forceUpdate();
  };

  const toggleWeight = (row, col, event) => {
    // dont let us draw the wall, when grid is dirty
    if (isGridDirty) return;
    if (isVisualizing) return;
    if (isStartSelected || isEndSelected) return;
    if (isStart(row, col) || isEnd(row, col)) return;
    if (!isWPressed) return;

    let node = grid[row][col];
    grid[row][col] = {
      ...node,
      weight: node.weight ? 0 : 5,
    };
    forceUpdate();
  };

  const forceUpdate = () => {
    // to force re-render when the grid item property change
    setGridRerenderCount((v) => ++v);
  };

  // visualizing
  const animate = ({ visitedNodes, path, closedNodes }) => {
    let length = closedNodes.length;
    setIsVisualizing(true);
    for (let i = 0; i < length; i++) {
      const node = closedNodes[i];
      const isEndNode = node.x === end.x && node.y === end.y;
      // draw path if reach end node
      if (isEndNode) {
        setTimeout(() => {
          drawPath(path);
        }, 20 * i);
        break;
      }
      // animate the visited nodes
      setTimeout(() => {
        // draw visited node
        document
          .getElementById(`node-${node.x}-${node.y}`)
          .classList.add("node-visited");
        // draw visited weight
        if (!!node.weight) {
          document
            .getElementById(`node-${node.x}-${node.y}`)
            .classList.add("node-weight-visited");
        }

        // show current node
        document
          .getElementById(`node-${node.x}-${node.y}`)
          .classList.add("node-shortest-path");
        setTimeout(() => {
          document
            .getElementById(`node-${node.x}-${node.y}`)
            .classList.remove("node-shortest-path");
        }, 30);
      }, 20 * i);
    }
  };

  const drawPath = (path) => {
    let pathLength = path.length;
    for (let i = 0; i < pathLength; i++) {
      let node = path[i];

      setTimeout(() => {
        if (i === pathLength - 1) {
          setIsVisualizing(false);
        }
        document
          .getElementById(`node-${node.x}-${node.y}`)
          .classList.add("node-shortest-path");
      }, 30 * i);
    }
  };

  const visualize = (newGrid = grid) => {
    const result = ALGORITHMS[algorithm].algorithm(newGrid, start, end);
    animate({
      visitedNodes: result.visitedNodes,
      path: result.path,
      closedNodes: result.closedNodes,
    });
    setIsGridDirty(true); //* this will force re-render
  };

  // recalculate path whenever start or end changes
  useEffect(() => {
    if (isGridDirty) {
      const newGrid = generateGrid(ROW, COL, start, end);
      visualize(newGrid);
    }
  }, [start, end]);

  const resetGrid = () => {
    setGrid(generateGrid(ROW, COL, start, end));
    // clean up grid
    setIsGridDirty(false);
    setIsMousePressed(false);
    setIsStartSelected(false);
    setIsEndSelected(false);
    setIsWPressed(false);
    setGridRerenderCount(0);
  };

  const isStart = (x, y) => start.x === x && start.y === y;
  const isEnd = (x, y) => end.x === x && end.y === y;

  const renderGrid = () => {
    return (
      <div className="grid" style={{ margin: 0 }}>
        {grid.map((row, rowIndex) => {
          return (
            <div style={{ margin: 0, height: "25px" }} key={`row-${rowIndex}`}>
              {row.map((node, nodeIndex) => {
                const { x, y, isWall, visited, name } = node;
                let isStart = start.x === x && start.y === y;
                let isEnd = end.x === x && end.y === y;
                let isWeight = !!node.weight;

                return (
                  <Node
                    key={`row-${rowIndex}-node-${nodeIndex}`}
                    x={x}
                    y={y}
                    start={start}
                    end={end}
                    name={name}
                    isWeight={isWeight}
                    isWall={isWall}
                    isStart={isStart}
                    isClosed={node.closed}
                    isEnd={isEnd}
                    visited={visited}
                    isGridDirty={isGridDirty}
                    isMousePressed={isMousePressed}
                    isStartSelected={isStartSelected}
                    isEndSelected={isEndSelected}
                    toggleSpecialNode={toggleSelectSpecialNode}
                    relocateStart={relocateStart}
                    relocateEnd={relocateEnd}
                    handleMouseUp={handleMouseUp}
                    handleMouseDown={(e) => handleMouseDown(x, y, e)}
                    handleMouseEnter={(e) => handleMouseEnter(x, y, e)}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <Container
      px={0}
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      maxW="100%"
      minH="100vh"
    >
      <Button onClick={() => visualize()} colorScheme="teal">
        Visualize {algorithm}
      </Button>
      <Button onClick={resetGrid} colorScheme="pink">
        Reset Grid
      </Button>

      <Select
        onChange={(e) => setAlgorithm(e.target.value)}
        width="200px"
        defaultValue={algorithm}
        colorScheme="teal"
      >
        {Object.keys(ALGORITHMS).map((el) => (
          <option key={el} value={el}>
            {el}
          </option>
        ))}
      </Select>

      <Center
        cursor={`url(${
          isStartSelected
            ? "/triangle-right.svg"
            : isEndSelected
            ? "/circle.svg"
            : ""
        }),auto`}
        my="5"
      >
        {renderGrid()}
      </Center>
    </Container>
  );
};

export default Visualizer;
