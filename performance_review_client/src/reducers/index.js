import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './auth_reducer';
import employees from './employees_reducer';
import employee from './employee_reducer';
import employeeFeedbacks from './employee_feedbacks_reducer';

const rootReducer = combineReducers({
    form,
    auth,
    employees,
    employee,
    employeeFeedbacks
});

export default rootReducer;
