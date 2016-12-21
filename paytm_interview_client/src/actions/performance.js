/**
 * Created by Terry on 2016-12-18.
 */
import axios from 'axios';
const ROOT_URL = "http://localhost:3000";
import { browserHistory } from 'react-router';
import errorHelper from '../util/errorHelper';
import {
    GET_PERFORMANCE,
    UPDATE_PERFORMANCE,
    UNAUTH_USER
} from './types';

export function getPerformance(employeeId, cb) {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/api/admin/performanceReview/${employeeId}`, {headers: { 'x-access-token': localStorage.getItem('token')}})
            .then((response) => {
                dispatch( { type: GET_PERFORMANCE, payload: response.data.performance });
                cb();
            }).catch((err) => {
            console.log(err);
            errorHelper(err);
            dispatch({ type: UNAUTH_USER });
            browserHistory.push('/');
        })
    }
}

export function updatePerformance(performance, employeeId) {
    return (dispatch) => {
        axios.put(`${ROOT_URL}/api/admin/performanceReview/${employeeId}`, {token: localStorage.getItem('token'), ...performance})
            .then((response) => {
                dispatch( {type: UPDATE_PERFORMANCE, payload: response.data.performance});
                toastr.success(`Performance review is successfully saved`);
            }).catch((err) => {
            console.log(err);
            errorHelper(err);
            dispatch({ type: UNAUTH_USER });
            browserHistory.push('/');
        })
    }
}