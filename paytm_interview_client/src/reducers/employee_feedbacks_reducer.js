/**
 * Created by Terry on 2016-12-19.
 */
import {
    GET_EMPLOYEE_FEEDBACKS,
    SUBMIT_FEEDBACK,
    SAVE_FEEDBACK
} from '../actions/types';


export default function (state={}, action) {
    switch(action.type) {
        case GET_EMPLOYEE_FEEDBACKS: {
            return {...state, requiringFeedbacks: action.requiringFeedbacks, submittedFeedbacks: action.submittedFeedbacks}
        }
        case SUBMIT_FEEDBACK: {
            state.submittedFeedbacks.push(action.payload);
            let len = state.requiringFeedbacks.length;
            for (let i=0; i<len; i++) {
                if(state.requiringFeedbacks[i]._id === action.payload._id) {
                    state.requiringFeedbacks.splice(i,1);
                    break;
                }
            }
            return {...state, requiringFeedbacks: [...state.requiringFeedbacks], submittedFeedbacks: [...state.submittedFeedbacks]};
        }
        case SAVE_FEEDBACK: {
            let len = state.requiringFeedbacks.length;
            for (let i=0; i<len; i++) {
                if (state.requiringFeedbacks[i]._id === action.payload._id) {
                    state.requiringFeedbacks[i] = action.payload;
                    break;
                }
            }
            return {...state, requiringFeedbacks: [...state.requiringFeedbacks]};
        }
        default:
            return state;
    }
};