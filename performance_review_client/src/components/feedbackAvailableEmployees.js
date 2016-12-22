/**
 * Created by Terry on 2016-12-15.
 */
import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import FeedbackRequestBox from './feedbackRequestBox';
import { connect } from 'react-redux';
import { assignFeedback } from '../actions/feedback';

class FeedbackAvailableEmployees extends Component {
    render() {
        return(
            <div>
                <Row>
                    <Col md={12}><h3>Request Feedbacks: </h3></Col>
                </Row>
                <Row>
                    {this.props.unassignedEmployees.map(employee => {
                        const reviewerName = `${employee.firstname} ${employee.lastname}`;
                        const reviewerTitle = employee.title;
                        const reviewerDepartment = employee.department;
                        const {firstname, lastname, title, department} = this.props.profile;
                        const revieweeName = `${firstname} ${lastname}`;
                        const revieweeTitle = title;
                        const revieweeDepartment = department;
                        return (
                            <Col md={3} key={employee._id}><FeedbackRequestBox onClick={() => {
                                this.props.assignFeedback(
                                    employee._id,
                                    this.props.employeeId,
                                    {reviewerName, reviewerTitle, reviewerDepartment, revieweeName, revieweeTitle, revieweeDepartment}
                                )}}
                                name={reviewerName} title={reviewerTitle} department={reviewerDepartment} />
                            </Col>
                        )})}
                </Row>
            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        unassignedEmployees: state.employee.unassignedEmployees,
        profile: state.employee.profile
    };
}

export default connect(mapStateToProps, {assignFeedback})(FeedbackAvailableEmployees);

