import React, { useEffect, createRef, useState } from "react";

import "./node.css";

const Node = ({
  y,
  name,
  isStart,
  isEnd,
  isWall,
  isWeight,
  isClosed,
  x,
  start,
  end,
  visited,
  isGridDirty,
  isStartSelected,
  isEndSelected,
  isMousePressed,
  handleMouseUp,
  handleMouseDown,
  handleMouseEnter,
  toggleSpecialNode,
  relocateStart,
  relocateEnd,
}) => {
  const ref = createRef();
  let [debouncedDirty, setDebouncedDirty] = useState(false);

  let extraClassName = isEnd
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : isWeight
    ? "node-weight"
    : "";
  let [animationClassName, setAnimationClassName] = useState("");

  // useEffect(() => {
  //   if (!isGridDirty) {
  //     setAnimationClassName("");
  //   }
  //   if (isGridDirty && (isStartPressed || isEndPressed)) {
  //     if (isInShortest !== undefined) {
  //       setAnimationClassName("node-shortest-path-no-ani");
  //       return;
  //     }
  //     if (isInVisited !== undefined) {
  //       setAnimationClassName("node-visited-no-ani");
  //       return;
  //     }
  //     setAnimationClassName("");
  //   }
  // }, [isInShortest, isInVisited]);

  useEffect(() => {
    if (ref.current) {
      ref.current.classList.remove("node-visited");
      ref.current.classList.remove("node-visited-no-ani");
      ref.current.classList.remove("node-shortest-path");
      ref.current.classList.remove("node-shortest-path-no-ani");
      ref.current.classList.remove("node-weight-visited");
    }
  }, [start, end, isGridDirty, visited]);

  const onNodeClick = () => {
    if (isStart || isEnd) {
      toggleSpecialNode(isStart, isEnd);
    } else {
      if (isStartSelected) {
        relocateStart(x, y);
      }
      if (isEndSelected) {
        relocateEnd(x, y);
      }
    }
  };

  return (
    <div
      style={{
        margin: 0,
        width: "25px",
        height: "25px",
        display: "inline-block",
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onClick={onNodeClick}
    >
      <div
        ref={ref}
        id={`node-${x}-${y}`}
        className={`node ${extraClassName} ${animationClassName}`}
      ></div>
    </div>
  );
};

export default React.memo(Node);
