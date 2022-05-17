import React, { useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router";
import illustration1 from "../img/illustration1.svg";
import illustration2 from "../img/illustration2.svg";
import illustration3 from "../img/illustration3.svg";
import Chaitanya from "../img/Chaitanya.jpeg";
import alan from "../img/alan.jpg";
import Shivam from "../img/Shivam.jpeg";
import ReactPlayer from "react-player/lazy";
import "../css/Home.css";

function Home() {
  const navigate = useNavigate();
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  return (
    <div>
      <Row className="welcomeDiv">
        <Col sm={12} md={12} lg={5}>
          <Row className="titleDiv" style={{ height: "100%" }}>
            <label className="mainheadingLanding">
              Welcome to the
              <br />
              Placement Test Portal
            </label>
            <label className="subHeadingsProfile">
              One Step towards a successful career
            </label>
            <Button
              className="buttonDiv"
              style={{
                background: "#10B65C",
                color: "#FFF",
                width: "200px",
                fontSize: "20px",
                border: "none",
              }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
          </Row>
        </Col>
        <Col sm={12} lg={7}>
          <div className="videoPlayer">
            <ReactPlayer
              style={{ borderRadius: "10px" }}
              playing={true}
              controls={false}
              light={false}
              pip={false}
              muted={true}
              playbackRate={1.5}
              loop={true}
              url={`https://res.cloudinary.com/${cloudName}/video/upload/v1652769219/adaptive_test/landing_video/Placement_Test_Portal_DJSCE_noszdl.mp4`}
              config={{ youtube: { playerVars: { disablekb: 1, fs: 0 } } }}
            />
          </div>
        </Col>
      </Row>

      <div>
        <div style={{ textAlign: "center", marginTop: "1%" }} id="initiative">
          <br />
          <label className="divHeadings">About this portal</label>
        </div>
        <br />
        <Container>
          <Row>
            <Col sm={12} md={7} lg={8}>
              <div className="landingPara">
                <label className="subHeadingsProfile1">
                  What does this portal do?
                </label>
                <label className="introPara">
                  This portal is a proctored employability assessment for third
                  and fourth-year engineering students. It gives information on
                  a candidate's performance and areas for improvement across
                  modules that are important for a successful career.
                </label>
              </div>
            </Col>
            <Col sm={12} md={5} lg={4}>
              <img
                alt="illustration1"
                src={illustration1}
                className="welcomeImage2"
              ></img>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row id="middleLogoRow">
            <Col className="first_col" sm={12} md={5} lg={4}>
              <img
                alt="logo"
                src={illustration2}
                className="welcomeImage3"
              ></img>
            </Col>
            <Col className="second_col" sm={12} md={7} lg={8}>
              <div className="landingPara1">
                <label className="subHeadingsProfile1">
                  Why should I attempt these tests?
                </label>
                <label className="introPara">
                  Students can gain knowledge and experience of the skill needs
                  of organizations as well as the benchmarks they use for
                  entry-level and lateral recruitment across all major
                  industries by attempting such tests. These insights can be
                  used to improve skills and take a step forward in a long-term
                  career.
                </label>
              </div>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col sm={12} md={7} lg={8}>
              <div className="landingPara">
                <label className="subHeadingsProfile1">
                  How will this portal benefit the undergraduate?
                </label>
                <label className="introPara">
                  This portal helps the faculty placement coordinators identify
                  and assess students' key skills and expertise, as well as
                  their readiness for placements. Different modules in this
                  portal cover all relevant aspects such as cognitive, domain,
                  personality, and others that will aid them in their
                  preparation for placements.{" "}
                </label>
                <br />
              </div>
            </Col>
            <Col sm={12} md={5} lg={4} className="colImageDiv">
              <img
                alt="illustration2"
                src={illustration3}
                className="welcomeImage"
              ></img>
            </Col>
          </Row>
          <Container id="team" className="mb-5 ourteam pt-5">
            <div>
              <h3
                style={{
                  fontSize: "25px",
                  lineHeight: "25px",
                  fontWeight: "600",
                  fontFamily: "Poppins",
                  color: "#293E6F",
                  textAlign: "center",
                }}
              >
                Our Team
              </h3>
            </div>
            <Row>
              <Col
                style={{ textAlign: "center", marginTop: "35px" }}
                md={6}
                lg={4}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div>
                    <img className="user" alt="logo" src={alan}></img>
                    <div className="username">Alankrit Arya</div>
                    <div className="role">Developer</div>
                  </div>
                </div>
              </Col>
              <Col
                style={{ textAlign: "center", marginTop: "35px" }}
                md={6}
                lg={4}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div>
                    <img className="user" alt="logo" src={Chaitanya}></img>
                    <div className="username">Chaitanya Kumbhar</div>
                    <div className="role">Developer</div>
                  </div>
                </div>
              </Col>
              <Col
                style={{ textAlign: "center", marginTop: "35px" }}
                md={6}
                lg={4}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div>
                    <img className="user" alt="logo" src={Shivam}></img>
                    <div className="username">Shivam Vora</div>
                    <div className="role">Developer</div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Container>
      </div>
    </div>
  );
}

export default Home;
