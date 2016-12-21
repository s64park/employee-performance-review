/**
 * Created by Terry on 2016-12-19.
 */
import Employee from '../models/employee';
import Feedback from '../models/feedback';

exports.getEmployeeFeedbacks = function(req, res, next) {
    const employeeId = req.params.employeeId;
    Employee.findById(employeeId).populate('submittedFeedbacks requiringFeedbacks').exec((err, employee) => {
        if (err) { return next(err); }
        if (!employee) { return res.status(400).send({ error: "Cant get feedbacks of non-existing employee"}); }
        const { requiringFeedbacks, submittedFeedbacks } = employee;
        return res.json({ requiringFeedbacks, submittedFeedbacks });
    })
};

exports.saveFeedback = function(req, res, next) {
    const feedbackId = req.params.feedbackId;
    Feedback.findById(feedbackId, (err, feedback) => {
        if(err) { return next(err); }
        if(!feedback) { return res.status(400).send({ error: "Cant save non-existing feedback"}); }
        // insert new contents to the feedback
        for(let key in req.body) {
            feedback[key] = req.body[key];
        }
        feedback.save((err) => {
            if(err) { return next(err); }
        });
        return res.json({ feedback });
    })

};

exports.submitFeedback = function(req, res, next) {
    const employeeId = req.params.employeeId;
    const feedbackId = req.params.feedbackId;
    Feedback.findById(feedbackId, (err, feedback) => {
        if(err) { return next(err); }
        if(!feedback) { return res.status(400).send({ error: "Cant save non-existing feedback"}); }
        // insert new contents to the feedback
        for(let key in req.body) {
            feedback[key] = req.body[key];
        }
        feedback.submitted = true;
        feedback.save((err) => {
            if(err) { return next(err); }
            Employee.findById(employeeId, (err, employee) => {
                if (err) { return next(err); }
                if(!employee) { return res.status(400).send({ error: "Can't changed requiring feedbacks to submitted feedbacks of non-existing employee"}); }
                let index = employee.requiringFeedbacks.indexOf(feedbackId);
                if(index !== -1) {
                    employee.requiringFeedbacks.splice(index, 1);
                }
                employee.submittedFeedbacks.push(feedbackId);
                employee.save((err) => {
                    if(err) { return next(err); }
                });
                return res.json({ feedback });
            })
        });

    })
};