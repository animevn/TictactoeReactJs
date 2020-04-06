import React, {createContext, useEffect, useState} from "react";

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


export const BoardContextProvider = ({children})=>{
  const save = localStorage.getItem("mySave");
  const [myboard, setMyboard] = useState(save ? JSON.parse(save) : initalMyBoard);

  useEffect(()=>{
    localStorage.setItem("mySave", JSON.stringify(myboard));
  }, [myboard]);

  const inform = ()=>{
    if (myboard.state === states.progress){
      return `${myboard.currentPlayer} to play`
    }else if (myboard.state === states.draw){
      return "Game Draws!!!"
    }else if (myboard.state === states.finish){
      return `${myboard.currentPlayer} wins!!!`
    }
    return "";
  };

  const moveFirstEnable = ()=>{
    let {game} = myboard;
    let {currentMove} = game;
    return currentMove === 0;
  };

  const moveBackEnable = ()=>{
    let {game} = myboard;
    let {currentMove} = game;
    return currentMove > 0;
  };

  const moveNextEnable = ()=>{
    let {game} = myboard;
    let {moves, currentMove} = game;
    return currentMove < moves.length;
  };

  const moveLastEnable = ()=>{
    let {game} = myboard;
    let {moves, currentMove} = game;
    return currentMove === moves.length;
  };

  const clearCells = ()=>{
    setMyboard({
      gameboard: [["", "", ""], ["", "", ""], ["", "", ""]],
      winner: null,
      currentPlayer: players.X,
      state: states.progress,
      game: {moves:[], currentMove: 0}
    });
  };


  const moveBack = ()=>{
    let {gameboard, state, currentPlayer, game} = myboard;
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
    setMyboard({
      ...myboard,
      gameboard: gameboard,
      state: state,
      currentPlayer: currentPlayer,
      game: {moves:moves, currentMove:currentMove}
    });
  };

  const moveNext = ()=>{
    let {gameboard, state, currentPlayer, game} = myboard;
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
    setMyboard({
      ...myboard,
      gameboard: gameboard,
      state: state,
      currentPlayer: currentPlayer,
      game: {moves:moves, currentMove:currentMove}
    });
  };

  const moveFirst = ()=>{
    let {gameboard, state, currentPlayer, game} = myboard;
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
    setMyboard({
      ...myboard,
      gameboard: gameboard,
      state: state,
      currentPlayer: currentPlayer,
      game: {moves:moves, currentMove:currentMove}
    });
  };

  const moveLast = ()=>{
    let {gameboard, state, currentPlayer, game} = myboard;
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
    setMyboard({
      ...myboard,
      gameboard: gameboard,
      state: state,
      currentPlayer: currentPlayer,
      game: {moves:moves, currentMove:currentMove}
    });
  };

  const makeMove = (row, col)=>{
    let {gameboard, state, winner, currentPlayer, game} = myboard;
    let {moves, currentMove} = game;

    if (isCellValid(myboard, row, col)){
      moves = deleteMovesAfterCurrentMove(game).moves;
      gameboard[row][col] = currentPlayer;
      let move = {player:currentPlayer, row:row, col:col, state:state};

      if (isWinningMove(myboard, row, col)){
        state = states.finish;
        winner = currentPlayer;
      }else if (isBoardFull(myboard) && state === states.progress){
        state = states.draw;
      }
      currentMove++;
      move = {...move, state: state};
      moves.push(move);


      if (state === states.progress){
        currentPlayer = currentPlayer === players.X ? players.O : players.X;
      }
    }

    setMyboard({
      gameboard: gameboard,
      state: state,
      winner: winner,
      currentPlayer: currentPlayer,
      game: {moves:moves, currentMove:currentMove}
    });
  };

  return (
    <BoardContext.Provider value={{myboard, setMyboard, inform, moveFirstEnable, moveBackEnable,
      moveNextEnable, moveLastEnable, moveBack, moveNext, moveFirst, moveLast, clearCells,
      makeMove}}>
      {children}
    </BoardContext.Provider>
  )
};








