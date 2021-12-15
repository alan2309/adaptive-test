import React, { useState, useEffect,useRef} from "react";
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
  const Ref = useRef(null);
  const [timer, setTimer] = useState('00:00:00');


  const getTimeRemaining = (e) => {
      const total = Date.parse(e) - Date.parse(new Date());
      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const hours = Math.floor((total / 1000 * 60 * 60) % 24);
      return {
          total, hours, minutes, seconds
      };
  }


  const startTimer = (e) => {
      let { total, hours, minutes, seconds } 
                  = getTimeRemaining(e);
      if (total >= 0) {
          // update the timer
          // check if less than 10 then we need to 
          // add '0' at the begining of the variable
          setTimer(
              (hours > 9 ? hours : '0' + hours) + ':' +
              (minutes > 9 ? minutes : '0' + minutes) + ':'
              + (seconds > 9 ? seconds : '0' + seconds)
          )
      }
  }


  const clearTimer = (e) => {
      setTimer('01:00:00');
      if (Ref.current) clearInterval(Ref.current);
      const id = setInterval(() => {
          startTimer(e);
      }, 1000)
      Ref.current = id;
  }

  const getDeadTime = () => {
      let deadline = new Date();
      deadline.setSeconds(deadline.getSeconds() + 720000);
      return deadline;
  }
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
    clearTimer(getDeadTime());
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
    setAns([...ans, parseInt(myans)]);
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
      {timer !== '00:00:00' && <div>
        <Row >
          <Col md='9' >
            <div className='rectangle'>
        <TestHeaderComp timer={timer} ></TestHeaderComp>
        </div>
        </Col>
        <Col md='3'>
          <button style={{backgroundColor:'#081466',width:'100%',height:'60px',borderRadius:'14px',color:'white',boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}} >FINISH TEST</button>
        </Col>
        </Row>
        <Row style={{marginTop:'15px'}}>
          <Col md='9'>
            <div className='rectangle' style={{minHeight:'500px',backgroundColor:'black'}} >
            <form onSubmit={click}>
        <QuestionComp qsno={qsno} level={current} question={qs[qsno].ques} options={qs[qsno].options}></QuestionComp>
        </form> 
        </div>
        </Col>
        <Col md='3' >
          <div className='rectangle' style={{minHeight:'500px',backgroundColor:'black'}}>
        <QuestionNavigatorComp attempted = {ans}></QuestionNavigatorComp>
        </div>
        </Col>
        </Row>
        </div>}
        {timer === '00:00:00'&& <h2>Time's up</h2>}
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
