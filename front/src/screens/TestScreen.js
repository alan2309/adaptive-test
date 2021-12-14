import React, { useState, useEffect } from "react";
import axios from "axios";
import TestHeaderComp from "../components/TestScreeen/TestHeaderComp";
import QuestionComp from "../components/TestScreeen/QuestionComp";
import {Col,Row} from 'react-bootstrap';
import QuestionNavigatorComp from "../components/TestScreeen/QuestionNavigatorComp";
import '../css/TestScreen.css'

function TestScreen() {
  const [hard, setHard] = useState([]);
  const [medium, setMedium] = useState([]);
  const [easy, setEasy] = useState([]);
  const [current, setCurrent] = useState(2);
  const [qs, setQs] = useState([
    {
      ques: "This is medium level qs default",
      options: [
        {
          opt: "this is option d1",
          mrks: 2,
        },
        {
          opt: "this is option d2",
          mrks: 0,
        },
        {
          opt: "this is option d3",
          mrks: 0,
        },
      ],
    },
  ]);
  const [total,setTotal] = useState(0);
  const [ans, setAns] = useState([]);
  const [qsno, setQsno] = useState(0);

  useEffect(() => {
    const getData = async () =>
      await axios
        .get("http://127.0.0.1:8000/api/qs")
        .then((res) => {
          setEasy(res.data.easy);
          setHard(res.data.hard);
          setMedium(res.data.medium);
        })
        .catch((e) => {
          console.log(e);
        });
    getData();
  }, []);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  function click(e) {
    e.preventDefault();
    var myans=0
    const formData = new FormData(e.target);
    for (var pair of formData.entries()) {
     myans = pair[1];
    }
    setTotal(total+parseInt(myans));
    var x;
    console.log(myans)
    if (myans > 0) {
      if (current < 3) {
        setCurrent(current + 1);
        x = current + 1;
      } else {
        x = 3;
      }
    } else {
      if (current > 1) {
        setCurrent(current - 1);
        x = current - 1;
      } else {
        x = 1;
      }
    }
    var index=0;
    switch (x) {
      case 1:
        index = getRandomInt(0, easy.length);
        setQs([...qs, easy[index]]);
        easy.splice(index, 1);
        break;
      case 2:
        index = getRandomInt(0, medium.length);
        setQs([...qs, medium[index]]);
        medium.splice(index, 1);
        break;
      case 3:
        index = getRandomInt(0, hard.length);
        setQs([...qs, hard[index]]);
        hard.splice(index, 1);
        break;
    }
    setQsno(qsno + 1);
    e.target.reset();
  }

  return (
    <div>
      <div>
        <Row >
          <Col md='9' >
            <div className='rectangle'>
        <TestHeaderComp></TestHeaderComp>
        </div>
        </Col>
        </Row>
        <Row style={{marginTop:'15px'}}>
          <Col md='9' >
            <div className='rectangle' style={{minHeight:'500px',backgroundColor:'black'}} >
            <form onSubmit={click}>
        <QuestionComp question={qs[qsno].ques} options={qs[qsno].options}></QuestionComp>
        </form> 
        </div>
        </Col>
        <Col md='3' >
          <div className='rectangle' style={{minHeight:'500px',backgroundColor:'black'}}>
        <QuestionNavigatorComp></QuestionNavigatorComp>
        </div>
        </Col>
        </Row>
        </div>
       {/* {qsno <= 5 && 
      <>
      <form onSubmit={click}>
        <h1>{qs[qsno].ques}</h1>
        {qs[qsno].options.map((option, index) => {
          return (
            <p key={index}>
              <input
                type="radio"
                id={index}
                name={qs[qsno].ques}
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
      </form> 
      </>
      }
      {qsno>5 && 
      <>
      <h1>Test completed</h1>
      <h3>Your Score : {total} </h3>
      </>
      } */}
         </div>
  );
}

export default TestScreen;
