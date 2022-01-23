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
  useEffect(() => {
    var divHeight=document.querySelector('#SETQS').clientHeight
    setWindowHeight(divHeight)
    localStorage.removeItem('isNewTestReload')
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
      //Alankrit

      //after saving add value to --->navArray
      navigate("/admin/newTest",{state:{'sid':location.state.sid-1}});
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
    var elCheckBox= document.getElementsByClassName('styled-checkbox')
    var $boxes = $('input[name=styleCheckBox]:checked');

    if(elCheckBox[0].style.display!=='none'){
      if($boxes.length===0){
      for(var x=0;x<elCheckBox.length;x++){
        elCheckBox[x].style.display='none'
      }  
  }else{
    if (window.confirm("Do you want to delete ?")) {
      var a=[]
    $boxes.each(function(item){
      // Do stuff here with this
      var val=$boxes[item].value
      val=val.split('CheckBox')[1]
      console.log(val)
      a.push(parseInt(val))
      
  });
  axiosInstance.post("api/admin/delQs", { delQs: a }).then((res) => {
   navigate("/admin/newTest",{state:{'sid':location.state.sid-1}});
  });
    } 
  }
}else{
  
  for(var x=0;x<elCheckBox.length;x++){
    elCheckBox[x].style.display='inline-block'
  }
}
    
  
  }
  function fillData(e) {
    console.log(e);
    console.log('acacsasc');
    console.log(e.target.id);
    console.log('acacsasc');    document.getElementById("sbForm").reset();

    setCurrentQs(navArray[e.target.id].ques);
    setCurrentQsID(navArray[e.target.id].id);
    setOpt(navArray[e.target.id].options);
    setCurrentQsNo(`${parseInt(e.target.id) + 1}`);
  }
  function reportWindowSize(e){
    alert('lol')
    console.log(e)
    setWindowHeight(window.screen.height)
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
            id='SETQS'
              className="basicRec SetQuestion"
              style={{
                margin: "0px 50px",
              }}
            >
              <div style={{ padding: "20px 36px 0 36px" }}>
                <div style={{ marginBottom: "30px" }}>
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
                        isNew && currentQsNo == navArray.length ? "" :currentQs
                      }
                      form="sbForm"
                      name={`question${currentQsID}`}
                      id="qsSetQs"
                      placeholder="Enter Question"
                      rows="8"
                      style={{ maxWidth: "100%", resize: "none" }}
                      required 
                    ></textarea>
                  </div>
                </Row>
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
              </div>
              {isUpdate && (
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
               <div style={{justifyContent:'space-between',display: 'flex',padding:'10px 10px 0 10px'}}>  Question Navigator 
               <button
                     class="btn"
                     type="button"
                     style={{padding:'0'}}
                     onClick={(e) => {
                     }}
                   
                   >
                     <i class="fa fa-trash" style={{ color: "grey" }}></i>
                   </button></div>
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
                          <div style={{
                              boxShadow: `rgba(0, 0, 0, 0.02) 0 1px 3px 0`,
                              backgroundColor: "#e9ecef",
                              minHeight: "40px",
                              padding:'10px 5px 10px 5px',
                              boxSizing: `border-box`,
                              width: "100%",
                              marginBottom: "2px",
                              color: `rgba(0, 0, 0, 0.85)`,
                            }}><Row>
                            <Col md={1}>
                              <input class="styled-checkbox" style={{display:'none'}} disabled id={`styled-checkbox-${index}`} type="checkbox" onClick={(e)=>{}} value={`value${index}`}/>
                              </Col>
                            <Col md={11 }>
                            <div id={index}  className="qsNavButt"  style={{textOverflow:'ellipsis',whiteSpace:'nowrap',overflow:'hidden'}}>{ittr.ques || "New Qs"}</div> 
                            </Col>
                          </Row></div>
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
               <div style={{justifyContent:'space-between',display: 'flex',padding:'10px 10px 0 10px'}}>  Question Navigator 
            <button
                  class="btn"
                  type="button"
                  style={{padding:'0'}}
                  onClick={(e) => delQuestion(e)}
                
                >
                  <i class="fa fa-trash" style={{ color: "red" }}></i>
                </button></div>
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
                          <div style={{
                              boxShadow: `rgba(0, 0, 0, 0.02) 0 1px 3px 0`,
                              backgroundColor: "#e9ecef",
                              minHeight: "40px",
                              padding:'10px 5px 10px 5px',
                              boxSizing: `border-box`,
                              width: "100%",
                              marginBottom: "2px",
                              color: `rgba(0, 0, 0, 0.85)`,
                            }}><Row>
                            <Col md={1}>
                              <input className="styled-checkbox" style={{display:'none'}} name='styleCheckBox' id={`styled-checkbox-${index}`} type="checkbox" onClick={(e)=>{}} value={`valueCheckBox${ittr.id}`}/>
                              </Col>
                            <Col md={11 }>
                            <div id={index} className="qsNavBut" onClick={fillData} style={{textOverflow:'ellipsis',whiteSpace:'nowrap',overflow:'hidden'}}>{ittr.ques || "New Qs"}</div> 
                            </Col>
                          </Row></div>
                          
                        </>
                      
                      );
                    }  )}
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
              navigate("/admin/newTest",{state:{'sid':location.state.sid-1}})
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
