import React, { useState, useEffect } from "react";
import Node from "./Node/index";
import { generateGrid } from "../algorithms/utils";
import { Button, Center, Container, Heading } from "@chakra-ui/react";
import dijkstra from "../algorithms/dijkstra";

const Visualizer = () => {
  let [grid, setGrid] = useState([]);
  let [isMousePressed, setIsMousePressed] = useState(false);
  let [isGridDirty, setIsGridDirty] = useState(false);
  let [start, setStart] = useState({ x: 10, y: 15 });
  let [end, setEnd] = useState({ x: 19, y: 49 });

  useEffect(() => {
    setGrid(generateGrid(20, 50, start, end));
  }, []);

  // wall constructing
  const handleMouseDown = (row, col) => {
    // when mouse is being pressed
    setIsMousePressed(true);
    toggleWall(row, col);
  };
  const handleMouseUp = () => {
    // when release the mouse
    setIsMousePressed(false);
  };

  const handleMouseEnter = (row, col) => {
    // when cursor hover the node
    // if being press, draw wll.
    // else do nothing
    if (!isMousePressed) return;
    toggleWall(row, col);
  };

  const toggleWall = (row, col) => {
    let newGrid = grid.slice();
    let node = newGrid[row][col];
    newGrid[row][col] = {
      ...node,
      isWall: !node.isWall,
    };
    setGrid(newGrid);
  };

  // visualizing
  const animate = ({ path, visitedNodes }) => {
    let visitedLength = visitedNodes.length;
    for (let i = 0; i < visitedLength; i++) {
      const node = visitedNodes[i];
      const isEndNode = node.x === end.x && node.y === end.y;
      // draw path if reach end node
      if (isEndNode) {
        setTimeout(() => {
          drawPath(path);
        }, 10 * i);
        break;
      }
      // animate the visited nodes
      animateVisitedNodes(i, visitedNodes);
    }
  };

  const drawPath = (path) => {
    let pathLength = path.length;
    for (let i = 0; i < pathLength; i++) {
      setTimeout(() => {
        const node = path[i];
        // needs refactor
        document
          .getElementById(`node-${node.x}-${node.y}`)
          .classList.add("node-shortest-path");
      }, 20 * i);
    }
  };
  const animateVisitedNodes = (index, visitedNodes) => {
    setTimeout(() => {
      const node = visitedNodes[index];
      // needs refactor
      document
        .getElementById(`node-${node.x}-${node.y}`)
        .classList.add("node-visited");
    }, 10 * index);
  };

  const visualize = () => {
    const result = dijkstra(grid, start, end);
    setIsGridDirty(true); //* this will force re-render
    console.log(result.path);
    animate(result);
  };

  const resetGrid = () => {
    setGrid(generateGrid(20, 50, start, end));
    // clean up grid
    setIsGridDirty(false);
  };

  const renderGrid = () => {
    return (
      <div className="grid" style={{ margin: 0 }}>
        {grid.map((row, rowIndex) => {
          return (
            <div style={{ margin: 0, height: "25px" }} key={`row-${rowIndex}`}>
              {row.map((node, nodeIndex) => {
                const { x, y, isEnd, isStart, isWall, visited } = node;
                return (
                  <Node
                    key={`row-${rowIndex}-node-${nodeIndex}`}
                    x={x}
                    y={y}
                    isEnd={isEnd}
                    isStart={isStart}
                    isWall={isWall}
                    visited={visited}
                    isGridDirty={isGridDirty}
                    isMousePressed={isMousePressed}
                    handleMouseUp={handleMouseUp}
                    handleMouseDown={() => handleMouseDown(x, y)}
                    handleMouseEnter={() => handleMouseEnter(x, y)}
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
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      maxW="100%"
      minH="100vh"
    >
      <Button onClick={visualize} colorScheme="teal">
        Visualize
      </Button>
      <Button onClick={resetGrid} colorScheme="pink">
        Reset Grid
      </Button>

      <Center my="20">{renderGrid()}</Center>
    </Container>
  );
};

export default Visualizer;
