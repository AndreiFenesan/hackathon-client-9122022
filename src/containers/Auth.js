import React from 'react';
import api from '../api';
import {useCookies} from 'react-cookie';

function Auth(props) {

    const [cookies, setCookie] = useCookies(['token', 'refreshToken']);

    React.useEffect(() => {
        let interval;
        if (cookies.token != "null" && cookies.refreshToken != "null" && cookies.token != null && cookies.refreshToken != null) {
          interval = setInterval(() => {
            requestHandler();
          }, process.env.REACT_APP_TOKEN_DURATION_SECONDS);
        } else {
           clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [cookies]);

    const requestHandler = () => {
        if (cookies.token != "null" && cookies.refreshToken != "null" && cookies.token != null && cookies.refreshToken != null) {
            api.post('/authentication/refresh-token', {
                refreshToken: cookies.refreshToken,
                token: cookies.token
            }).then(response => {
                setCookie('token', response.data.token, {path: '/', sameSite: true});
                setCookie('refreshToken', response.data.refreshToken, {path: '/', sameSite: true});
            }).catch(error => {
                setCookie('token', null, {path: '/', sameSite: true});
                setCookie('refreshToken', null, {path: '/', sameSite: true});
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
            });
        }
    }

    return (
        <div>
            {props.children}
        </div>
    );
}

export default Auth;