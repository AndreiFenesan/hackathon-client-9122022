import React from "react";
import '../App.css';
import MyMap from "../components/MyMap/MyMap";
//import axios from "./api";
import axios from "axios";
import Parking from "../components/parking/Parking";
import SearchAreaButton from "../components/SearchAreaButton/SearchAreaButton";


function MapPage() {
    const [positions, setPositions] = React.useState([]);
    const [userPos, setUserPos] = React.useState({lat: 46.78224, lng: 23.61372})
    const [parking, setParking] = React.useState({id: null, name: null})
    const [viewPortCoordinates, setViewPortCoordinates] = React.useState({lat: 46.78224, lng: 23.61372});
    const [buttonState,setButtonState] = React.useState(true)

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
            .then(data => {
                console.log(data);
                setPositions(data)
            })
            .catch(err => console.log(err))
    }, [])

    React.useEffect(() => {
        axios.post("http://192.168.0.2:8080/api/fetch-parking", {
            lat: viewPortCoordinates.lat,
            lng: viewPortCoordinates.lng,
            range: 100000
        },).then(response => response.data.result.public)
            .then(data => {
                console.log(data);
                setPositions(data)
            })
            .catch(err => console.log(err))
    }, [buttonState])

    function onSearchAreaButtonClick() {
        setButtonState(prevState => !prevState)
    }

    return (
        <div className="App">
            <SearchAreaButton onClick={onSearchAreaButtonClick}/>
            {parking.id !== null &&
                <Parking parkingSpotObject={parking}
                         deleteClickHandler={() => setParking({id: null, name: null})}></Parking>}
            <MyMap setViewCoordinates={setViewPortCoordinates} positions={positions} userPosition={userPos}
                   setNewParking={setParking}/>
        </div>
    );
}

export default MapPage;