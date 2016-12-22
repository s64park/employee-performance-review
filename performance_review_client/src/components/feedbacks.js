/**
 * Created by Terry on 2016-12-15.
 */
import React, {Component} from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { unassignedFeedback } from '../actions/feedback';
import ratingTransformer from '../util/ratingTransformer';

class Feedbacks extends Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.assignedFeedbacks !== this.props.assignedFeedbacks) {
            return true;
        }
    }

    render() {
        return (
            <div>
                <Row>
                    <Col md={12}><h3>Feedbacks: </h3></Col>
                </Row>
                {this.props.assignedFeedbacks.map(feedback => {
                    const submitted = (
                        <div className="feedback-box">
                            <Row>
                                <Col md={11}><h4>{feedback.reviewer.name} Submitted feedback</h4></Col>
                                <Col md={1}><Button style={{width: "100%"}} type="button" onClick={() => {this.props.unassignedFeedback(feedback.reviewer._id, feedback.reviewee._id)}}>X</Button></Col>
                            </Row>
                            <Row>
                                <Col md={12}><p>Overall: {ratingTransformer(feedback.overall)}</p></Col>
                            </Row>
                            <Row>
                                <Col md={12}><p>Comments:  {feedback.comments}</p></Col>
                            </Row>
                        </div>
                    );
                    const pending = (
                        <div className="feedback-box">
                            <Row>
                                <Col md={11}><h4>Waiting for feedback from {feedback.reviewer.name} </h4></Col>
                                <Col md={1}><Button type="button" onClick={() => {this.props.unassignedFeedback(feedback.reviewer._id, feedback.reviewee._id)}}>X</Button></Col>
                            </Row>
                        </div>
                    );
                    return (
                        <div key={feedback._id}>
                            {feedback.submitted ? submitted : pending}
                        </div>
                    );
                })}
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        assignedFeedbacks: state.employee.assignedFeedbacks
    }
}



export default connect(mapStateToProps, {unassignedFeedback})(Feedbacks);