/**
 * Created by Terry on 2016-12-17.
 */
import {
    GET_EMPLOYEES,
    ADD_EMPLOYEE,
    UPDATE_EMPLOYEE,
    REMOVE_EMPLOYEE,
} from '../actions/types';


export default function (state={ list:[]}, action) {
    switch(action.type) {
        case GET_EMPLOYEES: {
            return { ...state, list: action.payload };
        }
        case ADD_EMPLOYEE: {
            state.list.push(action.payload);
            return { ...state };
        }
        case UPDATE_EMPLOYEE: {
            let len = state.list.length;
            for (let i = 0; i < len; i++) {
                if (state.list[i]._id === action.payload._id) {
                    state.list[i] = action.payload;
                }
            }
            return {...state};
        }
        case REMOVE_EMPLOYEE: {
            let len = state.list.length;
            for (let i = 0; i < len; i++) {
                if (state.list[i]._id === action.payload) {
                    state.list.splice(i, 1);
                }
            }
            return {...state};
        }
        default:
            return state;
    }
};