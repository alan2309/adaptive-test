import React from 'react'
import {Col,Row} from 'react-bootstrap';
import '../css/TestScreen.css'

function showHide(e){
    console.log(e)
   

        $(e.target).toggleClass("fa-eye fa-eye-slash");
        var input = $($(e.target).attr("toggle"));
        if (input.attr("type") == "password") {
          input.attr("type", "text");
        } else {
          input.attr("type", "password");
        }
}

function Login() {
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
            <Row style={{marginTop:'70px'}}>
                <Col>
                <input className='rectangle'  type='text' placeholder='Name' style={{width:'100%'}} ></input>
                </Col>
            </Row>
            <Row style={{marginTop:'25px'}}>
                <Col>
                
                <input className='rectangle' id='password-field' type='password' placeholder='Password' style={{width:'100%'}} ></input>
                <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password" onClick={(e)=>showHide(e)}></span>
                </Col>
            </Row>
            <Row style={{marginTop:'35px',paddingLeft:'200px'}}>
                 <Col>
                <button style={{backgroundColor:'#10B65C',width:'150px'}} className='btn btn-primary'>Start Test</button>
                </Col>
            </Row>
           
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
