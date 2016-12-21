/**
 * Created by Terry on 2016-12-17.
 */
import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import {Row, Col, Button} from 'react-bootstrap';

const normalizePhone = (value, previousValue) => {
    if (!value) {
        return value;
    }
    const onlyNums = value.replace(/[^\d]/g, '');
    if (!previousValue || value.length > previousValue.length) {
        // typing forward
        if (onlyNums.length === 3) {
            return onlyNums + '-';
        }
        if (onlyNums.length === 6) {
            return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3) + '-';
        }
    }
    if (onlyNums.length <= 3) {
        return onlyNums;
    }
    if (onlyNums.length <= 6) {
        return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3);
    }
    return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3, 6) + '-' + onlyNums.slice(6, 10);
};

const validateList = [ "password", "firstname", "lastname", "title", "department", "contact", "address"];

const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = 'Required'
    } else if (values.username.length > 15) {
        errors.username = 'Must be 15 characters or less'
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    for (let i=0; i<validateList.length; i++) {
        if(!values[validateList[i]]) {
            errors[validateList[i]] = 'Required';
        }
    }

    return errors
}

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
);

class NewEmployeeForm extends Component {
    componentDidMount() {
        if (this.props.employee) {
            this.props.initialize({...this.props.employee});
        }
    }
    render(){
        const { handleSubmit, pristine, reset, submitting, employee } = this.props;
        return (
            <form onSubmit={handleSubmit} className="text-center">
                <Field name="username" type="text" component={renderField} label="Username: *"/>
                {!employee ? <Field name="password" type="password" component={renderField} label="Password: *"/> : undefined }
                <Field name="firstname" type="text" component={renderField} label="FIrstname: *"/>
                <Field name="lastname" type="text" component={renderField} label="Lastname: *"/>
                <Field name="title" type="text" component={renderField} label="Job Title: *"/>
                <Field name="department" type="text" component={renderField} label="Department: *"/>
                <Field name="email" type="email" component={renderField} label="Email: *"/>
                <Field name="contact" type="text" component={renderField} label="Contact Number: *" normalize={normalizePhone}/>
                <Field name="address" type="text" component={renderField} label="Full Address: *"/>
                <Row>
                    <Col md={3}/>
                    <Col md={3}><Button style={{width: "100%"}} bsStyle="primary" bsSize="large" type="submit" disabled={submitting}>Submit</Button></Col>
                    <Col md={3}><Button style={{width: "100%"}} bsStyle="success" bsSize="large" type="button" disabled={pristine || submitting} onClick={reset}>Reset</Button></Col>
                    <Col md={3}/>
                </Row>
            </form>
        );
    }
}

export default reduxForm({
    form: 'newEmployeeForm',  // a unique identifier for this form
    validate                // <--- validation function given to redux-form
})(NewEmployeeForm)