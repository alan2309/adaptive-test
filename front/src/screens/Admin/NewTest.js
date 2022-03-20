import React, { useEffect, useState } from "react";
import { Button, Col, Row, Form, Modal } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import "../../css/AdminHomeScreen.css";
import $ from "jquery";
import sidFunc from "../../components/Admin/sidFunc";
import SampleCSVFormat from "../../components/Admin/SampleCSVFormat";
import DateTimePicker from "react-datetime-picker";
import axiosInstance from "../../axios";
import Loader from "../../components/Loader";
import Alert from "../../components/Admin/Alert";
import MobileWidth from "../../components/MobileWidth";
import { useMediaQuery } from "react-responsive";
import { quesData } from "./sampleJSON";
import { quesSampleData } from "./SampleDBJSON";
import SetQuestion from "./SetQuestion";
import CSVUploadCsv from "../../components/Admin/CSVUploadCsv";
import { CSVLink } from "react-csv";

function NewTest() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  //Current Sec Data
  const [easy, setEasy] = useState([]);
  const [med, setMed] = useState([]);
  const [hard, setHard] = useState([]);
  const [qs, setQs] = useState(0);
  const [axData, setAxData] = useState({});
  const [tests, setTests] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [dangerMsg, setDangerMsg] = useState("");
  const [isAlertDangerMsgLoaded, setIsAlertDangerMsgLoaded] = useState(false);
  const [isAlertSuccessMsgLoaded, setIsAlertSuccessMsgLoaded] = useState(false);
  const [aptDic, setAptDic] = useState({ time: "00:00:20", totalQs: 0 });
  const [CFDic, setCFDic] = useState({ time: "00:00:20", totalQs: 0 });
  const [DDic, setDDic] = useState({ time: "00:00:20", totalQs: 0 });
  const [PDic, setPDic] = useState({ time: "00:00:20", totalQs: 0 }); //$
  const [CDic, setCDic] = useState({ time: "00:00:20", totalQs: 0 });
  const [AWDic, setAWDic] = useState({ time: "00:00:20", totalQs: 0 });
  const [typeQs, setTypeQs] = useState();
  const [isInside, setIsInside] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [show, setShow] = useState(false);

  const [CurrentDic, setCurrentDic] = useState({
    time: "00:00:20",
    totalQs: 0,
  });

  const [sectionName, setSectionName] = useState([]);
  const [sDate, setSDate] = useState(new Date());
  const [eDate, setEDate] = useState(new Date());
  const [tName, setTName] = useState();
  const [sid, setSid] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(true);
  const [csvJsonData, setCsvJsonData] = useState({});
  const [isSampleCsvData, setIsSampleCsvData] = useState(false);
  const [isChoose, setIsChoose] = useState(true);
  const [testId, setTestId] = useState(true);
  const [goLive, setGoLive] = useState(false);

  useEffect(() => {
    setIsloading(true);
    var ssid;
    if (sessionStorage.getItem("isNewTestReload") !== null) {
      ssid = 0;
      setSid(ssid + 1);
    } else {
      sessionStorage.setItem("isNewTestReload", false);
      ssid = location.state.sid;
      setSid(ssid + 1);
    }
    let d;
    let Wssid = sidFunc(ssid);
    if (location.state?.isUpdate) {
      d = location.state.data.data;
      setTName(location.state.data.test_name);
      setSDate(new Date(location.state.data.test_start));
      setEDate(new Date(location.state.data.test_end));
      setAWDic(location.state.data.awDic);
      setAptDic(location.state.data.aptDic);
      setPDic(location.state.data.pDic);
      setCDic(location.state.data.cDic);
      setDDic(location.state.data.domDic);
      setCFDic(location.state.data.cfDic);
      setCurrentDic(location.state.data.aptDic);
      setTestId(location.state.data.id);
      setGoLive(location.state.data.live);
    } else {
      d = quesData.data; //customData
      if (d[Wssid].medium.length !== 0) {
        setCurrentDic(aptDic);
      } else {
        setCurrentDic({ time: "00:00:20", totalQs: 0 });
      }
    }
    // var d = res.data.data;
    setAxData(d);
    //For Aptitude
    setSectionName(Wssid);
    setEasy(d[Wssid].easy);
    setHard(d[Wssid].hard);
    setMed(d[Wssid].medium);
    setQs(d[Wssid].qs);
    const getTest = async () => {
      await axiosInstance
        .get("api/admin/tests")
        .then((res) => {
          let ar = [];
          let st = res.data.stests;
          let ut = res.data.utests;
          setTests(ar.concat(st, ut));
        })
        .catch((e) => console.log(e));
    };
    getTest();
    setIsloading(false);
  }, []);

  function jsonop_success() {
    setCurrentDic((prev) => ({
      ...prev,
      totalQs: 0,
    }));
    if (sid - 1 === 1) {
      setCFDic({
        time: CurrentDic.time,
        totalQs: 0,
      });
    } else if (sid - 1 === 2) {
      setDDic({
        time: CurrentDic.time,
        totalQs: 0,
      });
    } else if (sid - 1 === 3) {
      setPDic({
        time: CurrentDic.time,
        totalQs: 0, //$,
      });
    } else if (sid - 1 == 4) {
      setCDic({
        time: CurrentDic.time,
        totalQs: 0,
      });
    } else if (sid - 1 == 5) {
      setAWDic({
        time: CurrentDic.time,
        totalQs: 0,
      });
    } else if (sid - 1 === 0) {
      setAptDic({
        time: CurrentDic.time,
        totalQs: 0,
      });
    }
  }

  function update_jsondata(data, sectionName, type, index, newtype) {
    type = type.toLowerCase();
    newtype = newtype.toLowerCase();
    let updatedarr = axData[sectionName][type];
    if (type === newtype) {
      updatedarr[index] = data;
      setAxData((prev) => ({
        ...prev,
        [sectionName]: {
          ...prev[sectionName],
          [type]: updatedarr,
          qs: 0,
        },
      }));
    } else {
      let newarrr = [...axData[sectionName][newtype], data];
      updatedarr.splice(index, 1);
      setAxData((prev) => ({
        ...prev,
        [sectionName]: {
          ...prev[sectionName],
          [type]: updatedarr,
          [newtype]: newarrr,
          qs: 0,
        },
      }));
      if (newtype === "easy") setEasy(newarrr);
      else if (newtype === "medium") setMed(newarrr);
      else setHard(newarrr);
    }
    if (type === "easy") setEasy(updatedarr);
    else if (type === "medium") setMed(updatedarr);
    else setHard(updatedarr);
    jsonop_success();
    setRefresh(true);
  }

  function add_jsondata(data, sectionName, type) {
    let ltype = type.toLowerCase();
    setAxData((prev) => ({
      ...prev,
      [sectionName]: {
        ...prev[sectionName],
        [ltype]: [...prev[sectionName][ltype], data],
        qs: 0,
      },
    }));

    jsonop_success();
    if (ltype === "easy") setEasy([...easy, data]);
    else if (ltype === "medium") setMed([...med, data]);
    else setHard([...hard, data]);
    setRefresh(true);
  }

  function delete_jsondata(tempar, sectionName, type) {
    type = type.toLowerCase();
    setAxData((prev) => ({
      ...prev,
      [sectionName]: {
        ...prev[sectionName],
        [type]: tempar,
        qs: 0,
      },
    }));
    setRefresh(true);
    jsonop_success();
    if (type === "easy") setEasy(tempar);
    else if (type === "medium") setMed(tempar);
    else setHard(tempar);
  }
  function saveTest(e) {
    setIsloading(true);
    e.preventDefault();
    let sx = new Date(sDate);
    let ex = new Date(eDate);
    if (ex.getTime() > sx.getTime()) {
      let objClash = clash(sx.getTime(), ex.getTime(), testId);
      if (!objClash.bool) {
        let creaTest = {
          testName: tName,
          sTime: sDate,
          eTime: eDate,
          goLive: goLive,
        };
        axiosInstance
          .post("api/createTest", {
            data: {
              saveTest: axData,
              createTest: creaTest,
              isUpdate: location.state?.isUpdate || false,
              tid: location.state?.data?.id || null,
            },
          })
          .then((res) => {
            setIsloading(false);
            location.state?.isUpdate
              ? navigate("/admin/scheduledTest")
              : navigate("/admin/home");
          });
      } else {
        setIsloading(false);
        setIsAlertDangerMsgLoaded(true);
        setDangerMsg(objClash.msg);
      }
    } else {
      setIsloading(false);
      setIsAlertDangerMsgLoaded(true);
      setDangerMsg("End time must be greater than start time");
    }
  }
  function clash(stx, etx, tId) {
    for (let i = 0; i < tests.length; i++) {
      if (tId === tests[i].id) continue;
      let ss = new Date(tests[i].test_start).getTime();
      let ee = new Date(tests[i].test_end).getTime();
      if (tests[i].test_name === tName) {
        return { bool: 1, msg: "Name cannot be same as other test" };
      }
      if ((stx >= ss && stx <= ee) || (etx >= ss && etx <= ee)) {
        return { bool: 1, msg: "This test will clash with an existing test" };
      } else if ((ss >= stx && ss <= etx) || (ee > stx && ee <= etx)) {
        return { bool: 1, msg: "This test will clash with an existing test" };
      }
    }
    return { bool: 0 };
  }

  function secOnCLick(e, index) {
    setIsChoose(true);
    var d = axData;
    var Wssid = sidFunc(index);
    setSid(index + 1);
    setSectionName(Wssid);
    setEasy(d[Wssid].easy);
    setHard(d[Wssid].hard);
    setMed(d[Wssid].medium);
    setQs(d[Wssid].qs);

    if (d[Wssid].medium.length > 0) {
      if (index === 1) {
        setCurrentDic(CFDic);
      } else if (index === 2) {
        setCurrentDic(DDic);
      } else if (index === 3) {
        setCurrentDic(PDic);
      } else if (index == 4) {
        setCurrentDic(CDic);
      } else if (index == 5) {
        setCurrentDic(AWDic);
      } else if (index === 0) {
        setCurrentDic(aptDic);
      }
    } else {
      if (index === 1) {
        setCurrentDic({ time: CFDic.time, totalQs: 0 });
      } else if (index === 2) {
        setCurrentDic({ time: DDic.time, totalQs: 0 });
      } else if (index === 3) {
        setCurrentDic({ time: PDic.time, totalQs: 0 });
      } else if (index == 4) {
        setCurrentDic({ time: CDic.time, totalQs: 0 });
      } else if (index == 5) {
        setCurrentDic({ time: AWDic.time, totalQs: 0 });
      } else if (index === 0) {
        setCurrentDic({ time: aptDic.time, totalQs: 0 });
      }
    }

    $(e.target).addClass("sectionOnCLickToggle");

    Array.from(document.querySelectorAll(".sectionClick")).forEach(function (
      el
    ) {
      if (e.target !== el) {
        el.classList.remove("sectionOnCLickToggle");
      }
    });
  }

  $(document.getElementById("listSec")).ready(function () {
    Array.from(document.querySelectorAll(".sectionClick")).forEach(function (
      el,
      index
    ) {
      if (index + 1 === sid) {
        el.classList.add("sectionOnCLickToggle");
      }
    });
  });
  function check_MaxQS_Db(fromSub) {
    let easy_len, med_len, hard_len, isPersonality;
    if (fromSub !== undefined && fromSub !== {}) {
      easy_len = fromSub.easy;
      med_len = fromSub.medium;
      hard_len = fromSub.hard;
      isPersonality = fromSub.isPersonality;
    } else {
      easy_len = easy.length;
      med_len = med.length;
      hard_len = hard.length;
      isPersonality = false;
    }
    if (sid === 4) {
      isPersonality = true
    }
    let min_ = Math.min(easy_len, med_len, hard_len);
    if (!isPersonality && sid !== 6) {
      if (min_ === 0) {
        if (med_len > 0) {
          return 1;
        } else {
          return 0;
        }
      } else {
        return min_;
      }
    } else {
      return med_len;
    }
  }
  function checkMaxQs(e) {
    e.preventDefault();
    let compare_val = check_MaxQS_Db();
    let curr_value = e.target.valueAsNumber;

    if (0 <= curr_value && curr_value <= compare_val) {
      if (sid - 1 === 1) {
        setCFDic({
          time: CurrentDic.time,
          totalQs: curr_value,
        });
        setAxData((prev) => ({
          ...prev,
          ["Computer Fundamentals"]: {
            ...prev["Computer Fundamentals"],
            qs: curr_value,
            avg: Math.ceil(curr_value * 2 * 0.7),
            time: CurrentDic.time,
            maxQs: check_MaxQS_Db({
              isPersonality: false,
              easy: axData["Computer Fundamentals"].easy.length,
              medium: axData["Computer Fundamentals"].medium.length,
              hard: axData["Computer Fundamentals"].hard.length,
            }),
          },
        }));
      } else if (sid - 1 === 2) {
        setDDic({
          time: CurrentDic.time,
          totalQs: curr_value,
        });
        setAxData((prev) => ({
          ...prev,
          ["Domain"]: {
            ...prev["Domain"],
            qs: curr_value,
            time: CurrentDic.time,
            avg: Math.ceil(curr_value * 2 * 0.7),
            maxQs: check_MaxQS_Db({
              isPersonality: false,
              easy: axData["Domain"].easy.length,
              medium: axData["Domain"].medium.length,
              hard: axData["Domain"].hard.length,
            }),
          },
        }));
      } else if (sid - 1 === 3) {
        setPDic({
          time: CurrentDic.time,
          totalQs: curr_value, //$,
        });
        setAxData((prev) => ({
          ...prev,
          ["Personality"]: {
            ...prev["Personality"],
            qs: curr_value,
            time: CurrentDic.time,
            avg: 30,
            maxQs: check_MaxQS_Db({
              isPersonality: true,
              easy: axData["Personality"].easy.length,
              medium: axData["Personality"].medium.length,
              hard: axData["Personality"].hard.length,
            }),
          },
        }));
      } else if (sid - 1 == 4) {
        setCDic({
          time: CurrentDic.time,
          totalQs: curr_value,
        });
        setAxData((prev) => ({
          ...prev,
          ["Coding"]: {
            ...prev["Coding"],
            qs: curr_value,
            time: CurrentDic.time,
            avg: 30,
            maxQs: check_MaxQS_Db({
              isPersonality: false,
              easy: axData["Coding"].easy.length,
              medium: axData["Coding"].medium.length,
              hard: axData["Coding"].hard.length,
            }),
          },
        }));
      } else if (sid - 1 == 5) {
        setAWDic({
          time: CurrentDic.time,
          totalQs: curr_value,
        });
        setAxData((prev) => ({
          ...prev,
          ["Analytical Writing"]: {
            ...prev["Analytical Writing"],
            qs: curr_value,
            time: CurrentDic.time,
            maxQs: 3,
            avg: 30,
          },
        }));
      } else if (sid - 1 === 0) {
        setAptDic({
          time: CurrentDic.time,
          totalQs: curr_value,
        });
        setAxData((prev) => ({
          ...prev,
          ["Aptitude"]: {
            ...prev["Aptitude"],
            qs: curr_value,
            time: CurrentDic.time,
            avg: Math.ceil(curr_value * 2 * 0.7),
            maxQs: check_MaxQS_Db({
              isPersonality: false,
              easy: axData["Aptitude"].easy.length,
              medium: axData["Aptitude"].medium.length,
              hard: axData["Aptitude"].hard.length,
            }),
          },
        }));
      }
      setCurrentDic({
        time: CurrentDic.time,
        totalQs: curr_value,
      });
    }
  }
  function uploadCsvToAxData(e, subjectId) {
    e.preventDefault();
    if (Object.keys(csvJsonData).length !== 0) {
      let subjectName = sidFunc(subjectId - 1);
      setAxData((prev) => ({
        ...prev,
        [subjectName]: {
          ...prev[subjectName],
          easy: csvJsonData[subjectName]["easy"],
          medium: csvJsonData[subjectName]["medium"],
          hard: csvJsonData[subjectName]["hard"],
          qs: 0,
        },
      }));
      jsonop_success();
      setEasy(csvJsonData[subjectName]["easy"]);
      setMed(csvJsonData[subjectName]["medium"]);
      setHard(csvJsonData[subjectName]["hard"]);
      setCsvJsonData({});
      document.getElementById("csv_upload").value = "";
      setRefresh(true);
    }
  }
  function uploadSampleToAxData(e, subjectId) {
    e.preventDefault();
    if (Object.keys(quesSampleData.data).length !== 0) {
      let subjectName = sidFunc(subjectId - 1);
      setAxData((prev) => ({
        ...prev,
        [subjectName]: {
          ...prev[subjectName],
          easy: quesSampleData.data[subjectName]["easy"],
          medium: quesSampleData.data[subjectName]["medium"],
          hard: quesSampleData.data[subjectName]["hard"],
          qs: 0,
        },
      }));
      jsonop_success();
      setEasy(quesSampleData.data[subjectName]["easy"]);
      setMed(quesSampleData.data[subjectName]["medium"]);
      setHard(quesSampleData.data[subjectName]["hard"]);
      setRefresh(true);
    }
  }
  function selectOnChange(e) {
    if (parseInt(e.target.value) === 1) {
      setIsChoose(false);
      setIsSampleCsvData(true);
    } else if (parseInt(e.target.value) === 2) {
      setIsChoose(false);
      setIsSampleCsvData(false);
    } else {
      setIsChoose(true);
    }
  }
  return (
    <>
      {isDesktopOrLaptop ? (
        <>
          <Alert
            msg={successMsg}
            setIsAlertMsgLoaded={setIsAlertSuccessMsgLoaded}
            isAlertMsgLoaded={isAlertSuccessMsgLoaded}
            type="success"
          ></Alert>
          <Alert
            msg={dangerMsg}
            setIsAlertMsgLoaded={setIsAlertDangerMsgLoaded}
            isAlertMsgLoaded={isAlertDangerMsgLoaded}
            type="danger"
          ></Alert>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Header
                  style={{ paddingBottom: "20px" }}
                  closeButton
                ></Modal.Header>
                <Modal.Body>
                  <div
                    style={{
                      borderLeft: "3px solid #293E6F",
                      height: "35px",
                      marginTop: "20px",
                      marginLeft: "10px",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "16px",
                        color: "#293E6F",
                        fontFamily: "Poppins",
                        fontWeight: "medium",
                        padding: "6px 0 6px",
                        marginTop: "20px",
                        marginLeft: "10px",
                      }}
                    >
                      Instructions
                    </h2>
                  </div>
                  <ul
                    style={{
                      marginLeft: "2px",
                      marginTop: "12px",
                      fontSize: "13.6px",
                    }}
                  >
                    <li>1st Column must be Question only</li>
                    <li>2nd Column must be Type only</li>
                    <li>3rd Column must be CorrectOption only</li>
                    <li>4th Column must be Option1 only</li>
                    <li>5th Column must be Option2 only</li>
                    <li>nth Column must be Option(n-3) only</li>
                    <li>
                      For Aptitude, Computer Fundamentals, Domain test, Question
                      and Type is required
                    </li>
                    <li>
                      For Personality test only 1st Column ie. Question is
                      required
                    </li>
                    <li>All Column are case sensitive</li>
                  </ul>
                </Modal.Body>
                <Modal.Footer>
                  <CSVLink
                    data={SampleCSVFormat()["data"]}
                    headers={SampleCSVFormat()["header"]}
                    filename={"sample-csv-format-data.csv"}
                    style={{
                      display: isSampleCsvData ? "none" : "inline-block",
                      textDecoration: "none",
                      color: "white",
                      backgroundColor: "#10b65c",
                      width: " 234px",
                      height: " 45px",
                      borderRadius: "14px",
                      marginBottom: "20px",
                      padding: "10px 10px 30px 40px",
                    }}
                  >
                    sample csv format
                  </CSVLink>
                </Modal.Footer>
              </Modal>
              {!isInside && (
                <form onSubmit={saveTest} id="newTestForm">
                  <div
                    className="basicRec"
                    style={{
                      marginBottom: "25px",
                      minHeight: "50px",
                      padding: "15px 15px",
                    }}
                  >
                    <Row>
                      <Col md={4}>
                        Name:{" "}
                        <input
                          type="text"
                          name="testName"
                          onChange={(e) => {
                            setTName(e.target.value);
                          }}
                          value={tName}
                          style={{ width: "80%" }}
                          placeholder="Enter Test Name"
                          required
                        ></input>
                      </Col>
                      <Col md={4}>
                        Start Time:
                        <DateTimePicker
                          className={"TimePicker"}
                          onChange={(e) => {
                            setSDate(e);
                          }}
                          value={sDate}
                          required
                        />
                      </Col>
                      <Col md={4}>
                        End Time:
                        <DateTimePicker
                          className={"TimePicker"}
                          onChange={(e) => {
                            setEDate(e);
                          }}
                          value={eDate}
                          required
                        />
                      </Col>
                    </Row>
                  </div>
                  <Row>
                    <Col md={3}>
                      {" "}
                      <div
                        className="basicRec"
                        id="listSec"
                        style={{
                          height: "420px",
                          marginTop: "15px",
                          overflow: "hidden",
                        }}
                      >
                        <Row>
                          <Col md={12}>
                            <div
                              className="sectionClick"
                              onClick={(e) => secOnCLick(e, 0)}
                            >
                              Aptitude
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12}>
                            <div
                              className="sectionClick"
                              onClick={(e) => secOnCLick(e, 1)}
                            >
                              Computer Fundamentals
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12}>
                            <div
                              className="sectionClick"
                              onClick={(e) => secOnCLick(e, 2)}
                            >
                              Domain
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12}>
                            <div
                              className="sectionClick"
                              onClick={(e) => secOnCLick(e, 3)}
                            >
                              Personality
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12}>
                            <div
                              className="sectionClick"
                              onClick={(e) => secOnCLick(e, 4)}
                            >
                              Coding
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12}>
                            <div
                              className="sectionClick"
                              onClick={(e) => secOnCLick(e, 5)}
                            >
                              Analytical Writing
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    <Col>
                      <div
                        className="mainRec"
                        style={{
                          height: sid === 6 || sid === 4 ? "auto" : "auto",
                          marginTop: sid === 6 || sid === 4 ? "50px" : "0",
                        }}
                      >
                        <div
                          className="AdminSetSection"
                          style={{
                            marginBottom: sid === 6 || sid === 4 ? "70px" : "0",
                          }}
                        >
                          <div className="basicRec secNm">{sectionName}</div>

                          {sid !== 6 && sid !== 5 && (
                            <>
                              {sid === 1 && (
                                <>
                                  <Form.Select
                                    onChange={(e) => {
                                      selectOnChange(e);
                                    }}
                                    className="basicRec secNm"
                                    aria-label="Default select example"
                                    style={{
                                      margin: "20px 0",
                                      color: "#293e6f",
                                      fontWeight: "550",
                                    }}
                                  >
                                    <option value="">
                                      Choose data to upload
                                    </option>
                                    <option value="1">
                                      Upload sample data
                                    </option>
                                    <option value="2">Upload csv</option>
                                  </Form.Select>
                                  {!isChoose && !isSampleCsvData && (
                                    <CSVUploadCsv
                                      setCsvJsonData={setCsvJsonData}
                                      setIsAlertDangerMsgLoaded={
                                        setIsAlertDangerMsgLoaded
                                      }
                                      setDangerMsg={setDangerMsg}
                                      csvJsonData={csvJsonData}
                                      subjectName={sidFunc(sid - 1)}
                                    />
                                  )}
                                </>
                              )}
                              {sid === 2 && (
                                <>
                                  <Form.Select
                                    onChange={(e) => {
                                      selectOnChange(e);
                                    }}
                                    className="basicRec secNm"
                                    aria-label="Default select example"
                                    style={{ margin: "10px 0" }}
                                  >
                                    <option value="">
                                      Choose data to upload
                                    </option>
                                    <option value="1">
                                      Upload sample data
                                    </option>
                                    <option value="2">Upload csv</option>
                                  </Form.Select>
                                  {!isChoose && !isSampleCsvData && (
                                    <CSVUploadCsv
                                      setCsvJsonData={setCsvJsonData}
                                      setIsAlertDangerMsgLoaded={
                                        setIsAlertDangerMsgLoaded
                                      }
                                      setDangerMsg={setDangerMsg}
                                      csvJsonData={csvJsonData}
                                      subjectName={sidFunc(sid - 1)}
                                    />
                                  )}
                                </>
                              )}
                              {sid === 3 && (
                                <>
                                  <Form.Select
                                    onChange={(e) => {
                                      selectOnChange(e);
                                    }}
                                    className="basicRec secNm"
                                    aria-label="Default select example"
                                    style={{ margin: "10px 0" }}
                                  >
                                    <option value="">
                                      Choose data to upload
                                    </option>
                                    <option value="1">
                                      Upload sample data
                                    </option>
                                    <option value="2">Upload csv</option>
                                  </Form.Select>
                                  {!isChoose && !isSampleCsvData && (
                                    <CSVUploadCsv
                                      setCsvJsonData={setCsvJsonData}
                                      setIsAlertDangerMsgLoaded={
                                        setIsAlertDangerMsgLoaded
                                      }
                                      setDangerMsg={setDangerMsg}
                                      csvJsonData={csvJsonData}
                                      subjectName={sidFunc(sid - 1)}
                                    />
                                  )}
                                </>
                              )}
                              {sid === 4 && (
                                <>
                                  <Form.Select
                                    onChange={(e) => {
                                      selectOnChange(e);
                                    }}
                                    className="basicRec secNm"
                                    aria-label="Default select example"
                                    style={{ margin: "10px 0" }}
                                  >
                                    <option value="">
                                      Choose data to upload
                                    </option>
                                    <option value="1">
                                      Upload sample data
                                    </option>
                                    <option value="2">Upload csv</option>
                                  </Form.Select>
                                  {!isChoose && !isSampleCsvData && (
                                    <CSVUploadCsv
                                      setCsvJsonData={setCsvJsonData}
                                      setIsAlertDangerMsgLoaded={
                                        setIsAlertDangerMsgLoaded
                                      }
                                      setDangerMsg={setDangerMsg}
                                      csvJsonData={csvJsonData}
                                      subjectName={sidFunc(sid - 1)}
                                    />
                                  )}
                                </>
                              )}
                              <Row style={{ marginTop: "5px" }}>
                                {!isChoose && (
                                  <>
                                    <Col md={isSampleCsvData ? 0 : 6}>
                                      <button
                                        type="button"
                                        className="btn scTest1"
                                        style={{
                                          display: isSampleCsvData
                                            ? "none"
                                            : "inline-block",
                                        }}
                                        onClick={(e) => {
                                          setShow(true);
                                        }}
                                      >
                                        View Sample Csv Format
                                      </button>
                                    </Col>
                                    <Col md={isSampleCsvData ? 12 : 6}>
                                      <button
                                        type="button"
                                        id="csv_upload_button"
                                        className="btn scTest1"
                                        style={{ display: "inline-block" }}
                                        onClick={(e) => {
                                          {
                                            isSampleCsvData
                                              ? uploadSampleToAxData(e, sid)
                                              : uploadCsvToAxData(e, sid);
                                          }
                                        }}
                                      >
                                        {isSampleCsvData
                                          ? "Upload Sample Data"
                                          : "Upload Csv Data"}
                                      </button>
                                    </Col>
                                  </>
                                )}
                              </Row>
                            </>
                          )}
                          <Row style={{ margin: "24px 0", padding: "0px 0px" }}>
                            <Col
                              md={6}
                              className={
                                sid === 6 || sid === 4 ? "onHoverDiv" : ""
                              }
                              style={{ padding: "0px" }}
                              onClick={(e) => {
                                if (parseInt(sid - 1) === 5 || sid === 4) {
                                  // navigate("/admin/setQs", {
                                  //   state: {
                                  //     type: "Medium",
                                  //     sectionName: sectionName,
                                  //     sid: sid,
                                  //     navArr: med,
                                  //   },
                                  // });
                                  setTypeQs("Medium");
                                  setIsInside(true);
                                }
                              }}
                            >
                              <div className="basicRec avQs">
                                Available{" "}
                                {parseInt(sid - 1) !== 5
                                  ? "Question"
                                  : "Paragraph"}
                                {sid - 1 !== 5 && sid !== 4 && (
                                  <>
                                    <div class="grid-container">
                                      <div class="grid-item">
                                        {easy.length}{" "}
                                        <p
                                          style={{
                                            fontSize: "20px",
                                            marginTop: "25px",
                                            fontWeight: "400px",
                                          }}
                                        >
                                          Easy
                                        </p>
                                      </div>
                                      <div class="grid-item">
                                        {med.length}{" "}
                                        <p
                                          style={{
                                            fontSize: "20px",
                                            marginTop: "25px",
                                            fontWeight: "400px",
                                          }}
                                        >
                                          Medium
                                        </p>
                                      </div>
                                      <div class="grid-item">
                                        {hard.length}{" "}
                                        <p
                                          style={{
                                            fontSize: "20px",
                                            marginTop: "25px",
                                            fontWeight: "400px",
                                          }}
                                        >
                                          Hard
                                        </p>
                                      </div>
                                    </div>
                                  </>
                                )}
                                {(sid - 1 === 5 || sid === 4) && (
                                  <div
                                    class="grid-container"
                                    style={{
                                      gridTemplateColumns: "auto",
                                      textAlign: "center",
                                    }}
                                  >
                                    <div class="grid-item">{med.length} </div>
                                  </div>
                                )}
                              </div>
                            </Col>

                            <Col md={6} style={{ padding: "0px" }}>
                              {sid - 1 !== 5 && sid !== 4 && (
                                <>
                                  <Row>
                                    <Col>
                                      <div
                                        className="basicRec easyMedHard onHoverDiv"
                                        style={{
                                          marginBottom: "28px",
                                          padding: "11px 10px",
                                        }}
                                        onClick={(e) => {
                                          // navigate("/admin/setQs", {
                                          //   state: {
                                          //     type: "Easy",
                                          //     sectionName: sectionName,
                                          //     sid: sid,
                                          //     navArr: easy,
                                          //   },
                                          // });
                                          setTypeQs("Easy");
                                          setIsInside(true);
                                        }}
                                      >
                                        Easy
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <div
                                        className="basicRec easyMedHard onHoverDiv"
                                        style={{
                                          marginBottom: "28px",
                                          padding: "11px 10px",
                                        }}
                                        onClick={(e) => {
                                          // navigate("/admin/setQs", {
                                          //   state: {
                                          //     type: "Medium",
                                          //     sectionName: sectionName,
                                          //     sid: sid,
                                          //     navArr: med,
                                          //   },
                                          // });
                                          setTypeQs("Medium");
                                          setIsInside(true);
                                        }}
                                      >
                                        Medium
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <div
                                        className="basicRec easyMedHard onHoverDiv"
                                        style={{ padding: "11px 10px" }}
                                        onClick={(e) => {
                                          // navigate("/admin/setQs", {
                                          //   state: {
                                          //     type: "Hard",
                                          //     sectionName: sectionName,
                                          //     sid: sid,
                                          //     navArr: hard,
                                          //   },
                                          // });
                                          setTypeQs("Hard");
                                          setIsInside(true);
                                        }}
                                      >
                                        Hard
                                      </div>
                                    </Col>
                                  </Row>
                                </>
                              )}
                              {(parseInt(sid - 1) === 5 ||
                                parseInt(sid) === 4) && (
                                  <>
                                    <Row style={{ margin: "10px 0" }}>
                                      <Col style={{ padding: "0px" }}>
                                        <div
                                          className="basicRec secNm timerComp"
                                          style={{
                                            width: "100%",
                                            padding: "11px 10px",
                                            height: "100%",
                                          }}
                                        >
                                          <input
                                            type="time"
                                            title={"Minimum should be 20 seconds"}
                                            showSeconds
                                            className="timeFieldInput "
                                            id="timeFieldInput1"
                                            minTime="00:00:20"
                                            step={1}
                                            onChange={(e, value) => {
                                              var hms = e.target.value; // your input string
                                              var a = hms.split(":"); // split it at the colons
                                              var seconds =
                                                a[0] * 60 * 60 +
                                                +a[1] * 60 +
                                                +a[2];
                                              if (seconds > 19) {
                                                if (sid - 1 === 1) {
                                                  setCFDic({
                                                    time: e.target.value,
                                                    totalQs: CurrentDic.totalQs,
                                                  });
                                                  setAxData((prev) => ({
                                                    ...prev,
                                                    ["Computer Fundamentals"]: {
                                                      ...prev[
                                                      "Computer Fundamentals"
                                                      ],
                                                      time: e.target.value,
                                                    },
                                                  }));
                                                } else if (sid - 1 === 2) {
                                                  setDDic({
                                                    time: e.target.value,
                                                    totalQs: CurrentDic.totalQs,
                                                  });
                                                  setAxData((prev) => ({
                                                    ...prev,
                                                    ["Domain"]: {
                                                      ...prev["Domain"],
                                                      time: e.target.value,
                                                    },
                                                  }));
                                                } else if (sid - 1 === 3) {
                                                  setPDic({
                                                    time: e.target.value,
                                                    totalQs: CurrentDic.totalQs, //$,
                                                  });
                                                  setAxData((prev) => ({
                                                    ...prev,
                                                    ["Personality"]: {
                                                      ...prev["Personality"],
                                                      time: e.target.value,
                                                    },
                                                  }));
                                                } else if (sid - 1 == 4) {
                                                  setCDic({
                                                    time: e.target.value,
                                                    totalQs: CurrentDic.totalQs,
                                                  });
                                                  setAxData((prev) => ({
                                                    ...prev,
                                                    ["Coding"]: {
                                                      ...prev["Coding"],
                                                      time: e.target.value,
                                                    },
                                                  }));
                                                } else if (sid - 1 == 5) {
                                                  setAWDic({
                                                    time: e.target.value,
                                                    totalQs: CurrentDic.totalQs,
                                                  });
                                                  setAxData((prev) => ({
                                                    ...prev,
                                                    ["Analytical Writing"]: {
                                                      ...prev[
                                                      "Analytical Writing"
                                                      ],
                                                      time: e.target.value,
                                                    },
                                                  }));
                                                } else if (sid - 1 === 0) {
                                                  setAptDic({
                                                    time: e.target.value,
                                                    totalQs: CurrentDic.totalQs,
                                                  });
                                                  setAxData((prev) => ({
                                                    ...prev,
                                                    ["Aptitude"]: {
                                                      ...prev["Aptitude"],
                                                      time: e.target.value,
                                                    },
                                                  }));
                                                }
                                                setCurrentDic({
                                                  time: e.target.value,
                                                  totalQs: CurrentDic.totalQs,
                                                });
                                              } else {
                                                setIsAlertDangerMsgLoaded(true);
                                                setDangerMsg(
                                                  "Minimum should be 20 seconds"
                                                );
                                              }
                                            }}
                                            style={{
                                              paddingLeft: "3%",
                                              textJustify: "auto",
                                              width: "100%",
                                              color: "#293e6f",
                                              border: "none",
                                              height: "auto",
                                            }}
                                            value={CurrentDic.time}
                                          />
                                        </div>
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col style={{ padding: "0px" }}>
                                        <div
                                          className="basicRec secNm"
                                          style={{
                                            padding: "11px 10px",
                                            margin: "20px 0px 0px 15px",
                                            width: "95%",
                                          }}
                                        >
                                          Total number of questions:{" "}
                                          <input
                                            type="number"
                                            style={{
                                              maxWidth: "60px",
                                              background: "rgba(0,0,0,0)",
                                            }}
                                            onChange={(e) => {
                                              checkMaxQs(e);
                                            }}
                                            value={CurrentDic.totalQs}
                                          />
                                        </div>
                                      </Col>
                                    </Row>
                                  </>
                                )}
                            </Col>
                          </Row>
                          {parseInt(sid - 1) !== 5 && parseInt(sid) !== 4 && (
                            <Row style={{ margin: "44px 0" }}>
                              {" "}
                              <Col md={6} style={{ padding: "0" }}>
                                <div
                                  className="basicRec easyMedHard timerComp"
                                  style={{
                                    width: "90%",
                                    alignItems: "center",
                                  }}
                                >
                                  <input
                                    type="time"
                                    title={"Minimum should be 20 seconds"}
                                    showSeconds
                                    className="timeFieldInput"
                                    id="timeFieldInput1"
                                    minTime="00:00:20"
                                    step={1}
                                    onChange={(e, value) => {
                                      var hms = e.target.value; // your input string
                                      var a = hms.split(":"); // split it at the colons
                                      var seconds =
                                        a[0] * 60 * 60 + +a[1] * 60 + +a[2];
                                      if (seconds > 19) {
                                        if (sid - 1 === 1) {
                                          setCFDic({
                                            time: e.target.value,
                                            totalQs: CurrentDic.totalQs,
                                          });
                                          setAxData((prev) => ({
                                            ...prev,
                                            ["Computer Fundamentals"]: {
                                              ...prev["Computer Fundamentals"],
                                              time: e.target.value,
                                            },
                                          }));
                                        } else if (sid - 1 === 2) {
                                          setDDic({
                                            time: e.target.value,
                                            totalQs: CurrentDic.totalQs,
                                          });
                                          setAxData((prev) => ({
                                            ...prev,
                                            ["Domain"]: {
                                              ...prev["Domain"],
                                              time: e.target.value,
                                            },
                                          }));
                                        } else if (sid - 1 === 3) {
                                          setPDic({
                                            time: e.target.value,
                                            totalQs: CurrentDic.totalQs, //$,
                                          });
                                          setAxData((prev) => ({
                                            ...prev,
                                            ["Personality"]: {
                                              ...prev["Personality"],
                                              time: e.target.value,
                                            },
                                          }));
                                        } else if (sid - 1 == 4) {
                                          setCDic({
                                            time: e.target.value,
                                            totalQs: CurrentDic.totalQs,
                                          });
                                          setAxData((prev) => ({
                                            ...prev,
                                            ["Coding"]: {
                                              ...prev["Coding"],
                                              time: e.target.value,
                                            },
                                          }));
                                        } else if (sid - 1 == 5) {
                                          setAWDic({
                                            time: e.target.value,
                                            totalQs: CurrentDic.totalQs,
                                          });
                                          setAxData((prev) => ({
                                            ...prev,
                                            ["Analytical Writing"]: {
                                              ...prev["Analytical Writing"],
                                              time: e.target.value,
                                            },
                                          }));
                                        } else if (sid - 1 === 0) {
                                          setAptDic({
                                            time: e.target.value,
                                            totalQs: CurrentDic.totalQs,
                                          });
                                          setAxData((prev) => ({
                                            ...prev,
                                            ["Aptitude"]: {
                                              ...prev["Aptitude"],
                                              time: e.target.value,
                                            },
                                          }));
                                        }
                                        setCurrentDic({
                                          time: e.target.value,
                                          totalQs: CurrentDic.totalQs,
                                        });
                                      } else {
                                        setIsAlertDangerMsgLoaded(true);
                                        setDangerMsg(
                                          "Minimum time should be greater than 20 seconds"
                                        );
                                      }
                                    }}
                                    style={{
                                      paddingLeft: "3%",
                                      textJustify: "auto",
                                      width: "100%",
                                      color: "#293e6f",
                                      border: "none",
                                    }}
                                    value={CurrentDic.time}
                                  />
                                </div>
                              </Col>
                              <Col style={{ padding: "0px" }}>
                                <div
                                  className="basicRec secNm"
                                  style={{
                                    padding: "11px 10px",
                                  }}
                                >
                                  Total number of questions:{" "}
                                  <input
                                    type="number"
                                    style={{
                                      maxWidth: "60px",
                                      background: "rgba(0,0,0,0)",
                                    }}
                                    onChange={(e) => {
                                      checkMaxQs(e);
                                    }}
                                    value={CurrentDic.totalQs}
                                  />
                                </div>
                              </Col>
                            </Row>
                          )}
                        </div>
                        <Row>
                          <Col>
                            <label for="value">
                              <Form.Check
                                type={"checkbox"}
                                label="Click here to make the test live for all students."
                                checked={goLive}
                                onChange={(e) => {
                                  setGoLive(!goLive);
                                }}
                                style={{
                                  marginLeft: "90px",
                                  marginBottom: "40px",
                                  color: "#293e6f",
                                  cursor: "pointer",

                                }}
                                id="value"
                              />
                            </label>

                          </Col>
                        </Row>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          marginTop: "30px",
                          justifyContent: "right",
                        }}
                      >
                        <button
                          style={{ color: "white" }}
                          className="btn scTest1"
                          type="button"
                          onClick={(e) => navigate(-1)}
                        >
                          Back
                        </button>{" "}
                        <button
                          style={{ color: "white", marginRight: "0" }}
                          type="submit"
                          className="btn scTest1"
                        >
                          {goLive
                            ? "Go Live"
                            : location.state?.isUpdate
                              ? "Update Draft"
                              : "Save Draft"}
                        </button>
                      </div>
                    </Col>
                  </Row>
                </form>
              )}
              {isInside && (
                <>
                  <SetQuestion
                    add_jsondata={add_jsondata}
                    update_jsondata={update_jsondata}
                    setIsInside={setIsInside}
                    setRefresh={setRefresh}
                    refresh={refresh}
                    type={typeQs}
                    axData={axData}
                    delete_jsondata={delete_jsondata}
                    navArr={
                      typeQs === "Hard"
                        ? hard
                        : typeQs === "Medium"
                          ? med
                          : easy
                    }
                    sid={sid}
                    sectionName={sectionName}
                  />
                </>
              )}
            </>
          )}
        </>
      ) : (
        <MobileWidth />
      )}
    </>
  );
}

export default NewTest;
