import React from 'react'
import TestHeaderComp from "../components/TestScreeen/TestHeaderComp";
import QuestionComp from "../components/TestScreeen/QuestionComp";
import {Col,Row} from 'react-bootstrap';
import QuestionNavigatorComp from "../components/TestScreeen/QuestionNavigatorComp";
import '../css/TestScreen.css'

function Login() {
    return (
        <div>
            <Row>
                <Col>
            <div ></div>
            </Col>
            <Col>
            <div className='rectangle'>
                <Row>
                    <Col>
                Instructions
                </Col>
                    </Row>
                    <Row>
                        <Col>
            1.  Students are not supposed to close/refresh the exam portal during the test. If done do the student will not be allowed to reappear for the test.
           </Col>
            </Row>
                    <Row>
                        <Col>
                        2. This an adaptive test. Adaptive tests are designed to adjust their level of difficulty—based on the responses provided—to match the knowledge and ability of a test taker. If a student gives a wrong answer, the computer follows up with an easier question; if the student answers correctly, the next question will be more difficult.  </Col>
            </Row>
                    <Row>
                        <Col>
                        3. After completition and submission of the test, the students should not exit the portal. </Col>
            </Row>
                    <Row>
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
