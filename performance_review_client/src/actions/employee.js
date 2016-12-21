/**
 * Created by Terry on 2016-12-17.
 */
import axios from 'axios';
const ROOT_URL = "http://localhost:3000";
import { browserHistory } from 'react-router';
import errorHelper from '../util/errorHelper';
import {
    GET_EMPLOYEES,
    GET_EMPLOYEE,
    ADD_EMPLOYEE,
    UPDATE_EMPLOYEE,
    REMOVE_EMPLOYEE,
    UNAUTH_USER
} from './types';

export function getEmployees() {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/api/admin`,  {headers: { 'x-access-token': localStorage.getItem('token')}}) // temporarily use admin id to authenticate
            .then((response) => {
                dispatch({ type: GET_EMPLOYEES, payload: response.data.employees }); //employees is array of employee information
            }).catch((err) => {
            console.log(err);
            errorHelper(err);
            dispatch({ type: UNAUTH_USER });
            browserHistory.push('/');
        });
    }
}

export function getEmployee(employeeId) {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/api/admin/${employeeId}`, {headers: { 'x-access-token': localStorage.getItem('token')}})
            .then((response) => {
                dispatch( { type: GET_EMPLOYEE, payload: response.data.employee });
            }).catch((err) => {
            console.log(err);
            errorHelper(err);
            dispatch({ type: UNAUTH_USER });
            browserHistory.push('/');
        })
    }
}

export function addEmployee(employee) {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/api/admin`, {token: localStorage.getItem('token'), ...employee}) // pass new employee information through the body
            .then((response) => {
                dispatch({ type: ADD_EMPLOYEE, payload: response.data.employee }); //employee is new employee information
            }).catch((err) => {
            console.log(err);
            errorHelper(err);
            dispatch({ type: UNAUTH_USER });
            browserHistory.push('/');
        })
    }
}

export function updateEmployee(employee, employeeId) {
    return (dispatch) => {
        axios.put(`${ROOT_URL}/api/admin/${employeeId}`, {token: localStorage.getItem('token'), ...employee}) // pass update information of the employee
            .then((response) => {
                dispatch({type: UPDATE_EMPLOYEE, payload: response.data.employee }); //employee is updated employee information
            }).catch((err) => {
            console.log(err);
            errorHelper(err);
            dispatch({ type: UNAUTH_USER });
            browserHistory.push('/');
        })
    }
}

export function removeEmployee(employeeId) {
    return (dispatch) => {
        axios.delete(`${ROOT_URL}/api/admin/${employeeId}`,  {headers: { 'x-access-token': localStorage.getItem('token')}})
            .then((response) => {
                dispatch({type: REMOVE_EMPLOYEE, payload: employeeId }); //employee is deleted employee information
            }).catch((err) => {
            console.log(err);
            errorHelper(err);
            dispatch({ type: UNAUTH_USER });
            browserHistory.push('/');
        })
    }
}
