import jwt from 'jwt-simple';
import Employee from '../models/employee';
import Admin from '../models/admin';
import config from '../config';

function tokenForUser(user) {
    let date = new Date();
    date.setHours(date.getHours() + 1);
    const timestamp = date.getTime();
    return jwt.encode({ sub: user._id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
    const {username, password} = req.body;
    Admin.findOne({username}, (err, admin) => {
        if(err) { return next(err); }
        if (!admin) {
            //find if username is employee
            Employee.findOne({username}, (err, employee) => {
                if(err) { return next(err); }
                if(!employee) { return res.status(400).send({ error: "username and password does not match"}); }

                if (employee.validateHash(password)) {
                    return res.json({
                        status: 'employee', token: tokenForUser(employee), name: `${employee.firstname} ${employee.lastname}`, id: employee._id }
                    );
                } else {
                    return res.status(400).send({ error: "username and password does not match"});
                }

            });
        }
        else {
            if(admin.validateHash(password)) {
                return res.json({
                    status: 'admin', token: tokenForUser(admin), name: `${admin.firstname} ${admin.lastname}`}
                );
            } else {
                return res.status(400).send({ error: "username and password does not match"});
            }
        }
    })
}
