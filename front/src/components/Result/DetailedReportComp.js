import React from "react";
import logo from "../../img/logo.png";
import { Col, Modal, Row, Card, Navbar } from "react-bootstrap";
import { isExpired, decodeToken } from "react-jwt";
import { useNavigate } from "react-router";
import Chart from "react-apexcharts";
import "../../css/ResultScreen.css";

function DetailedReportComp({
  SEP,
  SEFP,
  LO,
  HI,
  SE,
  SAP,
  SAFP,
  SA,
  SC,
  SCP,
  SCFP,
  flev,
  SOP,
  SOFP,
  SO,
  Nick,
  Country,
  SNP,
  SNFP,
  Category,
  SN,
  mrksScoredPercent,
  opt1,
}) {
  return (
    <div>
      <Navbar
        style={{
          backgroundColor: "#fff",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          color: "black",
          paddingTop: "0px",
          paddingBottom: "0px",
          marginBottom: "20px",
          height: "100%",
        }}
        expand="xl"
      >
        <Navbar.Brand className="navBrand">
          <img
            className="logoImage"
            height="80px"
            width="80px"
            alt="logo"
            src={logo}
          ></img>
          <div className="logoTitle">
            <h5 className="djsce">DJSCE INFORMATION TECHNOLOGY </h5>
            <h5 className="it">Placement Portal</h5>
          </div>
        </Navbar.Brand>
      </Navbar>
      <Row>
        <Col md="6">
          <Card>
            <Card.Header
              style={{
                backgroundColor: "#081466",
                borderRadius: "14px 14px 0px 0px",
                color: "white",
                textAlign: "center",
                fontSize: "18px",
              }}
            >
              Personal details
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <p>
                  <b>Name :</b> Chaitanya Kumbhar
                </p>
                <p style={{ marginTop: "35px" }}>
                  <b>Email :</b> kchaitanya1911@gmail.com
                </p>
                <p style={{ marginTop: "35px" }}>
                  <b>Test Time :</b> 45 mins{" "}
                </p>
                <p style={{ marginTop: "35px" }}>
                  <b>Time Taken :</b> 00:43:34
                </p>
                <p style={{ marginTop: "35px" }}>
                  <b>Test Date :</b> 02/13/2022
                </p>
                <p style={{ marginTop: "35px" }}>
                  <b>Marks Scored :</b> 77
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md="6">
          <Card>
            <Card.Header
              style={{
                backgroundColor: "#081466",
                borderRadius: "14px 14px 0px 0px",
                color: "white",
                textAlign: "center",
                fontSize: "18px",
              }}
            >
              Total marks scored
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <Chart
                  series={mrksScoredPercent}
                  options={opt1}
                  type="radialBar"
                  height={`300px`}
                />

                <p
                  style={{
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    fontSize: "14px",
                    lineHeight: "21px",
                    textAlign: "center",
                    color: "#000000",
                  }}
                >
                  {" "}
                  This score is seen as an indicator of your overall profile and
                  performance in the test{" "}
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card style={{ marginTop: "20px" }}>
            <Card.Header
              style={{
                backgroundColor: "#081466",
                borderRadius: "14px 14px 0px 0px",
                color: "white",
                textAlign: "center",
                fontSize: "18px",
              }}
            >
              Scores across various domains
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <Row>
                  <Col md="3" style={{ marginLeft: "90px" }}>
                    <Chart
                      series={mrksScoredPercent}
                      options={opt1}
                      type="radialBar"
                      height={`200px`}
                    />
                  </Col>
                  <Col md="3">
                    <Chart
                      series={mrksScoredPercent}
                      options={opt1}
                      type="radialBar"
                      height={`200px`}
                    />
                  </Col>
                  <Col md="3">
                    <Chart
                      series={mrksScoredPercent}
                      options={opt1}
                      type="radialBar"
                      height={`200px`}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="3" style={{ marginLeft: "200px" }}>
                    <Chart
                      series={mrksScoredPercent}
                      options={opt1}
                      type="radialBar"
                      height={`200px`}
                    />
                  </Col>
                  <Col md="3">
                    <Chart
                      series={mrksScoredPercent}
                      options={opt1}
                      type="radialBar"
                      height={`200px`}
                    />
                  </Col>
                  <p
                    style={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: "normal",
                      fontSize: "14px",
                      lineHeight: "21px",
                      textAlign: "center",
                      color: "#000000",
                    }}
                  >
                    {" "}
                    These radial charts are seen as an indicator of your
                    performance across the various domains{" "}
                  </p>
                </Row>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card style={{ marginTop: "20px" }}>
            <Card.Header
              style={{
                backgroundColor: "#081466",
                borderRadius: "14px 14px 0px 0px",
                color: "white",
                textAlign: "center",
                fontSize: "18px",
              }}
            >
              Know your personality
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <div>
                  <h4 className="factor_5_modal">Extraversion</h4>

                  <h5 className="factor_5_modal_result">
                    {" "}
                    {SE < LO && (
                      <p>
                        {" "}
                        Your score on Extraversion is low, indicating you are
                        introverted, reserved, and quiet. You enjoy solitude and
                        solitary activities. Your socializing tends to be
                        restricted to a few close friends.{" "}
                      </p>
                    )}
                    {SE >= LO && SE <= HI && (
                      <>
                        <br />{" "}
                        <p>
                          {" "}
                          <em>
                            {" "}
                            Your score on Extraversion is average, indicating
                            you are neither a subdued loner nor a jovial
                            chatterbox. You enjoy time with others but also time
                            alone.{" "}
                          </em>{" "}
                        </p>
                      </>
                    )}
                    {SE > HI && (
                      <>
                        <br />{" "}
                        <p>
                          {" "}
                          <em>
                            {" "}
                            Your score on Extraversion is high, indicating you
                            are sociable, outgoing, energetic, and lively. You
                            prefer to be around people much of the time.{" "}
                          </em>{" "}
                        </p>
                      </>
                    )}
                  </h5>

                  <h4 className="factor_5_modal">Agreeableness</h4>

                  <h5 className="factor_5_modal_result">
                    {" "}
                    {SA < LO && (
                      <p>
                        {" "}
                        Your score on Agreeableness is low, indicating less
                        concern with others' needs than with your own. People
                        see you as tough, critical, and uncompromising.{" "}
                      </p>
                    )}
                    {SA >= LO && SA <= HI && (
                      <p>
                        {" "}
                        Your level of Agreeableness is average, indicating some
                        concern with others' Needs, but, generally,
                        unwillingness to sacrifice yourself for others.{" "}
                      </p>
                    )}
                    {SA > HI && (
                      <p>
                        {" "}
                        Your high level of Agreeableness indicates a strong
                        interest in others' needs and well-being. You are
                        pleasant, sympathetic, and cooperative.{" "}
                      </p>
                    )}
                  </h5>

                  <h4 className="factor_5_modal">Conscientiousness</h4>
                  <h5 className="factor_5_modal_result">
                    {" "}
                    {SC < LO && (
                      <p>
                        Your score on Conscientiousness is low, indicating you
                        like to live for the moment and do what feels good now.
                        Your work tends to be careless and disorganized.
                      </p>
                    )}
                    {SC >= LO && SC <= HI && (
                      <p>
                        Your score on Conscientiousness is average. This means
                        you are reasonably reliable, organized, and
                        self-controlled.
                      </p>
                    )}
                    {SC > HI && (
                      <p>
                        Your score on Conscientiousness is high. This means you
                        set clear goals and pursue them with determination.
                        People regard you as reliable and hard-working.
                      </p>
                    )}
                  </h5>

                  <h4 className="factor_5_modal">Neuroticism</h4>
                  <h5 className="factor_5_modal_result">
                    {" "}
                    {SN < LO && (
                      <p>
                        Your score on Neuroticism is low, indicating that you
                        are exceptionally calm, composed and unflappable. You do
                        not react with intense emotions, even to situations that
                        most people would describe as stressful.
                      </p>
                    )}
                    {SN >= LO && SN <= HI && (
                      <p>
                        Your score on Neuroticism is average, indicating that
                        your level of emotional reactivity is typical of the
                        general population. Stressful and frustrating situations
                        are somewhat upsetting to you, but you are generally
                        able to get over these feelings and cope with these
                        situations.
                      </p>
                    )}
                    {SN > HI && (
                      <p>
                        Your score on Neuroticism is high, indicating that you
                        are easily upset, even by what most people consider the
                        normal demands of living. People consider you to be
                        sensitive and emotional.
                      </p>
                    )}
                  </h5>

                  <h4 className="factor_5_modal">Openness</h4>
                  <h5 className="factor_5_modal_result">
                    {SO < LO && (
                      <p>
                        Your score on Openness to Experience is low, indicating
                        you like to think in plain and simple terms. Others
                        describe you as down-to-earth, practical, and
                        conservative.
                      </p>
                    )}

                    {SO >= LO && SO <= HI && (
                      <p>
                        Your score on Openness to Experience is average,
                        indicating you enjoy tradition but are willing to try
                        new things. Your thinking is neither simple nor complex.
                        To others you appear to be a well-educated person but
                        not an intellectual.{" "}
                      </p>
                    )}

                    {SO > HI && (
                      <p>
                        Your score on Openness to Experience is high, indicating
                        you enjoy novelty, variety, and change. You are curious,
                        imaginative, and creative.
                      </p>
                    )}
                  </h5>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default DetailedReportComp;
