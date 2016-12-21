/**
 * Created by Terry on 2016-12-20.
 */
import React, {Component} from 'react'
import {Button, Collapse, Row, Col} from 'react-bootstrap';
import { saveFeedback, submitFeedback } from '../actions/feedback';
import { connect } from 'react-redux';

class FeedbackBoxTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            overall: this.props.overall || '',
            comments: this.props.comments || '',
        };
        this.handleSave = this.handleSave.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSave() {
        const { overall, comments } = this.state;
        const { employeeId, _id } = this.props;
        this.props.saveFeedback({overall, comments},employeeId, _id); //feedback contents, employeeId, feedbackId
    }

    handleSubmit(e) {
        const { overall, comments } = this.state;
        const { employeeId, _id } = this.props;
        this.props.submitFeedback({overall, comments},employeeId, _id); //feedback contents, employeeId, feedbackId
        e.preventDefault();
    }

    render() {
        const {reviewee: {name, title, department}, submitted, updatedAt} = this.props;
        console.log("state", this.state);
        console.log("props", this.props);
        return (
            <div className="feedback-box">
                <div onClick={ ()=> this.setState({ open: !this.state.open })}>
                    <Row>
                        <Col md={8}><h3>{name}</h3></Col>
                        <Col md={4}><h4>Date of Review: {updatedAt.substr(0,10)}</h4></Col>
                    </Row>
                    <p>{title}, {department}</p>
                </div>
                <Collapse in={this.state.open}>
                    <form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col md={2}><label>Overall: </label></Col>
                            <Col md={2}><label><input name="overall" type="radio" checked={this.state.overall === "E"} onChange={(e)=>{this.setState({overall: e.target.value})}} value="E" disabled={submitted} /> Exceeds Expectation</label></Col>
                            <Col md={2}><label><input name="overall" type="radio" checked={this.state.overall === "M"} onChange={(e)=>{this.setState({overall: e.target.value})}} value="M" disabled={submitted} /> Meets Expectation</label></Col>
                            <Col md={2}><label><input name="overall" type="radio" checked={this.state.overall === "NI"} onChange={(e)=>{this.setState({overall: e.target.value})}} value="NI" disabled={submitted} /> Needs Improvement</label></Col>
                            <Col md={2}><label><input name="overall" type="radio" checked={this.state.overall === "U"} onChange={(e)=>{this.setState({overall: e.target.value})}} value="U" disabled={submitted} /> Unsatisfactory</label></Col>
                            <Col md={2}><label><input name="overall" type="radio" checked={this.state.overall === "NA"} onChange={(e)=>{this.setState({overall: e.target.value})}} value="NA" disabled={submitted} /> Not Applicable</label></Col>
                        </Row>
                        <Row>
                            <Col md={12}><label>Employer Comments:</label></Col>
                            <Col md={12}>
                                <textarea style={{width: '100%', height: "200px"}} onChange={(e)=>{this.setState({ comments: e.target.value })}} name="comments" value={this.state.comments} disabled={submitted} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={8}/>
                            <Col md={2}><Button style={{width: '100%'}} bsSize="large" bsStyle="primary" type="button" onClick={this.handleSave} disabled={submitted}>Save</Button></Col>
                            <Col md={2}><Button style={{width: '100%'}} bsSize="large" bsStyle="success" type="submit" disabled={submitted} >Submit</Button></Col>
                        </Row>
                    </form>
                </Collapse>
            </div>
        );
    }
}

export default connect(null, {saveFeedback, submitFeedback})(FeedbackBoxTest);
