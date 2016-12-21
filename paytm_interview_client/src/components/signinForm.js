/**
 * Created by Terry on 2016-12-20.
 */
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Row, Col, Button } from 'react-bootstrap';

const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = 'Required'
    }
    if (!values.password) {
        errors.password = 'Required'
    }
    return errors
};

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <Row className="extra-space">
        <Col md={2} />
        <Col md={3}><label style={{width: "100%"}}>{label}</label></Col>
        <Col md={5}>
            <input style={{width: "100%"}} {...input} type={type}/>
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </Col>
        <Col md={2} />
    </Row>
)


const SigninForm = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <Field name="username" type="text" component={renderField} label="Username"/>
            <Field name="password" type="password" component={renderField} label="Password"/>
            <Row>
                <Col md={3}/>
                <Col md={3}><Button style={{width: "100%"}} bsStyle="primary" bsSize="large" type="submit" disabled={submitting}>Sign in</Button></Col>
                <Col md={3}><Button style={{width: "100%"}} bsStyle="success" bsSize="large" type="button" disabled={pristine || submitting} onClick={reset}>Clear Value</Button></Col>
                <Col md={3}/>
            </Row>
        </form>
    )
}

export default reduxForm({
    form: 'signin',  // a unique identifier for this form
    validate                // <--- validation function given to redux-form
})(SigninForm)
