//import packages from node modules
import React from "react"
import "./App.scss";

//import shared components
import Header from "./components/Header";
import Banner from "./components/Banner";

function App() {
  return (
    <div className="wrapper">
      <Header/>
      <Banner/>
    </div>
  );
}

export default App;
