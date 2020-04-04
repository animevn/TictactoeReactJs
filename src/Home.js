import React from "react";

function Home() {

  return (
    <div className="container mt-5">

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
  )
}

export default Home;