import React from "react";
import Form from "react-bootstrap/Form";

export default function ReservationForm() {
    const [formData, setFormData] = React.useState({
        checkInTime: "",
        checkOutTime: "",
        reservationDate: "",
    })

    React.useEffect(() => {
        if(formData.checkOutTime && formData.reservationDate && formData.checkInTime){
            console.log(formData)
        }
    }, [formData])

    return <Form className={"form"}>
        <div>
            <label className={"label"}>Reservation date</label>
            <Form.Control type={"date"} className={"date-picker"} onChange={(event) => {
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
            <Form.Control type={"time"} className={"reservation-time"} onChange={(e) => {
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
            <Form.Control type={"time"} className={"reservation-time"} onChange={(e) => {
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