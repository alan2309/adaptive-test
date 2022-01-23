import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import TestHeaderComp from "../components/TestScreeen/TestHeaderComp";
import QuestionComp from "../components/TestScreeen/QuestionComp";
import { Col, Modal, Button, Row } from "react-bootstrap";
import QuestionNavigatorComp from "../components/TestScreeen/QuestionNavigatorComp";
import "../css/TestScreen.css";
import { useNavigate } from "react-router";
import { isExpired, decodeToken } from "react-jwt";
import CustomTimer from "./Admin/CustomTimer";

function TestScreen() {
  const [hard, setHard] = useState([]);
  const [medium, setMedium] = useState([]);
  const [easy, setEasy] = useState([]);
  const [current, setCurrent] = useState(2);
  const [qs, setQs] = useState([]);
  const [total, setTotal] = useState(0);
  const [ans, setAns] = useState([]);
  const [qsno, setQsno] = useState(0);
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [reload, isReload] = useState(false);
  const handleClose = () => setShow(false);
  const [countWindowAway, setCountWindowAway] = useState(0);
  const [countWindowAwayModal, setCountWindowAwayModal] = useState(false);
  const [testFinshBool, setTestFinishBool] = useState(false);
  const[time,setTime] = useState();
  const [newScreen, setNewScreen] = useState(false);
  const [timeFF, setTimeFF] = useState();
  
  useEffect(() => {
    var test = JSON.parse(localStorage.getItem("test"));
    const token = localStorage.getItem("access_token");
    const isMyTokenExpired = isExpired(token);
    const channel = new BroadcastChannel("tab");
    const items = { ...localStorage };
    console.log(items)

    channel.postMessage("another-tab");
    // note that listener is added after posting the message

    channel.addEventListener("message", (msg) => {
      if (msg.data === "another-tab") {
        // message received from 2nd tab
        // alert('Cannot open multiple instances');
        // navigate('/error')
      }
    });

    if (test) {
      if (test["question"].length !== 0) {
        console.info("This page is reloaded");
        isReload(true);
      }
    }
    if (isMyTokenExpired) {
      navigate("/login");
      return;
    } else {
      if (localStorage.getItem("result")) {
        navigate("/result");
      } else {
        const getData = async () =>
          await axios
            .get("http://127.0.0.1:8000/api/subs/1")
            .then((res) => {
              let a = converttime(res.data.time)
              var tf=a;
              var totalQs=res.data.qs
              if(totalQs>0){
              if (test["question"].length === 0) {
                
                setTimeFF(tf)
                setEasy(res.data.easy);
                setHard(res.data.hard);
                var mediumArrRes = res.data.medium;
                var index = getRandomInt(0, res.data.medium.length);
                setQs([...qs, mediumArrRes[index]]);
                test["question"].push(mediumArrRes[index]);
                test["currentLevel"] = 2;
                mediumArrRes.splice(index, 1);
                setMedium(mediumArrRes);
                let ar = new Array(res.data.qs).fill(-1);
                setAns(ar);
                test["marks"] = ar;
                localStorage.setItem("test", JSON.stringify(test));
              } else {
                var qss = test["question"];
                var x = res.data.easy;
                var y = res.data.medium;
                var z = res.data.hard;
                for (let i = 0; i < qss.length; i++) {
                  if (
                    x
                      .map(function (e) {
                        return e.ques;
                      })
                      .indexOf(qss[i].ques) !== -1
                  ) {
                    let a = x
                      .map(function (e) {
                        return e.ques;
                      })
                      .indexOf(qss[i].ques);
                    x.splice(a, 1);
                  } else if (
                    y
                      .map(function (e) {
                        return e.ques;
                      })
                      .indexOf(qss[i].ques) !== -1
                  ) {
                    let b = y
                      .map(function (e) {
                        return e.ques;
                      })
                      .indexOf(qss[i].ques);
                    y.splice(b, 1);
                  } else if (
                    z
                      .map(function (e) {
                        return e.ques;
                      })
                      .indexOf(qss[i].ques) !== -1
                  ) {
                    let c = z
                      .map(function (e) {
                        return e.ques;
                      })
                      .indexOf(qss[i].ques);
                    z.splice(c, 1);
                  }
                }
                setEasy(x);
                setHard(z);
                setMedium(y);
                var ar = test["marks"];
                setAns(ar);
                setQsno(test["currentQsNo"] - 1);
                setQs(test["question"]);
                var ob=new Date()
        console.log(test['strtTime'])
        console.log(ob.toLocaleTimeString())
      var h = (ob.getHours()<10?'0':'') + ob.getHours();
  var m = (ob.getMinutes()<10?'0':'') + ob.getMinutes();
  var s = (ob.getSeconds()<10?'0':'') + ob.getSeconds();

        var timeStart = new Date(new Date().toLocaleDateString()+' ' + test['strtTime']);
        var timeEnd = new Date(new Date().toLocaleDateString()+' ' + h + ':' + m+':'+s);
        var hourDiff = (timeEnd - timeStart)/1000;
        console.log(timeEnd)
        console.log(timeStart)
        console.log(hourDiff)
        console.log(tf)
        setTimeFF(tf-hourDiff)
              }
            }else{
                navigate('/admin/computer')
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
      if (element.requestFullscreen) element.requestFullscreen();
      else if (element.mozRequestFullScreen) element.mozRequestFullScreen();
      else if (element.webkitRequestFullscreen)
        element.webkitRequestFullscreen();
      else if (element.msRequestFullscreen) element.msRequestFullscreen();
    }
  }
  document.addEventListener("fullscreenchange", function () {
    var full_screen_element = document.fullscreenElement;

    if (full_screen_element === null) {
      setShow(true);
      isReload(true);
    }
  });
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      windowAway();
    }
  });
  function windowAway() {
    var ccount = countWindowAway + 1;
    setCountWindowAway(countWindowAway + 1);
    if (ccount < 3) {
      setCountWindowAwayModal(true);
    } else {
      navigate("/result");
    }
  }

  function converttime(timex){
    let secs = 0;
    let x =timex.split(":")
    secs = secs +(parseInt(x[0])*3600)+(parseInt(x[1])*60)+(parseInt(x[2])) 
    return secs;
  }
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  function click(e) {
    e.preventDefault();

    var myans = -1;
    const formData = new FormData(e.target);
    for (var pair of formData.entries()) {
      myans = pair[1];
    }
    setTotal(total + parseInt(myans));
    var x;
    ans[qsno] = parseInt(myans);
    setAns(ans);
    var test = JSON.parse(localStorage.getItem("test"));

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
    var index = 0;
    switch (x) {
      case 1:
        index = getRandomInt(0, easy.length);
        setQs([...qs, easy[index]]);
        test["question"].push(easy[index]);
        test["currentLevel"] = 1;
        easy.splice(index, 1);
        break;
      case 2:
        index = getRandomInt(0, medium.length);
        setQs([...qs, medium[index]]);
        test["question"].push(medium[index]);
        test["currentLevel"] = 2;
        medium.splice(index, 1);
        break;
      case 3:
        index = getRandomInt(0, hard.length);
        setQs([...qs, hard[index]]);
        test["question"].push(hard[index]);
        test["currentLevel"] = 3;
        hard.splice(index, 1);
        break;
    }
    test["marks"] = ans;
    if(ans.length-1===qsno){
      navigate('/admin/computer')
      localStorage.setItem("test", JSON.stringify(test));
    }else{
      
      setQsno(qsno + 1);
      test["currentQsNo"] = test["currentQsNo"] + 1;
      localStorage.setItem("test", JSON.stringify(test));
      e.target.reset();
    }
  }
  function handleCloseSChange(e) {
    setCountWindowAwayModal(false);
    GoInFullscreen(document.querySelector("#element"));
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
          {reload ? (
            <CustomTimer
              msg={`Please Enter Full Screen or Test will get auto submitted in`}
              onlyS={true}
              reset={testFinshBool}
              time={10}
              start={show}
              nextpage={"result"}
            ></CustomTimer>
          ) : (
            "Please enter Full Screen mode"
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={(e) => {
              handleClose(e);
              GoInFullscreen(document.querySelector("#element"));
            }}
          >
            Enter Full Screeen
          </Button>
        </Modal.Footer>
      </Modal>
      {
        <div>
          <div>
            <Row>
              <Col md="9">
                <div className="TestHeaderComp">
                  {timeFF!==undefined && <TestHeaderComp
                    timer={timeFF}
                    start={!testFinshBool}
                    reset={testFinshBool}
                    timeKey="Time"
                    totalKey="Total"
                    totalValue={ans.length}
                    header='Aptitude'
                    nextpage={'admin/computer'}
                  ></TestHeaderComp>}
                </div>
              </Col>
              <Col md="3">
                <button
                  onClick={(e) => {
                    setTestFinishBool(true);setShow(false);
                    navigate("/result");
                    if (document.exitFullscreen) {
                      document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) {
                      document.webkitExitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                      document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                      document.msExitFullscreen();
                    }
                  }}
                  style={{
                    backgroundColor: "#081466",
                    fontWeight: "500",
                    textAlign: "center",
                    width: "100%",
                    height: "60px",
                    borderRadius: "14px",
                    color: "white",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  }}
                >
                  FINISH TEST
                </button>
              </Col>
            </Row>
            <Row style={{ marginTop: "15px" }}>
              <Col md="9">
                <div
                  className="QuestionComp"
                  style={{ minHeight: "50px", backgroundColor: "black" }}
                >
                  <form onSubmit={click}>
                    {qs !== undefined &&
                      qsno !== undefined &&
                      qs[qsno] !== undefined &&
                      !countWindowAwayModal && (
                        <QuestionComp
                          ans={ans}
                          qsno={qsno}
                          level={current}
                          question={qs[qsno].ques}
                          options={qs[qsno].options}
                        ></QuestionComp>
                      )}
                    {countWindowAwayModal && (
                      <>
                        <h1 style={{ color: "red" }}>
                          Screen Change Detected !!{" "}
                          {countWindowAway === 1 ? "1st" : "LAST"} WARNING
                        </h1>
                        <h3>
                          Screen changed detected.Test will get auto submitted
                          if you try to change screen again !!
                        </h3>
                        <button
                          className="btn btn-secondary"
                          onClick={(e) => handleCloseSChange(e)}
                        >
                          OKay
                        </button>
                      </>
                    )}
                  </form>
                </div>
              </Col>
              <Col md="3">
                <div
                  className="QuestionNavigatorComp"
                  style={{ minHeight: "550px", backgroundColor: "black" }}
                >
                  <QuestionNavigatorComp
                    attempted={ans}
                  ></QuestionNavigatorComp>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      }
    </div>
  );
}

export default TestScreen;