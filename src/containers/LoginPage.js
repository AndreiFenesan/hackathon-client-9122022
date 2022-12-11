import React from "react";
import api from "../api";
import {useCookies} from 'react-cookie';

function LoginPage() {
    const [userData, setUserData] = React.useState({email:'',password:'', errorMessage:''});

    const [cookies, setCookie] = useCookies(['token', 'refresh_token']);

    const updateUserData = (ev) => {
        setUserData(prevState => (
                {
                    ...prevState,
                    [ev.target.name]:ev.target.value
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
        <div>
            <form method="POST" onSubmit={submitTheForm}>
                <label>Email</label>
                <input name={"email"} type={"email"} value={userData.email} onChange={updateUserData} />
                <label>Password</label>
                <input name={"password"} type={"password"} value={userData.password} onChange={updateUserData} />
                <input type={"submit"} value={"Log in"} />
                <label>{userData.errorMessage}</label>
            </form>
        </div>
    );
}

export default LoginPage;