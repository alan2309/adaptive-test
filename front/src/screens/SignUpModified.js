import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { Container, FormControl, InputGroup, Form } from "react-bootstrap";
import Colleges from "./Colleges";
import Alert from "../components/Admin/Alert";
import Loader from "../components/Loader";

function SignUpModified() {
  const [isLoading, setIsloading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const initialFormData = Object.freeze({
    pass: "",
    cpass: "",
    name: "",
    email: "",
    age: "",
    gender: "",
    mobileNo: "",
    percent_10_std: "",
    percent_12_std: "",
    college: "",
    branch: "",
    graduationYear: "",
    avgCGPA: "",
    backlogs: "",
    internships: "",
  });
  const [formData, updateFormData] = useState(initialFormData);
  const [successMsg, setSuccessMsg] = useState("");
  const [dangerMsg, setDangerMsg] = useState("");

  useEffect(() => {
    const check = async () =>
      await axiosInstance
        .get("api/newuser", { params: { email: location.state.data.email } })
        .then((res) => {
          if (res.data.exists) {
            setDangerMsg("User already exists");
            navigate("/login");
          } else {
            updateFormData({
              ...formData,
              name: location.state.data.name,
              email: location.state.data.email,
            });
          }
        })
        .catch((e) => console.log(e));
    check();
    setIsloading(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.pass === formData.cpass) {
      setIsloading(false);
      axiosInstance
        .post(`api/newuser`, { data: formData })
        .then((res) => {
          setIsloading(true);
          if (res.data.exists) {
            alert("User already exists");
          }
          navigate("/login");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setDangerMsg("Passwords do not match");
    }
  };

  const handleChange = (e) => {
    if (e.target.name !== "") {
      updateFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <>
      <Alert msg={successMsg} type="primary"></Alert>
      <Alert msg={dangerMsg} type="danger"></Alert>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Container
            className="customLoginBorder"
            style={{
              width: "887px",
              height: "1660px",
              boxShadow: "1.5px 1.5px 7px 3px rgba(0,0,0,0.2)",
              borderRadius: "40px",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}></div>
              <p
                style={{
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "24px",
                  color: "#293E6F",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                Sign Up
              </p>
              <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group
                  className="mb-3"
                  style={{ marginTop: "25px" }}
                  controlId="formBasicEmail"
                >
                  <Form.Label>Email address </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={handleChange}
                    required
                    value={formData.email}
                    disabled
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  style={{ marginTop: "25px" }}
                  controlId="formBasicEmail"
                >
                  <Form.Label> Name </Form.Label>
                  <Form.Control
                    type="name"
                    type="text"
                    placeholder="Name"
                    onChange={handleChange}
                    required
                    value={formData.name}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  style={{ marginTop: "25px" }}
                  controlId="formBasicPassword"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    name="pass"
                    id="password-field"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  style={{ marginTop: "25px" }}
                  controlId="formBasicPassword"
                >
                  <Form.Label> Confirm password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder=" Confirm password"
                    onChange={handleChange}
                    required
                    name="cpass"
                    id="password-field"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  style={{ marginTop: "25px" }}
                  controlId="formBasicEmail"
                >
                  <Form.Label> Age </Form.Label>
                  <Form.Control
                    type="number"
                    type="text"
                    onChange={handleChange}
                    placeholder="age"
                    name="age"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" style={{ marginTop: "25px" }}>
                  <Form.Label> Gender </Form.Label>
                  <Form.Select onChange={handleChange} name="gender" required>
                    <option selected></option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Other</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" style={{ marginTop: "25px" }}>
                  <Form.Label> Phone Number </Form.Label>
                  <InputGroup hasValidation className="mb-3">
                    <InputGroup.Text>+91</InputGroup.Text>
                    <FormControl
                      name="mobileNo"
                      type="text"
                      placeholder="Mobile Number"
                      onChange={handleChange}
                      pattern="[7-9]{1}[0-9]{9}"
                      required
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  style={{ marginTop: "25px" }}
                  controlId="formBasicEmail"
                >
                  <Form.Label> 10th percentage </Form.Label>
                  <Form.Control
                    type="number"
                    type="text"
                    placeholder="10th percentage"
                    onChange={handleChange}
                    name="percent_10_std"
                    required
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  style={{ marginTop: "25px" }}
                  controlId="formBasicEmail"
                >
                  <Form.Label> 12th percentage </Form.Label>
                  <Form.Control
                    type="number"
                    type="text"
                    placeholder="12th percentage"
                    onChange={handleChange}
                    name="percent_12_std"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" style={{ marginTop: "25px" }}>
                  <Form.Label> College </Form.Label>
                  <Form.Select onChange={handleChange} name="college" required>
                    <option selected disabled="true">
                      Colleges
                    </option>
                    {Colleges.CollegeData.map((result) => (
                      <option
                        style={{ backgroundColor: "white", whiteSpace: "pre" }}
                        key={result.Id}
                        value={result.CollegeNames}
                      >
                        {result.CollegeNames}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  style={{ marginTop: "25px" }}
                  controlId="formBasicEmail"
                >
                  <Form.Label> Branch </Form.Label>
                  <Form.Control
                    type="number"
                    type="text"
                    placeholder="Branch"
                    onChange={handleChange}
                    name="branch"
                    required
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  style={{ marginTop: "25px" }}
                  controlId="formBasicEmail"
                >
                  <Form.Label> Year of graduation </Form.Label>
                  <Form.Control
                    type="number"
                    type="text"
                    placeholder="graduation"
                    onChange={handleChange}
                    name="graduationYear"
                    required
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  style={{ marginTop: "25px" }}
                  controlId="formBasicEmail"
                >
                  <Form.Label> Average C.G.P.A </Form.Label>
                  <Form.Control
                    type="number"
                    type="text"
                    placeholder=" C.G.P.A "
                    onChange={handleChange}
                    name="avgCGPA"
                    required
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  style={{ marginTop: "25px" }}
                  controlId="formBasicEmail"
                >
                  <Form.Label> Number of Backlogs </Form.Label>
                  <Form.Control
                    type="number"
                    type="text"
                    placeholder=" Backlogs "
                    onChange={handleChange}
                    name="backlogs"
                    required
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  style={{ marginTop: "25px" }}
                  controlId="formBasicEmail"
                >
                  <Form.Label> Number of internships </Form.Label>
                  <Form.Control
                    type="number"
                    type="text"
                    placeholder="internship"
                    onChange={handleChange}
                    name="internships"
                    required
                  />
                </Form.Group>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    type="submit"
                    style={{
                      marginTop: "5%",
                      border: "none",
                      outline: "none",
                      borderRadius: "5px",
                      fontWeight: "bolder",
                      backgroundColor: "#10B65C",
                      fontFamily: "Poppins",
                      padding: "5px 45px",
                      color: "#FFFFFF",
                    }}
                  >
                    Login
                  </button>
                </div>
              </Form>
            </div>
          </Container>
        </div>
      )}
    </>
  );
}

export default SignUpModified;
