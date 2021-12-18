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
  const [qs, setQs] = useState([]);
  const Ref = useRef(null);
  const [timerT, setTimerT] = useState();
  const [total,setTotal] = useState(0);
  const [ans, setAns] = useState([]);
  const [qsno, setQsno] = useState(0);
  const navigate = useNavigate()
  const [show, setShow] = useState(true);
  const [reload, isReload] = useState(false);
  const handleClose = () => setShow(false);
  const [FSSeconds, setFSSeconds] =useState(10);
  var timeLeft=10;
  var xtimer;
  var timmer;

  function countdown() {
    timeLeft--;
    setFSSeconds(String( timeLeft ))
    if (timeLeft <= 0) {
      clearInterval(xtimer)
      navigate('/result')
    }
  };
  function countdownT() {
    timmer--;
    // console.log(timmer)
    setTimerT(timmer)
    if (timmer <= 0) {
      navigate('/result')
    }
  };
  
  useEffect(() => {
    var test=JSON.parse(localStorage.getItem('test'))
    const token = localStorage.getItem('access_token');
  const isMyTokenExpired = isExpired(token);
  const channel = new BroadcastChannel('tab');
  // console.log(channel)


  //Alankrit
  var diff = 0;
  if(test){
  const nowd = new Date()
  const nowh = nowd.getHours()
  const nowm = nowd.getMinutes()
  const nows = nowd.getSeconds()

  console.log(nowh+":"+nowm+":"+nows)

  let myar = test['STime'].split(" ")
  let stime = myar[4].split(":")
  console.log(stime[0]+":"+stime[1]+":"+stime[2])
 if(nowh>stime[0]){
   diff = diff+(nowh-stime[1])*3600
 }
 if(nowm>stime[1]){
   diff= diff+((nowm-stime[1])*60)
 }
 else{
   diff = diff - ((stime[1]-nowm)*60)
 }

 if(nows>stime[2]){
   diff = diff+(nows-stime[2])
 }
 else{
   diff = diff - (stime[2]-nows)
 }
  }
  console.log(diff)
  setTimerT(3600-diff)
  timmer=3600-diff
  setInterval(countdownT, 1000);
  //Alankrit

  channel.postMessage('another-tab');
  // note that listener is added after posting the message
  // console.log(channel)



  channel.addEventListener('message', (msg) => {
    if (msg.data === 'another-tab') {
      // message received from 2nd tab
      alert('Cannot open multiple instances');
      navigate('/error')
      
    }
  });

  if(test){
    if (test['question'].length!==0) {
      console.info( "This page is reloaded" );
      isReload(true)
    }
  }
    if(isMyTokenExpired){
      navigate('/login')
      return
    }
    else{
      if(localStorage.getItem('result')){
        navigate('/result')
      }
      else{
      const getData = async () =>
      await axios
        .get("http://127.0.0.1:8000/api/qs")
        .then((res) => {
          if (test['question'].length===0) {
          setEasy(res.data.easy);
          setHard(res.data.hard);
          var mediumArrRes=res.data.medium
          var index = getRandomInt(0, res.data.medium.length);
          setQs([...qs, mediumArrRes[index]]);
          test['question'].push(mediumArrRes[index])
          test['currentLevel']=2
          mediumArrRes.splice(index, 1);
          setMedium(mediumArrRes);
          let ar = new Array(10).fill(-1)
          setAns(ar)
          test['marks']=ar
          localStorage.setItem('test',JSON.stringify(test))
          }
          else{
            var qss = test['question']
            var x=res.data.easy
            var y=res.data.medium
            var z=res.data.hard
            for(let i=0;i<qss.length;i++){

              if(x.map(function(e) { return e.ques; }).indexOf(qss[i].ques)!== -1){
                let a = x.map(function(e) { return e.ques; }).indexOf(qss[i].ques);
                x.splice(a,1)
              }
              else if(y.map(function(e) { return e.ques; }).indexOf(qss[i].ques)!== -1){
                let b = y.map(function(e) { return e.ques; }).indexOf(qss[i].ques);
                y.splice(b,1)
              }
              else if(z.map(function(e) { return e.ques; }).indexOf(qss[i].ques)!== -1){
                let c = z.map(function(e) { return e.ques; }).indexOf(qss[i].ques);
                z.splice(c,1)
              }
            }
            setEasy(x);
          setHard(z);
          setMedium(y);
          var ar = test['marks']
          setAns(ar)
          setQsno(test['currentQsNo']-1)
          setQs(test['question'])
          }
        })
        .catch((e) => {
          console.log(e);
        });
    getData();
    }
  }
  }, []);
  function GoInFullscreen(element) {
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
    if (xtimer) {
      clearInterval(xtimer);
      timeLeft=10
      setFSSeconds(String( timeLeft ))
  }
  
    if(full_screen_element === null){
      setShow(true)
      isReload(true)

      xtimer=setInterval(countdown, 1000);
    }
});
String.prototype.toHHMMSS = function () {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours + ':' + minutes + ':' + seconds;
}

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
        test['currentLevel']=1
        easy.splice(index, 1);
        break;
      case 2:
        index = getRandomInt(0, medium.length);
        setQs([...qs, medium[index]]);
        test['question'].push(medium[index])
        test['currentLevel']=2
        medium.splice(index, 1);
        break;
      case 3:
        index = getRandomInt(0, hard.length);
        setQs([...qs, hard[index]]);
        test['question'].push(hard[index])
        test['currentLevel']=3
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
       { reload ? `Please Enter Full Screen or Test will get auto submitted in ${FSSeconds}  sec and you might get disqualified`:'Please enter Full Screen mode'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary"  onClick={(e)=>{handleClose(e);GoInFullscreen(document.querySelector('#element'))}}>Enter Full Screeen</Button>
        </Modal.Footer>
      </Modal>
      {timerT !== undefined && <div>
      <div>
        <Row >
          <Col md='9' >
            <div className='rectangle'>
        <TestHeaderComp timer={timerT.toString().toHHMMSS()} ></TestHeaderComp>
        </div>
        </Col>
        <Col md='3'>
          <button onClick={(e)=>{navigate('/result');
           if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        
        }} style={{backgroundColor:'#081466',width:'100%',height:'60px',borderRadius:'14px',color:'white',boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}} >FINISH TEST</button>
        </Col>
        </Row>
        <Row style={{marginTop:'15px'}}>
          <Col md='9'>
            <div className='rectangle' style={{minHeight:'500px',backgroundColor:'black'}} >
            <form onSubmit={click}>              
              {qs !==undefined && qsno !==undefined && qs[qsno]!==undefined &&
        <QuestionComp qsno={qsno} level={current} question={qs[qsno].ques} options={qs[qsno].options}></QuestionComp>}  
        </form> 
        </div>
        </Col>
        <Col md='3' >
          <div className='rectangle' style={{minHeight:'500px',backgroundColor:'black'}}>
        <QuestionNavigatorComp attempted = {ans}></QuestionNavigatorComp>
        </div>
        </Col>
        </Row>
        </div>
        </div>}
         </div>
  );
}

export default TestScreen;
