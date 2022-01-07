import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import QuestionNavigatorComp from "../../components/TestScreeen/QuestionNavigatorComp";
import { useNavigate } from "react-router";
import "../../css/AdminHomeScreen.css";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../axios";

function SetQuestion() {
  const navigate = useNavigate();
  const location = useLocation();
  const [optionArray, addOptionArray] = useState([]);
  const [navArray, setNavArray] = useState([]);
  const [countOpt, setCountOpt] = useState(2);

  const [currentQsNo, setCurrentQsNo] = useState(1);
  const [currentQsID, setCurrentQsID] = useState(-1);
  const [currentQs, setCurrentQs] = useState("");
  const [opt, setOpt] = useState([]);
  const [isNew, setIsNew] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  useEffect(() => {
    console.log(location.state.navArr);
    var temp = location.state.navArr;
    setNavArray(temp);
    if (temp[0] !== undefined) {
      setCurrentQsID(temp[0].id);
      setCurrentQs(temp[0].ques);
      setOpt(temp[0].options);
    } else {
      setIsUpdate(true);
    }
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    console.log("handlesubmit");
    console.log(document.getElementById("qsSetQs").name);
    var dictionary = {};
    dictionary[document.getElementById("qsSetQs").name] =
      document.getElementById("qsSetQs").value;
    var rightOpt=document.querySelector(
        'input[name="correctOpt"]:checked'
      )

      if(rightOpt!==null){
    dictionary["rightOpt"] = rightOpt.value;}
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
      console.log("saved to db");

      navigate("/admin/setSection", {
        state: {
          sectionName: location.state.sectionName,
          sid: location.state.sid,
        },
      });
    });
  }
  function delOpt(e){
      
    setOpt(opt.filter(function(item,index){
        console.log(index+1)
        console.log(opt.length)
        return opt.length !== index+1}));
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
              className="basicRec SetQuestion"
              style={{
                minHeight: window.screen.height - 360,
                margin: "0px 50px",
              }}
            >
              <div style={{ padding: "20px 36px 0 36px" }}>
                <div style={{ marginBottom: "30px" }}>
                  <div class="form-group">
                    <label for="selectSetQs">
                      Qs NO :   {currentQsNo}
                    </label>
                  </div>

                  <div class="form-group">
                    <label for="selectSetQs">Type :</label>
                    <select
                      class="form-select"
                      name="type"
                      aria-label="Default select example"
                      disabled
                    >
                      <option selected>{location.state.type}</option>
                    </select>
                  </div>
                </div>
                <Row>
                  <div class="form-group">
                    <label for="qsSetQs">Question : </label>
                    <textarea
                      class="form-control form-field"
                      disabled={!isUpdate}
                      defaultValue={
                        isNew && currentQsNo == navArray.length ? "" : currentQs
                      }
                      form="sbForm"
                      name={`question${currentQsID}`}
                      id="qsSetQs"
                      placeholder="Enter Question"
                      rows="2"
                      style={{ maxWidth: "100%", resize: "none" }}
                      required
                    ></textarea>
                  </div>
                </Row>

                {(!isNew || currentQsNo !== navArray.length) &&
                  opt !== undefined &&
                  opt.map((x, index) => {
                    return (
                      <>
                        <p style={{ padding: "5px 0", margin: "10px 0px" }}>
                          <div class="form-check" style={{paddingLeft:'0'}}>
                          
                            <input
                              type="radio"
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

                {((isNew && currentQsNo === navArray.length) ||
                  navArray.length == 0) && (
                  <>
                    <p style={{ padding: "5px 0", margin: "10px 0px" }}>
                      <div class="form-check">
                        <input
                          type="radio"
                          name="correctOpt"
                          disabled={!isUpdate}
                          value="Option1"
                          id="flexCheckDefault1"
                          required
                        />
                        <label
                          class="form-check-label"
                          style={{
                            marginLeft: "15px",
                            fontWeight: "400",
                            width: "96%",
                          }}
                          for="flexCheckDefault1"
                        >
                          <input
                            type="text"
                            class="form-control"
                            disabled={!isUpdate}
                            name="Option1"
                            placeholder="Enter Option 1"
                            id="Option1"
                            required
                          />
                        </label>
                      </div>
                    </p>
                    <p style={{ padding: "5px 0", margin: "10px 0px" }}>
                      <div class="form-check">
                        <input
                          type="radio"
                          name="correctOpt"
                          disabled={!isUpdate}
                          value="Option2"
                          id="flexCheckDefault2"
                          required
                        />
                        <label
                          class="form-check-label"
                          style={{
                            marginLeft: "15px",
                            fontWeight: "400",
                            width: "96%",
                          }}
                          for="flexCheckDefault2"
                        >
                          <input
                            type="text"
                            disabled={!isUpdate}
                            class="form-control"
                            name="Option2"
                            placeholder="Enter Option 2"
                            id="Option2"
                            required
                          />
                        </label>
                      </div>
                    </p>
                  </>
                )}
                {optionArray}
              </div>
              {isUpdate&&<>
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
                onClick={(e)=>delOpt(e)}
                style={{
                  backgroundColor: "#10B65C",
                  borderRadius: "100px",
                  marginLeft: "5%",
                  marginBottom: "10px",
                }}
              >
                <i class="fa fa-trash" style={{ color: "white" }}></i>
              </button>
              </>}
              {isUpdate ? (
                <button
                  class="btn"
                  type="button"
                  onClick={(e) => {
                    if (window.confirm("Do you want to update ?")) {
                      // Save it!
                      console.log("Thing was saved to the database.");
                    } else {
                      setIsUpdate(!isUpdate);
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

              {/* // :}                    */}
            </div>
          </Col>
          <Col>
            {isUpdate ? (
              <div
                className="basicRec"
                style={{
                  height: "100%",
                  paddingTop: "45px",
                  backgroundColor: "#e9ecef",
                }}
              >
                <QuestionNavigatorComp
                  isUpdate={isUpdate}
                  setCurrentQsNo={setCurrentQsNo}
                  setCurrentQsID={setCurrentQsID}
                  setCurrentQs={setCurrentQs}
                  setOpt={setOpt}
                  attempted={navArray}
                  disabled={false}
                ></QuestionNavigatorComp>
              </div>
            ) : (
              <div
                className="basicRec"
                style={{
                  height: "100%",
                  paddingTop: "45px",
                  backgroundColor: "white",
                }}
              >
                <QuestionNavigatorComp
                  isUpdate={isUpdate}
                  setCurrentQsNo={setCurrentQsNo}
                  setCurrentQsID={setCurrentQsID}
                  setCurrentQs={setCurrentQs}
                  setOpt={setOpt}
                  attempted={navArray}
                  disabled={false}
                ></QuestionNavigatorComp>
              </div>
            )}
          </Col>
        </Row>
        <Row style={{ paddingTop: "20px", paddingLeft: "450px" }}>
          <button
            style={{ color: "white" }}
            type="button"
            onClick={(e) =>
              navigate("/admin/setSection", {
                state: {
                  sectionName: location.state.sectionName,
                  sid: location.state.sid,
                },
              })
            }
            className="btn scTest"
          >
            Back
          </button>

          {(isUpdate || navArray.length === 0) && (
            <button
              style={{ color: "white" }}
              type="submit"
              className="btn scTest"
            >
              {(isNew && currentQsNo == navArray.length) ||
              navArray.length === 0
                ? "Save"
                : "Update"}
            </button>
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
                setCurrentQsID('New')
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
