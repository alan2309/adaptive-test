import React,{useRef,useState,useEffect} from 'react'
import {Col,Row} from 'react-bootstrap';
import Countdown from 'react-countdown';


function TestHeaderComp({timer,totalKey,totalValue}) {
    return (
        <div>
            <Row>
                <Col md='2'  style={{textAlign:'center'}}>Aptitude Test</Col>
                <Col md='8' style={{textAlign:'center'}}>
                    Time: {timer}
                    </Col>
                <Col md='2' style={{textAlign:'center'}}>{totalKey} : {totalValue}</Col>
            </Row>
        </div>
    )
}

export default TestHeaderComp
