import React,{ useState,useEffect } from 'react'
import {Col,Row} from 'react-bootstrap';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';
import '../css/TestScreen.css';
import { isExpired, decodeToken } from "react-jwt";

function showHide(e){
   

        // $(e.target).toggleClass("fa-eye fa-eye-slash");
        // var input = $($(e.target).attr("toggle"));
        // if (input.attr("type") == "password") {
        //   input.attr("type", "text");
        // } else {
        //   input.attr("type", "password");
        // }
}

function Login() {
    const navigate = useNavigate()
    useEffect(()=>{
        const token = localStorage.getItem('access_token');
        const isMyTokenExpired = isExpired(token);

        if(!isMyTokenExpired){
            if(localStorage.getItem('result')){
                navigate('/result')
            }
            else{
                navigate('/testScreen')
            }
          }
    },[])
    
    const initialFormData=Object.freeze({
        username:'',
        password:''
    })
    const [formData,updateFormData]=useState(initialFormData);
    const handleChange=(e)=>{
        updateFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        axiosInstance.post('token/',{
            username:formData.username,
            password:formData.password
        })
        .then((res)=>{
            axiosInstance.post(`api/results/${formData.username}`)
            localStorage.setItem('access_token',res.data.access);
            localStorage.setItem('refresh_token',res.data.refresh);
            localStorage.setItem("test", JSON.stringify({'username':formData.username,'STime':Date(),'FSTimer':'10','question':[],'currentQsNo':1}));
            axiosInstance.defaults.headers['Authorization']='JWT '+localStorage.getItem('access_token');
            navigate('/testScreen')
        })
    }
    return (
        <div>
        <Row>
            <Col>
        <div style={{margin:'60px 60px'}} >
            <Row>
                <Col>
                <div style={{textAlign:'center'}}>
                Placement Aptitude Portal
                </div></Col>
            </Row>
            <Row>
                <Col>
                 <div style={{textAlign:'center',marginTop:'15px'}}>
                Dwarkadas J. Sanghvi College of Engineering
                </div>
                </Col>
            </Row>
            <form onSubmit={(e)=>handleSubmit(e)}>
            <Row style={{marginTop:'70px'}}>
                <Col>
                <input className='rectangle'onChange={handleChange}  name='username'  type='text' placeholder='Username' style={{width:'100%'}} ></input>
                </Col>
            </Row>
            <Row style={{marginTop:'25px'}}>
                <Col>
                
                <input className='rectangle' onChange={handleChange} id='password-field' name='password' type='password' placeholder='Password' style={{width:'100%'}} ></input>
                <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password" onClick={(e)=>showHide(e)}></span>
                </Col>
            </Row>
            <Row style={{marginTop:'35px',paddingLeft:'200px'}}>
                 <Col>
                <button style={{backgroundColor:'#10B65C',width:'150px'}} type='submit' className='btn btn-primary'>Start Test</button>
                </Col>
            </Row>
            </form>
           
        </div>
        </Col>
        <Col>
        <div className='rectangle' style={{minHeight:'500px',padding:'30px 35px',margin:'0 40px'}}>
            <Row style={{textAlign:'center',margin:'30px 0px'}}>
                <Col>
            Instructions
            </Col>
                </Row>
                <Row>
                    <Col>
        1.  Students are not supposed to close/refresh the exam portal during the test. If done do the student will not be allowed to reappear for the test.
       </Col>
        </Row>
                <Row style={{marginTop:'20px'}}>
                    <Col>
                    2. This an adaptive test. Adaptive tests are designed to adjust their level of difficulty—based on the responses provided—to match the knowledge and ability of a test taker. If a student gives a wrong answer, the computer follows up with an easier question; if the student answers correctly, the next question will be more difficult.  </Col>
        </Row>
                <Row style={{marginTop:'20px'}}>
                    <Col>
                    3. After completition and submission of the test, the students should not exit the portal. </Col>
        </Row>
                <Row style={{marginTop:'35px'}}>
                    <Col>
                    print(“ALL THE BEST”)           
                    </Col>
        </Row>
        </div>
        </Col>
        </Row>
    </div>
    )
}

export default Login
