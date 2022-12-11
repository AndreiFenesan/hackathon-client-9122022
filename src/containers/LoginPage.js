import React from "react";
import api from "../api";
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';
import "./LoginPage.css"

function LoginPage() {
    const [userData, setUserData] = React.useState({email: '', password: '', errorMessage: ''});

    const [cookies, setCookie] = useCookies(['token', 'refreshToken']);

    const navigate = useNavigate();

    const updateUserData = (ev) => {
        setUserData(prevState => (
                {
                    ...prevState,
                    [ev.target.name]: ev.target.value
                }
            )
        )
    }

    const submitTheForm = (ev) => {
        ev.preventDefault();
        api.post('/authentication/login', {
            email: userData.email,
            password: userData.password
        }).then(res => {
            let expires = new Date();
            expires.setTime(expires.getTime() + (process.env.REACT_APP_REFRESH_TOKEN_DURATION_SECONDS * 1000));
            setCookie('token', res.data.token, {path: '/', expires, sameSite: true});
            setCookie('refreshToken', res.data.refreshToken, {path: '/', expires, sameSite: true});
            navigate('/');
        }).catch(err => {
            setUserData(prevState => (
                {
                    ...prevState,
                    errorMessage: err.response.data.errorMessage
                }
            ));
        });
    }

    return (
        <div className={"screen"}>
            <form className={"form-container"} method="POST" onSubmit={submitTheForm}>
                <label>Email</label>
                <input name={"email"} className={"email"} type={"email"} value={userData.email}
                       onChange={updateUserData}/>
                <label>Password</label>
                <input name={"password"} className={"password"} type={"password"} value={userData.password}
                       onChange={updateUserData}/>
                <div className={"button-div"}>
                    <input type={"submit"} className={"login-button"} value={"Log in"}/>
                </div>
                <label>{userData.errorMessage}</label>
            </form>
        </div>
    );
}

export default LoginPage;