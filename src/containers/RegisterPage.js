import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './LoginPage.css';
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
        <div className="screen">
            <form method={'POST'} className='form-container' onSubmit={onSubmitUserData}>
                <label>Name</label>
                <input name={"name"} className='email' type={"text"} placeholder={"Name"} onChange={onUserDataChange}/>
                <label>Email</label>
                <input name={"email"} className='email' type={"text"} placeholder={"Email"} onChange={onUserDataChange}/>
                <label>Password</label>
                <input name={"password"} className='email' type={"text"} placeholder={"password"} onChange={onUserDataChange}/>
                <div className="button-div">
                <input type={"submit"} className='login-button' value={"Register"}/>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;