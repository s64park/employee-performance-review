/**
 * Created by Terry on 2016-12-17.
 */
import React, {Component} from 'react';
import FeedbackBox from './feedbackBox';
import { getEmployeeFeedbacks } from '../actions/feedback';
import { connect } from 'react-redux';

class Employee extends Component {
    constructor(props) {
        super(props);
        this.props.getEmployeeFeedbacks(this.props.params.employeeId);
    }

    componentWillUnmount() {
        localStorage.removeItem('feedbackFormNumber');
    }

    render() {
        const { requiringFeedbacks, submittedFeedbacks } = this.props.feedbacks;
        return (
            <div>
                {requiringFeedbacks ?
                    (<div>
                    <h2>Requiring Feedback List:</h2>
                    {requiringFeedbacks.map(feedback => {
                            return <FeedbackBox key={feedback._id} {...feedback} employeeId={this.props.params.employeeId}/>
                    })}
                    </div>) : undefined
                }
                {submittedFeedbacks ?
                    (<div>
                        <h2>Submitted Feedback List:</h2>
                        {submittedFeedbacks.map(feedback => {
                                return <FeedbackBox key={feedback._id} {...feedback} />
                        })}
                    </div>) : undefined
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        feedbacks: state.employeeFeedbacks
    };
}

export default connect(mapStateToProps, {getEmployeeFeedbacks})(Employee);