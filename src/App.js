import React from "react";
import Header from "./Header"
import Footer from "./Footer";
import Home from "./home/Home";
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import {BoardContextProvider} from "./home/HomeModel";

function App() {
  return (
    <div className="main">
      <div className="container-fluid px-0">
        <Header/>

        {/*app goes in here*/}
        <div className="container pt-2">
          <BoardContextProvider>
            <Home/>
          </BoardContextProvider>
        </div>

      </div>
      <Footer/>
    </div>
  );
}

export default App;
