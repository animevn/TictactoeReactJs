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

const deleteMovesAfterCurrentMove = (game)=>{
  let {moves, currentMove} = game;
  if (currentMove < moves.length){
    moves = moves.slice(0, currentMove);
  }
  return {...game, moves:moves};
};


export const makeMove = (board, row, col)=>{
  let {gameboard, state, winner, currentPlayer, game} = board;
  let {moves, currentMove} = game;

  if (isCellValid(board, row, col)){
    moves = deleteMovesAfterCurrentMove(game).moves;
    gameboard[row][col] = currentPlayer;
    let move = {player:currentPlayer, row:row, col:col, state:state};

    if (isWinningMove(board, row, col)){
      state = states.finish;
      winner = currentPlayer;
    }else if (isBoardFull(board) && state === states.progress){
      state = states.draw;
    }
    currentMove++;
    move = {...move, state: state};
    moves.push(move);


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
    if (moveCurrent.state === states.progress){
      currentPlayer = currentPlayer === players.X ? players.O : players.X;
    }
    currentMove--;
    if (currentMove > 0){
      const moveToMoveBack = moves[currentMove - 1];
      state = moveToMoveBack.state;
    }else {
      state = states.progress
    }

  }
  return {
    ...board,
    gameboard: gameboard,
    state: state,
    currentPlayer: currentPlayer,
    game: {moves:moves, currentMove:currentMove}
  }
};

export const moveNext = (board)=>{
  let {gameboard, state, currentPlayer, game} = board;
  let {moves, currentMove} = game;
  if (currentMove < moves.length){
    const nextMove = moves[currentMove];
    gameboard[nextMove.row][nextMove.col] = nextMove.player;
    currentMove++;
    state = nextMove.state;
    if (nextMove.state === states.progress){
      currentPlayer = currentPlayer === players.X ? players.O : players.X;
    }
  }
  return {
    ...board,
    gameboard: gameboard,
    state: state,
    currentPlayer: currentPlayer,
    game: {moves:moves, currentMove:currentMove}
  }
};

export const moveFirst = (board)=>{
  let {gameboard, state, currentPlayer, game} = board;
  let {moves, currentMove} = game;
  if (currentMove > 0){
    currentMove = 0;
    currentPlayer = players.X;
    state = states.progress;
    for (let i = 0; i < 3; i++){
      for (let j = 0; j < 3; j++){
        gameboard[i][j] = "";
      }
    }
  }
  return {
    ...board,
    gameboard: gameboard,
    state: state,
    currentPlayer: currentPlayer,
    game: {moves:moves, currentMove:currentMove}
  }
};

export const moveLast = (board)=>{
  let {gameboard, state, currentPlayer, game} = board;
  let {moves, currentMove} = game;
  if (currentMove < moves.length){
    const lastMove = moves[moves.length - 1];
    for (let i = currentMove; i < moves.length; i++){
      const move = moves[i];
      gameboard[move.row][move.col] = move.player;
    }
    if (lastMove.state === states.progress){
      currentPlayer = lastMove.player === players.X ? players.O : players.X;
    }else {
      currentPlayer = lastMove.player;
    }
    state = lastMove.state;
    currentMove = moves.length;
  }
  return {
    ...board,
    gameboard: gameboard,
    state: state,
    currentPlayer: currentPlayer,
    game: {moves:moves, currentMove:currentMove}
  }
};

export const moveFirstEnable = (board)=>{
  let {game} = board;
  let {currentMove} = game;
  return currentMove === 0;
};

export const moveLastEnable = (board)=>{
  let {game} = board;
  let {moves, currentMove} = game;
  return currentMove === moves.length;
};