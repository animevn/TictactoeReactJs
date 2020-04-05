import React, {useContext} from "react";
import "./Home.css";
import {
  BoardContext,
  clearCells,
  makeMove,
  moveBack,
  moveFirst,
  moveLast,
  moveNext
} from "./HomeModel";

import HomeView from "./HomeView";

function Home() {
  const {setMyboard} = useContext(BoardContext);

  function reset() {
    setMyboard(clearCells());
  }

  function onClick(event) {
    const id = event.target.id;
    const row = id.substring(0, 1);
    const col = id.substring(1, 2);
    setMyboard(old=>makeMove(old, row, col));
  }

  function onMove(event) {
    const id = event.target.id;
    switch (id) {
      case "move-back":
        setMyboard(old=>moveBack(old));
        break;
      case "move-next":
        setMyboard(old=>moveNext(old));
        break;
      case "move-first":
        setMyboard(old=>moveFirst(old));
        break;
      case "move-last":
        setMyboard(old=>moveLast(old));
        break;
      default:
        break;
    }

  }

  return (
    <HomeView reset={reset} onClick={onClick} onMove={onMove}/>
  )
}

export default Home;