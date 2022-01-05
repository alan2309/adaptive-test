import React from 'react'
import { Col, Row } from 'react-bootstrap'
import CustomSelect from '../../components/Admin/CustomSelect'
import QuestionNavigatorComp from '../../components/TestScreeen/QuestionNavigatorComp'
import { useNavigate } from "react-router";
import '../../css/AdminHomeScreen.css'

function SetQuestion() {
    const navigate = useNavigate()
    return (
        <div >
            <Row >
                <Col md={9}><div className='basicRec SetQuestion' style={{height:window.screen.height-350,margin:'0px 50px'}}>
                    <div style={{padding:'117px 36px 0 36px'}}>
                   <div style={{marginBottom:'30px'}}>
                   <CustomSelect></CustomSelect>
                   </div>
                    

                    <p  style={{padding:'5px 0',margin:'10px 0px'}}>
                    <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDisabled" id="flexRadioDisabled" disabled/>
                    <label class="form-check-label" style={{marginLeft:'15px',fontWeight:'400'}} for="flexRadioDisabled">
                    Option 1
                    </label>
                    </div>
                    </p>
                    <p  style={{padding:'5px 0',margin:'10px 0px'}}>
                    <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDisabled" id="flexRadioDisabled" disabled/>
                    <label class="form-check-label" style={{marginLeft:'15px',fontWeight:'400'}} for="flexRadioDisabled">
                    Option 2
                    </label>
                    </div>
                    </p>
                    <p  style={{padding:'5px 0',margin:'10px 0px'}}>
                    <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDisabled" id="flexRadioDisabled" disabled/>
                    <label class="form-check-label" style={{marginLeft:'15px',fontWeight:'400'}} for="flexRadioDisabled">
                    Option 3
                    </label>
                    </div>
                    </p>
                    </div>
               
                    </div></Col>
                <Col >
                <div className='basicRec'style={{height:'100%',paddingTop:'45px'}} >
                <QuestionNavigatorComp attempted={['1','1']}></QuestionNavigatorComp>
                </div>
               
                </Col>
            </Row>
            <Row style={{paddingTop:'20px',paddingLeft:'450px'}}>
           <button style={{color:'white'}} className='btn scTest'>Save</button>
           <button style={{color:'white'}} className='btn scTest'>Reset</button>

           </Row>
            
        </div>
    )
}

export default SetQuestion
