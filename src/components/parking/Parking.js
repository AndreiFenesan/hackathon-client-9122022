import React from "react";
import './parking.css'
import DeleteButton from "../DeleteButton/DeleteButton";
import DisplayParkingSpot from "./display_parking_spot/DisplayParkingSpot";
import Form from "react-bootstrap/Form";
import ReservationForm from "../reservation_form/ReservationForm";
import axios from "axios";


export default function Parking({parkingSpotObject, deleteClickHandler}) {
    const [parkingData, setParkingData] = React.useState({
        parkingId: null,
    })
    const url = "http://192.168.0.2:8080/api/fetch-parking/" + parkingSpotObject.id;
    React.useEffect(() => {
        if (parkingData.id !== null) {
            axios.get(url).then(response => response.data.result)
                .then(data => {
                    console.log(data);
                    setParkingData(data);
                })
        }
    }, [parkingSpotObject.id])

    const {name, regular, ev, handicaped} = parkingData
    const freeRegular = regular === undefined ? 0 : regular.total - regular.occupied;
    const freeEv = ev === undefined ? 0 : ev.total - ev.occupied
    const freeHandicapped = handicaped === undefined ? 0 : handicaped.total - handicaped.occupied
    return (
        <div className={"parking"}>
            <p className={"parking-name"}>{name}</p>
            <DeleteButton deleteClickHandler={deleteClickHandler}></DeleteButton>

            <DisplayParkingSpot spotType={"EV"} numberOfFreeSpots={freeEv}/>
            <DisplayParkingSpot spotType={"REGULAR"} numberOfFreeSpots={freeRegular}/>
            <DisplayParkingSpot spotType={"DISABLED"} numberOfFreeSpots={freeHandicapped}/>
            <ReservationForm/>
        </div>
    )
}