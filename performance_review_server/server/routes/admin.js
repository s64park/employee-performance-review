/**
 * Created by Terry on 2016-11-28.
 */
const express = require('express');
const Admin =  require('../controllers/admin');
import { adminAuth } from '../services/authMiddleware';
const router = express.Router();

router.route('/')
    .get(adminAuth, Admin.getEmployees)
    .post(adminAuth, Admin.addEmployee);

router.route('/:employeeId')
    .all(adminAuth)
    .get(Admin.getEmployee)
    .put(Admin.updateEmployee)
    .delete(Admin.deleteEmployee);

router.route('/performanceReview/:employeeId')
    .all(adminAuth)
    .get(Admin.getPerformanceReview)
    .put(Admin.updatePerformanceReview);

router.route('/feedback/:employeeId')
    .all(adminAuth)
    .get(Admin.getFeedbacks);

router.route('/feedback/:assignedEmployeeId/:employeeId')
    .all(adminAuth)
    .put(Admin.assignFeedback)
    .delete(Admin.unassignFeedback);



export default router;