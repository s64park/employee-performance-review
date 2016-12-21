/**
 * Created by Terry on 2016-12-20.
 */
const express = require('express');
const Authentication =  require('../controllers/authentication');
const Admin = require('../controllers/admin');
const router = express.Router();

// this is just for convenience
router.route('/createAdmin')
    .post(Admin.createAdmin);

router.route('/signin')
    .post(Authentication.signin);

export default router;