import React from "react";
import logo from './logo.svg';
import './App.css';
import MyMap from "./MyMap";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
function App() {

  return (
    <div className="App">
      <MyMap position={{lat:40, lng:-80}}/>
    </div>
  );
}

export default App;
