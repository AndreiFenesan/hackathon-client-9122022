import React from "react";
import logo from './logo.svg';
import './App.css';
import MyMap from "./MyMap";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
function App() {
    const positions = [{lat: 44, lng: -80}, {lat: 45, lng: -90}]
  return (
    <div className="App">
      <MyMap positions={positions}/>
    </div>
  );
}

export default App;
