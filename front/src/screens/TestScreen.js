import React, { useState, useEffect,useRef} from "react";
import axios from "axios";
import TestHeaderComp from "../components/TestScreeen/TestHeaderComp";
import QuestionComp from "../components/TestScreeen/QuestionComp";
import {Col,Modal,Button,Row} from 'react-bootstrap';
import QuestionNavigatorComp from "../components/TestScreeen/QuestionNavigatorComp";
import '../css/TestScreen.css'
import { useNavigate } from "react-router";
import { isExpired, decodeToken } from "react-jwt";


  




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
  const [total,setTotal] = useState(0);
  const [ans, setAns] = useState([]);
  const [qsno, setQsno] = useState(0);
  const navigate = useNavigate()
  const [show, setShow] = useState(true);
  const [reload, isReload] = useState(false);
  const handleClose = () => setShow(false);


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

  
  useEffect(() => {
    var test=JSON.parse(localStorage.getItem('test'))
    const token = localStorage.getItem('access_token');
  const isMyTokenExpired = isExpired(token);

    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
      console.info( "This page is reloaded" );
      isReload(true)
    }else{
      console.log(',,,')
      console.log(qs[0].ques)
      test['question'].push(qs[0])
      test['currentLevel']='Medium'
      localStorage.setItem('test',JSON.stringify(test))
    }
   
    
  

if(isMyTokenExpired){
    navigate('/login')
    }
    else{
      const getData = async () =>
      await axios
        .get("http://127.0.0.1:8000/api/qs")
        .then((res) => {

          if (performance.navigation.type !== performance.navigation.TYPE_RELOAD) {
          setEasy(res.data.easy);
          setHard(res.data.hard);
          setMedium(res.data.medium);
          }else{
            var test=JSON.parse(localStorage.getItem('test'))

            console.log(test['question'])
            console.log(res.data)
             
            //  Alankrit


          }
        })
        .catch((e) => {
          console.log(e);
        });
        var ar = new Array(10).fill(-1)
        setAns(ar)
    getData();
    clearTimer(getDeadTime());
   
    
   
    }
   
  }, []);
  function GoInFullscreen(element) {
    console.log(document.fullscreenElement)
    if (document.fullscreenElement === null) {
      
          if(element.requestFullscreen)
          element.requestFullscreen();
        else if(element.mozRequestFullScreen)
          element.mozRequestFullScreen();
        else if(element.webkitRequestFullscreen)
          element.webkitRequestFullscreen();
        else if(element.msRequestFullscreen)
          element.msRequestFullscreen();
        
    } 
    
  }
  document.addEventListener('fullscreenchange', function() {
    var full_screen_element = document.fullscreenElement;
  
    if(full_screen_element === null){
      setShow(true)
      isReload(true)
    }
}
  );

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  function click(e) {
    e.preventDefault();
    var myans=-1;
    const formData = new FormData(e.target);
    for (var pair of formData.entries()) {
     myans = pair[1];
    }
    setTotal(total+parseInt(myans));
    var x;
    ans[qsno] = parseInt(myans);
    setAns(ans);
    var test=JSON.parse(localStorage.getItem('test'))
    
    
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
        test['question'].push(easy[index])
        test['currentLevel']='Easy'
        easy.splice(index, 1);
        break;
      case 2:
        index = getRandomInt(0, medium.length);
        setQs([...qs, medium[index]]);
        test['question'].push(medium[index])
        test['currentLevel']='Medium'
        medium.splice(index, 1);
        break;
      case 3:
        index = getRandomInt(0, hard.length);
        setQs([...qs, hard[index]]);
        test['question'].push(hard[index])
        test['currentLevel']='Hard'
        hard.splice(index, 1);
        break;
    }
    
    test['marks']=ans;
    setQsno(qsno + 1);
    test['currentQsNo']=test['currentQsNo']+1
    localStorage.setItem('test',JSON.stringify(test))
    e.target.reset();
  }

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Enter FullScreeen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       { reload ? 'Please Enter Full Screen or Test will get auto submitted in 10 sec (timer from local storage) and you might get disqualified':'Please enter Full Screen mode'}
        </Modal.Body>
        <Modal.Footer>
          <a href='/logout'>Logout</a>
          <Button variant="primary"  onClick={(e)=>{handleClose(e);GoInFullscreen(document.querySelector('#element'))}}>Enter Full Screeen</Button>
        </Modal.Footer>
      </Modal>
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
