import React from "react";
import TestScreen from "./screens/TestScreen";
import Home from "./screens/Home";
import logo from "./img/logo.png";
import { Col, Navbar, Row } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./screens/Login";
import Logout from "./screens/logout";
import Result from "./screens/Result";
import Error from "./screens/Error";
import AdminHome from "./screens/Admin/AdminHome";
import SetQuestion from "./screens/Admin/SetQuestion";
import NewTest from "./screens/Admin/NewTest";
import CFTestScreen from "./screens/Test/CFTestScreen";
import PTestScreen from "./screens/Test/PTestScreen";
import DTestScreen from "./screens/Test/DTestScreen";
import ScheduledTest from "./screens/Admin/ScheduledTest";
import ViewSchdlTest from "./screens/Admin/ViewSchdlTest";
import Compiler from "./screens/Test/Compiler";
import CompScreen from "./screens/Test/compScreen";
import Page_404 from "./screens/Page_404";
import RegisterAdmin from "./screens/Admin/RegisterAdmin";
import Profile from "./screens/Admin/Profile";
import PrivateRoute from "./components/PrivateRoute";
import SignUpModified from "./screens/SignUpModified";
import ChangePass from "./screens/ChangePass";
import DetailPageModified from "./screens/DetailPageModified";
import Feedback from "./screens/Admin/Feedback";
import Permissions from "./screens/Admin/Permissions";
import "./css/App.css";
import { useMediaQuery } from 'react-responsive'
function App() {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1024px)'
  })

  return (
    <div className="App" id="element">
      <Navbar
          style={{
            backgroundColor: "#fff",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            color: "black",
            paddingTop: "0px",
            paddingBottom: "0px",
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
              <h5 className="djsce">DJSCE</h5>
              <h5 className="it">INFORMATION TECHNOLOGY</h5>
            </div>
          </Navbar.Brand>
        </Navbar>
      <div>
        <Router>
          <Routes>
            <Route
              path="/testScreen"
              exact
              element={
                isDesktopOrLaptop?
                <Row style={{ margin: "20px 0 0 0" }}>
                  <Col style={{ padding: "10px 90px" }}>
                    <TestScreen />
                  </Col>
                </Row>:<h1>Site Can Only be viewed on Laptop or Pc</h1>
              }
            />
            <Route
              path="/login"
              exact
              element={
                isDesktopOrLaptop?
                <Row style={{ margin: "0px" }}>
                  <Col style={{ padding: "0px" }}>
                    <Login />
                  </Col>
                </Row>:<h1>Site Can Only be viewed on Laptop or Pc</h1>
              }
            />
            <Route
              path="/admin/RegisterAdmin"
              exact
              element={
                isDesktopOrLaptop?
                <Row style={{ margin: "0px" }}>
                  <Col style={{ padding: "0px" }}>
                    <RegisterAdmin />
                  </Col>
                </Row>:<h1>Site Can Only be viewed on Laptop or Pc</h1>
              }
            />
            <Route
              path="/admin/Profile"
              exact
              element={
                isDesktopOrLaptop?
                <Row style={{ margin: "0px" }}>
                  <Col style={{ padding: "0px" }}>
                    <Profile />
                  </Col>
                </Row>:<h1>Site Can Only be viewed on Laptop or Pc</h1>
              }
            />
            <Route
              path="/signup"
              exact
              element={
                isDesktopOrLaptop?
                <Row style={{ margin: "20px 0 0 0" }}>
                  <Col style={{ padding: "10px 90px" }}>
                    <SignUpModified />
                  </Col>
                </Row>:<h1>Site Can Only be viewed on Laptop or Pc</h1>
              }
            />
            <Route
              path="/result"
              exact
              element={
                isDesktopOrLaptop?
                <Row style={{ margin: "20px 0 0 0" }}>
                  <Col style={{ padding: "10px 90px" }}>
                    <Result />
                  </Col>
                </Row>:<h1>Site Can Only be viewed on Laptop or Pc</h1>
              }
            />
            <Route
              path="/logout"
              exact
              element={
                isDesktopOrLaptop?
                <Row style={{ margin: "20px 0 0 0" }}>
                  <Col style={{ padding: "10px 90px" }}>
                    <Logout />
                  </Col>
                </Row>:<h1>Site Can Only be viewed on Laptop or Pc</h1>
              }
            />
            <Route
              path="/error"
              exact
              element={
                isDesktopOrLaptop?
                <Row style={{ margin: "20px 0 0 0" }}>
                  <Col style={{ padding: "10px 90px" }}>
                    <Error />
                  </Col>
                </Row>:<h1>Site Can Only be viewed on Laptop or Pc</h1>
              }
            />
            <Route exact path="/admin/home" element={<PrivateRoute />}>
              <Route
                path="/admin/home"
                exact
                element={
                  isDesktopOrLaptop?
                  <Row style={{ margin: "0 0 0 0" }}>
                    <Col style={{ padding: "0px 0px 0px 0px" }}>
                      <AdminHome />
                    </Col>
                  </Row>:<h1>Site Can Only be viewed on Laptop or Pc</h1>
                }
              />
            </Route>

            <Route exact path="/admin/newTest" element={<PrivateRoute />}>
              <Route
                path="/admin/newTest"
                exact
                element={
                  isDesktopOrLaptop?
                  <Row style={{ margin: "20px 0 0 0" }}>
                    <Col style={{ padding: "10px 90px" }}>
                      <NewTest />
                    </Col>
                  </Row>:<h1>Site Can Only be viewed on Laptop or Pc</h1>
                }
              />
            </Route>

            <Route exact path="/admin/setQs" element={<PrivateRoute />}>
              <Route
                path="/admin/setQs"
                exact
                element={
                  isDesktopOrLaptop?
                  <Row style={{ margin: "20px 0 0 0" }}>
                    <Col style={{ padding: "10px 90px" }}>
                      <SetQuestion />
                    </Col>
                  </Row>:<h1>Site Can Only be viewed on Laptop or Pc</h1>
                }
              />
            </Route>

            <Route
              path="/home"
              exact
              element={
                <Row style={{ margin: "0", overflowX: "hidden" }}>
                  <Col style={{ padding: "0px" }}>
                    <Home />
                  </Col>
                </Row>
              }
            />
            <Route
              path="/"
              exact
              element={
                <Row style={{ margin: "0", overflowX: "hidden" }}>
                  <Col style={{ padding: "0" }}>
                    <Home />
                  </Col>
                </Row>
              }
            />

            <Route
              path="/admin/personality"
              exact
              element={
                isDesktopOrLaptop?
                <Row style={{ margin: "20px 0 0 0" }}>
                  <Col style={{ padding: "10px 90px" }}>
                    <PTestScreen />
                  </Col>
                </Row>:<h1>Site Can Only be viewed on Laptop or Pc</h1>
              }
            />
            <Route
              path="/admin/computer"
              exact
              element={
                isDesktopOrLaptop?
                <Row style={{ margin: "20px 0 0 0" }}>
                  <Col style={{ padding: "10px 90px" }}>
                    <CFTestScreen />
                  </Col>
                </Row>:<h1>Site Can Only be viewed on Laptop or Pc</h1>
              }
            />
            <Route
              path="/admin/domain"
              exact
              element={
                isDesktopOrLaptop?
                <Row style={{ margin: "20px 0 0 0" }}>
                  <Col style={{ padding: "10px 90px" }}>
                    <DTestScreen />
                  </Col>
                </Row>:<h1>Site Can Only be viewed on Laptop or Pc</h1>
              }
            />
            <Route
              path="/admin/analytical"
              exact
              element={
                isDesktopOrLaptop?
                <Row style={{ margin: "20px 0 0 0" }}>
                  <Col style={{ padding: "10px 90px" }}>
                    <CompScreen />
                  </Col>
                </Row>:<h1>Site Can Only be viewed on Laptop or Pc</h1>
              }
            />
            <Route exact path="/admin/scheduledTest" element={<PrivateRoute />}>
              <Route
                path="/admin/scheduledTest"
                exact
                element={
                  isDesktopOrLaptop?
                  <Row style={{ margin: "20px 0 0 0" }}>
                    <Col style={{ padding: "10px 90px" }}>
                      <ScheduledTest />
                    </Col>
                  </Row>:<h1>Site Can Only be viewed on Laptop or Pc</h1>
                }
              />
            </Route>
            <Route exact path="/admin/feedback" element={<PrivateRoute />}>
              <Route
                path="/admin/feedback"
                exact
                element={
                  isDesktopOrLaptop?
                  <Row style={{ margin: "20px 0 0 0" }}>
                    <Col style={{ padding: "10px 90px" }}>
                      <Feedback />
                    </Col>
                  </Row>:<h1>Site Can Only be viewed on Laptop or Pc</h1>
                }
              />
            </Route>
            <Route
              exact
              path="/admin/viewScheduledTest"
              element={isDesktopOrLaptop?<PrivateRoute />:<h1>Site Can Only be viewed on Laptop or Pc</h1>}
            >
              <Route
                path="/admin/viewScheduledTest"
                exact
                element={
                  isDesktopOrLaptop?
                  <Row style={{ margin: "20px 0 0 0" }}>
                    <Col style={{ padding: "10px 90px" }}>
                      <ViewSchdlTest />
                    </Col>
                  </Row>:<h1>Site Can Only be viewed on Laptop or Pc</h1>
                }
              />
            </Route>
            <Route
              path="/admin/compiler"
              exact
              element={
                isDesktopOrLaptop?
                <Row style={{ margin: "20px 0 0 0" }}>
                  <Col style={{ padding: "10px 90px" }}>
                    <Compiler />
                  </Col>
                </Row>:<h1>Site Can Only be viewed on Laptop or Pc</h1>
              }
            />
            <Route
              path="/details"
              exact
              element={
                isDesktopOrLaptop?
                <Row style={{ margin: "20px 0 0 0" }}>
                  <Col style={{ padding: "10px 90px" }}>
                    <DetailPageModified />
                  </Col>
                </Row>:<h1>Site Can Only be viewed on Laptop or Pc</h1>
              }
            />
            <Route exact path="/Permissions" element={<PrivateRoute />}>
              <Route
                path="/Permissions"
                element={
                  isDesktopOrLaptop?
                  <Row style={{ margin: "20px 0 0 0" }}>
                    <Col style={{ padding: "10px 90px" }}>
                      <Permissions />
                    </Col>
                  </Row>:<h1>Site Can Only be viewed on Laptop or Pc</h1>
                }
              />
            </Route>
            <Route
              path="/change-pass"
              element={
                isDesktopOrLaptop?
                <Row style={{ margin: "20px 0 0 0" }}>
                  <Col style={{ padding: "10px 90px" }}>
                    <ChangePass />
                  </Col>
                </Row>:<h1>Site Can Only be viewed on Laptop or Pc</h1>
              }
            />
            {/* do not change */}
            <Route
              path="*"
              element={
                <Row style={{ margin: "20px 0 0 0" }}>
                  <Col style={{ padding: "10px 90px" }}>
                    <Page_404 />
                  </Col>
                </Row>
              }
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
