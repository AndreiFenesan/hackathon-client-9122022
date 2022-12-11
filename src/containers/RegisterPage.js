import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function RegisterPage() {
    let navigate = useNavigate();
    const [userData, setUserData] = React.useState({
        name: null,
        email: null,
        password: null,
    })

    function onUserDataChange(e) {
        setUserData(prevState => {
            return (
                {
                    ...prevState,
                    [e.target.name]: e.target.value
                }
            )
        })
    }

    function onSubmitUserData(ev) {
        ev.preventDefault()
        console.log("Sendint...")
        axios.post("http://192.168.0.2:8080/authentication/register", {
            "name": userData.name,
            "email": userData.email,
            "password": userData.password,
        }).then(response => {
            if (response.status.valueOf() === 200) {
                navigate("/")
            }
        })
            .catch(error => console.log(error))
    }


    return (
        <div>
            <form method={'POST'} onSubmit={onSubmitUserData}>
                <input name={"name"} type={"text"} placeholder={"Name"} onChange={onUserDataChange}/>
                <input name={"email"} type={"text"} placeholder={"Email"} onChange={onUserDataChange}/>
                <input name={"password"} type={"text"} placeholder={"password"} onChange={onUserDataChange}/>
                <input type={"submit"} value={"Register"}/>
            </form>
        </div>
    );
}

export default RegisterPage;