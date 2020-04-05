import React, {useContext} from "react";
import "./Home.css";
import {BoardContext, inform} from "./HomeModel";

function HomeView(props) {
  const {myboard} = useContext(BoardContext);

  function reset(event) {
    event.preventDefault();
    props.reset()
  }

  function onClick(event) {
    event.preventDefault();
    props.onClick(event);
  }

  return (
    <div className="container">

      <div className="container col-11 col-sm-11 col-md-9 col-lg-7 col-xl-6">
        <button className="btn btn-lg btn-danger rounded-circle button-add shadow-lg"
                onClick={reset}>
          +
        </button>
      </div>

      <div className="container col-8 col-sm-8 col-md-6 col-lg-4 col-xl-4 mt-3">
        <h2 className="text-center">{inform(myboard)}</h2>
      </div>

      <div className="container mt-3">
        <div className="row d-flex flex-row justify-content-center">
          <button className="btn rounded-0 border-left border-top"
                  style={{"width":"5rem", "height":"5rem"}}
                  id="00" onClick={onClick}>
            {myboard.gameboard[0][0]}
          </button>
          <button className="btn rounded-0 border-left border-top"
                  style={{"width":"5rem", "height":"5rem"}}
                  id="01" onClick={onClick}>
            {myboard.gameboard[0][1]}
          </button>
          <button className="btn rounded-0 border-left border-top border-right"
                  style={{"width":"5rem", "height":"5rem"}}
                  id="02" onClick={onClick}>
            {myboard.gameboard[0][2]}
          </button>
        </div>

        <div className="row d-flex flex-row justify-content-center">
          <button className="btn rounded-0 border-left border-top"
                  style={{"width":"5rem", "height":"5rem"}}
                  id="10" onClick={onClick}>
            {myboard.gameboard[1][0]}
          </button>
          <button className="btn rounded-0 border-left border-top"
                  style={{"width":"5rem", "height":"5rem"}}
                  id="11" onClick={onClick}>
            {myboard.gameboard[1][1]}
          </button>
          <button className="btn rounded-0 border-left border-top border-right"
                  style={{"width":"5rem", "height":"5rem"}}
                  id="12" onClick={onClick}>
            {myboard.gameboard[1][2]}
          </button>
        </div>

        <div className="row d-flex flex-row justify-content-center">
          <button className="btn rounded-0 border-left border-top border-bottom"
                  style={{"width":"5rem", "height":"5rem"}}
                  id="20" onClick={onClick}>
            {myboard.gameboard[2][0]}
          </button>
          <button className="btn rounded-0 border-left border-top border-bottom"
                  style={{"width":"5rem", "height":"5rem"}}
                  id="21" onClick={onClick}>
            {myboard.gameboard[2][1]}
          </button>
          <button className="btn rounded-0 border-left border-top border-right border-bottom"
                  style={{"width":"5rem", "height":"5rem"}}
                  id="22" onClick={onClick}>
            {myboard.gameboard[2][2]}
          </button>
        </div>

      </div>

      <div className="container col-11 col-sm-11 col-md-9 col-lg-7 col-xl-6 mx-auto mt-5
                      d-flex flex-row justify-content-around">

        <img className="first-image btn btn-outline-success "
             src="/images/first.svg" alt="first"/>

        <img className="first-image btn btn-outline-success "
             src="/images/back.svg" alt="back"/>

        <img className="first-image btn btn-outline-success "
             src="/images/next.svg" alt="next"/>

        <img className="first-image btn btn-outline-success "
             src="/images/last.svg" alt="last"/>
      </div>

    </div>
  )
}

export default HomeView;