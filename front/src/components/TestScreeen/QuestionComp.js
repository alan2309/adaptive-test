import React from 'react'
import {Col,Row} from 'react-bootstrap';

function QuestionComp() {
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
            A man got Rs. 130 less, as simple interest, when he invested Rs. 2000 for 4 years as compared to investing Rs. 2250 for same duration. What is the rate of interest?
          </Col>
            </Row>
            <div style={{padding:'10px 0'}}>
            <form >
            <Row>
                <Row>
                <Col>

                <p >
              <input
                type="radio"
                class="radio"
                required
              />
              <label class="option" id="option-one-label">
               asdas
              </label>
            </p>    

      
          </Col>
          </Row>
                <Row>
                <Col>

                <p >
              <input
                type="radio"
                class="radio"
                required
              />
              <label class="option" id="option-one-label">
               asdas
              </label>
            </p>    

      
          </Col>
          </Row>
                <Row>
                <Col>

                <p >
              <input
                type="radio"
                class="radio"
                required
              />
              <label class="option" id="option-one-label">
               asdas
              </label>
            </p>    

      
          </Col>
          </Row>
                <Row>
                <Col>

                <p >
              <input
                type="radio"
                class="radio"
                required
              />
              <label class="option" id="option-one-label">
               asdas
              </label>
            </p>    

      
          </Col>
          </Row>
            </Row>
            <button type="submit">Next Question</button>
      </form> 
      </div>
        </div>
    )
}

export default QuestionComp

