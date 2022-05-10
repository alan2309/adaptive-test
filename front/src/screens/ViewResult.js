import React, { useEffect, useState, useRef } from "react";
import { isExpired, decodeToken } from "react-jwt";
import { useSearchParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { Col, Modal, Row, Form } from "react-bootstrap";
import TestHeaderComp from "../components/TestScreeen/TestHeaderComp";
import Chart from "react-apexcharts";
import "../css/ResultScreen.css";
import { useReactToPrint } from "react-to-print";
import DetailedReportComp from "../components/Result/DetailedReportComp";
import Loader from "../components/Loader";
import Alert from "../components/Admin/Alert";
import { useMediaQuery } from "react-responsive";
import MobileWidth from "../components/MobileWidth";

function ViewResult() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalMarksScored, setTotalMarksScored] = useState(0);
  const [timeTaken, setTimeTaken] = useState();
  const [personalityData, setPersonalityData] = useState([]);
  const [mrksScored, setMrksScored] = useState([0, 0, 0, 0, 0, 0]);
  const [avgMarksArr, setAvgMarksArr] = useState([0, 0, 0, 0, 0, 0]);
  const [mrksScoredPercent, setMrksScoredPercent] = useState([]);
  const [opt, setOpt] = useState({});
  const [opt1, setOpt1] = useState({});
  const [optRadar, setOptRadar] = useState({});
  const [show, setShow] = useState(false);
  const [idx, setIdx] = useState();
  const [userDetails, setUserDetails] = useState({});
  const [startTime, setStartTime] = useState("");
  const componentRef = useRef(null);
  const [isLoading, setIsloading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");
  const [dangerMsg, setDangerMsg] = useState("");
  const [isAlertDangerMsgLoaded, setIsAlertDangerMsgLoaded] = useState(false);
  const [isAlertSuccessMsgLoaded, setIsAlertSuccessMsgLoaded] = useState(false);
  const [prediction, setPrediction] = useState(false);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Detailed_report",
  });

  useEffect(() => {
    var user = searchParams.get("user");
    setIsloading(true);
    for (const entry of searchParams.entries()) {
      const [param, value] = entry;
    }

    if (user && searchParams.get("viewRes")) {
      axiosInstance
        .get(`api/results/${user}`, {
          params: {
            testId: searchParams.get("testId"),
            viewRes: searchParams.get("viewRes"),
            viewToken: searchParams.get("viewToken"),
          },
        })
        .then((res) => {
          setMrksScored(res.data.mrksScored);
          setAvgMarksArr(res.data.avgMarksArr);
          setMrksScoredPercent(res.data.mrksScoredPercent);
          setTotalMarksScored(res.data.totalMarksScored);
          setTimeTaken(res.data.timeTaken);
          setPersonalityData(res.data.personalityData);
          setIdx(res.data.res_id);
          setUserDetails(res.data.user_detail);
          setStartTime(res.data.startTime);
          setPrediction(res.data.prediction);
          setIsloading(false);
        })
        .catch((e) => console.log(e));

      setIsloading(false);
    } else {
      alert("in else");
      // navigate('/logout')
      setIsloading(false);
    }
    setOptRadar({
      dataLabels: {
        enabled: true,
      },
      plotOptions: {
        radar: {
          size: 200,
          polygons: {
            strokeColors: "#e9e9e9",
            fill: {
              colors: ["#f8f8f8", "#fff"],
            },
          },
        },
      },
      colors: ["#FF4560"],
      markers: {
        size: 4,
        colors: ["#fff"],
        strokeColor: "#FF4560",
        strokeWidth: 2,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
      xaxis: {
        categories: [
          "Extraversion",
          "Agreeableness",
          "Conscientiousness",
          "Neuroticism",
          "Openness",
        ],
      },
      yaxis: {
        tickAmount: 7,
        labels: {
          formatter: function (val, i) {
            if (i % 2 === 0) {
              return "";
            } else {
              return "";
            }
          },
        },
      },
    });
    setOpt({
      stroke: {
        width: [0, 4],
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      labels: [
        "Aptitude",
        "Computer Fund.",
        "Domain",
        "Coding",
        "Verbal Reasoning",
      ],

      yaxis: [
        {
          title: {
            text: "Marks",
          },
        },
      ],
    });
    setOpt1({
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
            },
            total: {
              show: true,
              label: "Total",
              formatter: function (w) {
                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                const array = w.config.series;
                let sum = 0;

                for (let i = 0; i < array.length; i++) {
                  sum += array[i];
                }
                sum = parseFloat(sum / array.length).toFixed(2);

                return sum + "%";
              },
            },
          },
        },
      },
      labels: [
        "Aptitude",
        "Computer Fund.",
        "Domain",
        "Coding",
        "Verbal Reasoning",
      ],
    });
  }, []);

  return (
    <div>
      {isDesktopOrLaptop ? (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <div>
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
              <Modal
                id="result_page"
                show={show}
                onHide={() => setShow(false)}
                aria-labelledby="det_report"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="det_report">
                    Detailed Report
                    <button
                      onClick={handlePrint}
                      style={{
                        backgroundColor: "white",
                        marginLeft: "10px",
                        outline: "none",
                        border: "0",
                      }}
                    >
                      <i className="fa fa-download" aria-hidden="true"></i>
                    </button>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {personalityData[0] !== undefined &&
                    userDetails !== {} &&
                    timeTaken !== undefined &&
                    totalMarksScored !== undefined &&
                    startTime !== undefined && (
                      <DetailedReportComp
                        prediction={prediction}
                        componentRef={componentRef}
                        SEP={personalityData[0].SEP}
                        SEFP={personalityData[0].SEFP}
                        LO={personalityData[0].LO}
                        HI={personalityData[0].HI}
                        SE={personalityData[0].SE}
                        SAP={personalityData[0].SAP}
                        SAFP={personalityData[0].SAFP}
                        SA={personalityData[0].SA}
                        SC={personalityData[0].SC}
                        SCP={personalityData[0].SCP}
                        SCFP={personalityData[0].SCFP}
                        flev={personalityData[0].flev}
                        SOP={personalityData[0].SOP}
                        SOFP={personalityData[0].SOFP}
                        SO={personalityData[0].SO}
                        Nick={personalityData[0].Nick}
                        Country={personalityData[0].Country}
                        SNP={personalityData[0].SNP}
                        SNFP={personalityData[0].SNFP}
                        Category={personalityData[0].Category}
                        SN={personalityData[0].SN}
                        mrksScoredPercent={mrksScoredPercent}
                        user_detail={userDetails}
                        timeTaken={timeTaken}
                        totalMarksScored={totalMarksScored}
                        startTime={startTime}
                      />
                    )}{" "}
                </Modal.Body>
              </Modal>
              <Row>
                <Col md="12">
                  <div
                    className="rectangle"
                    style={{ textAlign: "center", fontSize: "18px" }}
                  >
                    {timeTaken !== undefined && (
                      <TestHeaderComp
                        style={{ fontSize: "18px" }}
                        timer={timeTaken}
                        timeKey="Time Taken"
                        start={false}
                        totalKey={"Marks Scored"}
                        marks={totalMarksScored}
                        header="Evaluation Report"
                        totalValue={totalMarksScored}
                      ></TestHeaderComp>
                    )}
                  </div>
                </Col>
              </Row>
              <p className="Para">Placement Test Analysis</p>
              <Row style={{ marginTop: "5px" }}>
                <Col lg="6">
                  <div
                    className="rectangle"
                    style={{ minHeight: "460px", color: "#788094" }}
                  >
                    <Chart
                      series={[
                        {
                          name: "Marks Scored",
                          type: "column",
                          data: mrksScored,
                        },
                        {
                          name: "Average",
                          type: "line",
                          data: avgMarksArr,
                        },
                      ]}
                      options={opt}
                      type="line"
                      height={`400px`}
                    />
                  </div>
                </Col>
                <Col lg="6">
                  <div
                    className="rectangle"
                    style={{ minHeight: "460px", color: "#788094" }}
                  >
                    <Chart
                      series={mrksScoredPercent}
                      options={opt1}
                      type="radialBar"
                      height={`400px`}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <p className="Para">Personality Test Analysis</p>
                <Col style={{ marginTop: "5px" }}>
                  <div
                    className="rectangle"
                    style={{ minHeight: "460px", backgroundColor: "#FFFFFF" }}
                  >
                    <Row>
                      <Col md={6}>
                        <div className="radarCh">
                          {personalityData[0] && (
                            <Chart
                              series={[
                                {
                                  name: "Score",
                                  data: [
                                    personalityData[0].SEP,
                                    personalityData[0].SAP,
                                    personalityData[0].SCP,
                                    personalityData[0].SNP,
                                    personalityData[0].SOP,
                                  ],
                                },
                              ]}
                              options={optRadar}
                              type="radar"
                              height={`540px`}
                            />
                          )}
                        </div>
                      </Col>
                      <Col md={6}>
                        {personalityData[0] !== undefined && (
                          <div>
                            <h3 className="factor_5_modal">Extraversion</h3>

                            <h5 className="factor_5_modal_result">
                              {" "}
                              {personalityData[0].SE <
                                personalityData[0].LO && (
                                <p>
                                  {" "}
                                  Your score on Extraversion is low, indicating
                                  you are introverted, reserved, and quiet. You
                                  enjoy solitude and solitary activities. Your
                                  socializing tends to be restricted to a few
                                  close friends.{" "}
                                </p>
                              )}
                              {personalityData[0].SE >= personalityData[0].LO &&
                                personalityData[0].SE <=
                                  personalityData[0].HI && (
                                  <>
                                    <br />{" "}
                                    <p>
                                      {" "}
                                      <em>
                                        {" "}
                                        Your score on Extraversion is average,
                                        indicating you are neither a subdued
                                        loner nor a jovial chatterbox. You enjoy
                                        time with others but also time alone.{" "}
                                      </em>{" "}
                                    </p>
                                  </>
                                )}
                              {personalityData[0].SE >
                                personalityData[0].HI && (
                                <>
                                  <br />{" "}
                                  <p>
                                    {" "}
                                    <em>
                                      {" "}
                                      Your score on Extraversion is high,
                                      indicating you are sociable, outgoing,
                                      energetic, and lively. You prefer to be
                                      around people much of the time.{" "}
                                    </em>{" "}
                                  </p>
                                </>
                              )}
                            </h5>

                            <h3 className="factor_5_modal">Agreeableness</h3>

                            <h5 className="factor_5_modal_result">
                              {" "}
                              {personalityData[0].SA <
                                personalityData[0].LO && (
                                <p>
                                  {" "}
                                  Your score on Agreeableness is low, indicating
                                  less concern with others' needs than with your
                                  own. People see you as tough, critical, and
                                  uncompromising.{" "}
                                </p>
                              )}
                              {personalityData[0].SA >= personalityData[0].LO &&
                                personalityData[0].SA <=
                                  personalityData[0].HI && (
                                  <p>
                                    {" "}
                                    Your level of Agreeableness is average,
                                    indicating some concern with others' Needs,
                                    but, generally, unwillingness to sacrifice
                                    yourself for others.{" "}
                                  </p>
                                )}
                              {personalityData[0].SA >
                                personalityData[0].HI && (
                                <p>
                                  {" "}
                                  Your high level of Agreeableness indicates a
                                  strong interest in others' needs and
                                  well-being. You are pleasant, sympathetic, and
                                  cooperative.{" "}
                                </p>
                              )}
                            </h5>

                            <h3 className="factor_5_modal">
                              Conscientiousness
                            </h3>
                            <h5 className="factor_5_modal_result">
                              {" "}
                              {personalityData[0].SC <
                                personalityData[0].LO && (
                                <p>
                                  Your score on Conscientiousness is low,
                                  indicating you like to live for the moment and
                                  do what feels good now. Your work tends to be
                                  careless and disorganized.
                                </p>
                              )}
                              {personalityData[0].SC >= personalityData[0].LO &&
                                personalityData[0].SC <=
                                  personalityData[0].HI && (
                                  <p>
                                    Your score on Conscientiousness is average.
                                    This means you are reasonably reliable,
                                    organized, and self-controlled.
                                  </p>
                                )}
                              {personalityData[0].SC >
                                personalityData[0].HI && (
                                <p>
                                  Your score on Conscientiousness is high. This
                                  means you set clear goals and pursue them with
                                  determination. People regard you as reliable
                                  and hard-working.
                                </p>
                              )}
                            </h5>

                            <h3 className="factor_5_modal">Neuroticism</h3>
                            <h5 className="factor_5_modal_result">
                              {" "}
                              {personalityData[0].SN <
                                personalityData[0].LO && (
                                <p>
                                  Your score on Neuroticism is low, indicating
                                  that you are exceptionally calm, composed and
                                  unflappable. You do not react with intense
                                  emotions, even to situations that most people
                                  would describe as stressful.
                                </p>
                              )}
                              {personalityData[0].SN >= personalityData[0].LO &&
                                personalityData[0].SN <=
                                  personalityData[0].HI && (
                                  <p>
                                    Your score on Neuroticism is average,
                                    indicating that your level of emotional
                                    reactivity is typical of the general
                                    population. Stressful and frustrating
                                    situations are somewhat upsetting to you,
                                    but you are generally able to get over these
                                    feelings and cope with these situations.
                                  </p>
                                )}
                              {personalityData[0].SN >
                                personalityData[0].HI && (
                                <p>
                                  Your score on Neuroticism is high, indicating
                                  that you are easily upset, even by what most
                                  people consider the normal demands of living.
                                  People consider you to be sensitive and
                                  emotional.
                                </p>
                              )}
                            </h5>

                            <h3 className="factor_5_modal">Openness</h3>
                            <h5 className="factor_5_modal_result">
                              {personalityData[0].SO <
                                personalityData[0].LO && (
                                <p>
                                  Your score on Openness to Experience is low,
                                  indicating you like to think in plain and
                                  simple terms. Others describe you as
                                  down-to-earth, practical, and conservative.
                                </p>
                              )}

                              {personalityData[0].SO >= personalityData[0].LO &&
                                personalityData[0].SO <=
                                  personalityData[0].HI && (
                                  <p>
                                    Your score on Openness to Experience is
                                    average, indicating you enjoy tradition but
                                    are willing to try new things. Your thinking
                                    is neither simple nor complex. To others you
                                    appear to be a well-educated person but not
                                    an intellectual.{" "}
                                  </p>
                                )}

                              {personalityData[0].SO >
                                personalityData[0].HI && (
                                <p>
                                  Your score on Openness to Experience is high,
                                  indicating you enjoy novelty, variety, and
                                  change. You are curious, imaginative, and
                                  creative.
                                </p>
                              )}
                            </h5>
                          </div>
                        )}
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>

              {sessionStorage.getItem("admin") === "user" && (
                <button
                  type="button"
                  className="btn"
                  onClick={(e) => {
                    navigate("/logout");
                  }}
                  style={{
                    marginTop: "20px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                  }}
                >
                  Logout
                </button>
              )}
              {sessionStorage.getItem("admin") !== "user" &&
                sessionStorage.getItem("admin") !== "admin" && (
                  <button
                    type="button"
                    className="btn"
                    onClick={(e) => {
                      navigate("/");
                    }}
                    style={{
                      marginTop: "20px",
                      backgroundColor: "#10b65c",
                      color: "white",
                      border: "none",
                    }}
                  >
                    Home
                  </button>
                )}
              <button
                type="button"
                className="btn"
                onClick={(e) => setShow(true)}
                style={{
                  marginTop: "20px",
                  marginLeft: "5px",
                  backgroundColor: "#10b65c",
                  color: "white",
                  border: "none",
                }}
              >
                View Detailed Report
              </button>
            </div>
          )}
        </>
      ) : (
        <MobileWidth />
      )}
    </div>
  );
}

export default ViewResult;
