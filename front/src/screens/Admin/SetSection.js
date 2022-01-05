import React,{useEffect} from 'react'
import { Col, Row } from 'react-bootstrap';
import { useLocation} from 'react-router-dom';
import { useNavigate } from "react-router";
import Clock from '../../img/Clock.svg'
import '../../css/AdminHomeScreen.css'

function SetSection(props) {
    const location = useLocation();
    const navigate = useNavigate()
    useEffect(() => {
        console.log('yes')
        if(location.state===null){
            navigate('/admin/home')
        }
     }, []);
    return (
        <div className='mainRec'>
            <div className='AdminSetSection'>
            <div className='basicRec secNm'>{location.state!==null?location.state.sectionName:null}</div>
           
           <Row style={{margin:'44px 0',padding:'0px 0px'}}> 
           <Col style={{padding:'0px'}}><div className='basicRec avQs' >
               Available Question
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
           <Col style={{padding:'0px'}}>
           <Row><Col><div className='basicRec easyMedHard'  style={{marginBottom:'28px',padding:'11px 10px'}}>Easy</div></Col></Row>
           <Row><Col><div className='basicRec easyMedHard' style={{marginBottom:'28px',padding:'11px 10px'}}>Medium</div></Col></Row>
           <Row><Col><div className='basicRec easyMedHard' style={{padding:'11px 10px'}} >Hard</div></Col></Row>
           </Col>
           </Row>
           <Row style={{margin:'44px 0'}}> <Col><div className='basicRec easyMedHard' style={{marginBottom:'28px',width: '90%',padding:'11px 10px'}}>60 : 00 : 00 <img style={{height:'25px',float:'right'}} alt="logo" src={Clock}></img>  </div></Col>           
           <Col style={{padding:'0px'}}>
           <div className='basicRec secNm' style={{marginBottom:'28px',padding:'11px 10px'}}>Total number of questions</div>
           </Col>
           </Row>
          

            </div>
            <Row style={{float:'right'}}>
           <button style={{color:'white'}} className='btn scTest'>Save</button><button style={{color:'white'}} className='btn scTest' onClick={(e)=>{navigate('/admin/setQs')}}>Set Question</button>

           </Row>
           
        </div>
    )
}

export default SetSection
