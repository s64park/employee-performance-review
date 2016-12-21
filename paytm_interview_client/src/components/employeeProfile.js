/**
 * Created by Terry on 2016-12-15.
 */
import React from 'react';
import {Row, Col} from 'react-bootstrap';
import yearCalculator from '../util/yearCalculator';

const EmployeeProfile = (props) => {
    const loading = (<div>Loading...</div>);

    return(
        <div>
            {!props.employee ? loading :
            <div>
                <Row>
                    <Col sm={12}><h4>Employee Name: <span style={{fontSize: "15px"}}>{props.employee.firstname} {props.employee.lastname} {`(${props.employee.username})`}</span></h4></Col>
                </Row>
                <Row>
                    <Col sm={12} md={6}><h4>Department: <span style={{fontSize: "15px"}}>{props.employee.department}</span></h4></Col>
                    <Col sm={12} md={6}><h4>Job Position: <span style={{fontSize: "15px"}}>{props.employee.title}</span></h4></Col>
                </Row>
                    <Row>
                        <Col sm={12} md={6}><h4>Email: <span style={{fontSize: "15px"}}>{props.employee.email}</span></h4></Col>
                        <Col sm={12} md={6}><h4>Contact: <span style={{fontSize: "15px"}}>{props.employee.contact}</span></h4></Col>
                    </Row>
                {!props.isReview ?
                    <div>
                        <Row>
                            <Col sm={12} md={6}><h4>Starting Date: <span style={{fontSize: "15px"}}>{props.employee.createdAt.substr(0, 10)}</span></h4></Col>
                            <Col sm={12} md={6}><h4>Years: <span style={{fontSize: "15px"}}>{yearCalculator(props.employee.createdAt)}</span></h4></Col>
                        </Row>
                        <Row>
                            <Col md={12}><h4>Address: <span style={{fontSize: "15px"}}>{props.employee.address}</span></h4></Col>
                        </Row>
                    </div>
                    : undefined
                }
            </div>
            }
        </div>
    );
};

export default EmployeeProfile;