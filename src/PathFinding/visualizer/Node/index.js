import React, { useEffect, createRef } from "react";

import "./node.css";

const Node = ({
  y,
  isEnd,
  isStart,
  isWall,
  x,
  visited,
  isGridDirty,
  handleMouseUp,
  handleMouseDown,
  handleMouseEnter,
}) => {
  const ref = createRef();

  let extraClassName = isEnd
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : "";

  useEffect(() => {
    if (ref.current) {
      if (!isGridDirty) {
        ref.current.classList.remove("node-visited");
        ref.current.classList.remove("node-shortest-path");
      }
    }
  }, [isGridDirty]);

  return (
    <div
      style={{ margin: 0 }}
      ref={ref}
      id={`node-${x}-${y}`}
      className={`node ${extraClassName}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
    ></div>
  );
};

export default Node;
