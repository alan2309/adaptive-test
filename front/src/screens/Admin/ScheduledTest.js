import React from 'react'
import {Row, Col } from 'react-bootstrap'
import '../../css/SchdlTest.css';
function ScheduledTest() {
    return (
        <div className='SchdlTest'>
            <Row style={{margin:'0 0 0 10%'}}>

                <Col md={6} style={{marginRight:'0%'}}> <div className='basicRec' style={{minHeight:window.screen.height-300,width:'90%',}}>
                   <h4 style={{paddingLeft:'30%',paddingTop:'10px'}}>Scheduled Test</h4> 
                   <div className='lineThrough'></div>
                    </div></Col>
                <Col md={6} style={{marginRight:'0%'}}> <div className='basicRec' style={{minHeight:window.screen.height-300,width:'90%',}}>
                   <h4 style={{paddingLeft:'30%',paddingTop:'10px'}}>Upcoming Test</h4> 
                   <div className='lineThrough'></div>
                    </div></Col>
            </Row>
        </div>
    )
}

export default ScheduledTest
