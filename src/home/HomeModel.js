import React, {createContext, useState} from "react";

export const BoardContext = createContext(null);

const players = {X: "X", O: "O"};
const states = {progress:"In Progress", finish: "Has Result", draw: "Draw"};
const initialBoard = [["", "", ""], ["", "", ""], ["", "", ""]];
const initalGame = {moves:[], currentMove:0};

const initalMyBoard = {
  gameboard:initialBoard,
  winner:null,
  currentPlayer:players.X,
  state:states.progress,
  game:initalGame
};

export const BoardContextProvider = ({children})=>{
  const [myboard, setMyboard] = useState(initalMyBoard);
  return (
    <BoardContext.Provider value={{myboard, setMyboard}}>
      {children}
    </BoardContext.Provider>
  )
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

export const clearCells = (board)=>{
  const {gameboard} = board;
  for (let i = 0; i < 3; i++){
    for (let j = 0; j < 3; j++){
      gameboard[i][j] = "";
    }
  }
  return {
    ...board,
    gameboard: gameboard,
    winner: null,
    currentPlayer: players.X,
    state: states.progress,
    game: initalGame
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
  let {gameboard, state, winner, currentPlayer, game} = board;
  let {moves, currentMove} = game;

  if (isCellValid(board, row, col)){
    gameboard[row][col] = currentPlayer;
    let move = {player:currentPlayer, row:row, col:col, state:state};

    if (isWinningMove(board, row, col)){
      state = states.finish;
      winner = currentPlayer;
      move = {...move, state: state};
    }else if (isBoardFull(board) && state === states.progress){
      state = states.draw;
      move = {...move, state: state};
    }

    moves.push(move);
    currentMove++;

    if (state === states.progress){
      currentPlayer = currentPlayer === players.X ? players.O : players.X;
    }
  }

  return {
    ...board,
    gameboard: gameboard,
    state: state,
    winner: winner,
    currentPlayer: currentPlayer,
    game: {moves:moves, currentMove:currentMove}
  };
};

export const moveBack = (board)=>{
  let {gameboard, state, currentPlayer, game} = board;
  let {moves, currentMove} = game;
  if (currentMove > 0){
    const moveCurrent = moves[currentMove - 1];
    gameboard[moveCurrent.row][moveCurrent.col] = "";
    currentMove--;
    const moveToMoveBack = moves[currentMove - 1];
    state = moveToMoveBack.state;
    currentPlayer = currentPlayer === players.X ? players.O : players.X;
  }
  return {
    ...board,
    gameboard: gameboard,
    state: state,
    currentPlayer: currentPlayer,
    game: {moves:moves, currentMove:currentMove}
  }
};