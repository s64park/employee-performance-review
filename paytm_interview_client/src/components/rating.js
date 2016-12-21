/**
 * Created by Terry on 2016-12-15.
 */
import React from 'react';
import {Row, Col} from 'react-bootstrap';
import {Field} from 'redux-form';


const Rating = (props) => {
    return (
        <Row className="text-center">
            <Col md={2}>
                <Field name={props.name} component="input" type="radio" value="Q"/>
                <p>O</p>
            </Col>
            <Col md={2}>
                <Field name={props.name} component="input" type="radio" value="E"/>
                <p>E</p>
            </Col>
            <Col md={2}>
                <Field name={props.name} component="input" type="radio" value="M"/>
                <p>M</p>
            </Col>
            <Col md={2}>
                <Field name={props.name} component="input" type="radio" value="NI"/>
                <p>NI</p>
            </Col>
            <Col md={2}>
                <Field name={props.name} component="input" type="radio" value="U"/>
                <p>U</p>
            </Col>
            <Col md={2}>
                <Field name={props.name} component="input" type="radio" value="NA"/>
                <p>NA</p>
            </Col>
        </Row>
    )
};

export default Rating;