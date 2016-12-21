/**
 * Created by Terry on 2016-12-18.
 */
import axios from 'axios';
const ROOT_URL = "http://localhost:3000";
import { browserHistory } from 'react-router';
import errorHelper from '../util/errorHelper';
import {
    GET_FEEDBACKS,
    ASSIGN_FEEDBACK,
    UNASSIGN_FEEDBACK,
    GET_EMPLOYEE_FEEDBACKS,
    SUBMIT_FEEDBACK,
    SAVE_FEEDBACK,
    UNAUTH_USER
} from './types';

export function getFeedbacks(employeeId) {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/api/admin/feedback/${employeeId}`, {headers: { 'x-access-token': localStorage.getItem('token')}})
            .then((response) => {
                dispatch({ type: GET_FEEDBACKS, assignedFeedbacks: response.data.assignedFeedbacks, unassignedEmployees: response.data.unassignedEmployees });
            }).catch((err) => {
            console.log(err);
            errorHelper(err);
            dispatch({ type: UNAUTH_USER });
            browserHistory.push('/');
        })
    }
}

export function assignFeedback(assignedEmployeeId, employeeId, employeeInfo) {
    return (dispatch) => {
        axios.put(`${ROOT_URL}/api/admin/feedback/${assignedEmployeeId}/${employeeId}`, {token: localStorage.getItem('token'), ...employeeInfo})
            .then((response) => {
                dispatch({ type: ASSIGN_FEEDBACK, payload: response.data.assignedFeedback });
            }).catch((err) => {
            console.log(err);
            errorHelper(err);
            dispatch({ type: UNAUTH_USER });
            browserHistory.push('/');
        })
    }

}

export function unassignedFeedback(unassignedEmployeeId, employeeId) {
    return (dispatch) => {
        axios.delete(`${ROOT_URL}/api/admin/feedback/${unassignedEmployeeId}/${employeeId}`, {headers: { 'x-access-token': localStorage.getItem('token')}})
            .then((response) => {
                dispatch({ type: UNASSIGN_FEEDBACK, payload: response.data.unassignedEmployee });
            }).catch((err) => {
            console.log(err);
            errorHelper(err);
            dispatch({ type: UNAUTH_USER });
            browserHistory.push('/');
        })
    }
}

// In Employee page, get the list required feedback lists. Some of them is already submitted while others are not.
export function getEmployeeFeedbacks(employeeId) {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/api/employee/${employeeId}`, {headers: { 'x-access-token': localStorage.getItem('token')}})
            .then((response) => {
                dispatch({ type: GET_EMPLOYEE_FEEDBACKS, requiringFeedbacks: response.data.requiringFeedbacks, submittedFeedbacks: response.data.submittedFeedbacks });
            }).catch((err) => {
            console.log(err);
            errorHelper(err);
            dispatch({ type: UNAUTH_USER });
            browserHistory.push('/');
        })
    }
}

// Submit required feedback ===> save the contents and change the status of the feedback to submitted feedback.
// pass payload that is submitted feedback.
export function submitFeedback(feedback, employeeId, feedbackId) {
    return (dispatch) => {
        console.log("touched here");
        axios.post(`${ROOT_URL}/api/employee/${employeeId}/${feedbackId}`, {token: localStorage.getItem('token'), ...feedback})
            .then((response) => {
                console.log("successfully passed here");
                dispatch({ type: SUBMIT_FEEDBACK, payload: response.data.feedback })
            }).catch((err) => {
            console.log(err);
            errorHelper(err);
            dispatch({ type: UNAUTH_USER });
            browserHistory.push('/');
        })
    }
}

// Save required feedback but not submitted yet.
// pass payload that is saved feedback
export function saveFeedback(feedback, employeeId, feedbackId) {
    return (dispatch) => {
        axios.put(`${ROOT_URL}/api/employee/${employeeId}/${feedbackId}`, {token: localStorage.getItem('token'), ...feedback})
            .then((response) => {
                dispatch({ type: SAVE_FEEDBACK, payload: response.data.feedback })
                toastr.success(`${response.data.feedback.reviewee.name}'s feedback successfully saved`);
            }).catch((err) => {
            console.log(err);
            errorHelper(err);
            dispatch({ type: UNAUTH_USER });
            browserHistory.push('/');
        })
    }
}
