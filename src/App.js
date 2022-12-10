import React from "react";
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MapPage from "./MapPage";


function App() {
    

    return (
        <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<MapPage />} />
        </Routes>
        </BrowserRouter>
    );
}

export default App;
