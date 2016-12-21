/**
 * Created by Terry on 2016-12-17.
 */
import React, { Component } from 'react';
import {Row, Col, Jumbotron, Button, Modal } from 'react-bootstrap';
import EmployeePreview from '../components/employeePreview';
import NewEmployeeForm from '../components/newEmployeeForm';
import { getEmployees, addEmployee } from '../actions/employee';
import { connect } from 'react-redux';


const sampleEmployeeList = [
    {name: 'Sanghyun Park', job: 'FullStack Developer', department: 'IT', id: 1 },
    {name: 'Sanghyun Park', job: 'FullStack Developer', department: 'IT', id: 2 },
    {name: 'Sanghyun Park', job: 'FullStack Developer', department: 'IT', id: 3 },
    {name: 'Sanghyun Park', job: 'FullStack Developer', department: 'IT', id: 4 },
    {name: 'Sanghyun Park', job: 'FullStack Developer', department: 'IT', id: 5 },
    {name: 'Sanghyun Park', job: 'FullStack Developer', department: 'IT', id: 6 },
    {name: 'Sanghyun Park', job: 'FullStack Developer', department: 'IT', id: 7 },
    {name: 'Sanghyun Park', job: 'FullStack Developer', department: 'IT', id: 8 },
    {name: 'Sanghyun Park', job: 'FullStack Developer', department: 'IT', id: 9 }
];


class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.handleNewEmployeeForm = this.handleNewEmployeeForm.bind(this);
        this.props.getEmployees(); // get employees list
    }

    close() {
        this.setState({ showModal: false });
    }
    open() {
        this.setState({ showModal: true });
    }

    handleNewEmployeeForm(employee) {
        this.props.addEmployee(employee);
        this.close();
    }

    render() {
        console.log("list", this.props.employees.list);
        return (
            <div>
                <Jumbotron className="text-center">
                    <h1>Employees</h1>
                    <Button bsStyle="success" bsSize="large" onClick={this.open}>Add employee</Button>
                </Jumbotron>
                <Row style={{marginBottom: "20px"}}>
                    {this.props.employees.list.map(employee => {
                        return <EmployeePreview key={employee._id} {...employee} />;
                    })}
                </Row>

                <Modal show={this.state.showModal} bsSize="large" aria-labelledby="contained-modal-title-lg">
                    <Modal.Header closeButton onHide={this.close}>
                        <Modal.Title bsClass="modal-title text-center">New Employee Form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <NewEmployeeForm onSubmit={this.handleNewEmployeeForm} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        employees: state.employees
    };
}

export default connect(mapStateToProps ,{getEmployees, addEmployee})(Admin);