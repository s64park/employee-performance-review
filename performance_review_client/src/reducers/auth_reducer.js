/**
 * Created by Terry on 2016-11-29.
 */
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_MESSAGE
} from '../actions/types';

export default function (state={}, action) {
    switch(action.type) {
        case AUTH_USER:
            return { ...state, authenticate: true, error: '' };
        case UNAUTH_USER:
            return { ...state, authenticate: false };
        case AUTH_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}
