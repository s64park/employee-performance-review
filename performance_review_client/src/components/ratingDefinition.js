/**
 * Created by Terry on 2016-12-15.
 */
import React from 'react';
import {Row, Col} from 'react-bootstrap';

const PerformanceDefinition = (props) => {
    return (
        <div>
            <Row>
                <Col md={4}><h4>Summary of Performance:</h4></Col>
                <Col md={8}><h4>Performance Definitiion:</h4></Col>
            </Row>
            <Row>
                <Col md={1}><p><strong>O</strong></p></Col>
                <Col md={3}><p>Outstanding</p></Col>
                <Col md={8}><p>Performance is superior on a consistent and sustained basis</p></Col>
            </Row>
            <Row>
                <Col md={1}><p><strong>E</strong></p></Col>
                <Col md={3}><p>Exceeds Expectations</p></Col>
                <Col md={8}><p>Performance exceeds normal job requirements.</p></Col>
            </Row>
            <Row>
                <Col md={1}><p><strong>M</strong></p></Col>
                <Col md={3}><p>Meets Expectations</p></Col>
                <Col md={8}><p>Performance meets position requirements.</p></Col>
            </Row>
            <Row>
                <Col md={1}><p><strong>NI</strong></p></Col>
                <Col md={3}><p>Needs Improvement</p></Col>
                <Col md={8}><p>Performance meets some position requirements, objectives and expectations.</p></Col>
            </Row>
            <Row>
                <Col md={1}><p><strong>U</strong></p></Col>
                <Col md={3}><p>Unsatisfactory</p></Col>
                <Col md={8}><p>Performance does not meet position requirements, objectives and expectations.
                    Immediate attention to improvement is required.</p></Col>
            </Row>
            <Row>
                <Col md={1}><p><strong>NA</strong></p></Col>
                <Col md={3}><p>Not Applicable</p></Col>
                <Col md={8}><p>Criterion does not apply to this position.</p></Col>
            </Row>
        </div>
    );
};

export default PerformanceDefinition;
