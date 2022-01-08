import React from 'react'
import {Col,Row} from 'react-bootstrap';
import CustomTimer from '../../screens/Admin/CustomTimer';


function TestHeaderComp({timer,totalKey,timeKey,totalValue}) {
    return (
        <div id='testHeaderComp' >
            <Row >
                <Col md='4'  style={{textAlign:'center'}}><div >Aptitude Test</div></Col>
                <Col md='6' style={{whiteSpace: 'nowrap',display:'inline-block'}}>
                {timeKey}:<CustomTimer time={timer} ></CustomTimer>
                    </Col>
                <Col md='2' style={{textAlign:'center'}}>{totalKey} : {totalValue}</Col>
            </Row>
        </div>
    )
}

export default TestHeaderComp
