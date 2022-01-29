import React, { useEffect, useState } from "react";
import { isExpired, decodeToken } from "react-jwt";
import { useNavigate } from "react-router";
import axiosInstance from "../axios";
import { Col, Row } from "react-bootstrap";
import TestHeaderComp from "../components/TestScreeen/TestHeaderComp";
import Chart from "react-apexcharts";
import "../css/ResultScreen.css";
import $ from "jquery";

function Result() {
  const navigate = useNavigate();
  const [mrks, setmrks] = useState(0);
  const [totalMarksScored, setTotalMarksScored] = useState(0);
  const [timeTaken, setTimeTaken] = useState();

  const [mrksScored, setMrksScored] = useState([0, 0, 0, 0, 0, 0]);
  const [avgMarksArr, setAvgMarksArr] = useState([0, 0, 0, 0, 0, 0]);
  const [mrksScoredPercent, setMrksScoredPercent] = useState([]);

  const [opt, setOpt] = useState({});
  const [opt1, setOpt1] = useState({});

  useEffect(() => {
    var t = localStorage.getItem("test");
    var t2 = localStorage.getItem("test2");
    var t3 = localStorage.getItem("test3");
    var t4 = localStorage.getItem("test4");
    var t5 = localStorage.getItem("test5");
    var t6 = localStorage.getItem("test6");

    var current, apiId, tNo;
    if (t3 !== null) {
      current = t3;
      apiId = 6;
      tNo = 3;
    } else if (t !== null) {
      current = t;
      apiId = 1;
      tNo = 1;
    } else if (t2 !== null) {
      current = t2;
      apiId = 2;
      tNo = 2;
    } else if (t4 !== null) {
      current = t4;
      apiId = 3;
      tNo = 4;
    } else if (t5 !== null) {
      current = t5;
      apiId = 4;
      tNo = 5;
    } else if (t6 !== null) {
      current = t6;
      apiId = 5;
      tNo = 6;
    }

    if (current !== undefined) {
      alert("in if");
      let ax = JSON.parse(current);
      let user = ax["username"];
      let ar = ax["marks"];
      let maxMarks = ax["maxMarks"];
      let gotMarks = ax["marks"];
      let total = 0;
      for (let i = 0; i < ar.length; i++) {
        if (ar[i] !== -1) total = total + ar[i];
      }
      axiosInstance
        .post(`api/marks/${apiId}`, {
          data: {
            username: user,
            marks: total,
            maxMarks: maxMarks,
            gotMarks: gotMarks,
            testId: localStorage.getItem("testId"),
          },
        })
        .then((res) => {
          console.log("done");
          if (tNo !== 1) {
            localStorage.removeItem(`test${tNo}`);
          } else {
            localStorage.removeItem("test");
          }
          console.log(res.data);
          setMrksScored(res.data.mrksScored);
          setAvgMarksArr(res.data.avgMarksArr);
          setMrksScoredPercent(res.data.mrksScoredPercent);
          setTotalMarksScored(res.data.totalMarksScored);
          setTimeTaken(res.data.timeTaken);
          // localStorage.setItem('result',total)
        })
        .catch((e) => console.log(e));
    } else {
      var user = localStorage.getItem("username");
      if (user) {
        axiosInstance
          .get(`api/results/${user}`, {
            params: {
              testId: localStorage.getItem("testId"),
            },
          })
          .then((res) => {
            console.log("done");
            console.log(res.data);
            setMrksScored(res.data.mrksScored);
            setAvgMarksArr(res.data.avgMarksArr);
            setMrksScoredPercent(res.data.mrksScoredPercent);
            setTotalMarksScored(res.data.totalMarksScored);
            setTimeTaken(res.data.timeTaken);
          })
          .catch((e) => console.log(e));
      }
    }

    const token = localStorage.getItem("access_token");
    const isMyTokenExpired = isExpired(token);
    if (isMyTokenExpired) {
      navigate("/login");
      return;
    }
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
        "Personality",
        "Coding",
        "Analytical Writing",
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
                console.log(w.config.series);
                const array = w.config.series;
                let sum = 0;

                for (let i = 0; i < array.length; i++) {
                  sum += array[i];
                }
                console.log(sum / array.length);
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
        "Personality",
        "Coding",
        "Analytical Writing",
      ],
    });
    if (document.fullscreenElement !== null) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }, []);

  function timeleft() {
    if (localStorage.getItem("timetaken")) {
      return localStorage.getItem("timetaken");
    } else {
      var test = JSON.parse(localStorage.getItem("test"));
      if (test !== null) {
        var diff = 0;
        const nowd = new Date();
        const nowh = nowd.getHours();
        const nowm = nowd.getMinutes();
        const nows = nowd.getSeconds();

        let myar = test["STime"].split(" ");
        let stime = myar[4].split(":");
        if (nowh > stime[0]) {
          diff = diff + (nowh - stime[1]) * 3600;
        }
        if (nowm > stime[1]) {
          diff = diff + (nowm - stime[1]) * 60;
        } else {
          diff = diff - (stime[1] - nowm) * 60;
        }

        if (nows > stime[2]) {
          diff = diff + (nows - stime[2]);
        } else {
          diff = diff - (stime[2] - nows);
        }
        let hours = parseInt(diff / 3600);
        let minutes = parseInt((diff % 3600) / 60);
        let seconds = parseInt(diff % 60);
        localStorage.setItem("timetaken", `${hours}:${minutes}:${seconds}`);
        return `${hours}:${minutes}:${seconds}`;
      }
    }
  }
  return (
    <div>
      <Row>
        <Col md="12">
          <div className="rectangle">
            {timeTaken !== undefined && (
              <TestHeaderComp
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
      <Row style={{ marginTop: "15px" }}>
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
      <button
        type="button"
        className="btn btn-secondary"
        onClick={(e) => navigate("/logout")}
      >
        Logout
      </button>
    </div>
  );
}

export default Result;
