import React, { useState, useEffect } from "react";
import { Row, Col, Modal, Button } from "react-bootstrap";
import "../../css/SchdlTest.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";
import axiosInstance from "../../axios";

function ScheduledTest() {
  const [stests, setSTests] = useState([]);
  const [utests, setUTests] = useState([]);
  const [show, setShow] = useState(false);

  const [header, setHeader] = useState();
  const [testId, setTestId] = useState();

  const handleClose = () => setShow(false);

  const [valueStart, onChangeStart] = useState(new Date());
  const [valueEnd, onChangeEnd] = useState(new Date());

  const [valueStartCheck, onChangeStartCheck] = useState(new Date());
  const [valueEndCheck, onChangeEndCheck] = useState(new Date());

  const navigate = useNavigate();

  useEffect(() => {
    const data = async () => {
      await axios
        .get("http://127.0.0.1:8000/api/admin/tests")
        .then((res) => {
          console.log(res.data);
          setSTests(res.data.stests);
          setUTests(res.data.utests);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    data();
  }, []);
  function upcomingTest(e, test) {
    setHeader(test.test_name);

    var date = test.test_start.split("T");
    var time = date[1].split("Z")[0];
    date = date[0].split("-");
    time = time.split(":");
    console.log(date);
    console.log(time);
    onChangeStart(
      new Date(date[0], date[1], date[2], time[0], time[1], time[2])
    );
    onChangeStartCheck(
      new Date(date[0], date[1], date[2], time[0], time[1], time[2])
    );
    setTestId(test.id);

    var date = test.test_end.split("T");
    var time = date[1].split("Z")[0];
    date = date[0].split("-");
    time = time.split(":");
    console.log(date);
    console.log(time);
    onChangeEnd(new Date(date[0], date[1], date[2], time[0], time[1], time[2]));
    onChangeEndCheck(
      new Date(date[0], date[1], date[2], time[0], time[1], time[2])
    );
    setShow(true);
  }
  function saveChanges(e) {
    e.preventDefault();
    var cDate = new Date();
    if (valueStart <= valueEnd && valueStart > cDate) {
      //Check1
      if (valueStart !== valueStartCheck || valueEnd !== valueEndCheck) {
        axiosInstance
          .post("api/test", {
            data: {
              name: header,
              start: valueStart,
              end: valueEnd,
              update: true,
              delete: false,
              id: testId,
            },
          })
          .then((res) => {
            console.log(res);
            window.location.reload();
          })
          .catch((e) => {
            console.log(e);
          });
      }
      handleClose(e);
    } else {
      valueStart > cDate
        ? alert("ENDATE should be GREATER than start Date")
        : alert("start Date time should be greater than current date time");
    }
  }
  function delTest(e) {
    axiosInstance
      .post("api/test", {
        data: {
          name: header,
          start: valueStart,
          end: valueEnd,
          delete: true,
          id: testId,
        },
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <div className="SchdlTest">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Row style={{ margin: "2% 0" }}>
            <Col md={3}>Test Name: </Col>
            <Col md={9}>
              <input
                type="string"
                defaultValue={header}
                onChange={(e) => {
                  setHeader(e.target.value);
                }}
              ></input>
            </Col>
          </Row>
          <Row style={{ margin: "2% 0" }}>
            <Col md={3}>Start Time:</Col>
            <Col md={9}>
              <DateTimePicker onChange={onChangeStart} value={valueStart} />
            </Col>
          </Row>
          <Row style={{ margin: "2% 0" }}>
            <Col md={3}>End Time:</Col>
            <Col md={9}>
              <DateTimePicker
                onChange={(e) => {
                  onChangeEnd(e);
                }}
                value={valueEnd}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={(e) => {
              delTest(e);
            }}
          >
            Delete
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              saveChanges(e);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <button
        style={{ marginLeft: "1%" }}
        className="btn btn-secondary"
        onClick={(e) => navigate("/admin/home")}
      >
        Back
      </button>
      <Row style={{ margin: "0 0 0 10%" }}>
        <Col md={6} style={{ marginRight: "0%" }}>
          {" "}
          <div
            className="basicRec"
            style={{ minHeight: window.screen.height - 400, width: "90%" }}
          >
            <h4 style={{ paddingLeft: "30%", paddingTop: "10px" }}>
              Scheduled Test
            </h4>
            <div className="lineThrough"></div>
            <div
              className="scrollbar"
              id="style-4"
              style={{ height: window.screen.height - 480 }}
            >
              {stests.map((t, index) => {
                return (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        navigate("/admin/viewScheduledTest", {
                          state: {
                            id: t.id,
                            name: t.test_name,
                            start: t.test_start,
                            end: t.test_end,
                          },
                        });
                      }}
                      style={{
                        width: "100%",
                        backgroundColor: "white",
                        borderColor: "#F0F0F0",
                        marginBottom: "1px",
                      }}
                      key={index}
                    >
                      {t.test_name}
                    </button>
                  </>
                );
              })}
            </div>
          </div>
        </Col>
        <Col md={6} style={{ marginRight: "0%" }}>
          {" "}
          <div
            className="basicRec"
            style={{
              minHeight: window.screen.height - 400,
              maxHeight: window.screen.height - 400,
              width: "90%",
            }}
          >
            <h4 style={{ paddingLeft: "30%", paddingTop: "10px" }}>
              Upcoming Test
            </h4>
            <div className="lineThrough"></div>
            <div
              className="scrollbar"
              id="style-4"
              style={{ height: window.screen.height - 480 }}
            >
              {utests.map((t, index) => {
                return (
                  <>
                    <button
                      type="button"
                      onClick={(e) => upcomingTest(e, t)}
                      style={{
                        width: "100%",
                        backgroundColor: "white",
                        borderColor: "#F0F0F0",
                        marginBottom: "1px",
                      }}
                      key={index}
                    >
                      {t.test_name}
                    </button>
                  </>
                );
              })}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ScheduledTest;
