import React from 'react'
import {Col,Row} from 'react-bootstrap';

function QuestionComp({question,options}) {
    return (
        <div>
            <Row>
                <Col >
                    <div style={{float:'right'}}>
               Difficulty Level : Easy
               </div>
             </Col>
            </Row>
            <Row>
            <Col >
                    <div >
                    Question 3
               </div>
             </Col>
               
            </Row>
            <Row>
                <Col>
          {question}
          </Col>
            </Row>
            <div style={{padding:'10px 0'}}>
           
            {options.map((option, index) => {
          return (
            <p key={index}>
              <input
                type="radio"
                id={index}
                name={question}
                class="radio"
                value={option.mrks}
                required
              />
              <label class="option" id="option-one-label">
                {option.opt}
              </label>
            </p>
          );
         })}
            <button type="submit">Next Question</button>
      </div>
        </div>
    )
}

export default QuestionComp

