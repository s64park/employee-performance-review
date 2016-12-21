import React, { Component } from 'react';
import {Row, Col, Modal, Button } from 'react-bootstrap';
import PerformanceRatingForm from '../components/performanceRatingForm';
import RatingDefinition from '../components/ratingDefinition'
import EmployeeProfile from '../components/employeeProfile';
import Feedbacks from '../components/feedbacks';
import FeedbackAvailableEmployees from '../components/feedbackAvailableEmployees';
import {connect} from 'react-redux';
import { getEmployee } from '../actions/employee';
import { getPerformance, updatePerformance } from '../actions/performance';
import { getFeedbacks } from '../actions/feedback';

class AdminEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.handlePerformanceSave = this.handlePerformanceSave.bind(this);
        this.props.getEmployee(this.props.params.employeeId);
        this.props.getPerformance(this.props.params.employeeId, () => {
            this.props.getFeedbacks(this.props.params.employeeId);
        });
    }

    close() {
        this.setState({ showModal: false });
    }
    open() {
        this.setState({ showModal: true });
    }
    handlePerformanceSave(performance) {
        console.log("saving performance", performance);
        this.props.updatePerformance(performance, this.props.params.employeeId);
    }
    render() {
        console.log("profile", this.props.profile);
        console.log("performance", this.props.performance);
        return (
            <div>
                <h2>Employee Profile</h2>
                <EmployeeProfile employee={this.props.profile} />
                <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.open}
                >
                    Performance Review
                </Button>

                <Modal show={this.state.showModal} bsSize="large" aria-labelledby="contained-modal-title-lg">
                    <Modal.Header closeButton onHide={this.close}>
                        <Modal.Title bsClass="modal-title text-center">Employee performance Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.performance ?
                            <div>
                                <EmployeeProfile employee={this.props.profile} isReview={true} />
                                {this.props.performance.createdAt ?
                                    <Row>
                                        <Col sm={12} md={6}><h4>Date of Review: <span style={{fontSize: "15px"}}>{this.props.performance.createdAt.substr(0, 10)}</span></h4></Col>
                                        <Col sm={12} md={6}><h4>Manager: <span style={{fontSize: "15px"}}>{"Sanghyun Park (Senior director)"}</span></h4></Col>
                                    </Row>
                                    : undefined}
                                <hr className="style2"/>
                                <RatingDefinition />
                                <hr className="style3" />
                                <PerformanceRatingForm onSubmit={this.handlePerformanceSave} performance={this.props.performance}/>
                                <hr className="style8" />
                                <Feedbacks />
                                <FeedbackAvailableEmployees employeeId={this.props.params.employeeId}/>
                            </div> : undefined
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        profile: state.employee.profile,
        performance: state.employee.performance
    };
}

export default connect(mapStateToProps, {getEmployee, getPerformance, updatePerformance, getFeedbacks})(AdminEmployee);