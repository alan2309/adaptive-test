import React from 'react'
import {Col,Row} from 'react-bootstrap';


function TestHeaderComp({timer,totalKey,timeKey,totalValue}) {
    return (
        <div id='testHeaderComp' >
            <Row >
                <Col md='4'  style={{textAlign:'center'}}><div >Aptitude Test</div></Col>
                <Col md='5' style={{textAlign:'center'}}>
                {timeKey}: {timer}
                    </Col>
                <Col md='3' style={{textAlign:'center'}}>{totalKey} : {totalValue}</Col>
            </Row>
        </div>
    )
}

export default TestHeaderComp
