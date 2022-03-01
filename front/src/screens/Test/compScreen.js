import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Modal, Button } from "react-bootstrap";
import "../../css/Comprehension.css";
import TestHeaderComp from "../../components/TestScreeen/TestHeaderComp";
import crypt from "../../components/TestScreeen/crypt";
import { useNavigate } from "react-router";
import CustomTimer from "../Admin/CustomTimer";
import getCurrentTime from "../../components/TestScreeen/dateCalc";
import axiosInstance from "../../axios";
import { isExpired, decodeToken } from "react-jwt";
import ProtectUrl from "../../components/TestScreeen/ProtectUrl";
import MobileWidth from "../../components/MobileWidth";
import { useMediaQuery } from "react-responsive";
import { AiFillWarning } from "react-icons/ai";

function CompScreen() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  //prev pages
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [reload, isReload] = useState(false);
  const handleClose = () => {
    setShow(false);
    setMd(true);
  };
  const [countWindowAway, setCountWindowAway] = useState(0);
  const [countWindowAwayModal, setCountWindowAwayModal] = useState(false);
  const [testFinshBool, setTestFinishBool] = useState(false);
  const [md, setMd] = useState(false);
  const [timeFF, setTimeFF] = useState();
  const [passage, setPassage] = useState();
  const [qsno, setQsNo] = useState(0);
  const [parano, setParano] = useState(0);
  const [ans, setAns] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    function fullscreenc() {
      var full_screen_element = document.fullscreenElement;

      if (full_screen_element === null) {
        setShow(true);
        setMd(false);
        isReload(true);
      }
    }
    function visibilityc() {
      if (document.hidden) {
        windowAway();
      }
    }
    function contextm(event) {
      event.preventDefault();
    }
    window.addEventListener("contextmenu", contextm);
    window.addEventListener("fullscreenchange", fullscreenc);
    window.addEventListener("visibilitychange", visibilityc);
    let flag = true;
    if (
      !(sessionStorage.getItem("test6") && !sessionStorage.getItem("test3"))
    ) {
      if (!sessionStorage.getItem("test3")) {
        let az = ProtectUrl.protect();
        if (az !== "") navigate(az);
        navigate(-1);
        flag = false;
      }
    }
    if (flag) {
      var full_screen_element = document.fullscreenElement;

      if (full_screen_element === null) {
        setShow(true);
        setMd(false);
        isReload(true);
      }
      if (!sessionStorage.getItem("test3")) {
        let user = sessionStorage.getItem("username");
        if (sessionStorage.getItem("test6")) {
          let ax = JSON.parse(sessionStorage.getItem("test6"));
          let ar = ax["marks"];
          let total = 0;
          axiosInstance
            .post("api/marks/5", {
              data: {
                username: user,
                marks: ar,
                testId: sessionStorage.getItem("testId"),
                check_result: 0,
                name: sessionStorage.getItem("name"),
                age: sessionStorage.getItem("age"),
                gender: sessionStorage.getItem("gender"),
              },
            })
            .then((res) => {
              sessionStorage.removeItem("test6");
            })
            .catch((e) => console.log(e));
        }
        let txx = getCurrentTime();
        let hh = txx.hh;
        let mm = txx.mm;
        let ss = txx.ss;
        sessionStorage.setItem(
          "test3",
          JSON.stringify({
            username: user,
            STime: Date(),
            FSTimer: "10",
            marks: [],
            parano: -1,
            qsno: -1,
            strtTime: hh + ":" + mm + ":" + ss,
          })
        );
      }
      var test = JSON.parse(sessionStorage.getItem("test3"));
      const token = sessionStorage.getItem("access_token");
      const isMyTokenExpired = isExpired(token);

      if (isMyTokenExpired) {
        navigate("/login");
        return;
      } else {
        if (sessionStorage.getItem("result")) {
          navigate("/result");
        } else {
          if (
            parseInt(test["parano"]) === -1 &&
            parseInt(test["qsno"]) === -1
          ) {
            let xx = sessionStorage.getItem("testId");
            const data = async () => {
              await axiosInstance
                .get(`api/para/${xx}`)
                .then((res) => {
                  let aa = converttime(res.data.time);
                  var tf = aa;
                  // setTimeFF(tf);
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
                  let a = res.data.data;
                  let n = 0;
                  for (let i = 0; i < a.length; i++) {
                    n = n + a[i].questions.length;
                  }
                  let ar = new Array(n).fill(-1);
                  let Maxar = [60];
                  test["marks"] = ar;
                  test["parano"] = 0;
                  test["qsno"] = 0;
                  test["passage"] = a;
                  test["count"] = 0;
                  test["testtime"] = aa;
                  test["maxMarks"] = Maxar;
                  sessionStorage.setItem("test3", JSON.stringify(test));
                  setAns(ar);
                  setPassage(res.data.data);
                })
                .catch((e) => {
                  console.log(e);
                });
            };
            data();
          } else {
            var tf = test["testtime"];
            var ob = new Date();
            var h = (ob.getHours() < 10 ? "0" : "") + ob.getHours();
            var m = (ob.getMinutes() < 10 ? "0" : "") + ob.getMinutes();
            var s = (ob.getSeconds() < 10 ? "0" : "") + ob.getSeconds();

            var timeStart = new Date(
              new Date().toLocaleDateString() + " " + test["strtTime"]
            );
            var timeEnd = new Date(
              new Date().toLocaleDateString() + " " + h + ":" + m + ":" + s
            );
            var hourDiff = (timeEnd - timeStart) / 1000;
            setTimeFF(tf - hourDiff);
            setPassage(test["passage"]);
            setQsNo(parseInt(test["qsno"]));
            setParano(parseInt(test["parano"]));
            setCount(parseInt(test["count"]));
            setAns(test["marks"]);
          }
        }
      }
    }
    return () => {
      window.removeEventListener("contextmenu", contextm);
      window.removeEventListener("fullscreenchange", fullscreenc);
      window.removeEventListener("visibilitychange", visibilityc);
    };
  }, []);

  function converttime(timex) {
    let secs = 0;
    let x = timex.split(":");
    secs = secs + parseInt(x[0]) * 3600 + parseInt(x[1]) * 60 + parseInt(x[2]);
    return secs;
  }

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

  function handleCloseSChange(e) {
    setCountWindowAwayModal(false);
    GoInFullscreen(document.querySelector("#element"));
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

  function next(e) {
    e.preventDefault();
    var test = JSON.parse(sessionStorage.getItem("test3"));
    let radio = document.getElementsByName(`question-${qsno}`);
    let flag = 0;
    for (let i = 0; i < radio.length; i++) {
      if (radio[i].checked) {
        let ar = ans;
        ar[count] = parseInt(crypt.decryptVal(radio[i].value));
        test["marks"] = ar;
        test["gotMarks"] = ar;
        test["count"] = count + 1;
        sessionStorage.setItem("test3", JSON.stringify(test));
        flag = 1;
      }
    }
    if (!flag) {
      let ar = ans;
      ar[count] = -1;
      test["marks"] = ar;
      test["gotMarks"] = ar;
      test["count"] = count + 1;
      sessionStorage.setItem("test3", JSON.stringify(test));
    }
    if (passage[parano].questions.length > qsno + 1) {
      test["qsno"] = qsno + 1;
      sessionStorage.setItem("test3", JSON.stringify(test));
      setQsNo(qsno + 1);
    } else {
      if (passage.length > parano + 1) {
        test["qsno"] = 0;
        test["parano"] = parano + 1;
        sessionStorage.setItem("test3", JSON.stringify(test));
        setParano(parano + 1);
        setQsNo(0);
      } else {
        setTestFinishBool(true);
        setShow(false);
        navigate("/result");
      }
    }
    setCount(count + 1);
    e.target.reset();
  }

  function finish() {
    setTestFinishBool(true);
    setShow(false);
    setMd(true);
    navigate("/result");
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
  return (
    <div>
      {isDesktopOrLaptop ? (
        <>
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
                  reset={md}
                  time={10}
                  start={show}
                  setMd={setMd}
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
                  <b>{countWindowAway === 1 ? "1st" : "Last"} Warning</b>
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
                  The screen has been changed.Test will get auto submitted if
                  you try to change screen again{" "}
                </p>
                <Button
                  onClick={(e) => handleCloseSChange(e)}
                  style={{
                    backgroundColor: "#842029",
                    margin: "10px 0",
                    color: "white",
                    outline: "none",
                    border: "none",
                  }}
                >
                  Continue
                </Button>
              </div>
            </>
          )}
          {passage !== undefined && (
            <>
              <Row className="verbalRHeader">
                <Col md={7}>
                  {timeFF !== undefined && (
                    <div
                      style={{
                        border: "0px solid black",
                        paddingBottom: "7px",
                      }}
                    >
                      <TestHeaderComp
                        timer={timeFF}
                        timeKey="Time"
                        noTotal={true}
                        header="Verbal Reasoning"
                        nextpage={"result"}
                        start={!testFinshBool}
                        reset={testFinshBool}
                        setMd={setMd}
                      ></TestHeaderComp>
                    </div>
                  )}
                </Col>

                <Col md={5}>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={(e) => {
                      setTestFinishBool(true);
                      setShow(false);
                      setMd(true);
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
                      float: "right",
                      backgroundColor: "#081466",
                      width: "fit-content",
                      borderRadius: "10px",
                      marginRight: "30px",
                      color: "white",
                      padding: "7px 10px",
                    }}
                  >
                    Finish Test
                  </button>
                </Col>
              </Row>

              <Row style={{ height: "700px" }}>
                <Col className="passage" style={{ overflow: "none" }}>
                  <div
                    style={{
                      backgroundColor: "#293E6F",
                      boxShadow: "1px 1px 7px 2px rgba(0, 0, 0, 0.25)",
                      borderRadius: "14px",
                      margin: "5px 5px 15px 5px",
                    }}
                  >
                    <div
                      style={{
                        padding: "15px 10px",
                        backgroundColor: "#FEFFFF",
                        boxShadow: "1px 1px 7px 2px rgba(0, 0, 0, 0.25)",
                        borderRadius: "14px",
                        margin: "0 0 0 15px",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "normal",
                        fontSize: "18px",
                        lineHeight: "27px",
                        color: "#081466",
                      }}
                    >
                      Read the passage and answer the associated questions
                    </div>
                  </div>
                  <h6
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      marginTop: "19.5px",
                      fontSize: "20px",
                    }}
                  >
                    {passage[parano].title}
                  </h6>
                  <textarea
                    style={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: "normal",
                      padding: "0 10px",
                      fontSize: "17.5px",
                      width: "100%",
                      height: "400px",
                      fontSize: "17.5px",
                      lineHeight: "22px",
                      backgroundColor: "#F7F7F7",
                      contentEditable: false,
                      outline: "none",
                      border: "none",
                      color: "black",
                    }}
                    disabled
                    value={passage[parano].para}
                    className="style-4"
                  />
                </Col>
                <Col className="question scrollbar" id="style-4">
                  <div style={{ marginBottom: "10px", padding: "30px" }}>
                    <form onSubmit={next}>
                      <h5
                        style={{
                          fontWeight: "600",
                          marginBottom: "30px",
                          fontSize: "18px",
                          lineHeight: "27px",
                          color: "#081466",
                        }}
                      >
                        Question {qsno + 1}
                      </h5>
                      <h5
                        style={{
                          fontWeight: "normal",
                          marginBottom: "20px",
                          fontSize: "18px",
                          lineHeight: "27px",
                          color: "#081466",
                        }}
                      >
                        {" "}
                        {passage[parano].questions[qsno].question}
                      </h5>

                      {passage[parano].questions[qsno].options.map((opt) => {
                        return (
                          <div
                            className="form-check"
                            style={{ margin: "15px 0" }}
                          >
                            <input
                              type="radio"
                              id={opt.id}
                              name={`question-${qsno}`}
                              className="form-check-input qsRadio"
                              value={crypt.encryptVal(opt.marks)}
                            />
                            <label
                              className="form-check-label option textdivOpt"
                              id="option-one-label"
                              for={opt.id}
                              style={{
                                marginLeft: "15px",
                                fontWeight: "400",
                                width: "100%",
                              }}
                            >
                              {opt.title}
                            </label>
                          </div>
                        );
                      })}
                      <button
                        type="submit"
                        className="btn"
                        style={{
                          backgroundColor: `#10B65C`,
                          width: `100px`,
                          marginLeft: "80%",
                          marginTop: "30px",
                          height: `40px`,
                          borderRadius: `14px`,
                          color: "white",
                        }}
                      >
                        Next
                      </button>
                    </form>
                  </div>
                </Col>
              </Row>
            </>
          )}
        </>
      ) : (
        <MobileWidth />
      )}
    </div>
  );
}

export default CompScreen;
