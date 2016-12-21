import axios from 'axios';
import { browserHistory } from 'react-router';
const ROOT_URL = "http://localhost:3000";
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR
} from './types';


export function signinUser(props) {
    return (dispatch) => {
        // Submit username/password
        axios.post(`${ROOT_URL}/api/signin`, {...props})
            .then(response => {
                console.log("response", response.data);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('status', response.data.status);
                localStorage.setItem('name', response.data.name);
                dispatch({type: AUTH_USER });
                if (response.data.status === "admin") {
                    browserHistory.push('/admin');
                }
                else if(response.data.status === "employee") {
                    browserHistory.push(`/employee/${response.data.id}`);
                }

            })
            .catch((err) => {
                // If request is bad...
                console.log(err);
                if(err.response.data.error) {
                    dispatch(authError(err.response.data.error));
                }
            });

    };
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function signoutUser() {
    return (dispatch) => {
        localStorage.clear();
        dispatch({type: UNAUTH_USER });
        browserHistory.push('/signin');
    };
}


