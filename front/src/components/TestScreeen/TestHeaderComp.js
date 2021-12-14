import React from 'react'
import {Col,Row} from 'react-bootstrap';


function TestHeaderComp() {
    return (
        <div>
            <Row>
                <Col md='2'  style={{textAlign:'center'}}>Aptitude Test</Col>
                <Col md='8' style={{textAlign:'center'}}>Time: 2:00:56/5:00:00</Col>
                <Col md='2' style={{textAlign:'center'}}>Total: 12</Col>
            </Row>
        </div>
    )
}

export default TestHeaderComp
