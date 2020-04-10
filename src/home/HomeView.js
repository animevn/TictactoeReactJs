import React, {useContext} from "react";
import "./Home.css";
import {BoardContext} from "./HomeModel";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import AddIcon from '@material-ui/icons/Add';
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme)=>({
  fab: {
    position: 'absolute',
    top: theme.spacing(9),
    right: theme.spacing(2),
  }
}));

function HomeView(props) {
  const classes = useStyles();
  const {myboard, inform, moveFirstEnable, moveBackEnable,
    moveNextEnable, moveLastEnable} = useContext(BoardContext);

  function reset() {
    props.reset()
  }

  function onClick(event) {
    props.onClick(event);
  }

  function onMove(event) {
    props.onMove(event);
  }

  return (
    <div className="container">
      <Fab className={classes.fab} color="primary" aria-label="add" size="small" onClick={reset}>
        <AddIcon />
      </Fab>

      <Button variant="text" color="secondary">Hello</Button>

      <div className="container col-8 col-sm-8 col-md-6 col-lg-4 col-xl-4 mt-3">
        <h2 className="text-center text-success">{inform(myboard)}</h2>
      </div>

      <div className="container mt-3">
        <div className="row d-flex flex-row justify-content-center">
          <button className="btn rounded-0 border-left border-top text-success"
                  style={{"width":"5rem", "height":"5rem"}}
                  id="00" onClick={onClick}>
            {myboard.gameboard[0][0]}
          </button>
          <button className="btn rounded-0 border-left border-top text-success"
                  style={{"width":"5rem", "height":"5rem"}}
                  id="01" onClick={onClick}>
            {myboard.gameboard[0][1]}
          </button>
          <button className="btn rounded-0 border-left border-top border-right text-success"
                  style={{"width":"5rem", "height":"5rem"}}
                  id="02" onClick={onClick}>
            {myboard.gameboard[0][2]}
          </button>
        </div>

        <div className="row d-flex flex-row justify-content-center">
          <button className="btn rounded-0 border-left border-top text-success"
                  style={{"width":"5rem", "height":"5rem"}}
                  id="10" onClick={onClick}>
            {myboard.gameboard[1][0]}
          </button>
          <button className="btn rounded-0 border-left border-top text-success"
                  style={{"width":"5rem", "height":"5rem"}}
                  id="11" onClick={onClick}>
            {myboard.gameboard[1][1]}
          </button>
          <button className="btn rounded-0 border-left border-top border-right text-success"
                  style={{"width":"5rem", "height":"5rem"}}
                  id="12" onClick={onClick}>
            {myboard.gameboard[1][2]}
          </button>
        </div>

        <div className="row d-flex flex-row justify-content-center">
          <button className="btn rounded-0 border-left border-top border-bottom text-success"
                  style={{"width":"5rem", "height":"5rem"}}
                  id="20" onClick={onClick}>
            {myboard.gameboard[2][0]}
          </button>
          <button className="btn rounded-0 border-left border-top border-bottom text-success"
                  style={{"width":"5rem", "height":"5rem"}}
                  id="21" onClick={onClick}>
            {myboard.gameboard[2][1]}
          </button>
          <button className="btn rounded-0 border-left border-top border-right border-bottom
                  text-success" style={{"width":"5rem", "height":"5rem"}}
                  id="22" onClick={onClick}>
            {myboard.gameboard[2][2]}
          </button>
        </div>

      </div>

      <div className="container col-12 col-sm-11 col-md-9 col-lg-7 col-xl-6 mx-auto mt-5
                      d-flex flex-row justify-content-around p-0">

        <img className={(moveFirstEnable() ? "image-disable " : "image-enable ") + "btn"}
             onClick={onMove} id="move-first"
             src="/images/first.svg" alt="first"/>

        <img className={"btn " + (moveBackEnable() ? "image-enable " : "image-disable ")}
             onClick={onMove} id="move-back"
             src="/images/back.svg" alt="back"/>

        <img className={"btn " + (moveNextEnable() ? "image-enable " : "image-disable ")}
             onClick={onMove} id="move-next"
             src="/images/next.svg" alt="next"/>

        <img className={"btn " + (moveLastEnable() ? "image-disable " : "image-enable ")}
             onClick={onMove} id="move-last"
             src="/images/last.svg" alt="last"/>
      </div>

    </div>
  )
}

export default HomeView;