import React from "react";
import logo from './logo.svg';
import './App.css';
import MyMap from "./MyMap";
//import axios from "./api";
import axios from "axios";
import Parking from "./components/parking/Parking";

function App() {
    const [positions, setPositions] = React.useState([]);
    const [userPos, setUserPos] = React.useState({lat: 46.78224, lng: 23.61372})
    const [parking, setParking] = React.useState({id:null, name:null})
    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const userPosition = {lat: pos.coords.latitude, lng: pos.coords.longitude}
            console.log(userPosition)
            setUserPos(userPosition)
        })
    }, [])

    React.useEffect(() => {
        axios.post("http://192.168.0.2:8080/api/fetch-parking", {
            lat: userPos.lat,
            lng: userPos.lng,
            range: 100000
        },).then(response => response.data.result.public)
            .then(data =>{console.log(data); setPositions(data)})
            .catch(err => console.log(err))
    }, [userPos])

    return (
        <div className="App">
            {parking.id !== null &&
                <Parking parkingSpotObject={parking} deleteClickHandler={() => setParking({id:null, name:null})}></Parking>}
            <MyMap positions={positions} userPosition={userPos} setNewParking={setParking}/>
        </div>
    );
}

export default App;
