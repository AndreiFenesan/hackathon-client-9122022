import React from "react";
import './DisplayParkingSpot.css'
export default function DisplayParkingSpot({spotType, numberOfFreeSpots}) {
    return (
        <div>
            <div className={"parkSpot-div"}>{spotType}: {numberOfFreeSpots}</div>
            <hr className={"delimiter"}/>
        </div>
)
}
