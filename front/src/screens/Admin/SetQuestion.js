import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import "../../css/AdminAddQsScreen.css";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../axios";
import $ from "jquery";

function SetQuestion() {
  const navigate = useNavigate();
  const location = useLocation();
  const [navArray, setNavArray] = useState([]);
  const [countOpt, setCountOpt] = useState(2);
  const [currentQsNo, setCurrentQsNo] = useState(1);
  const [currentQsID, setCurrentQsID] = useState(-1);
  const [currentQs, setCurrentQs] = useState("");
  const [opt, setOpt] = useState([]);
  const [isNew, setIsNew] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.screen.height);
  const [isCoding, setIsCoding] = useState(false);
  const [inputF, setInputF] = useState();
  const [outputF, setOutputF] = useState();
  const [constraints, setConstraints] = useState();
  const [sampleInput, setSampleInput] = useState();
  const [sampleOutput, setSampleOutput] = useState();
  const [explanation, setExplanation] = useState();
  const [testCaseInput1, setTestCaseInput1] = useState();
  const [testCaseInput2, setTestCaseInput2] = useState();
  const [testCaseInput3, setTestCaseInput3] = useState();
  const [testCaseOutput1, setTestCaseOutput1] = useState();
  const [testCaseOutput2, setTestCaseOutput2] = useState();
  const [testCaseOutput3, setTestCaseOutput3] = useState();

  useEffect(() => {
    var divHeight = document.querySelector("#SETQS").clientHeight;
    setWindowHeight(divHeight);
    localStorage.removeItem("isNewTestReload");
    console.log(location.state.navArr);
    var temp = location.state.navArr;
    setNavArray(temp);
    if (parseInt(location.state.sid) === 5) {
      setIsCoding(true);
    }
    if (temp[0] !== undefined) {
      if (location.state.sid !== 5) {
        setCurrentQsID(temp[0].id);
        setCurrentQs(temp[0].ques);
        setOpt(temp[0].options);
      } else {
        setCurrentQsID(temp[0].id);
        setCurrentQs(temp[0].question || "");
        setOpt([]);
        setIsCoding(true);

        setInputF(temp[0].input_format || "");
        setOutputF(temp[0].output_format || "");
        setConstraints(temp[0].constraints || "");
        setSampleInput(temp[0].sample_input || "");
        setSampleOutput(temp[0].sample_output || "");
        setExplanation(temp[0].explanation || "");
        if (temp[0].test_case_input[0] && temp[0].test_case_output[0]) {
          setTestCaseInput1(temp[0].test_case_input[0] || "");
          setTestCaseOutput1(temp[0].test_case_output[0] || "");
        }
        if (temp[0].test_case_input[1] && temp[0].test_case_output[1]) {
          setTestCaseInput2(temp[0].test_case_input[1] || "");
          setTestCaseOutput2(temp[0].test_case_output[1] || "");
        }
        if (temp[0].test_case_input[2] && temp[0].test_case_output[2]) {
          setTestCaseInput3(temp[0].test_case_input[2] || "");
          setTestCaseOutput3(temp[0].test_case_output[2] || "");
        }
      }
    } else {
      setIsUpdate(true);
    }
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    console.log("handlesubmit");
    var dictionary = {};
    dictionary[document.getElementById("qsSetQs").name] =
      document.getElementById("qsSetQs").value;

    if (parseInt(location.state.sid) === 5) {
      dictionary[document.getElementById("qsSetInputFormat").name] =
        document.getElementById("qsSetInputFormat").value;
      dictionary[document.getElementById("qsSetOutputFormat").name] =
        document.getElementById("qsSetOutputFormat").value;
      dictionary[document.getElementById("qsSetConstraints").name] =
        document.getElementById("qsSetConstraints").value;
      dictionary[document.getElementById("qsSetSampleInput").name] =
        document.getElementById("qsSetSampleInput").value;
      dictionary[document.getElementById("qsSetSampleOutput").name] =
        document.getElementById("qsSetSampleOutput").value;
      dictionary[document.getElementById("qsSetExplanation").name] =
        document.getElementById("qsSetExplanation").value || "";

      dictionary[document.getElementById("qsSetTestCase1Input").name] =
        document.getElementById("qsSetTestCase1Input").value;
      dictionary[document.getElementById("qsSetTestCase1Output").name] =
        document.getElementById("qsSetTestCase1Output").value;
      dictionary[document.getElementById("qsSetTestCase2Input").name] =
        document.getElementById("qsSetTestCase2Input").value;
      dictionary[document.getElementById("qsSetTestCase2Output").name] =
        document.getElementById("qsSetTestCase2Output").value;
      dictionary[document.getElementById("qsSetTestCase3Input").name] =
        document.getElementById("qsSetTestCase3Input").value;
      dictionary[document.getElementById("qsSetTestCase3Output").name] =
        document.getElementById("qsSetTestCase3Output").value;
    }
    var rightOpt = document.querySelector('input[name="correctOpt"]:checked');

    if (rightOpt !== null) {
      dictionary["rightOpt"] = rightOpt.value;
    }
    for (var x = 0; x < e.target.length; x++) {
      if (
        e.target[x] instanceof HTMLInputElement ||
        e.target[x] instanceof HTMLSelectElement
      ) {
        if (e.target[x].name !== "type") {
          dictionary[e.target[x].name] = e.target[x].value;
        } else {
          if (e.target[x].value == "Easy") {
            dictionary[e.target[x].name] = 1;
          } else if (e.target[x].value == "Medium") {
            dictionary[e.target[x].name] = 2;
          } else {
            dictionary[e.target[x].name] = 3;
          }
        }
      }
    }
    console.log(dictionary);
    axiosInstance.post("api/admin/addQs", { data: dictionary }).then((res) => {
      navigate("/admin/newTest", { state: { sid: location.state.sid - 1 } });
    });
  }
  function delOpt(e) {
    setOpt(
      opt.filter(function (item, index) {
        console.log(index + 1);
        console.log(opt.length);
        return opt.length !== index + 1;
      })
    );
  }
  function addOpt(e) {
    setCountOpt(countOpt + 1);
    console.log("Add opt clicked");
    setOpt(function (oldArray) {
      if (oldArray !== undefined) {
        return [
          ...oldArray,
          <p style={{ padding: "5px 0", margin: "10px 0px" }}>
            <div class="form-check">
              <input
                type="radio"
                name="correctOpt"
                disabled={!isUpdate}
                className="setQsRadio"
                value={`Option${countOpt + 1}`}
                id={`flexCheckDefault${countOpt + 1}`}
                required
              />
              <label
                className="form-check-label"
                style={{ marginLeft: "15px", fontWeight: "400", width: "96%" }}
                for={`flexCheckDefault${countOpt + 1}`}
              >
                <input
                  type="text"
                  className="form-control"
                  disabled={!isUpdate}
                  name={`Option${countOpt + 1}`}
                  placeholder={`Enter Option ${countOpt + 1}`}
                  id={`Option${countOpt + 1}`}
                  required
                />
              </label>
            </div>
          </p>,
        ];
      } else {
        return [
          <p style={{ padding: "5px 0", margin: "10px 0px" }}>
            <div class="form-check">
              <input
                type="radio"
                name="correctOpt"
                disabled={!isUpdate}
                className="setQsRadio"
                value={`Option${countOpt + 1}`}
                id={`flexCheckDefault${countOpt + 1}`}
                required
              />
              <label
                className="form-check-label"
                style={{ marginLeft: "15px", fontWeight: "400", width: "96%" }}
                for={`flexCheckDefault${countOpt + 1}`}
              >
                <input
                  type="text"
                  className="form-control"
                  disabled={!isUpdate}
                  name={`Option${countOpt + 1}`}
                  placeholder={`Enter Option ${countOpt + 1}`}
                  id={`Option${countOpt + 1}`}
                  required
                />
              </label>
            </div>
          </p>,
        ];
      }
    });
  }

  function delQuestion(e) {
    //Alankrit
    //array to del from  ---> navArray
    var elCheckBox = document.getElementsByClassName("styled-checkbox");
    var $boxes = $("input[name=styleCheckBox]:checked");

    if (elCheckBox[0].style.display !== "none") {
      if ($boxes.length === 0) {
        for (var x = 0; x < elCheckBox.length; x++) {
          elCheckBox[x].style.display = "none";
        }
      } else {
        if (window.confirm("Do you want to delete ?")) {
          var a = [];
          $boxes.each(function (item) {
            // Do stuff here with this
            var val = $boxes[item].value;
            val = val.split("CheckBox")[1];
            console.log(val);
            a.push(parseInt(val));
          });
          alert(location.state.sid);
          axiosInstance
            .post("api/admin/delQs", {
              data: { delQs: a, sid: location.state.sid },
            })
            .then((res) => {
              navigate("/admin/newTest", {
                state: { sid: location.state.sid - 1 },
              });
            });
        }
      }
    } else {
      for (var x = 0; x < elCheckBox.length; x++) {
        elCheckBox[x].style.display = "inline-block";
      }
    }
  }
  function fillData(e) {
    console.log(e);
    console.log("acacsasc");
    console.log(e.target.id);
    console.log("acacsasc");
    document.getElementById("sbForm").reset();
    if (e.target.id.toString() !== "questionNew") {
      if (location.state.sid !== 5) {
        setCurrentQs(navArray[e.target.id].ques);
        setCurrentQsID(navArray[e.target.id].id);
        setOpt(navArray[e.target.id].options);
        setCurrentQsNo(`${parseInt(e.target.id) + 1}`);
      } else if (location.state.sid === 5) {
        setCurrentQsID(navArray[e.target.id].id);
        setCurrentQs(navArray[e.target.id].question);
        setOpt([]);
        setCurrentQsNo(`${parseInt(e.target.id) + 1}`);

        setInputF(navArray[e.target.id].input_format || "");
        setOutputF(navArray[e.target.id].output_format || "");
        setConstraints(navArray[e.target.id].constraints || "");
        setSampleInput(navArray[e.target.id].sample_input || "");
        setSampleOutput(navArray[e.target.id].sample_output || "");
        setExplanation(navArray[e.target.id].explanation || "");
        if (
          navArray[e.target.id].test_case_input !== null &&
          navArray[e.target.id].test_case_output !== null
        ) {
          if (
            navArray[e.target.id].test_case_input[0] &&
            navArray[e.target.id].test_case_output[0]
          ) {
            setTestCaseInput1(navArray[e.target.id].test_case_input[0] || "");
            setTestCaseOutput1(navArray[e.target.id].test_case_output[0] || "");
          }
          if (
            navArray[e.target.id].test_case_input[1] &&
            navArray[e.target.id].test_case_output[1]
          ) {
            setTestCaseInput2(navArray[e.target.id].test_case_input[1] || "");
            setTestCaseOutput2(navArray[e.target.id].test_case_output[1] || "");
          }
          if (
            navArray[e.target.id].test_case_input[2] &&
            navArray[e.target.id].test_case_output[2]
          ) {
            setTestCaseInput3(navArray[e.target.id].test_case_input[2] || "");
            setTestCaseOutput3(navArray[e.target.id].test_case_output[2] || "");
          }
        } else {
          setTestCaseInput1("");
          setTestCaseOutput1("");
          setTestCaseInput2("");
          setTestCaseOutput2("");
          setTestCaseInput3("");
          setTestCaseOutput3("");
        }
      }
    }
  }
  function reportWindowSize(e) {
    alert("lol");
    console.log(e);
    setWindowHeight(window.screen.height);
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} id="sbForm">
        <input name="sectionName" value={location.state.sectionName} hidden />
        <input
          name="action"
          value={
            (isNew && currentQsNo == navArray.length) || navArray.length === 0
              ? "Save"
              : "Update"
          }
          hidden
        />
        <Row>
          <Col md={9}>
            <div
              id="SETQS"
              className="basicRec SetQuestion"
              style={{
                margin: "0px 50px",
              }}
            >
              <div style={{ padding: "20px 36px 0 36px" }}>
                {!isCoding && (
                  <div style={{ marginBottom: "20px" }}>
                    <div class="form-group">
                      <label for="selectSetQs">Type :</label>
                      <select
                        class="form-select"
                        name="type"
                        aria-label="Default select example"
                        disabled={!isUpdate}
                      >
                        <option
                          selected={
                            location.state.type === "Easy" ? true : false
                          }
                        >
                          Easy
                        </option>
                        <option
                          selected={
                            location.state.type === "Medium" ? true : false
                          }
                        >
                          Medium
                        </option>
                        <option
                          selected={
                            location.state.type === "Hard" ? true : false
                          }
                        >
                          Hard
                        </option>
                      </select>
                    </div>
                  </div>
                )}
                <Row>
                  {!isNew && (
                    <div class="form-group">
                      <label for="qsSetQs">Question : </label>
                      <textarea
                        class="form-control form-field style-4"
                        disabled={!isUpdate}
                        defaultValue={currentQs}
                        form="sbForm"
                        name={`question${currentQsID}`}
                        id="qsSetQs"
                        placeholder="Enter Question"
                        rows="3"
                        style={{ maxWidth: "100%" }}
                        required
                      ></textarea>
                    </div>
                  )}
                  {isNew && currentQsNo === navArray.length && (
                    <div class="form-group">
                      <label for="qsSetQs">Question : </label>
                      <textarea
                        class="form-control form-field style-4"
                        disabled={!isUpdate}
                        defaultValue={""}
                        form="sbForm"
                        name={`question${currentQsID}`}
                        id="qsSetQs"
                        placeholder="Enter Question"
                        rows="3"
                        style={{ maxWidth: "100%" }}
                        required
                      ></textarea>
                    </div>
                  )}
                </Row>
                {!isCoding && (
                  <div
                    class="scrollbar"
                    style={{
                      maxHeight: "225px",
                      margin: "5px",
                      maxWidth: "100%",
                      backgroundColor: "white",
                    }}
                    id="style-4"
                  >
                    {console.log(opt)}
                    {opt !== undefined &&
                      opt.map((x, index) => {
                        return (
                          <>
                            <p style={{ padding: "5px 0", margin: "10px 0px" }}>
                              <div
                                class="form-check"
                                style={{ paddingLeft: "0" }}
                              >
                                <input
                                  type="radio"
                                  className="setQsRadio"
                                  name="correctOpt"
                                  disabled={!isUpdate}
                                  checked={x.mrks !== 0 ? true : null}
                                  value={`Option${index + 1}`}
                                  id={`flexCheckDefault${index + 1}`}
                                  required
                                />
                                <label
                                  class="form-check-label"
                                  style={{
                                    marginLeft: "15px",
                                    fontWeight: "400",
                                    width: "90%",
                                  }}
                                  for={`flexCheckDefault${index + 1}`}
                                >
                                  <input
                                    type="text"
                                    class="form-control"
                                    disabled={!isUpdate}
                                    defaultValue={x.opt}
                                    name={`Option${index + 1}`}
                                    placeholder={`Enter Option ${index + 1}`}
                                    id={`Option${index + 1}`}
                                    required
                                  />
                                </label>
                              </div>
                            </p>
                          </>
                        );
                      })}
                  </div>
                )}
                {isCoding && (
                  <div>
                    <Row>
                      {isNew && currentQsNo === navArray.length && (
                        <div class="form-group">
                          <label for="qsSetInputFormat">Input Format : </label>
                          <textarea
                            class="form-control form-field style-4"
                            disabled={!isUpdate}
                            defaultValue={""}
                            form="sbForm"
                            name={`inputFormat`}
                            id="qsSetInputFormat"
                            placeholder="Enter Input Format"
                            rows="2"
                            style={{ maxWidth: "100%", resize: "none" }}
                            required
                          ></textarea>
                        </div>
                      )}
                      {!isNew && (
                        <div class="form-group">
                          <label for="qsSetInputFormat">Input Format : </label>
                          <textarea
                            class="form-control form-field style-4"
                            disabled={!isUpdate}
                            defaultValue={inputF}
                            form="sbForm"
                            name={`inputFormat`}
                            id="qsSetInputFormat"
                            placeholder="Enter Input Format"
                            rows="2"
                            style={{ maxWidth: "100%", resize: "none" }}
                            required
                          ></textarea>
                        </div>
                      )}
                    </Row>

                    <Row>
                      {isNew && currentQsNo === navArray.length && (
                        <div class="form-group">
                          <label for="qsSetOutputFormat">
                            Output Format :{" "}
                          </label>
                          <textarea
                            class="form-control form-field style-4"
                            disabled={!isUpdate}
                            defaultValue={""}
                            form="sbForm"
                            name={`outputFormat`}
                            id="qsSetOutputFormat"
                            placeholder="Enter Output Format"
                            rows="2"
                            style={{ maxWidth: "100%", resize: "none" }}
                            required
                          ></textarea>
                        </div>
                      )}
                      {!isNew && (
                        <div class="form-group">
                          <label for="qsSetOutputFormat">
                            Output Format :{" "}
                          </label>
                          <textarea
                            class="form-control form-field style-4"
                            disabled={!isUpdate}
                            defaultValue={outputF}
                            form="sbForm"
                            name={`outputFormat`}
                            id="qsSetOutputFormat"
                            placeholder="Enter Output Format"
                            rows="2"
                            style={{ maxWidth: "100%", resize: "none" }}
                            required
                          ></textarea>
                        </div>
                      )}
                    </Row>
                    <Row>
                      <Col md={6}>
                        {!isNew && (
                          <div class="form-group">
                            <label for="qsSetConstraints">Constraints : </label>
                            <textarea
                              class="form-control form-field style-4"
                              disabled={!isUpdate}
                              defaultValue={
                                isNew && currentQsNo == navArray.length
                                  ? ""
                                  : constraints
                              }
                              form="sbForm"
                              name={`constraints`}
                              id="qsSetConstraints"
                              placeholder="Enter Constraints"
                              rows="2"
                              style={{ maxWidth: "100%", resize: "none" }}
                              required
                            ></textarea>
                          </div>
                        )}
                        {isNew && currentQsNo === navArray.length && (
                          <div class="form-group">
                            <label for="qsSetConstraints">Constraints : </label>
                            <textarea
                              class="form-control form-field style-4"
                              disabled={!isUpdate}
                              defaultValue={""}
                              form="sbForm"
                              name={`constraints`}
                              id="qsSetConstraints"
                              placeholder="Enter Constraints"
                              rows="2"
                              style={{ maxWidth: "100%", resize: "none" }}
                              required
                            ></textarea>
                          </div>
                        )}
                      </Col>
                      <Col md={6}>
                        {isCoding && (
                          <div style={{ marginBottom: "20px" }}>
                            <div class="form-group">
                              <label for="selectSetQs">Type :</label>
                              <select
                                class="form-select"
                                name="type"
                                aria-label="Default select example"
                                disabled={!isUpdate}
                              >
                                <option
                                  selected={
                                    location.state.type === "Easy"
                                      ? true
                                      : false
                                  }
                                >
                                  Easy
                                </option>
                                <option
                                  selected={
                                    location.state.type === "Medium"
                                      ? true
                                      : false
                                  }
                                >
                                  Medium
                                </option>
                                <option
                                  selected={
                                    location.state.type === "Hard"
                                      ? true
                                      : false
                                  }
                                >
                                  Hard
                                </option>
                              </select>
                            </div>
                          </div>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      {isNew && currentQsNo === navArray.length && (
                        <>
                          <Col md={6}>
                            <div class="form-group">
                              <label for="qsSetSampleInput">
                                Sample Input :{" "}
                              </label>
                              <textarea
                                class="form-control form-field style-4"
                                disabled={!isUpdate}
                                defaultValue={""}
                                form="sbForm"
                                name={`sampleInput`}
                                id="qsSetSampleInput"
                                placeholder="Enter Sample Input"
                                rows="2"
                                style={{ maxWidth: "100%", resize: "none" }}
                                required
                              ></textarea>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div class="form-group">
                              <label for="qsSetSampleOutput">
                                Sample Output :{" "}
                              </label>
                              <textarea
                                class="form-control form-field style-4"
                                disabled={!isUpdate}
                                defaultValue={""}
                                form="sbForm"
                                name={`sampleOutput`}
                                id="qsSetSampleOutput"
                                placeholder="Enter Sample Output"
                                rows="2"
                                style={{ maxWidth: "100%", resize: "none" }}
                                required
                              ></textarea>
                            </div>
                          </Col>
                        </>
                      )}
                      {!isNew && (
                        <>
                          <Col md={6}>
                            <div class="form-group">
                              <label for="qsSetSampleInput">
                                Sample Input :{" "}
                              </label>
                              <textarea
                                class="form-control form-field style-4"
                                disabled={!isUpdate}
                                defaultValue={sampleInput}
                                form="sbForm"
                                name={`sampleInput`}
                                id="qsSetSampleInput"
                                placeholder="Enter Sample Input"
                                rows="2"
                                style={{ maxWidth: "100%", resize: "none" }}
                                required
                              ></textarea>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div class="form-group">
                              <label for="qsSetSampleOutput">
                                Sample Output :{" "}
                              </label>
                              <textarea
                                class="form-control form-field style-4"
                                disabled={!isUpdate}
                                defaultValue={sampleOutput}
                                form="sbForm"
                                name={`sampleOutput`}
                                id="qsSetSampleOutput"
                                placeholder="Enter Sample Output"
                                rows="2"
                                style={{ maxWidth: "100%", resize: "none" }}
                                required
                              ></textarea>
                            </div>
                          </Col>
                        </>
                      )}
                    </Row>
                    <Row>
                      {isNew && currentQsNo === navArray.length && (
                        <div class="form-group">
                          <label for="qsSetExplanation">Explanation : </label>
                          <textarea
                            class="form-control form-field style-4"
                            disabled={!isUpdate}
                            defaultValue={""}
                            form="sbForm"
                            name={`explanation`}
                            id="qsSetExplanation"
                            placeholder="Enter Explanation"
                            rows="3"
                            style={{ maxWidth: "100%" }}
                          ></textarea>
                        </div>
                      )}
                      {!isNew && (
                        <div class="form-group">
                          <label for="qsSetExplanation">Explanation : </label>
                          <textarea
                            class="form-control form-field style-4"
                            disabled={!isUpdate}
                            defaultValue={explanation}
                            form="sbForm"
                            name={`explanation`}
                            id="qsSetExplanation"
                            placeholder="Enter Explanation"
                            rows="3"
                            style={{ maxWidth: "100%" }}
                          ></textarea>
                        </div>
                      )}
                    </Row>
                    <Row>
                      {!isNew && (
                        <>
                          <Col md={6}>
                            <div class="form-group">
                              <label for="qsSetTestCase1Input">
                                TestCase Input 1 :{" "}
                              </label>
                              <textarea
                                class="form-control form-field style-4"
                                disabled={!isUpdate}
                                defaultValue={testCaseInput1}
                                form="sbForm"
                                name={`testCase1Input`}
                                id="qsSetTestCase1Input"
                                placeholder="Enter TestCase Input 1"
                                rows="2"
                                style={{ maxWidth: "100%", resize: "none" }}
                                required
                              ></textarea>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div class="form-group">
                              <label for="qsSetTestCase1Output">
                                TestCase Output 1 :{" "}
                              </label>
                              <textarea
                                class="form-control form-field style-4"
                                disabled={!isUpdate}
                                defaultValue={testCaseOutput1}
                                form="sbForm"
                                name={`testCase1Output`}
                                id="qsSetTestCase1Output"
                                placeholder="Enter TestCase Output 1"
                                rows="2"
                                style={{ maxWidth: "100%", resize: "none" }}
                                required
                              ></textarea>
                            </div>
                          </Col>
                        </>
                      )}
                      {isNew && currentQsNo === navArray.length && (
                        <>
                          {" "}
                          <Col md={6}>
                            <div class="form-group">
                              <label for="qsSetTestCase1Input">
                                TestCase Input 1 :{" "}
                              </label>
                              <textarea
                                class="form-control form-field style-4"
                                disabled={!isUpdate}
                                defaultValue={""}
                                form="sbForm"
                                name={`testCase1Input`}
                                id="qsSetTestCase1Input"
                                placeholder="Enter TestCase Input 1"
                                rows="2"
                                style={{ maxWidth: "100%", resize: "none" }}
                                required
                              ></textarea>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div class="form-group">
                              <label for="qsSetTestCase1Output">
                                TestCase Output 1 :{" "}
                              </label>
                              <textarea
                                class="form-control form-field style-4"
                                disabled={!isUpdate}
                                defaultValue={""}
                                form="sbForm"
                                name={`testCase1Output`}
                                id="qsSetTestCase1Output"
                                placeholder="Enter TestCase Output 1"
                                rows="2"
                                style={{ maxWidth: "100%", resize: "none" }}
                                required
                              ></textarea>
                            </div>
                          </Col>
                        </>
                      )}
                    </Row>
                    <Row>
                      {!isNew && (
                        <>
                          {" "}
                          <Col md={6}>
                            <div class="form-group">
                              <label for="qsSetTestCase2Input">
                                TestCase Input 2 :{" "}
                              </label>
                              <textarea
                                class="form-control form-field style-4"
                                disabled={!isUpdate}
                                defaultValue={testCaseInput2}
                                form="sbForm"
                                name={`testCase2Input`}
                                id="qsSetTestCase2Input"
                                placeholder="Enter TestCase Input 2"
                                rows="2"
                                style={{ maxWidth: "100%", resize: "none" }}
                                required
                              ></textarea>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div class="form-group">
                              <label for="qsSetTestCase2Output">
                                TestCase Output 2 :{" "}
                              </label>
                              <textarea
                                class="form-control form-field style-4"
                                disabled={!isUpdate}
                                defaultValue={testCaseOutput2}
                                form="sbForm"
                                name={`testCase2Output`}
                                id="qsSetTestCase2Output"
                                placeholder="Enter TestCase Output 2"
                                rows="2"
                                style={{ maxWidth: "100%", resize: "none" }}
                                required
                              ></textarea>
                            </div>
                          </Col>
                        </>
                      )}

                      {isNew && currentQsNo === navArray.length && (
                        <>
                          {" "}
                          <Col md={6}>
                            <div class="form-group">
                              <label for="qsSetTestCase2Input">
                                TestCase Input 2 :{" "}
                              </label>
                              <textarea
                                class="form-control form-field style-4"
                                disabled={!isUpdate}
                                defaultValue={""}
                                form="sbForm"
                                name={`testCase2Input`}
                                id="qsSetTestCase2Input"
                                placeholder="Enter TestCase Input 2"
                                rows="2"
                                style={{ maxWidth: "100%", resize: "none" }}
                                required
                              ></textarea>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div class="form-group">
                              <label for="qsSetTestCase2Output">
                                TestCase Output 2 :{" "}
                              </label>
                              <textarea
                                class="form-control form-field style-4"
                                disabled={!isUpdate}
                                defaultValue={""}
                                form="sbForm"
                                name={`testCase2Output`}
                                id="qsSetTestCase2Output"
                                placeholder="Enter TestCase Output 2"
                                rows="2"
                                style={{ maxWidth: "100%", resize: "none" }}
                                required
                              ></textarea>
                            </div>
                          </Col>
                        </>
                      )}
                    </Row>
                    <Row>
                      {!isNew && (
                        <>
                          {" "}
                          <Col md={6}>
                            <div class="form-group">
                              <label for="qsSetTestCase3Input">
                                TestCase Input 3 :{" "}
                              </label>
                              <textarea
                                class="form-control form-field style-4"
                                disabled={!isUpdate}
                                defaultValue={testCaseInput3}
                                form="sbForm"
                                name={`testCase3Input`}
                                id="qsSetTestCase3Input"
                                placeholder="Enter TestCase Input 3"
                                rows="2"
                                style={{ maxWidth: "100%", resize: "none" }}
                                required
                              ></textarea>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div class="form-group">
                              <label for="qsSetTestCase3Output">
                                TestCase Output 3 :{" "}
                              </label>
                              <textarea
                                class="form-control form-field style-4"
                                disabled={!isUpdate}
                                defaultValue={testCaseOutput3}
                                form="sbForm"
                                name={`testCase3Output`}
                                id="qsSetTestCase3Output"
                                placeholder="Enter TestCase Output 3"
                                rows="2"
                                style={{ maxWidth: "100%", resize: "none" }}
                                required
                              ></textarea>
                            </div>
                          </Col>
                        </>
                      )}
                      {isNew && currentQsNo === navArray.length && (
                        <>
                          {" "}
                          <Col md={6}>
                            <div class="form-group">
                              <label for="qsSetTestCase3Input">
                                TestCase Input 3 :{" "}
                              </label>
                              <textarea
                                class="form-control form-field style-4"
                                disabled={!isUpdate}
                                defaultValue={""}
                                form="sbForm"
                                name={`testCase3Input`}
                                id="qsSetTestCase3Input"
                                placeholder="Enter TestCase Input 3"
                                rows="2"
                                style={{ maxWidth: "100%", resize: "none" }}
                                required
                              ></textarea>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div class="form-group">
                              <label for="qsSetTestCase3Output">
                                TestCase Output 3 :{" "}
                              </label>
                              <textarea
                                class="form-control form-field style-4"
                                disabled={!isUpdate}
                                defaultValue={""}
                                form="sbForm"
                                name={`testCase3Output`}
                                id="qsSetTestCase3Output"
                                placeholder="Enter TestCase Output 3"
                                rows="2"
                                style={{ maxWidth: "100%", resize: "none" }}
                                required
                              ></textarea>
                            </div>
                          </Col>
                        </>
                      )}
                    </Row>
                  </div>
                )}
              </div>
              {isUpdate && !isCoding && (
                <>
                  <button
                    class="btn"
                    type="button"
                    onClick={(e) => addOpt(e)}
                    style={{
                      backgroundColor: "#10B65C",
                      borderRadius: "100px",
                      marginLeft: "5%",
                      marginBottom: "10px",
                    }}
                  >
                    <i class="fa fa-add" style={{ color: "white" }}></i>
                  </button>
                  <button
                    class="btn"
                    type="button"
                    onClick={(e) => delOpt(e)}
                    style={{
                      backgroundColor: "#10B65C",
                      borderRadius: "100px",
                      marginLeft: "5%",
                      marginBottom: "10px",
                    }}
                  >
                    <i class="fa fa-trash" style={{ color: "white" }}></i>
                  </button>
                </>
              )}
              {isUpdate ? (
                <button
                  class="btn"
                  type="button"
                  onClick={(e) => {
                    if (window.confirm("Do you want to update ?")) {
                      // Save it!
                      var ele = document.getElementById("actionBut");
                      ele.focus();
                      ele.classList.toggle("blinking");
                    } else {
                      setIsUpdate(!isUpdate);
                      if (isNew) {
                        window.location.reload();
                        setNavArray(
                          navArray.filter(
                            (item, index) => index !== navArray.length - 1
                          )
                        );
                        setIsNew(false);
                      }
                    }
                  }}
                  style={{
                    backgroundColor: "#10B65C",
                    borderRadius: "100px",
                    marginLeft: "5%",
                    marginBottom: "10px",
                  }}
                >
                  <i class="fa fa-edit" style={{ color: "white" }}></i>
                </button>
              ) : (
                <button
                  class="btn"
                  type="button"
                  onClick={(e) => {
                    setIsUpdate(!isUpdate);
                  }}
                  style={{
                    backgroundColor: "#10B65C",
                    borderRadius: "100px",
                    marginLeft: "5%",
                    marginBottom: "10px",
                  }}
                >
                  <i class="fa fa-edit" style={{ color: "white" }}></i>
                </button>
              )}
            </div>
          </Col>
          <Col md={3}>
            <div className="basicRec" id="wrapper">
              {isUpdate ? (
                <>
                  <div
                    style={{
                      justifyContent: "space-between",
                      display: "flex",
                      padding: "10px 10px 0 10px",
                    }}
                  >
                    {" "}
                    Question Navigator
                    <button
                      class="btn"
                      type="button"
                      style={{ padding: "0" }}
                      onClick={(e) => {}}
                    >
                      <i class="fa fa-trash" style={{ color: "grey" }}></i>
                    </button>
                  </div>
                  <div
                    class="scrollbar"
                    style={{
                      height: windowHeight,
                      padding: "5px",
                      maxWidth: "100%",
                      backgroundColor: "#e9ecef",
                    }}
                    id="style-4"
                  >
                    {navArray !== undefined &&
                      navArray.map((ittr, index) => {
                        return (
                          <>
                            {console.log(ittr)}
                            <div
                              style={{
                                boxShadow: `rgba(0, 0, 0, 0.02) 0 1px 3px 0`,
                                backgroundColor: "#e9ecef",
                                minHeight: "40px",
                                padding: "10px 5px 10px 5px",
                                boxSizing: `border-box`,
                                width: "100%",
                                marginBottom: "2px",
                                color: `rgba(0, 0, 0, 0.85)`,
                              }}
                            >
                              <Row>
                                <Col md={1}>
                                  <input
                                    class="styled-checkbox"
                                    style={{ display: "none" }}
                                    disabled
                                    id={`styled-checkbox-${index}`}
                                    type="checkbox"
                                    onClick={(e) => {}}
                                    value={`value${index}`}
                                  />
                                </Col>
                                <Col md={11}>
                                  <div
                                    id={index}
                                    className="qsNavButt"
                                    style={{
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                    }}
                                  >
                                    {isCoding
                                      ? ittr.question || "New Qs"
                                      : ittr.ques || "New Qs"}
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </>
                        );
                      })}
                    {navArray !== undefined && navArray.length === 0
                      ? (setIsNew(true),
                        setIsUpdate(true),
                        setNavArray((prev) => [...prev, -1]),
                        setCurrentQsNo(navArray.length + 1),
                        setCurrentQsID("New"),
                        setOpt([]))
                      : null}
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      justifyContent: "space-between",
                      display: "flex",
                      padding: "10px 10px 0 10px",
                    }}
                  >
                    {" "}
                    Question Navigator
                    <button
                      class="btn"
                      type="button"
                      style={{ padding: "0" }}
                      onClick={(e) => delQuestion(e)}
                    >
                      <i class="fa fa-trash" style={{ color: "red" }}></i>
                    </button>
                  </div>
                  <div
                    class="scrollbar"
                    style={{
                      height: windowHeight,
                      padding: "5px",
                      maxWidth: "100%",
                      backgroundColor: "white",
                    }}
                    id="style-4"
                  >
                    {navArray !== undefined &&
                      navArray.map((ittr, index) => {
                        return (
                          <>
                            {console.log(ittr)}
                            <div
                              style={{
                                boxShadow: `rgba(0, 0, 0, 0.02) 0 1px 3px 0`,
                                backgroundColor: "#e9ecef",
                                minHeight: "40px",
                                padding: "10px 5px 10px 5px",
                                boxSizing: `border-box`,
                                width: "100%",
                                marginBottom: "2px",
                                color: `rgba(0, 0, 0, 0.85)`,
                              }}
                            >
                              <Row>
                                <Col md={1}>
                                  <input
                                    className="styled-checkbox"
                                    style={{ display: "none" }}
                                    name="styleCheckBox"
                                    id={`styled-checkbox-${index}`}
                                    type="checkbox"
                                    onClick={(e) => {}}
                                    value={`valueCheckBox${ittr.id}`}
                                  />
                                </Col>
                                <Col md={11}>
                                  <div
                                    id={index}
                                    className="qsNavBut"
                                    onClick={fillData}
                                    style={{
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                    }}
                                  >
                                    {isCoding
                                      ? ittr.question || "New Qs"
                                      : ittr.ques || "New Qs"}
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </>
                        );
                      })}
                    {navArray !== undefined && navArray.length === 0 && (
                      <h5>Add question to view</h5>
                    )}
                  </div>
                </>
              )}
            </div>
          </Col>
        </Row>
        <Row style={{ paddingTop: "20px", paddingLeft: "10%" }}>
          <button
            style={{ color: "white" }}
            type="button"
            onClick={(e) =>
              navigate("/admin/newTest", {
                state: { sid: location.state.sid - 1 },
              })
            }
            className="btn scTest"
          >
            Back
          </button>

          {(isUpdate || navArray.length === 0) && (
            <>
              <button
                style={{ color: "white" }}
                type="submit"
                className="btn scTest flashBut"
                id="actionBut"
              >
                {(isNew && currentQsNo == navArray.length) ||
                navArray.length === 0
                  ? "Save"
                  : "Update"}
              </button>
            </>
          )}

          {!isNew && !isUpdate && navArray.length !== 0 && (
            <button
              style={{ color: "white" }}
              className="btn scTest"
              type="button"
              onClick={(e) => {
                setIsNew(true);
                setIsUpdate(true);
                setNavArray((prev) => [...prev, -1]);
                setCurrentQsNo(navArray.length + 1);
                setCurrentQsID("New");
                setOpt([]);
              }}
            >
              Add new Question
            </button>
          )}
        </Row>
      </form>
    </div>
  );
}

export default SetQuestion;
