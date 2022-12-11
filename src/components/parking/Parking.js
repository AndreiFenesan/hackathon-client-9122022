import React from "react";
import './parking.css'
import DeleteButton from "../DeleteButton/DeleteButton";
import DisplayParkingSpot from "./display_parking_spot/DisplayParkingSpot";
import ReservationForm from "../reservation_form/ReservationForm";
import axios from "axios";


export default function Parking({parkingSpotObject, deleteClickHandler}) {
    const [parkingData, setParkingData] = React.useState({
        parkingId: null,
    })

    const [formData, setFormData] = React.useState({
        checkInTime: "",
        checkOutTime: "",
        reservationDate: "",
    })


    const url = "http://192.168.0.2:8080/api/fetch-parking/" + parkingSpotObject.id;
    React.useEffect(() => {
        if (parkingData.id !== null) {
            axios.get(url).then(response => response.data.result)
                .then(data => {
                    console.log(data);
                    setParkingData(data);
                })
            setFormData({
                checkInTime: "",
                checkOutTime: "",
                reservationDate: "",
            })
        }
    }, [parkingSpotObject.id])


    // const start = new Date("2022-12-11T12:00:00.000Z").getTime()
    // const end = new Date("2022-12-11T16:00:00.000Z").getTime()
    // const resList = [
    //     {
    //         "begin_time": "2022-12-11T10:00:00.000Z",
    //         "end_time": "2022-12-11T16:00:00.000Z",
    //     },
    //     {
    //         "begin_time": "2022-12-11T10:00:00.000Z",
    //         "end_time": "2022-12-11T12:01:00.000Z",
    //     }
    // ]

    const numberOfReservationsInSelectedTimeInterval = (selectedTimeInterval, reservationList) => {
        const {start, end} = selectedTimeInterval
        let numberOfOccupiedPlaces = 0

        reservationList.forEach(reservation => {
            const reservationStart = new Date(reservation.begin_time).getTime()
            const reservationEnd = new Date(reservation.end_time).getTime()

            if ((start > reservationStart && start < reservationEnd) ||
                (end > reservationStart && end < reservationEnd)) {
                numberOfOccupiedPlaces += 1
            }
        })
        return numberOfOccupiedPlaces
    }


    React.useEffect(() => {
        if (formData.checkOutTime && formData.reservationDate && formData.checkInTime) {
            const url = "http://192.168.0.2:8080/api/fetch-parking/" + parkingData.id + "/reservations"
            axios.post(url, {
                "date": formData.reservationDate
            }).then(response => response.data.result)
                .then((data) => {
                        let occupiedPlaces = {
                            "EV": 0,
                            "REGULAR": 0,
                            "HANDICAPED": 0
                        }
                        const start = new Date(formData.reservationDate + "T" + formData.checkInTime + ":00.000Z").getTime()
                        const end = new Date(formData.reservationDate + "T" + formData.checkOutTime + ":00.000Z").getTime()
                        data.forEach((spotReservationObject) => {
                            console.log(spotReservationObject.reservations)
                            const occupiedSlots = numberOfReservationsInSelectedTimeInterval({
                                start,
                                end
                            }, spotReservationObject.reservations)
                            const parkType = spotReservationObject.spot.spot_type;
                            occupiedPlaces[parkType] += occupiedSlots
                        })
                        console.log(occupiedPlaces)
                        setParkingData(prevState => ({
                            ...prevState,
                            regular: {
                                total: regular.total,
                                occupied: occupiedPlaces.REGULAR
                            },
                            ev: {
                                total: ev.total,
                                occupied: occupiedPlaces.EV
                            },
                            handicaped: {
                                total: handicaped.total,
                                occupied: occupiedPlaces.HANDICAPED
                            }
                        }))
                    }
                )

        }
    }, [formData])

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
            <ReservationForm setFormData={setFormData} formData={formData}/>
        </div>
    )
}