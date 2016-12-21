/**
 * Created by Terry on 2016-12-16.
 */
import React from 'react';

const FeedbackRequestBox = (props) => {
    return (
        <div className="feedback-box" onClick={props.onClick}>
            <p>{props.name}</p>
            <p>{props.title}</p>
            <p>{props.department} department</p>
        </div>
    )
};

export default FeedbackRequestBox;