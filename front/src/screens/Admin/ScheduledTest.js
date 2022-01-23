import React from "react";
import { Row, Col } from "react-bootstrap";
import "../../css/SchdlTest.css";
import { useNavigate } from "react-router-dom";
function ScheduledTest() {
  const navigate = useNavigate();
  return (
    <div className="SchdlTest">
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
          </div>
        </Col>
        <Col md={6} style={{ marginRight: "0%" }}>
          {" "}
          <div
            className="basicRec"
            style={{ minHeight: window.screen.height - 400, width: "90%" }}
          >
            <h4 style={{ paddingLeft: "30%", paddingTop: "10px" }}>
              Upcoming Test
            </h4>
            <div className="lineThrough"></div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ScheduledTest;
