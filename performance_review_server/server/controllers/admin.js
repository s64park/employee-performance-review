/**
 * Created by Terry on 2016-12-14.
 */
import Employee from '../models/employee';
import Admin from '../models/admin';
import Performance from '../models/performance'
import Feedback from '../models/feedback';

const sampleAdmin = {
    username: "admin",
    password: "password",
    firstname: "Danny",
    lastname: "Park",
    email: "admin@gmail.com",
    title: "CEO",
    department: "BOD",
};
// This is for convenience, since admin account can't be created through user site.
exports.createAdmin = function(req, res, next) {
    Admin.findOne({username: sampleAdmin.username}, (err, admin) => {
        if (err) { return next(err); }
        if (!admin) {
            const newAdmin = new Admin({
                ...sampleAdmin
            });
            newAdmin.password = newAdmin.generateHash(sampleAdmin.password);
            newAdmin.save((err) => {
                if (err) { return next(err); }
            });
            res.json({admin: newAdmin});
        }
    })
};

// Consider of changing after UI is built
exports.getEmployees = function(req, res, next) {
    Employee.find({}, (err, employees) => {
        if (err) { next(err); }
        return res.json({ employees });
    });
};

// Add employee --- Only admin can add employee
exports.addEmployee = function(req, res, next) {
    const {username, password, firstname, lastname, email, title, department, contact, address } = req.body;
    Employee.findOne({ username }, (err, employee) => {
        if (err) { return next(err); }
        if (employee) {
            return res.status(400).send({ error: "the employee is already registered" });
        }
        const newEmployee = new Employee({
            username, firstname, lastname, email, title, department, contact, address
        });
        newEmployee.password = newEmployee.generateHash(password);
        // password should be encrypted
        newEmployee.save((err) => {
            if (err) { return next(err); }
            // After the authentication part is done, we can get admin data from req.admin
            // temporaliy use header.adminId
            res.json({employee: newEmployee}); //send admin information
        });
    });
};

exports.getEmployee = function(req, res, next) {
    const employeeId = req.params.employeeId;
    Employee.findById(employeeId, (err, employee) => {
        if (err) { next(err); }
        if (!employee) { return res.status(400).send({ error: "The employee is not registered"}); }
        return res.json({ employee });
    });
};

exports.updateEmployee = function(req, res, next) {
    const employeeId = req.params.employeeId;
    Employee.findById(employeeId, (err, employee) => {
        if (err) { next(err); }
        if (!employee) { return res.status(400).send({ error: "The employee is not registered"}); }
        for (let key in req.body) {
            employee[key] = req.body[key];
        }
        employee.save((err) => {
            if (err) return next(err);
        });
        return res.json({ employee });
    });
};

exports.deleteEmployee = function(req, res, next) {
    const employeeId = req.params.employeeId;
    Employee.findByIdAndRemove(employeeId, (err, resp) => {
        if (err) { return next(err); }
        Performance.findOne({employeeId}, (err, performance) => {
            if(err) { return next(err); }
            if(performance) {
                // Remove related feedbacks
                Feedback.find({'_id': { $in: [...performance.feedbacks]}}).remove((err) => {
                    if(err) { return next(err); }
                });
                // Remove the user's performance
                performance.remove((err) => {
                    if (err) {return next(err);}
                })
            }
        });
        return res.json({ resp });
    });
};

exports.getPerformanceReview = function(req, res, next) {
    const employeeId = req.params.employeeId;
    Performance.findOne({employeeId}, (err, performance) => {
        if (err) { return next(err); }
        if (!performance) {
            const newPerformance = new Performance({
                employeeId
            });

            newPerformance.save((err) => {
                if (err) return next(err);
            });
            return res.json({ performance: newPerformance });
        }
        else {
            return res.json({ performance });
        }

    })
};

exports.addPerformanceReview = function(req, res, next) {
    const employeeId = req.params.employeeId;
    Performance.findOne({employeeId}, (err, performanceReview) => {
        if (err) { return next(err); }
        if (performanceReview) { return res.status(400).send({ error: "The employee has already been created the performance review"}); }
        const newPerformanceReview = new Performance({ employeeId });
        for(let key in req.body) {
            newPerformanceReview[key] = req.body[key];
        }
        newPerformanceReview.save((err) => {
            if (err) { return next(err); }
        });
        res.json({ performanceReview: newPerformanceReview });
    });
};

