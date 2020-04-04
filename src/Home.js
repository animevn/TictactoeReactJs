import React from "react";
import "./Home.css";

function Home() {

  return (
    <div className="container mt-3">
      <h2 className="text-center">X to play</h2>
      <div className="container mt-3">
        <div className="row d-flex flex-row justify-content-center">
          <button className="btn rounded-0 border-left border-top"
                  style={{"width":"5rem", "height":"5rem"}}>

          </button>
          <button className="btn rounded-0 border-left border-top"
                  style={{"width":"5rem", "height":"5rem"}}>

          </button>
          <button className="btn rounded-0 border-left border-top border-right"
                  style={{"width":"5rem", "height":"5rem"}}>

          </button>
        </div>

        <div className="row d-flex flex-row justify-content-center">
          <button className="btn rounded-0 border-left border-top"
                  style={{"width":"5rem", "height":"5rem"}}>

          </button>
          <button className="btn rounded-0 border-left border-top"
                  style={{"width":"5rem", "height":"5rem"}}>

          </button>
          <button className="btn rounded-0 border-left border-top border-right"
                  style={{"width":"5rem", "height":"5rem"}}>

          </button>
        </div>

        <div className="row d-flex flex-row justify-content-center">
          <button className="btn rounded-0 border-left border-top border-bottom"
                  style={{"width":"5rem", "height":"5rem"}}>

          </button>
          <button className="btn rounded-0 border-left border-top border-bottom"
                  style={{"width":"5rem", "height":"5rem"}}>

          </button>
          <button className="btn rounded-0 border-left border-top border-right border-bottom"
                  style={{"width":"5rem", "height":"5rem"}}>

          </button>
        </div>

      </div>

      <div className="row col-11 col-sm-11 col-md-9 col-lg-7 col-xl-6 mx-auto mt-3">

        <img className="secret_image btn btn-outline-success "
             src="/images/first.svg" alt="first"/>

        <img className="secret_image btn btn-outline-success "
             src="/images/first.svg" alt="first"/>

        <img className="secret_image btn btn-outline-success "
             src="/images/first.svg" alt="first"/>

        <img className="secret_image btn btn-outline-success "
             src="/images/first.svg" alt="first"/>
      </div>


    </div>
  )
}

export default Home;