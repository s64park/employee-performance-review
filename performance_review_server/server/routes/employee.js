const express = require('express');
const Employee =  require('../controllers/employee');
import { employeeAuth } from '../services/authMiddleware';

const router = express.Router();

router.route('/:employeeId')
    .all(employeeAuth)
    .get(Employee.getEmployeeFeedbacks);

router.route('/:employeeId/:feedbackId')
    .all(employeeAuth)
    .put(Employee.saveFeedback)
    .post(Employee.submitFeedback);

export default router;