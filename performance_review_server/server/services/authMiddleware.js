/**
 * Created by Terry on 2016-12-20.
 */
import Admin from '../models/admin';
import Employee from '../models/employee';
import jwt from 'jwt-simple';
import config from '../config';

export function adminAuth(req, res, next) {
    // check header or url parameters or post parameters for token
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    let decode;
    if(token) {
       // decode token and verify
        try {
            decode = jwt.decode(token, config.secret);
        } catch(e) {
            return res.status(401).send({ error: "Failed to authenticate token."});
        }
        Admin.findById(decode.sub, (err, admin) => {
            if(err) { return next(err); }
            if(!admin) { return res.status(401).send({ error: "Invalid Token"}); }
            if(decode.iat < new Date().getTime()) {
                return res.status(401).send({ error: "Token has been expired" });
            }
            return next();
        })
    }
    else {
        // if there is no token
        // return an error
        return res.status(403).send({
            error: "No token provided"
        })
    }
}

export function employeeAuth(req, res, next) {
    // check header or url parameters or post parameters for token
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    let decode;
    if(token) {
        // decode token and verify
        try {
            decode = jwt.decode(token, config.secret);
        } catch(e) {
            return res.status(401).send({ error: "Failed to authenticate token."});
        }
        Employee.findById(decode.sub, (err, admin) => {
            if(err) { return next(err); }
            if(!admin) { return res.status(401).send({ error: "Invalid Token"}); }
            if(decode.iat < new Date().getTime()) {
                return res.status(401).send({ error: "Token has been expired" });
            }
            return next();
        })
    }
    else {
        // if there is no token
        // return an error
        return res.status(403).send({
            error: "No token provided"
        });
    }
}