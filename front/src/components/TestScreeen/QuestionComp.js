import React from 'react'
import {Col,Row} from 'react-bootstrap';

function QuestionComp({question,options,level,qsno}) {
    return (
        <div style={{padding:'10px 20px'}}>
          {qsno<6 && 
          <>
          <Row>
                <Col >
                    <div style={{float:'right'}}>
               Difficulty Level : {level===2?'Medium':level=== 3?'Hard':'Easy'}
               </div>
             </Col>
            </Row>
            <Row>
            <Col >
                    <div style={{padding:'10px 0 20px 0'}}>
                    Question {qsno+1}
               </div>
             </Col>
               
            </Row>
            <Row>
                <Col>
                <div style={{padding:'5px 0 20px 0px'}}>
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
                class="radio"
                value={option.mrks}
              />
              <label class="option" id="option-one-label">
                {option.opt}
              </label>
            </p>
          );
         })}
            <button type="submit" className='btn nextQsBtn'>Next Question</button>
      </div>
          </>
          }
{qsno>=6 && <h3>Click finish Test</h3>}
        </div>
    )
}

export default QuestionComp

