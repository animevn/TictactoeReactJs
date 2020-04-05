import React, {useContext} from "react";
import "./Home.css";
import {BoardContext, clearCells, makeMove} from "./HomeModel";
import HomeView from "./HomeView";

function Home() {
  const {setMyboard} = useContext(BoardContext);

  function reset() {
    setMyboard(old=>clearCells(old));
  }

  function onClick(event) {
    const id = event.target.id;
    const row = id.substring(0, 1);
    const col = id.substring(1, 2);
    setMyboard(old=>makeMove(old, row, col));
  }

  return (
    <HomeView reset={reset} onClick={onClick}/>
  )
}

export default Home;