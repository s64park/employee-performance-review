/**
 * Created by Terry on 2016-12-17.
 */
import React, { Component } from 'react';
import {Row, Col, Button, Modal} from 'react-bootstrap';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import { removeEmployee, updateEmployee } from '../actions/employee';
import NewEmployeeForm  from './newEmployeeForm';

class EmployeePreview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.handleNewEmployeeForm = this.handleNewEmployeeForm.bind(this);
        this.handleRemoveEmployee = this.handleRemoveEmployee.bind(this);
    }

    close() {
        this.setState({ showModal: false });
    }
    open() {
        this.setState({ showModal: true });
    }

    handleRemoveEmployee() {
        this.props.removeEmployee(this.props._id);
    };

    handleNewEmployeeForm(employee) {
        this.props.updateEmployee(employee, this.props._id);
        this.close();
    }

    render() {
        const { _id, username, password, firstname, lastname, title, department, email, contact, address } = this.props;
        return (
            <div>
                <Col lg={4} className="preview-box">
                    <Row>
                        <Col md={10}><h2>{`${firstname} ${lastname}`}</h2></Col>
                        <Col md={2}><Button style={{width: "100%"}} type="button" onClick={this.handleRemoveEmployee}>X</Button></Col>
                    </Row>
                    <p>Position: {title}</p>
                    <p>Department: {department}</p>
                    <Row>
                        <Col md={6}><Link to={`/admin/${_id}`} className="btn btn-primary" role="button">View details</Link></Col>
                        <Col md={6}><Button type="button" bsStyle="success" onClick={this.open}>Change Profile</Button></Col>
                    </Row>
                </Col>
                <Modal show={this.state.showModal} bsSize="large" aria-labelledby="contained-modal-title-lg">
                    <Modal.Header closeButton onHide={this.close}>
                        <Modal.Title bsClass="modal-title text-center">New Employee Form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <NewEmployeeForm employee={{username, password, firstname, lastname, title, department, email, contact, address}} onSubmit={this.handleNewEmployeeForm} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
};

export default connect(null, {removeEmployee, updateEmployee})(EmployeePreview);