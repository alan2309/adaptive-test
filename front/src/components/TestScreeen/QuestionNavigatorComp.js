import React from "react";
import { Col, Row } from "react-bootstrap";

function QuestionNavigatorComp({ attempted }) {
  return (
    <div id="questionNavComp">
      <Row>
        <Col>
          <div
            style={{
              textAlign: "center",
              fontWeight: "600",
              fontSize: "24px",
              lineHeight: "36px",
            }}
          >
            Question Navigator
          </div>
        </Col>
      </Row>
      {attempted.length === 0 && (
        <p style={{ textAlign: "center" }}>0 questions attempted</p>
      )}
      {attempted.length !== 0 && (
        <Row>
          <Row style={{ paddingTop: "20px" }}>
            {attempted.map((x, index) => {
              return (
                <Col key={index} md="4" sm="6">
                  {" "}
                  <div
                    style={{
                      backgroundColor: x !== -1 ? "#081466" : "#D3D3D3",
                    }}
                    className="navigatorBox"
                  >
                    {index + 1}
                  </div>
                </Col>
              );
            })}
          </Row>
        </Row>
      )}
    </div>
  );
}

export default QuestionNavigatorComp;
