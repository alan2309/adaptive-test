import React,{useState} from 'react'
import { Col, Row } from 'react-bootstrap'
import QuestionNavigatorComp from '../../components/TestScreeen/QuestionNavigatorComp'
import { useNavigate } from "react-router";
import '../../css/AdminHomeScreen.css'
import { useLocation} from 'react-router-dom';
import axiosInstance from '../../axios';


function SetQuestion() {
    const navigate = useNavigate();
    const location = useLocation();
    const [optionArray, addOptionArray] = useState([]);
    const [countOpt, setCountOpt] = useState(2);
    function handleSubmit(e){
        e.preventDefault();
        console.log('handlesubmit')
        console.log(document.getElementById('qsSetQs').name)
        var dictionary={}
        dictionary[document.getElementById('qsSetQs').name]=document.getElementById('qsSetQs').value;
        for(var x=0 ;x<e.target.length;x++){
            if(e.target[x] instanceof HTMLInputElement || e.target[x] instanceof HTMLSelectElement){
                if(e.target[x].name!=='type'){
                dictionary[e.target[x].name]=e.target[x].value; 
            }else{
                if(e.target[x].value=='Easy'){
                dictionary[e.target[x].name]=1; 
            }else if(e.target[x].value=='Medium'){
                dictionary[e.target[x].name]=2; 
            }else{
                dictionary[e.target[x].name]=3; 
            }
            }           
                }
        }
       console.log(dictionary)
        axiosInstance.post('api/admin/addQs',{data:dictionary})
        .then((res)=>{
            console.log('saved to db')
            
            navigate('/admin/setSection',{state:{sectionName:location.state.sectionName,sid:location.state.sid}})
        })
    }
    function addOpt(e){
        setCountOpt(countOpt+1)
          console.log('Add opt clicked')
          addOptionArray(function (oldArray) { 
              return [...oldArray,
                <p  style={{padding:'5px 0',margin:'10px 0px'}}>
                <div class="form-check">
                <input  type="radio" name="correctOpt"  value={`Option${countOpt+1}`} id={`flexCheckDefault${countOpt+1}`} required/>
                <label className="form-check-label" style={{marginLeft:'15px',fontWeight:'400',width:'96%'}} for={`flexCheckDefault${countOpt+1}`}>
                <input type="text" className="form-control" name={`Option${countOpt+1}`} placeholder={`Enter Option ${countOpt+1}`} id={`Option${countOpt+1}`} required/>
                </label>
                </div>
                </p>
             ];
             });
          
      }
    return (
        <div >
            <form onSubmit={(e)=>handleSubmit(e)} id='sbForm'>
           <input name='sectionName' value={location.state.sectionName} hidden/> 
            <Row >
                <Col md={9}><div className='basicRec SetQuestion' style={{minHeight:window.screen.height-360,margin:'0px 50px'}}>
                    <div style={{padding:'20px 36px 0 36px'}}>
                   <div style={{marginBottom:'30px'}}>
                       <div class="form-group">
    <label for="selectSetQs">Type :</label>
    <select class="form-select" name='type' aria-label="Default select example" disabled>
  <option selected >{location.state.type}</option>
</select>
  </div>
                   </div>
                   <Row >
                <div class="form-group">
    <label for="qsSetQs">Question :</label>
    <textarea  class="form-control form-field" form='sbForm' name='question' id="qsSetQs" placeholder='Enter Question'  rows="2" style={{maxWidth: "100%",resize:'none'}} required></textarea>
  </div>
            </Row>
                   
                    

                    <p  style={{padding:'5px 0',margin:'10px 0px'}}>
                    <div class="form-check">
                    <input  type="radio" name="correctOpt" value='Option1' id="flexCheckDefault1" required/>
                    <label class="form-check-label" style={{marginLeft:'15px',fontWeight:'400',width:'96%'}} for="flexCheckDefault1">
                    <input type="text" class="form-control" name='Option1' placeholder='Enter Option 1' id="Option1" required/>
                    </label>
                    </div>
                    </p>
                    <p  style={{padding:'5px 0',margin:'10px 0px'}}>
                    <div class="form-check">
                    <input  type="radio" name="correctOpt" value='Option2' id="flexCheckDefault2" required/>
                    <label class="form-check-label" style={{marginLeft:'15px',fontWeight:'400',width:'96%'}} for="flexCheckDefault2">
                    <input type="text" class="form-control" name='Option2' placeholder='Enter Option 2' id="Option2" required/>
                    </label>
                    </div>
                    </p>
                   {optionArray}
               
                  
                    </div>
                    <button class="btn" type="button" onClick={(e)=>addOpt(e)}  style={{backgroundColor:'#10B65C',borderRadius:'100px',marginLeft:'5%',marginBottom:'10px'}}><i class="fa fa-add" style={{color:'white'}}></i></button>                    
                    </div></Col>
                <Col >
                <div className='basicRec'style={{height:'100%',paddingTop:'45px'}} >
                <QuestionNavigatorComp attempted={['1','1']}></QuestionNavigatorComp>
                </div>
               
                </Col>
            </Row>
            <Row style={{paddingTop:'20px',paddingLeft:'450px'}}>

           <button style={{color:'white'}} type='submit' className='btn scTest'>Save</button>
           <button style={{color:'white'}} className='btn scTest'>Reset</button>

           </Row>
           </form>
            
        </div>
    )
}

export default SetQuestion
