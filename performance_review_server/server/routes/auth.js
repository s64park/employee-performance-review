/**
 * Created by Terry on 2016-12-20.
 */
const express = require('express');
const authentication =  require('../controllers/authentication');

const router = express.Router();

router.route('/signin')
    .post(authentication.signin);

export default router;