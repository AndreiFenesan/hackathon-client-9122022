import React from "react";
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MapPage from "./containers/MapPage";
import RegisterPage from "./containers/RegisterPage";
import LoginPage from "./containers/LoginPage";
import RegisterCarPage from "./containers/RegisterCarPage";


function App() {
    

    return (
        <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<MapPage />} />
            <Route path={"/register-vehicle"} element={<RegisterCarPage/>} />
            <Route path={"/register"} element={<RegisterPage/>} />
            <Route path={"/login"} element={<LoginPage />} />
        </Routes>
        </BrowserRouter>
    );
}

export default App;