exports.updatePerformanceReview = function(req, res, next) {
    const employeeId = req.params.employeeId;
    Performance.findOne({employeeId}, (err, performance) => {
        if (err) { return next(err); }
        if (!performance) { return res.status(400).send({ error: "Does not have the performance review, add it first"}); }
        for (let key in req.body) {
            performance[key] = req.body[key];
        }
        performance.updatedAt = new Date();
        performance.save((err) => {
            if (err) { return next(err); }
        });
        res.json({ performance });
    });
};

exports.getFeedbacks = function(req, res, next) {
    const employeeId = req.params.employeeId;
    let assignedEmployee = [];

    Performance.findOne({employeeId}).populate('feedbacks').exec((err, performance) => {
        if (err) { return next(err); }
        if (!performance) { return res.json({ error: "Can't have feedbacks of non-existing performance"}); }
        for (let i=0; i<performance.feedbacks.length; i++) {
            assignedEmployee.push(performance.feedbacks[i].reviewer._id);
        }
        Employee.find({_id: { $nin: assignedEmployee }}, (err, employees) => {
            if (err) { return next(err); }
            res.json({ assignedFeedbacks: performance.feedbacks, unassignedEmployees: employees });
        });
    });
};

exports.assignFeedback = function(req, res, next) {
    const employeeId = req.params.employeeId;
    const assignedEmployeeId = req.params.assignedEmployeeId;
    const { reviewerName, reviewerTitle, reviewerDepartment, revieweeName, revieweeTitle, revieweeDepartment } = req.body;
    Feedback.findOne({'reviewer._id': assignedEmployeeId, 'reviewee._id': employeeId}, (err, feedback) => {
        if (err) { return next(err); }
        if (feedback) { return res.status(400).send({ error: "Feedback has already been created"}); }
        const newFeedback = new Feedback({
            reviewer: {
                _id: assignedEmployeeId,
                name: reviewerName,
                title: reviewerTitle,
                department: reviewerDepartment
            },
            reviewee: {
                _id: employeeId,
                name: revieweeName,
                title: revieweeTitle,
                department: revieweeDepartment
            }
        });
        newFeedback.save((err) => {
            if (err) { return next(err); }

            Performance.findOne({employeeId}, (err, performance) => {
                if (err) { return next(err); }
                if (!performance) { return res.status(400).send({ error: "Performance must be created before assigning feedbacks"}); }

                if (performance.feedbacks.indexOf(newFeedback._id) === -1) {
                    performance.feedbacks.push(newFeedback._id);
                }
                performance.save((err) => {
                    if(err) { return next(err); }
                });
                Employee.findById(assignedEmployeeId, (err, employee) => {
                    if (err) { return next(err); }
                    employee.requiringFeedbacks.push(newFeedback._id);
                    employee.save((err) => {
                        return next(err);
                    });
                });
                return res.json({ assignedFeedback: newFeedback });
            });
        })
    });
};

exports.unassignFeedback = function(req, res, next) {
    const employeeId = req.params.employeeId;
    const assignedEmployeeId = req.params.assignedEmployeeId;
    Feedback.findOne({'reviewer._id': assignedEmployeeId, 'reviewee._id': employeeId}, (err, feedback) => {
        if (err) { return next(err); }
        if (!feedback) { return res.status(400).send({ error: "Can't unassign feedback that does not exist"}); }
            Performance.findOne({employeeId}, (err, performance) => {
                if (err) { return next(err); }
                if (!performance) { return res.status(400).send({ error: "Performance must be created before unassigning feedbacks"}); }

                    let index = performance.feedbacks.indexOf(feedback._id);
                    if (index !== -1) {
                        performance.feedbacks.splice(index, 1);
                    }
                    performance.save((err) => {
                        if(err) { return next(err); }
                    });
                    Employee.findById(assignedEmployeeId, (err, employee) => {
                        if (err) { return next(err); }
                        let requiringIndex = employee.requiringFeedbacks.indexOf(feedback._id);
                        let submittedIndex = employee.submittedFeedbacks.indexOf(feedback._id);
                        if(requiringIndex !== -1) {
                            employee.requiringFeedbacks.splice(requiringIndex,1);
                        } else if (submittedIndex !== -1) {
                            employee.submittedFeedbacks.splice(submittedIndex,1);
                        }
                        employee.save((err) => {
                            return next(err);
                        });
                        feedback.remove((err) => {
                            if(err) { return next(err); }
                        });
                        return res.json({ unassignedEmployee: employee });
                    });

            });
        })
};