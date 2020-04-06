import React, {useContext} from "react";
import "./Home.css";
import {BoardContext} from "./HomeModel";
import HomeView from "./HomeView";

function Home() {
  const {moveBack, moveNext, moveFirst, moveLast,
    clearCells, makeMove} = useContext(BoardContext);

  function reset() {
    clearCells();
  }

  function onClick(event) {
    const id = event.target.id;
    const row = id.substring(0, 1);
    const col = id.substring(1, 2);
    makeMove(row, col);
  }

  function onMove(event) {
    const id = event.target.id;
    switch (id) {
      case "move-back":
        moveBack();
        break;
      case "move-next":
        moveNext();
        break;
      case "move-first":
        moveFirst();
        break;
      case "move-last":
        moveLast();
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