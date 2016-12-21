/**
 * Created by Terry on 2016-12-15.
 */
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Row, Col, Button } from 'react-bootstrap';
import Rating from './rating';
import ReviewField from './reviewField';
import cameralize from '../util/camerlize';

const reviewCatagories = [
    {field: "Quality of Work", detail: "Work product is complete, accurate and in an acceptable format"},
    {field: "Quantity of Work", detail: "Completes assigned work efficiently and in an organized manner within an established time\
        frame, works to complete objectives and sees a task through to the end while taking into consideration current\
    responsibilities and workload"},
    {field: "Individual Effectiveness", detail: "Displays a cooperative attitude in the workplace, exhibits tact and sincerity with \
        others to achieve objectives"},
    {field: "Communication", detail: " Expresses ideas and information in writing and verbally, in a manner that is complete, clear,\
        concise, organized and appropriate to the audience. Conveys information to supervisors, peers and customers\
        in a timely, clear and concise manner. Listens to others, and is open-minded to and evaluates suggestions from\
    others"},
    {field: "Service Focus", detail: "Takes a personal interest in both internal and external customers, creates a pleasant\
        atmosphere for interaction and takes appropriate action to meet their needs"},
    {field: "Judgment and Decision Making", detail: "Realistically weighs and evaluates information, separates important from\
        unimportant, assesses probable consequences and takes appropriate action, and demonstrates the ability to\
    make sound and timely decisions. Accountable for results and selects decision alternatives that meet the\
    objectives of the department."},
    {field: "Team Building", detail: ": Actively seeks and achieves group participation to improve work, sets priorities, is innovative\
        and solves problems"},
    {field: "Initiative", detail: "Generates ideas and initiates action to seek information to solve problems or follow through with a\
        task; self-starter"},
    {field: "Ongoing Skills Improvement", detail: "Displays an interest in and uses initiative to not only maintain current skills, but\
        also continuously upgrade skills to meet changing requirements of the job"},
    {field: "Dependability", detail: "Exhibits reliability in being available for work, sometimes without close supervision, and takes\
        ownership in the work to be performed"},
    {field: "Safe Work Practice", detail: "Follows established policies and procedures to ensure a safe work environment"},
    {field: "Attendance and Punctuality", detail: "Does employee’s attendance and punctuality meet company standards?"}
];


class PerformanceRatingForm extends Component {
    componentDidMount() {
        if (this.props.performance) {
            const {qualityOfWork, quantityOfWork, individualEffectiveness, communication, serviceFocus, judgementAndDecisionMaking, teamBuilding, initiative,
                ongoingSkillsImprovement, dependability, safeWorkPractice, attendanceAndPuntuality, overall, employerComments} = this.props.performance;
            this.props.initialize({qualityOfWork, quantityOfWork, individualEffectiveness, communication, serviceFocus, judgementAndDecisionMaking, teamBuilding, initiative,
                ongoingSkillsImprovement, dependability, safeWorkPractice, attendanceAndPuntuality, overall, employerComments});
        }
    }

    render() {
        const { handleSubmit, invalid, submitting, pristine, reset } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                {reviewCatagories.map((category) => {
                    const camerlizedField = cameralize(category.field);
                    return (
                        <div key={camerlizedField}>
                            <ReviewField field={category.field} detail={category.detail}/>
                            <Rating name={camerlizedField}/>
                            <hr className="style3"/>
                        </div>
                    );
                })}
                <Row>
                    <Col md={3}><label>Overall: </label></Col>
                    <Col md={3}><label><Field name="overall" component="input" type="radio" value="E"/> Exceeds Expectation</label></Col>
                    <Col md={3}><label><Field name="overall" component="input" type="radio" value="M"/> Meets Expectation</label></Col>
                    <Col md={3}><label><Field name="overall" component="input" type="radio" value="U"/> Unsatisfactory</label></Col>
                </Row>
                <hr className="style3"/>
                <Row>
                    <Col md={12}><label>Employer Comments:</label></Col>
                    <Col md={12}>
                        <Field style={{width: '100%', height: "200px"}} name="employerComments" component="textarea"/>
                    </Col>
                </Row>
                <hr className="style3"/>
                <Row className="text-center">
                    <Col md={8}/>
                    <Col md={2}><Button style={{width: '100%'}} bsSize="large" bsStyle="primary" type="submit" disable={ invalid || submitting }>Save</Button></Col>
                    <Col md={2}><Button style={{width: "100%"}} bsStyle="success" bsSize="large" type="button" disabled={ pristine || submitting } onClick={reset}>Reset</Button></Col>
                </Row>
            </form>
        )
    }

}

export default reduxForm({
    form: 'performanceRatingForm'
})(PerformanceRatingForm);