import React from 'react'
import {Col,Row} from 'react-bootstrap';


function QuestionNavigatorComp() {
    return (
        <div>
            <Row>
                <Col >
                <div style={{textAlign:'center'}}>
                Question Navigator
                </div>
                </Col>
            </Row>
            <Row>
                <Row style={{paddingTop:'20px'}}>
                    <Col md='4' sm='6'> <div className='navigatorBox'>1</div></Col>
                    <Col md='4' sm='6'> <div className='navigatorBox'>2</div></Col>
                    <Col md='4' sm='6'> <div className='navigatorBox'>3</div></Col>
                    <Col md='4' sm='6'> <div className='navigatorBox'>4</div></Col>
                    <Col md='4' sm='6'> <div className='navigatorBox'>5</div></Col>
                </Row>
            </Row>
        </div>
    )
}

export default QuestionNavigatorComp
