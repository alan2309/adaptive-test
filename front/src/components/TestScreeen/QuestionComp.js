import React from 'react'
import {Col,Row} from 'react-bootstrap';

function QuestionComp({question,options,level,qsno}) {
    return (
        <div id='quesComp' style={{padding:'10px 20px'}}>
          {qsno<6 && 
          <>
          <Row>
                <Col >
                    <div style={{float:'right',fontWeight:'500'}}>
               Difficulty Level : {level===2?'Medium':level=== 3?'Hard':'Easy'}
               </div>
             </Col>
            </Row>
            <Row>
            <Col >
                    <div style={{padding:'10px 0 20px 0',fontWeight:'600'}}>
                    Question {qsno+1}
               </div>
             </Col>
               
            </Row>
            <Row>
                <Col>
                <div style={{padding:'5px 0 20px 0px',fontWeight:'400'}}>
          {question}
          </div>
          </Col>       
            </Row>
            <div style={{padding:'15px 0 10px 0'}}>
           
            {options.map((option, index) => {
          return (
            <p key={index} style={{padding:'5px 0'}}>
              <input
                type="radio"
                id={index}
                name={question}
                class="radio qsRadio"
                value={option.mrks}
                style={{height:'13px'}}
              />
              <label class="option" id="option-one-label" style={{marginLeft:'15px',fontWeight:'400'}}>
                {option.opt}
              </label>
            </p>
          );
         })}
            <button type="submit" style={{color:'white'}} className='btn nextQsBtn'>Next Question</button>
      </div>
          </>
          }
{qsno>=6 && <h3>Click finish Test</h3>}
        </div>
    )
}

export default QuestionComp

