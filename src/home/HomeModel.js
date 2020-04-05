import React, {createContext, useState} from "react";

export const BoardContext = createContext(null);

export const initialBoard = [["", "", ""], ["", "", ""], ["", "", ""]];

const players = {
  X: "X",
  O: "O"
};

const states = {
  progress:"In Progress",
  finish: "Has Result",
  draw: "Draw"
};

const game = {
  moveList:[],
  currentMove:0,
  row:null,
  col:null,
  state:null
};

const board = {
  gameboard:initialBoard,
  winner:null,
  currentPlayer:players.X,
  state:states.progress,
  currentGame:game
};

export const inform = (board)=>{
  if (board.state === states.progress){
    return `${board.currentPlayer} to play`
  }else if (board.state === states.draw){
    return "Game Draws!!!"
  }else if (board.state === states.finish){
    return `${board.currentPlayer} wins!!!`
  }
  return "";
};

export const BoardContextProvider = ({children})=>{
  const [myboard, setMyboard] = useState(board);
  return (
    <BoardContext.Provider value={{myboard, setMyboard}}>
      {children}
    </BoardContext.Provider>
  )
};

export const clearCells = (board)=>{
  const {gameboard} = board;
  for (let i = 0; i < 3; i++){
    for (let j = 0; j < 3; j++){
      gameboard[i][j] = "";
    }
  }
  return {...board,
    gameboard: gameboard,
    winner: null,
    currentPlayer: players.X,
    state: states.progress,
    currentGame: game
  };
};

const isWinningMove = (board, row, col)=>{
  const currentCells = board.gameboard;
  const player = board.currentPlayer;
  return (
    (currentCells[row][0] === player
    && currentCells[row][1] === player
    && currentCells[row][2] === player)

    || (currentCells[0][col] === player
    && currentCells[1][col] === player
    && currentCells[2][col] === player)

    || (currentCells[0][0] === player
    && currentCells[1][1] === player
    && currentCells[2][2] === player)

    || (currentCells[0][2] === player
    && currentCells[1][1] === player
    && currentCells[2][0] === player)
  )
};

const isCoordValid = (coord)=>coord >= 0 && coord <= 2;

const isCellEmpty = (board, row, col)=>board.gameboard[row][col] === "";

const isCellValid = (board, row, col)=>
  board.state === states.progress
  && isCoordValid(row)
  && isCoordValid(col)
  && isCellEmpty(board, row, col)
;

const isBoardFull = (board)=>{
  for (let i = 0; i < 3; i++){
    for (let j = 0; j < 3; j++){
      if (board.gameboard[i][j] === "") return false;
    }
  }
  return true;
};

export const makeMove = (board, row, col)=>{
  let {gameboard, state, winner, currentPlayer} = board;

  if (isCellValid(board, row, col)){
    gameboard[row][col] = currentPlayer;
    if (isWinningMove(board, row, col)){
      state = states.finish;
      winner = currentPlayer;
    }else if (isBoardFull(board) && state === states.progress){
      state = states.draw;
    }
    if (state === states.progress){
      currentPlayer = currentPlayer === players.X ? players.O : players.X;
    }
  }

  return {
    ...board,
    gameboard: gameboard,
    state: state,
    winner: winner,
    currentPlayer: currentPlayer
  };
};

