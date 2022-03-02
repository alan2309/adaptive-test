import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../axios";
import TestHeaderComp from "../../components/TestScreeen/TestHeaderComp";
import QuestionComp from "../../components/TestScreeen/QuestionComp";
import { Col, Modal, Button, Row } from "react-bootstrap";
import QuestionNavigatorComp from "../../components/TestScreeen/QuestionNavigatorComp";
import "../../css/TestScreen.css";
import { useNavigate } from "react-router";
import { isExpired } from "react-jwt";
import $ from "jquery";
import CustomTimer from "../Admin/CustomTimer";
import crypt from "../../components/TestScreeen/crypt";
import ProtectUrl from "../../components/TestScreeen/ProtectUrl";
import Loader from "../../components/Loader";
import MobileWidth from "../../components/MobileWidth";
import { useMediaQuery } from "react-responsive";
import { AiFillWarning } from "react-icons/ai";
import createActivityDetector from "activity-detector";

function Aptitude() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
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
  const [time, setTime] = useState();
  const [newScreen, setNewScreen] = useState(false);
  const [timeFF, setTimeFF] = useState();
  const [isLoading, setIsloading] = useState(true);
  const activityDetector = createActivityDetector({
    timeToIdle: 6000000000000000_0000,
    autoInit: false,
  });
  activityDetector.on("idle", () => {
    windowAway();
  });

  useEffect(() => {
    activityDetector.init();
    function fullscreenc() {
      var full_screen_element = document.fullscreenElement;

      if (full_screen_element === null) {
        setShow(true);
        isReload(true);
      }
    }
    function contextm(event) {
      event.preventDefault();
    }
    window.addEventListener("contextmenu", contextm);
    window.addEventListener("fullscreenchange", fullscreenc);
    if (!sessionStorage.getItem("test")) {
      let az = ProtectUrl.protect();
      if (az !== "") {
        navigate(az);
      } else {
        navigate(-1);
      }
    } else {
      var test = JSON.parse(sessionStorage.getItem("test"));
      const token = sessionStorage.getItem("access_token");
      const isMyTokenExpired = isExpired(token);
      if (test) {
        if (test["question"].length !== 0) {
          isReload(true);
        }
      }
      if (isMyTokenExpired) {
        navigate("/login");
        return;
      } else {
        if (sessionStorage.getItem("result")) {
          navigate("/result");
        } else {
          let xx = sessionStorage.getItem("testId");
          const getData = async () =>
            await axiosInstance
              .get(`api/subs/1/${xx}`)
              .then((res) => {
                let a = converttime(res.data.time);
                var tf = a;
                var totalQs = res.data.qs;
                if (totalQs > 0) {
                  if (test["question"].length === 0) {
                    setTimeFF(tf);
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
                    test["maxMarks"] = [2];
                    sessionStorage.setItem("test", JSON.stringify(test));
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
                    setCurrent(test["currentLevel"]);
                    var ar = test["marks"];
                    setAns(ar);
                    setQsno(test["currentQsNo"] - 1);
                    setQs(test["question"]);
                    var ob = new Date();
                    var h = (ob.getHours() < 10 ? "0" : "") + ob.getHours();
                    var m = (ob.getMinutes() < 10 ? "0" : "") + ob.getMinutes();
                    var s = (ob.getSeconds() < 10 ? "0" : "") + ob.getSeconds();

                    var timeStart = new Date(
                      new Date().toLocaleDateString() + " " + test["strtTime"]
                    );
                    var timeEnd = new Date(
                      new Date().toLocaleDateString() +
                        " " +
                        h +
                        ":" +
                        m +
                        ":" +
                        s
                    );
                    var hourDiff = (timeEnd - timeStart) / 1000;
                    setTimeFF(tf - hourDiff);
                  }
                } else {
                  sessionStorage.removeItem("test");
                  navigate("/computer");
                }
              })
              .catch((e) => {
                console.log(e);
              });
          getData();
        }
      }
    }
    setIsloading(false);
    return () => {
      window.removeEventListener("fullscreenchange", fullscreenc);
      activityDetector.stop();
      window.removeEventListener("contextmenu", contextm);
    };
  }, []);
  function GoInFullscreen(element) {
    if (document.fullscreenElement === null) {
      if (element.requestFullscreen) element.requestFullscreen();
      else if (element.mozRequestFullScreen) element.mozRequestFullScreen();
      else if (element.webkitRequestFullscreen)
        element.webkitRequestFullscreen();
      else if (element.msRequestFullscreen) element.msRequestFullscreen();
      element.style.overflowY = `auto`;
      element.classList.add(`style-4`);
    }
  }
  function windowAway() {
    var ccount = parseInt(sessionStorage.getItem("screenchange"));
    setCountWindowAway(ccount + 1);
    if (ccount + 1 < 3) {
      sessionStorage.setItem("screenchange", ccount + 1);
      setCountWindowAwayModal(true);
    } else {
      navigate("/result");
    }
  }

  function converttime(timex) {
    let secs = 0;
    let x = timex.split(":");
    secs = secs + parseInt(x[0]) * 3600 + parseInt(x[1]) * 60 + parseInt(x[2]);
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
      myans = crypt.decryptVal(pair[1]);
    }
    setTotal(total + parseInt(myans));
    var x;
    ans[qsno] = parseInt(myans);
    setAns(ans);
    var test = JSON.parse(sessionStorage.getItem("test"));

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
        if (ans.length - 1 !== qsno) test["maxMarks"].push(1);
        easy.splice(index, 1);
        break;
      case 2:
        index = getRandomInt(0, medium.length);
        setQs([...qs, medium[index]]);
        test["question"].push(medium[index]);
        test["currentLevel"] = 2;
        if (ans.length - 1 !== qsno) test["maxMarks"].push(2);
        medium.splice(index, 1);
        break;
      case 3:
        index = getRandomInt(0, hard.length);
        setQs([...qs, hard[index]]);
        test["question"].push(hard[index]);
        test["currentLevel"] = 3;
        if (ans.length - 1 !== qsno) test["maxMarks"].push(5);
        hard.splice(index, 1);
        break;
    }
    test["marks"] = ans;
    if (ans.length - 1 === qsno) {
      navigate("/computer");
      sessionStorage.setItem("test", JSON.stringify(test));
    } else {
      setQsno(qsno + 1);
      test["currentQsNo"] = test["currentQsNo"] + 1;
      sessionStorage.setItem("test", JSON.stringify(test));
      e.target.reset();
      checkBoxToggle(e);
    }
  }
  function handleCloseSChange(e) {
    setCountWindowAwayModal(false);
    GoInFullscreen(document.querySelector("#element"));
  }
  function checkBoxToggle(e, optId = undefined) {
    $(".form-check input.qsRadio").removeAttr("checked");
    if (optId !== undefined) {
      var input = $(`.form-check input#${optId}`);
      input.attr("checked", "checked");
    }
    e.preventDefault();
  }
  return (
    <>
      {isDesktopOrLaptop ? (
        <>
          {isLoading ? (
            <Loader />
          ) : (
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
                          {timeFF !== undefined && (
                            <TestHeaderComp
                              timer={timeFF}
                              start={!testFinshBool}
                              reset={testFinshBool}
                              timeKey="Time"
                              totalKey="Total"
                              totalValue={ans.length}
                              header="Aptitude"
                              nextpage={"computer"}
                            ></TestHeaderComp>
                          )}
                        </div>
                      </Col>
                      <Col md="3">
                        <button
                          onClick={(e) => {
                            setTestFinishBool(true);
                            setShow(false);
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
                          style={{
                            minHeight: "50px",
                            backgroundColor: "black",
                          }}
                        >
                          <form onSubmit={click}>
                            {qs !== undefined &&
                              qsno !== undefined &&
                              qs[qsno] !== undefined &&
                              !countWindowAwayModal && (
                                <QuestionComp
                                  checkBoxToggle={checkBoxToggle}
                                  ans={ans}
                                  qsno={qsno}
                                  level={current}
                                  question={qs[qsno].ques}
                                  options={qs[qsno].options}
                                  qsimg={qs[qsno].img}
                                ></QuestionComp>
                              )}
                            {countWindowAwayModal && (
                              <>
                                <div
                                  style={{
                                    backgroundColor: "#F8D7DA",
                                    height: "fit-content",
                                    width: "95%",
                                    border: "1px #8A3C5B",
                                    borderRadius: "8px",
                                    textAlign: "center",
                                    margin: "10px 10px 10px 25px",
                                  }}
                                >
                                  <AiFillWarning
                                    style={{
                                      height: "30px",
                                      width: "30px",
                                      textAlign: "center",
                                      margin: "20px 0",
                                      color: "#842029",
                                    }}
                                  />
                                  <p
                                    style={{
                                      color: "#842029",
                                      textAlign: "center",
                                    }}
                                  >
                                    <b>
                                      {countWindowAway === 1 ? "1st" : "Last"}{" "}
                                      Warning
                                    </b>
                                  </p>
                                  <p
                                    style={{
                                      color: "#842029",
                                      fontWeight: "normal",
                                      fontSize: "14px",
                                      margin: "0 10px 10px 10px",
                                      textAlign: "center",
                                    }}
                                  >
                                    The screen has been changed.Test will get
                                    auto submitted if you try to change screen
                                    again{" "}
                                  </p>
                                  <Button
                                    onClick={(e) => handleCloseSChange(e)}
                                    style={{
                                      backgroundColor: "#842029",
                                      color: "white",
                                      outline: "none",
                                      border: "none",
                                      margin: "10px 0",
                                    }}
                                  >
                                    Continue
                                  </Button>
                                </div>
                              </>
                            )}
                          </form>
                        </div>
                      </Col>
                      <Col md="3">
                        <div
                          className="QuestionNavigatorComp"
                          style={{
                            minHeight: "550px",
                            backgroundColor: "black",
                          }}
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
          )}
        </>
      ) : (
        <MobileWidth />
      )}
    </>
  );
}

export default Aptitude;
