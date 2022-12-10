import React from "react";
import './parking.css'
import DeleteButton from "../DeleteButton/DeleteButton";
import DisplayParkingSpot from "./display_parking_spot/DisplayParkingSpot";
import Form from "react-bootstrap/Form";
import ReservationForm from "../reservation_form/ReservationForm";


export default function Parking({parkingSpotObject, deleteClickHandler}) {
    return (
        <div className={"parking"}>
            <p className={"parking-name"}>{parkingSpotObject.name}</p>
            <div className={"delete-button-container"}>
                <DeleteButton deleteClickHandler={deleteClickHandler}></DeleteButton>
            </div>
            <DisplayParkingSpot spotType={"EV"} numberOfFreeSpots={10}/>
            <DisplayParkingSpot spotType={"REGULAR"} numberOfFreeSpots={10}/>
            <DisplayParkingSpot spotType={"DISABLED"} numberOfFreeSpots={10}/>
            <ReservationForm />
        </div>
    )
}