import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { useLocation} from 'react-router-dom';
import { useNavigate } from "react-router";
import Clock from '../../img/Clock.svg'
import '../../css/AdminHomeScreen.css'

function NextSection() {
    return (
        <div >
            <div className='basicRec' style={{margin:'50px 250px 0 250px',paddingTop:'20px',height:'400px'}}>
            <div className='AdminSetSection'>
            <div className='basicRec secNm'>Aptitude</div>
           
           <Row style={{margin:'44px 0',padding:'0px 0px'}}> 
           <Col md='7' style={{padding:'0px'}}><div className='basicRec avQs' style={{height:'200px'}} >
                Question Set
               <Row style={{padding:'20px 10px 0px 40px'}}>
                   <Col><Row className='remQs'>50</Row></Col>
                   <Col><Row className='remQs'>50</Row></Col>
                   <Col><Row className='remQs'>50</Row></Col>
                   
               </Row>
               <Row style={{padding:'0px 15px 0px 30px'}} >
                   <Col style={{padding:'0px 0px 0px 15px'}}>Easy</Col>
                   <Col >Medium</Col>
                   <Col><Row style={{padding:'0px 0px 0px 15px'}}>Hard</Row></Col>
                   
               </Row>
               </div></Col>
           <Col style={{padding:'30px 0'}}>
           <Row><Col><div className='basicRec easyMedHard' style={{marginBottom:'28px',padding:'11px 10px'}}>60 : 00 : 00 <img style={{height:'25px',float:'right'}} alt="logo" src={Clock}></img>  </div></Col></Row>
          
           <Row><Col><div className='basicRec easyMedHard' style={{padding:'11px 10px'}} >15 Question per section</div></Col></Row>
           </Col>
           </Row>
         
          

            </div>

            </div>
            <Row style={{paddingTop:'20px',paddingLeft:'450px'}}>
           <button style={{color:'white'}} className='btn scTest' style={{width:'300px',color:'white',marginLeft:'90px',marginTop:'25px',height:'40px'}}>Save and Continue to next section</button>

           </Row>
            
        </div>
    )
}

export default NextSection
