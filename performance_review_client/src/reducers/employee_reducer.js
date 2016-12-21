/**
 * Created by Terry on 2016-12-18.
 */
import {
    GET_EMPLOYEE,
    GET_PERFORMANCE,
    UPDATE_PERFORMANCE,
    GET_FEEDBACKS,
    ASSIGN_FEEDBACK,
    UNASSIGN_FEEDBACK
} from '../actions/types';


export default function (state={}, action) {
    switch(action.type) {
        case GET_EMPLOYEE: {
            return { ...state, profile: action.payload };
        }
        case GET_PERFORMANCE: {
            return { ...state, performance: action.payload };
        }
        case UPDATE_PERFORMANCE: {
            return { ...state, performance: action.payload };
        }
        case GET_FEEDBACKS: {
            return { ...state, assignedFeedbacks: action.assignedFeedbacks, unassignedEmployees: action.unassignedEmployees };
        }
        case ASSIGN_FEEDBACK: {
            state.assignedFeedbacks.push(action.payload);
            let len = state.unassignedEmployees.length;
            for (let i=0; i<len; i++) {
                if (state.unassignedEmployees[i]._id === action.payload.reviewer._id) {
                    state.unassignedEmployees.splice(i,1);
                    break;
                }
            }
            return { ...state, assignedFeedbacks: [...state.assignedFeedbacks], unassignedEmployees: [...state.unassignedEmployees] };
        }
        case UNASSIGN_FEEDBACK: {
            state.unassignedEmployees.push(action.payload);
            let len = state.assignedFeedbacks.length;
            for (let i=0; i<len; i++) {
                if (state.assignedFeedbacks[i].reviewer._id === action.payload._id) {
                    state.assignedFeedbacks.splice(i,1);
                    break;
                }
            }
            return { ...state, assignedFeedbacks: [...state.assignedFeedbacks], unassignedEmployees: [...state.unassignedEmployees] };
        }
        default:
            return state;
    }
};