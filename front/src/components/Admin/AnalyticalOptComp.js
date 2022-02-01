import React, { useState, useEffect } from "react";

function AnalyticalOptComp({
  ques,
  index,
  currentQsID,
  isUpdate,
  addOptInSubQs,
  delOptInSubQs,
  set_rerenderState,
  rerenderState,
}) {
  useEffect(() => {
    set_rerenderState(false);
  }, [rerenderState]);

  return (
    <div
      class="form-group basicRec"
      style={{ padding: "10px 20px", marginTop: "10px" }}
    >
      <label for={`para${currentQsID}Qs${index + 1}`}>
        Question {index + 1} :{" "}
      </label>
      <textarea
        class="form-control form-field style-4"
        disabled={!isUpdate}
        defaultValue={ques.question}
        form="sbForm"
        name={`para${currentQsID}Qs${index + 1}`}
        id={`para${currentQsID}Qs${index + 1}`}
        placeholder="Enter Question"
        rows="2"
        style={{ maxWidth: "100%" }}
        required
      ></textarea>
      <div id={`Para${currentQsID}Qs${index + 1}OptArr`}>
        {ques.options.length !== 0 &&
          ques.options.map((opt, ind) => {
            return (
              <>
                <p style={{ padding: "5px 0", margin: "10px 0px" }}>
                  <div class="form-check" style={{ paddingLeft: "0" }}>
                    <input
                      type="radio"
                      className="setQsRadio"
                      name={`para${currentQsID}Qs${index + 1}correctOpt`}
                      disabled={!isUpdate}
                      checked={opt.marks !== 0 ? true : null}
                      value={`para${currentQsID}Qs${index + 1}Option${ind + 1}`}
                      id={`para${currentQsID}Qs${index + 1}Option${ind + 1}`}
                      required
                    />
                    <label
                      class="form-check-label"
                      style={{
                        marginLeft: "15px",
                        fontWeight: "400",
                        width: "96%",
                      }}
                      for={`flexCheckDefault${ind + 1}`}
                    >
                      <input
                        type="text"
                        class="form-control"
                        disabled={!isUpdate}
                        defaultValue={opt.title}
                        name={`para${currentQsID}Qs${index + 1}Option${
                          ind + 1
                        }`}
                        placeholder={`Enter Option ${ind + 1}`}
                        id={`para${currentQsID}Qs${index + 1}Option${ind + 1}`}
                        required
                      />
                    </label>
                  </div>
                </p>
              </>
            );
          })}
      </div>
      <button
        hidden={isUpdate ? false : true}
        className="btn"
        type="button"
        onClick={(e) => addOptInSubQs(e, currentQsID, ques.paraQsId, index)}
        style={{
          backgroundColor: "#10B65C",
          borderRadius: "100px",
        }}
      >
        <i class="fa fa-add" style={{ color: "white" }}></i>
      </button>
      <button
        hidden={isUpdate ? false : true}
        className="btn"
        type="button"
        onClick={(e) => delOptInSubQs(e, currentQsID, ques.paraQsId, index)}
        style={{
          backgroundColor: "#10B65C",
          borderRadius: "100px",
          marginLeft: "2%",
        }}
      >
        <i class="fa fa-trash" style={{ color: "white" }}></i>
      </button>
    </div>
  );
}

export default AnalyticalOptComp;
