/**
 * Created by Terry on 2016-12-15.
 */
import React from 'react';
import {Row, Col} from 'react-bootstrap';


const ReviewField = (props) => {
    return (
        <Row>
            <Col md={12}>
                <p><strong>{props.field}: </strong>{props.detail}.</p>
            </Col>
        </Row>
    )
};

export default ReviewField;