import React,{useEffect,useState} from 'react'
import { Col, Row } from 'react-bootstrap';
import { useLocation} from 'react-router-dom';
import { useNavigate } from "react-router";
import Clock from '../../img/Clock.svg'
import '../../css/AdminHomeScreen.css';
import $ from "jquery";
import axios from 'axios';

function NewTest() {
    //Current Sec Data
    const[easy,setEasy] = useState([])
    const[med,setMed] = useState([])
    const[hard,setHard] = useState([])
    const[qs,setQs] = useState(0)
    const[time,setTime] = useState('00:00:00')
    const[axData,setAxData] = useState([])
    const[sectionName,setSectionName] = useState([])
    const[sid,setSid] = useState(0)
    //

    const location = useLocation();
    const navigate = useNavigate()

    function secOnCLick(e,index){
        console.log(e.target.innerText)
        console.log(axData[index])
        var chngSec=axData[index]
        setSectionName(chngSec.section)
            setEasy(chngSec.easy)
            setHard(chngSec.hard)
            setMed(chngSec.medium)
            setQs(chngSec.qs)
            setTime(chngSec.time)
            setSid(index+1)

        $(e.target).addClass('sectionOnCLickToggle')

        Array.from(document.querySelectorAll('.sectionClick')).forEach(function(el) { 
            if(e.target!==el){
           el.classList.remove('sectionOnCLickToggle')
        }
        });
    }
    
    $( document.getElementById('listSec') ).ready(function() {
        console.log( "ready!" );
        Array.from(document.querySelectorAll('.sectionClick')).forEach(function(el,index) { 
            if(index+1===sid){
                el.classList.add('sectionOnCLickToggle')
            }
        });

    });

    useEffect(() => {
        var ssid;
        if(localStorage.getItem('isNewTestReload')!==null){
            ssid=0
            setSid(ssid+1)
            
        }else{
            localStorage.setItem('isNewTestReload',false)
            ssid=location.state.sid
            setSid(parseInt(ssid+1))
        }
        
        
        const data =async ()=>await axios.get(`http://127.0.0.1:8000/api/subs`)
        .then(res=>{
            var d=res.data.data
            console.log(d)
            setAxData(d)
        
            //For Aptitude
            
            setSectionName(d[ssid].section)
            setEasy(d[ssid].easy)
            setHard(d[ssid].hard)
            setMed(d[ssid].medium)
            setQs(d[ssid].qs)
            setTime(d[ssid].time)
            
        })
        .catch(e=>{
            console.log(e)
        })
        data()
     }, []);
    return (
        <Row>
        <Col md={3}> <div className='basicRec' id='listSec' style={{height:'70%',marginTop:'20%',overflow:'hidden'}}>
            <Row>
                <Col md={12}><div className='sectionClick' onClick={(e)=>secOnCLick(e,0)}>Aptitude</div></Col>
            </Row>
            <Row>
                <Col md={12}><div className='sectionClick' onClick={(e)=>secOnCLick(e,1)}>Computer Fundamentals</div></Col>
            </Row>
            <Row>
                <Col md={12}><div className='sectionClick' onClick={(e)=>secOnCLick(e,2)}>Domain</div></Col>
            </Row>
            <Row>
                <Col md={12}><div className='sectionClick' onClick={(e)=>secOnCLick(e,3)}>Personality</div></Col>
            </Row>
            <Row>
                <Col md={12}><div className='sectionClick' onClick={(e)=>secOnCLick(e,4)}>Analytical Writing</div></Col>
            </Row>
            <Row>
                <Col md={12}><div className='sectionClick' onClick={(e)=>secOnCLick(e,5)}>Coding</div></Col>
            </Row>
            
          
            </div></Col>
        <Col>  <div className='mainRec'>
           
                <div className='AdminSetSection'>
            <div className='basicRec secNm'>{sectionName}</div>
           <Row style={{margin:'44px 0',padding:'0px 0px'}}> 
           <Col style={{padding:'0px'}}><div className='basicRec avQs' >
               Available Question
               <Row style={{padding:'20px 10px 0px 40px'}}>
                   <Col><Row className='remQs'>{easy.length}</Row></Col>
                   <Col><Row className='remQs'>{med.length}</Row></Col>
                   <Col><Row className='remQs'>{hard.length}</Row></Col>
                   
               </Row>
               <Row style={{padding:'0px 15px 0px 30px'}} >
                   <Col style={{padding:'0px 0px 0px 15px'}}>Easy</Col>
                   <Col >Medium</Col>
                   <Col><Row style={{padding:'0px 0px 0px 15px'}}>Hard</Row></Col>
                   
               </Row>
               </div></Col>
           <Col style={{padding:'0px'}}>
           <Row><Col><div className='basicRec easyMedHard'  style={{marginBottom:'28px',padding:'11px 10px'}} onClick={(e)=>{navigate('/admin/setQs',{state:{type:'Easy',sectionName:sectionName,sid:sid,navArr:easy}})}}>Easy</div></Col></Row>
           <Row><Col><div className='basicRec easyMedHard' style={{marginBottom:'28px',padding:'11px 10px'}} onClick={(e)=>{navigate('/admin/setQs',{state:{type:'Medium',sectionName:sectionName,sid:sid,navArr:med}})}}>Medium</div></Col></Row>
           <Row><Col><div className='basicRec easyMedHard' style={{padding:'11px 10px'}} onClick={(e)=>{navigate('/admin/setQs',{state:{type:'Hard',sectionName:sectionName,sid:sid,navArr:hard}})}}>Hard</div></Col></Row>
           </Col>
           </Row>
           <Row style={{margin:'44px 0'}}> <Col><div className='basicRec easyMedHard' style={{marginBottom:'28px',width: '90%',padding:'11px 10px'}}>{time} <img style={{height:'25px',float:'right'}} alt="logo" src={Clock}></img>  </div></Col>           
           <Col style={{padding:'0px'}}>
           <div className='basicRec secNm' style={{marginBottom:'28px',padding:'11px 10px'}}>Total number of questions: {qs}</div>
           </Col>
           </Row>
          

            </div>
            <Row style={{float:'right'}}>
            <button style={{color:'white'}} className='btn scTest' onClick={(e)=>navigate('/admin/home')} >Back to Home page</button>  <button style={{color:'white'}} className='btn scTest'>Save</button>

           </Row>
           
        </div>
        </Col>
            
            </Row>
    )
}

export default NewTest

