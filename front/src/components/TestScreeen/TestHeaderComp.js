import React from "react";
import { Col, Row } from "react-bootstrap";
import CustomTimer from "../../screens/Admin/CustomTimer";

function TestHeaderComp({
  noTotal = false,
  timer,
  start,
  reset,
  totalKey,
  timeKey,
  totalValue,
  header,
  nextpage,
  setMd,
}) {
  return (
    <div id="testHeaderComp">
      <Row>
        <Col
          id="testHId"
          sm="12"
          md="4"
          style={{ fontSize: "18px", textAlign: "left" }}
        >
          <div>{header}</div>
        </Col>
        {noTotal ? (
          <Col
            sm="12"
            md={noTotal ? 8 : 6}
            style={{
              whiteSpace: "nowrap",
              display: "inline-block",
              textAlign: "right",
              fontSize: "18px",
            }}
          >
            {timeKey}:
            <b>
              <CustomTimer
                style={{ fontSize: "18px" }}
                start={start}
                reset={reset}
                time={timer}
                nextpage={nextpage}
                setMd={setMd}
              ></CustomTimer>
            </b>
          </Col>
        ) : (
          <Col
            sm="12"
            md={noTotal ? 8 : 6}
            style={{
              whiteSpace: "nowrap",
              display: "inline-block",
              textAlign: "center",
              fontSize: "18px",
            }}
          >
            {timeKey}:
            <b>
              <CustomTimer
                start={start}
                reset={reset}
                time={timer}
                nextpage={nextpage}
                setMd={setMd}
              ></CustomTimer>
            </b>
          </Col>
        )}
        {!noTotal && (
          <Col md="2" style={{ textAlign: "center", fontSize: "18px" }}>
            {totalKey} : <b>{totalValue}</b>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default TestHeaderComp;
