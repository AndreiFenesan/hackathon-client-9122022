import React from "react";
import Form from "react-bootstrap/Form";

export default function ReservationForm({formData,setFormData}) {


    return <Form className={"form"}>
        <div>
            <label className={"label"}>Reservation date</label>
            <Form.Control value={formData.reservationDate} type={"date"} className={"date-picker"} onChange={(event) => {
                setFormData(prevState => {
                    return (
                        {
                            ...prevState,
                            reservationDate: event.target.value,
                        }
                    )
                })
            }
            }></Form.Control>
        </div>

        <div className={"time-pickers-container"}>
            <label className={"label"}>Check-in time</label>
            <Form.Control value={formData.checkInTime}  type={"time"} className={"reservation-time"} onChange={(e) => {
                setFormData(prevState => {
                    return (
                        {
                            ...prevState,
                            checkInTime: e.target.value
                        }
                    )
                })
            }
            }></Form.Control>
            <label className={"label"}>Check-out time</label>
            <Form.Control value={formData.checkOutTime} type={"time"} className={"reservation-time"} onChange={(e) => {
                setFormData(prevState => {
                    return (
                        {
                            ...prevState,
                            checkOutTime: e.target.value
                        }
                    )
                })
            }
            }></Form.Control>
        </div>
    </Form>;
}