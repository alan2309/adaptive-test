import React, { useEffect } from "react";
import Papa from "papaparse";

function CSVUploadCsv({
  setCsvJsonData,
  csvJsonData,
  subjectName,
  setDangerMsg,
  setIsAlertDangerMsgLoaded,
}) {
  return (
    <>
      <input
        type="file"
        accept=".csv,.xlsx,.xls"
        id="csv_upload"
        style={{ display: "inline-block" }}
        onChange={(e) => {
          const files = e.target.files;
          var allKeyNotPresent = false;
          if (files) {
            let a = {};
            a[subjectName] = {
              easy: [],
              medium: [],
              hard: [],
            };
            let countRowId = 0;
            Papa.parse(files[0], {
              header: true,
              transformHeader: function (header, index) {
                console.log(header);
                header = header.toLowerCase();
                if (index === 0 && header === "question") {
                  return "Question";
                } else if (index === 1 && header === "type") {
                  return "type";
                } else if (index === 2 && header === "correctoption") {
                  return "CorrectOption";
                } else if (index !== 0 || index !== 1 || index !== 2) {
                  return `Option${index - 2}`;
                }
              },
              delimitersToGuess: [
                ",",
                "\t",
                "|",
                ";",
                Papa.RECORD_SEP,
                Papa.UNIT_SEP,
              ],
              step: function (row, parser) {
                parser.pause();
                let first_row_data = row.data;
                if (subjectName !== "Personality") {
                  if (
                    "Question" in first_row_data &&
                    "CorrectOption" in first_row_data &&
                    "type" in first_row_data &&
                    "Option1" in first_row_data &&
                    "Option2" in first_row_data
                  ) {
                    if (first_row_data["Question"] === "") {
                      setIsAlertDangerMsgLoaded(true);
                      setDangerMsg(
                        "Empty Question at row index = " +
                          parseInt(countRowId + 2)
                      );
                      parser.abort();
                    } else if (first_row_data["type"] === "") {
                      setIsAlertDangerMsgLoaded(true);
                      setDangerMsg(
                        "Empty type at row index = " + parseInt(countRowId + 2)
                      );
                      parser.abort();
                    } else {
                      let b = {};
                      b["id"] = countRowId;
                      b["imgId"] = null;
                      b["ques"] = first_row_data["Question"];
                      let c = [];
                      let count = 0;
                      for (let key in first_row_data) {
                        if (key.includes("Option")) {
                          let optionId = key.split(["Option"])[1];
                          if (optionId !== "" && first_row_data[key] !== "") {
                            let d = {};
                            d["id"] = count;
                            d["marks"] =
                              first_row_data["CorrectOption"] === optionId
                                ? 10
                                : 0;
                            d["title"] = first_row_data[key];
                            c.push(d);
                            count += 1;
                          }
                        }
                      }
                      b["options"] = c;
                      if (parseInt(first_row_data["type"]) === 1) {
                        a[subjectName]["easy"].push(b);
                      } else if (parseInt(first_row_data["type"]) === 2) {
                        a[subjectName]["medium"].push(b);
                      } else if (parseInt(first_row_data["type"]) === 3) {
                        a[subjectName]["hard"].push(b);
                      }
                      countRowId += 1;
                      parser.resume();
                    }
                  } else {
                    let stringLine = "";

                    if (!("Question" in first_row_data)) {
                      stringLine += "Question is missing \n";
                    }
                    if (!("type" in first_row_data)) {
                      stringLine += "type is missing \n";
                    }
                    if (!("CorrectOption" in first_row_data)) {
                      stringLine += "CorrectOption is missing \n";
                    }
                    if (!("Option1" in first_row_data)) {
                      stringLine += "Option1 is missing \n";
                    }
                    if (!("Option2" in first_row_data)) {
                      stringLine += "Option2 is missing \n";
                    }
                    allKeyNotPresent = true;
                    setIsAlertDangerMsgLoaded(true);
                    setDangerMsg(stringLine);
                    parser.abort();
                  }
                } else if (subjectName === "Personality") {
                  if ("Question" in first_row_data) {
                    if (first_row_data["Question"] === "") {
                      setIsAlertDangerMsgLoaded(true);
                      setDangerMsg(
                        "Empty Question at row index = " +
                          parseInt(countRowId + 2)
                      );
                      parser.abort();
                    } else {
                      let b = {};
                      b["id"] = countRowId;
                      b["ques"] = first_row_data["Question"];
                      a[subjectName]["medium"].push(b);
                      countRowId += 1;
                      parser.resume();
                    }
                  } else {
                    allKeyNotPresent = true;
                    setIsAlertDangerMsgLoaded(true);
                    setDangerMsg("Question is missing \n");
                    parser.abort();
                  }
                }
              },
              complete: function (results) {
                if (!allKeyNotPresent) {
                  setCsvJsonData(a);
                } else {
                  e.target.value = "";
                }
              },
            });
          }
        }}
      />
    </>
  );
}

export default CSVUploadCsv;
