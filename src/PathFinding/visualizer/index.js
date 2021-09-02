import React, { useState, useEffect } from "react";
import Node from "./Node/index";
import { generateGrid, randomInteger } from "../algorithms/utils";
import { Center, Container, useForceUpdate } from "@chakra-ui/react";
import Header from "../../common/components/Header";
import Glossary from "../../common/components/Glossary";
import { SPEED } from "../../utils/constants";
import ALGORITHMS from "../algorithms";
import MAZES from "../../maze";
import startNodeImg from "../../images/triangle-right.svg";
import endNodeImg from "../../images/circle.svg";

const Visualizer = () => {
  const forceUpdate = useForceUpdate();

  let [COL, setROW] = useState(0);
  let [ROW, setCOL] = useState(0);
  let [grid, setGrid] = useState([]);
  let [walls, setWalls] = useState({});
  let [weights, setWeights] = useState({});
  let [algorithm, setAlgorithm] = useState("Dijkstra");
  let [maze, setMaze] = useState("Random");
  let [speed, setSpeed] = useState("Normal");
  let [isMousePressed, setIsMousePressed] = useState(false);
  let [isWPressed, setIsWPressed] = useState(false);
  let [isStartSelected, setIsStartSelected] = useState(false);
  let [isEndSelected, setIsEndSelected] = useState(false);
  let [isGridDirty, setIsGridDirty] = useState(false);
  let [start, setStart] = useState({ x: 0, y: 0 });
  let [end, setEnd] = useState({ x: 5, y: 5 });
  let [animating, setAnimating] = useState(false);

  useEffect(() => {
    let width = window.innerWidth;
    let percentage = width <= 400 ? 0.8 : 0.9;
    let col = Math.round((width * percentage) / 25);
    let row = 20;
    let startNode = {
      x: randomInteger(0, row / 2),
      y: randomInteger(0, col / 2),
    };
    let endNode = {
      x: randomInteger(0, row - 1),
      y: randomInteger(0, col - 1),
    };

    setROW(row);
    setCOL(col);
    setStart(startNode);
    setEnd(endNode);
    setGrid(generateGrid(row, col, startNode, endNode));
  }, []);

  // wall constructing
  const handleMouseDown = (row, col, event) => {
    if (animating) return;
    // when mouse is being pressed
    setIsMousePressed(true);
    toggleWall(row, col);
    toggleWeight(row, col, event);
  };
  const handleMouseUp = () => {
    if (animating) return;
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
    if (animating) return;
    if (e.key !== "w") return;
    setIsWPressed(true);
  };

  const handleWUp = (e) => {
    if (animating) return;
    if (e.key !== "w") return;
    setIsWPressed(false);
  };

  const handleMouseEnter = (row, col, event) => {
    if (animating) return;
    // when cursor hover the node
    // if being press, draw wall.
    // else do nothing
    if (!isMousePressed) return;
    toggleWall(row, col);
    toggleWeight(row, col, event);
  };

  const relocateStart = (row, col) => {
    if (animating) return;
    setStart({ x: row, y: col });
    setIsStartSelected(false);
  };
  const relocateEnd = (row, col) => {
    if (animating) return;
    setEnd({ x: row, y: col });
    setIsEndSelected(false);
  };

  const toggleSelectSpecialNode = (isStart, isEnd) => {
    if (animating) return;
    if (isStart) {
      setIsStartSelected((v) => !v);
      setIsEndSelected(false);
    }
    if (isEnd) {
      setIsStartSelected(false);
      setIsEndSelected((v) => !v);
    }
  };

  const toggleWall = (row, col) => {
    // dont let us draw the wall, when grid is dirty
    if (isGridDirty) return;
    if (animating) return;
    if (isStartSelected || isEndSelected) return;
    if (isStart(row, col) || isEnd(row, col)) return;
    if (isWPressed) return;

    let node = grid[row][col];

    walls[node.name] = !walls[node.name] || undefined;

    forceUpdate();
  };

  const toggleWeight = (row, col, event) => {
    // dont let us draw the wall, when grid is dirty
    if (isGridDirty) return;
    if (animating) return;
    if (isStartSelected || isEndSelected) return;
    if (isStart(row, col) || isEnd(row, col)) return;
    if (!isWPressed) return;
    if (!ALGORITHMS[algorithm].weighted) return;

    let node = grid[row][col];
    weights[node.name] = !weights[node.name] || 0;
    forceUpdate();
  };

  // visualizing
  const animatePathFind = ({ visitedNodes, path, closedNodes }) => {
    let length = closedNodes.length;
    setAnimating(true);
    for (let i = 0; i < length; i++) {
      const node = closedNodes[i];
      const isEndNode = node.x === end.x && node.y === end.y;
      // if reach end but there is no shortest path
      if (i === length - 1) {
        setAnimating(false);
      }
      // draw path if reach end node
      if (isEndNode) {
        setTimeout(() => {
          drawPath(path);
        }, SPEED[speed] * i);
        break;
      }
      // animate the visited nodes
      setTimeout(() => {
        // draw visited node
        document
          .getElementById(`node-${node.x}-${node.y}`)
          .classList.add("node-visited");
        // draw visited weight
        if (weights[node.name]) {
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
      }, SPEED[speed] * i);
    }
  };

  const drawPath = (path) => {
    let pathLength = path.length;
    for (let i = 0; i < pathLength; i++) {
      let node = path[i];

      setTimeout(() => {
        if (i === pathLength - 1) {
          setAnimating(false);
        }
        if (weights[node.name]) {
          document
            .getElementById(`node-${node.x}-${node.y}`)
            .classList.add("node-weight-shortest-path");
          document
            .getElementById(`node-${node.x}-${node.y}`)
            .classList.add("node-shortest-path");
        } else {
          document
            .getElementById(`node-${node.x}-${node.y}`)
            .classList.add("node-shortest-path");
        }
      }, 30 * i);
    }
  };

  const visualize = () => {
    if (animating) return;
    let newGrid = grid;
    if (isGridDirty) {
      newGrid = generateGrid(ROW, COL, start, end);
      setIsGridDirty(false);
      setGrid(newGrid);
    }

    const result = ALGORITHMS[algorithm].algorithm(
      newGrid,
      start,
      end,
      walls,
      weights
    );

    animatePathFind({
      visitedNodes: result.visitedNodes,
      path: result.path,
      closedNodes: result.closedNodes,
    });
    setIsGridDirty(true); //* this will force re-render
  };

  const animateWalls = (wallsOrder, walls) => {
    let length = wallsOrder.length;
    for (let i = 0; i < length; i++) {
      let node = wallsOrder[i];
      setTimeout(() => {
        if (i === length - 1) {
          setAnimating(false);
          if (maze === "WeightMaze") {
            setWeights(walls);
          } else {
            setWalls(walls);
          }
        }
        if (maze === "WeightMaze") {
          document
            .getElementById(`node-${node.x}-${node.y}`)
            .classList.add("node-weight");
        } else {
          document
            .getElementById(`node-${node.x}-${node.y}`)
            .classList.add("node-wall");
        }
      }, SPEED[speed] * i);
    }
  };

  const generateMaze = () => {
    if (animating) return;
    // dont allow to generate weight maze if algorithm is unweighted
    if (!ALGORITHMS[algorithm].weighted && maze === "WeightMaze") return;
    let newGrid = grid;
    setWalls({});
    setAnimating(true);
    if (isGridDirty) {
      newGrid = generateGrid(ROW, COL, start, end);
      setGrid(newGrid);
    }
    const walls = MAZES[maze].algorithm(newGrid, start, end);
    animateWalls(walls.order, walls.walls);
  };

  // recalculate path whenever start or end changes
  useEffect(() => {
    if (isGridDirty) {
      setIsGridDirty(false);
      // const newGrid = generateGrid(ROW, COL, start, end);
      visualize();
    }
  }, [start, end]);

  const resetGrid = () => {
    if (animating) return;
    setWalls({});
    setWeights({});
    setGrid(generateGrid(ROW, COL, start, end));
    // clean up grid
    setIsGridDirty(false);
    setIsMousePressed(false);
    setIsStartSelected(false);
    setIsEndSelected(false);
    setIsWPressed(false);
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
                const { x, y, visited, name } = node;
                let isStart = start.x === x && start.y === y;
                let isEnd = end.x === x && end.y === y;
                let isWeight = weights[node.name];
                let isWall = walls[node.name];

                return (
                  <Node
                    key={`row-${rowIndex}-node-${nodeIndex}`}
                    x={x}
                    y={y}
                    start={start}
                    end={end}
                    grid={grid}
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
      <Header
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        maze={maze}
        setMaze={setMaze}
        speed={speed}
        setSpeed={setSpeed}
        animating={animating}
        visualize={visualize}
        generateMaze={generateMaze}
        clearBoard={resetGrid}
      />

      <Glossary algorithm={algorithm} />

      <Center
        cursor={`url(${
          isStartSelected ? startNodeImg : isEndSelected ? endNodeImg : ""
        }),auto`}
        my="5"
      >
        {renderGrid()}
      </Center>
    </Container>
  );
};

export default Visualizer;
