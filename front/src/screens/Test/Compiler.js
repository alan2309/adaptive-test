import React, { Component, useEffect, useState } from "react";
import { Col, Row, Tabs, Tab } from "react-bootstrap";
import CodingQsComp from "../../components/TestScreeen/CodingQsComp";
import TestHeaderComp from "../../components/TestScreeen/TestHeaderComp";
import "../../css/Compiler.css";
import $ from "jquery";
import key from "../../components/TestScreeen/keys";
import axios from "axios";

export default function Compiler() {
  const [inputT, setInput] = useState("");
  const [inputT_question_1, setInput_question_1] = useState("");
  const [inputT_question_2, setInput_question_2] = useState("");
  const [inputT_question_3, setInput_question_3] = useState("");
  const [current_qs, set_current_qs] = useState(1);

  const [language_id, setLanguage_id] = useState();
  const [language_id_question_1, setLanguage_id_question_1] = useState();
  const [language_id_question_2, setLanguage_id_question_2] = useState();
  const [language_id_question_3, setLanguage_id_question_3] = useState();

  const [user_input, setUser_input] = useState();
  const [user_input_question_1, setUser_input_question_1] = useState();
  const [user_input_question_2, setUser_input_question_2] = useState();
  const [user_input_question_3, setUser_input_question_3] = useState();

  const [customInputCheck, setCustomInputCheck] = useState(false);

  const [isSubmitCode_qs1, setIsSubmitCode_qs1] = useState(); // (t/f)
  const [isSubmitCode_qs2, setIsSubmitCode_qs2] = useState(); // (t/f)
  const [isSubmitCode_qs3, setIsSubmitCode_qs3] = useState(); // (t/f)

  const [submitCode_qs1, set_submitCode_qs1] = useState(false); // (t/f)
  const [submitCode_qs2, set_submitCode_qs2] = useState(false); // (t/f)
  const [submitCode_qs3, set_submitCode_qs3] = useState(false); // (t/f)

  const [q1_run_output, set_q1_run_output] = useState();
  const [q1_testCase_1_output, set_q1_testCase_1_output] = useState();
  const [q1_testCase_2_output, set_q1_testCase_2_output] = useState();
  const [q1_testCase_3_output, set_q1_testCase_3_output] = useState();
  const [q1_testCase_Current_output, set_q1_testCase_Current_output] =
    useState(); //generalized for Q1
  const [q1_testCase_1_output_error, set_q1_testCase_1_output_error] =
    useState(); // (t/f)
  const [q1_testCase_2_output_error, set_q1_testCase_2_output_error] =
    useState(); // (t/f)
  const [q1_testCase_3_output_error, set_q1_testCase_3_output_error] =
    useState(); // (t/f)

  const [q2_run_output, set_q2_run_output] = useState();
  const [q2_testCase_1_output, set_q2_testCase_1_output] = useState();
  const [q2_testCase_2_output, set_q2_testCase_2_output] = useState();
  const [q2_testCase_3_output, set_q2_testCase_3_output] = useState();
  const [q2_testCase_Current_output, set_q2_testCase_Current_output] =
    useState(); //generalized for Q2
  const [q2_testCase_1_output_error, set_q2_testCase_1_output_error] =
    useState(); // (t/f)
  const [q2_testCase_2_output_error, set_q2_testCase_2_output_error] =
    useState(); // (t/f)
  const [q2_testCase_3_output_error, set_q2_testCase_3_output_error] =
    useState(); // (t/f)

  const [q3_run_output, set_q3_run_output] = useState();
  const [q3_testCase_1_output, set_q3_testCase_1_output] = useState();
  const [q3_testCase_2_output, set_q3_testCase_2_output] = useState();
  const [q3_testCase_3_output, set_q3_testCase_3_output] = useState();
  const [q3_testCase_Current_output, set_q3_testCase_Current_output] =
    useState(); //generalized for Q2
  const [q3_testCase_1_output_error, set_q3_testCase_1_output_error] =
    useState(); // (t/f)
  const [q3_testCase_2_output_error, set_q3_testCase_2_output_error] =
    useState(); // (t/f)
  const [q3_testCase_3_output_error, set_q3_testCase_3_output_error] =
    useState(); // (t/f)

  //testcase in
  const [q1_testCase_1_input, set_q1_testCase_1_input] = useState();
  const [q1_testCase_2_input, set_q1_testCase_2_input] = useState();
  const [q1_testCase_3_input, set_q1_testCase_3_input] = useState();

  const [q2_testCase_1_input, set_q2_testCase_1_input] = useState();
  const [q2_testCase_2_input, set_q2_testCase_2_input] = useState();
  const [q2_testCase_3_input, set_q2_testCase_3_input] = useState();

  const [q3_testCase_1_input, set_q3_testCase_1_input] = useState();
  const [q3_testCase_2_input, set_q3_testCase_2_input] = useState();
  const [q3_testCase_3_input, set_q3_testCase_3_input] = useState();

  //testcase out
  const [q1_testCase_1_expected_output, set_q1_testCase_1_expected_output] =
    useState();
  const [q1_testCase_2_expected_output, set_q1_testCase_2_expected_output] =
    useState();
  const [q1_testCase_3_expected_output, set_q1_testCase_3_expected_output] =
    useState();

  const [q2_testCase_1_expected_output, set_q2_testCase_1_expected_output] =
    useState();
  const [q2_testCase_2_expected_output, set_q2_testCase_2_expected_output] =
    useState();
  const [q2_testCase_3_expected_output, set_q2_testCase_3_expected_output] =
    useState();

  const [q3_testCase_1_expected_output, set_q3_testCase_1_expected_output] =
    useState();
  const [q3_testCase_2_expected_output, set_q3_testCase_2_expected_output] =
    useState();
  const [q3_testCase_3_expected_output, set_q3_testCase_3_expected_output] =
    useState();

  //three qs
  const [db_data, set_db_data] = useState();
  const [question_1, set_question_1] = useState({});
  const [question_2, set_question_2] = useState();
  const [question_3, set_question_3] = useState();
  const [question_current, set_question_current] = useState({
    question: "qs1",
    input_format: "input format",
    output_format: "output_format",
    constraints: "constraints",
    sample_input_1: "sample_input_1",
    sample_output_1: "sample_output_1",
    explanation: ["expl1", "expl2", "expl3"],
  });

  useEffect(() => {
    let data;
    const getData = async () =>
      await axios.get("http://127.0.0.1:8000/api/codingTests").then((res) => {
        console.log(res.data.cQs);
        set_db_data(res.data.cQs);
        data = res.data.cQs;
        //from db

        if (Object.keys(data[0]).length !== 0) {
          set_question_1(data[0]);
          set_question_current(data[0]);
          set_q1_testCase_1_input(data[0].test_case_input[0]);
          set_q1_testCase_1_expected_output(data[0].test_case_output[0]);
          set_q1_testCase_2_input(data[0].test_case_input[1]);
          set_q1_testCase_2_expected_output(data[0].test_case_output[1]);
          set_q1_testCase_3_input(data[0].test_case_input[2]);
          set_q1_testCase_3_expected_output(data[0].test_case_output[2]);
        }
        if (Object.keys(data[1]).length !== 0) {
          console.log(data[1]);
          set_question_2(data[1]);
          set_q2_testCase_1_input(data[1].test_case_input[0]);

          set_q2_testCase_1_expected_output(data[1].test_case_output[0]);
          set_q2_testCase_2_input(data[1].test_case_input[1]);
          set_q2_testCase_2_expected_output(data[1].test_case_output[1]);
          set_q2_testCase_3_input(data[1].test_case_input[2]);
          set_q2_testCase_3_expected_output(data[1].test_case_output[2]);
        }
        if (Object.keys(data[2]).length !== 0) {
          set_question_3(data[2]);
          set_q3_testCase_1_input(data[2].test_case_input[0]);

          set_q3_testCase_1_expected_output(data[2].test_case_output[0]);
          set_q3_testCase_2_input(data[2].test_case_input[1]);
          set_q3_testCase_2_expected_output(data[2].test_case_output[1]);
          set_q3_testCase_3_input(data[2].test_case_input[2]);
          set_q3_testCase_3_expected_output(data[2].test_case_output[2]);
        }
      });
    getData();
    setInput(localStorage.getItem("input_1") || ``);
    setInput_question_1(localStorage.getItem("input_1") || ``);
    setInput_question_2(localStorage.getItem("input_2") || ``);
    setInput_question_3(localStorage.getItem("input_3") || ``);

    setUser_input(localStorage.getItem("user_input_1") || ``);
    setUser_input_question_1(localStorage.getItem("user_input_1") || ``);
    setUser_input_question_2(localStorage.getItem("user_input_2") || ``);
    setUser_input_question_3(localStorage.getItem("user_input_3") || ``);

    setLanguage_id(localStorage.getItem("language_Id_question_1") || 54);
    setLanguage_id_question_1(
      localStorage.getItem("language_Id_question_1") || 54
    );
    setLanguage_id_question_2(
      localStorage.getItem("language_Id_question_2") || 54
    );
    setLanguage_id_question_3(
      localStorage.getItem("language_Id_question_3") || 54
    );
  }, []);

  function input(event) {
    event.preventDefault();
    setInput(event.target.value);
    localStorage.setItem(`input_${current_qs}`, event.target.value);
    current_qs === 1
      ? setInput_question_1(event.target.value)
      : current_qs === 2
      ? setInput_question_2(event.target.value)
      : setInput_question_3(event.target.value);
  }

  function userInput(event) {
    event.preventDefault();
    !event.target.value ? setUser_input() : setUser_input(event.target.value);

    current_qs === 1
      ? setUser_input_question_1(event.target.value)
      : current_qs === 2
      ? setUser_input_question_2(event.target.value)
      : setUser_input_question_3(event.target.value);

    localStorage.setItem(`user_input_${current_qs}`, event.target.value);
  }

  function language(event) {
    event.preventDefault();
    setLanguage_id(event.target.value);
    current_qs === 1
      ? setLanguage_id_question_1(event.target.value)
      : current_qs === 2
      ? setLanguage_id_question_2(event.target.value)
      : setLanguage_id_question_3(event.target.value);
    localStorage.setItem(
      `language_Id_question_${current_qs}`,
      event.target.value
    );
  }

  async function submit(e) {
    if (current_qs === 1) {
      set_q1_testCase_Current_output("");
    } else if (current_qs === 2) {
      set_q2_testCase_Current_output("");
    } else if (current_qs === 3) {
      set_q3_testCase_Current_output("");
    }
    e.preventDefault();
    if (customInputCheck && user_input === undefined) {
      alert("Please enter input");
    } else {
      if (current_qs === 1) {
        set_q1_run_output("Creating Submission ...\n");
      } else if (current_qs === 2) {
        set_q2_run_output("Creating Submission ...\n");
      } else if (current_qs === 3) {
        set_q3_run_output("Creating Submission ...\n");
      }
      let response,
        count = 0,
        keyArr = key(),
        selectedKey;
      do {
        response = await fetch("https://judge0-ce.p.rapidapi.com/submissions", {
          method: "POST",
          headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key": `${keyArr[count]}`, // Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
            "content-type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({
            source_code: inputT,
            stdin: user_input, //stateVarialble
            language_id: language_id,
          }),
        });
        selectedKey = keyArr[count];
        count += 1;
        console.log(response);
        console.log(parseInt(response.status) !== 201);
        console.log(typeof response.status);
      } while (parseInt(response.status) !== 201 && keyArr.length > count);
      console.log(response);
      if (response.status === 201) {
        if (current_qs === 1) {
          set_q1_run_output(q1_run_output + "Submission Created ...\n");
        } else if (current_qs === 2) {
          set_q2_run_output(q2_run_output + "Submission Created ...\n");
        } else if (current_qs === 3) {
          set_q3_run_output(q2_run_output + "Submission Created ...\n");
        }
        const jsonResponse = await response.json();
        let jsonGetSolution = {
          status: { description: "Queue" },
          stderr: null,
          compile_output: null,
        };
        let flag = false;
        while (flag !== true) {
          if (current_qs === 1) {
            set_q1_run_output(
              `Creating Submission ... \nSubmission Created ...\nChecking Submission Status\nstatus : ${jsonGetSolution.status.description}`
            );
          } else if (current_qs === 2) {
            set_q2_run_output(
              `Creating Submission ... \nSubmission Created ...\nChecking Submission Status\nstatus : ${jsonGetSolution.status.description}`
            );
          } else if (current_qs === 3) {
            set_q3_run_output(
              `Creating Submission ... \nSubmission Created ...\nChecking Submission Status\nstatus : ${jsonGetSolution.status.description}`
            );
          }
          if (jsonResponse.token) {
            let url = `https://judge0-ce.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=true`;

            const getSolution = await fetch(url, {
              method: "GET",
              headers: {
                "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
                "x-rapidapi-key": `${selectedKey}`, // Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
                "content-type": "application/json",
              },
            });

            jsonGetSolution = await getSolution.json();
            console.log(jsonGetSolution);
            if (
              jsonGetSolution.status.description === "Accepted" &&
              jsonGetSolution.stderr === null &&
              jsonGetSolution.compile_output === null
            ) {
              flag = true;
            } else if (
              jsonGetSolution.stderr !== null &&
              jsonGetSolution.status.description !== "Accepted"
            ) {
              flag = true;
            } else if (
              jsonGetSolution.stderr === null &&
              jsonGetSolution.status.description === "Compilation Error"
            ) {
              flag = true;
            } else if (
              jsonGetSolution.compile_output !== null &&
              jsonGetSolution.status.description === "Accepted"
            ) {
              flag = true;
            }
          }
        }
        console.log(jsonGetSolution);

        if (
          jsonGetSolution.stdout &&
          jsonGetSolution.stderr === null &&
          jsonGetSolution.compile_output === null
        ) {
          var b = new Buffer(jsonGetSolution.stdout, "base64");
          const output = b.toString();

          if (current_qs === 1) {
            set_q1_testCase_Current_output(
              `${output}\n\nExecution Time : ${jsonGetSolution.time} Secs\nMemory used : ${jsonGetSolution.memory} bytes`
            );
            set_q1_run_output(
              `${output}\n\nExxecution Time : ${jsonGetSolution.time} Secs\nMemory used : ${jsonGetSolution.memory} bytes`
            );
            localStorage.setItem(
              `question_1`,
              JSON.stringify({
                run_output: `${output}\n\nExecution Time : ${jsonGetSolution.time} Secs\nMemory used : ${jsonGetSolution.memory} bytes`,
                q1_testCase_1_output: q1_testCase_1_output,
                q1_testCase_2_output: q1_testCase_2_output,
                q1_testCase_3_output: q1_testCase_3_output,
              })
            );
          } else if (current_qs === 2) {
            set_q2_testCase_Current_output(
              `${output}\n\nExecution Time : ${jsonGetSolution.time} Secs\nMemory used : ${jsonGetSolution.memory} bytes`
            );
            set_q2_run_output(
              `${output}\n\nExecution Time : ${jsonGetSolution.time} Secs\nMemory used : ${jsonGetSolution.memory} bytes`
            );
            localStorage.setItem(
              `question_2`,
              JSON.stringify({
                run_output: `${output}\n\nExecution Time : ${jsonGetSolution.time} Secs\nMemory used : ${jsonGetSolution.memory} bytes`,
                q2_testCase_1_output: q2_testCase_1_output,
                q2_testCase_2_output: q2_testCase_2_output,
                q2_testCase_3_output: q2_testCase_3_output,
              })
            );
          } else if (current_qs === 3) {
            set_q3_testCase_Current_output(
              `${output}\n\nExecution Time : ${jsonGetSolution.time} Secs\nMemory used : ${jsonGetSolution.memory} bytes`
            );
            set_q3_run_output(
              `${output}\n\nExecution Time : ${jsonGetSolution.time} Secs\nMemory used : ${jsonGetSolution.memory} bytes`
            );
            localStorage.setItem(
              `question_3`,
              JSON.stringify({
                run_output: `${output}\n\nExecution Time : ${jsonGetSolution.time} Secs\nMemory used : ${jsonGetSolution.memory} bytes`,
                q3_testCase_1_output: q3_testCase_1_output,
                q3_testCase_2_output: q3_testCase_2_output,
                q3_testCase_3_output: q3_testCase_3_output,
              })
            );
          }
        } else if (jsonGetSolution.stderr) {
          var b = new Buffer(jsonGetSolution.stderr, "base64");
          const error = b.toString();
          console.log(error);
          if (current_qs === 1) {
            set_q1_testCase_Current_output(`Error :${error}`);
            set_q1_run_output(`Error :${error}`);
            localStorage.setItem(
              `question_1`,
              JSON.stringify({
                run_output: `Error :${error}`,
                q1_testCase_1_output: q1_testCase_1_output,
                q1_testCase_2_output: q1_testCase_2_output,
                q1_testCase_3_output: q1_testCase_3_output,
              })
            );
          } else if (current_qs === 2) {
            set_q2_testCase_Current_output(`\n Error :${error}`);
            set_q2_run_output(`\n Error :${error}`);
            localStorage.setItem(
              `question_2`,
              JSON.stringify({
                run_output: `\n Error :${error}`,
                q2_testCase_1_output: q2_testCase_1_output,
                q2_testCase_2_output: q2_testCase_2_output,
                q2_testCase_3_output: q2_testCase_3_output,
              })
            );
          } else if (current_qs === 3) {
            set_q3_testCase_Current_output(`\n Error :${error}`);
            set_q3_run_output(`\n Error :${error}`);
            localStorage.setItem(
              `question_3`,
              JSON.stringify({
                run_output: `\n Error :${error}`,
                q3_testCase_1_output: q3_testCase_1_output,
                q3_testCase_2_output: q3_testCase_2_output,
                q3_testCase_3_output: q3_testCase_3_output,
              })
            );
          }
        } else {
          var b = new Buffer(jsonGetSolution.compile_output, "base64");
          const compilation_error = b.toString();
          if (current_qs === 1) {
            set_q1_testCase_Current_output(`\n Error :${compilation_error}`);
            set_q1_run_output(`\n Error :${compilation_error}`);
            localStorage.setItem(
              `question_1`,
              JSON.stringify({
                run_output: `\n Error :${compilation_error}`,
                q1_testCase_1_output: q1_testCase_1_output,
                q1_testCase_2_output: q1_testCase_2_output,
                q1_testCase_3_output: q1_testCase_3_output,
              })
            );
          } else if (current_qs === 2) {
            set_q2_testCase_Current_output(`\n Error :${compilation_error}`);
            set_q2_run_output(`\n Error :${compilation_error}`);
            localStorage.setItem(
              `question_2`,
              JSON.stringify({
                run_output: `\n Error :${compilation_error}`,
                q2_testCase_1_output: q2_testCase_1_output,
                q2_testCase_2_output: q2_testCase_2_output,
                q2_testCase_3_output: q2_testCase_3_output,
              })
            );
          } else if (current_qs === 3) {
            set_q3_testCase_Current_output(`\n Error :${compilation_error}`);
            set_q3_run_output(`\n Error :${compilation_error}`);
            localStorage.setItem(
              `question_3`,
              JSON.stringify({
                run_output: `\n Error :${compilation_error}`,
                q3_testCase_1_output: q3_testCase_1_output,
                q3_testCase_2_output: q3_testCase_2_output,
                q3_testCase_3_output: q3_testCase_3_output,
              })
            );
          }
        }
      } else {
        alert("Contact Administrator");
      }
    }
  }

  async function submitCode(e) {
    if (current_qs === 1) {
      set_submitCode_qs1(true);
      setIsSubmitCode_qs1(true);
      set_q1_testCase_1_output_error();
      set_q1_testCase_2_output_error();
      set_q1_testCase_3_output_error();
    } else if (current_qs === 2) {
      set_submitCode_qs2(true);
      setIsSubmitCode_qs2(true);
      set_q2_testCase_1_output_error();
      set_q2_testCase_2_output_error();
      set_q2_testCase_3_output_error();
    } else if (current_qs === 3) {
      set_submitCode_qs3(true);
      setIsSubmitCode_qs3(true);
      set_q3_testCase_1_output_error();
      set_q3_testCase_2_output_error();
      set_q3_testCase_3_output_error();
    }
    e.preventDefault();
    if (current_qs === 1) {
      set_q1_testCase_Current_output("Creating Submission ...\n");
    } else if (current_qs === 2) {
      set_q2_testCase_Current_output("Creating Submission ...\n");
    } else if (current_qs === 3) {
      set_q3_testCase_Current_output("Creating Submission ...\n");
    }
    let count = 0;
    let keyArr = key(),
      selectedKey;
    let jsonResponse;
    do {
      selectedKey = keyArr[count];
      const response = await fetch(
        "https://judge0-ce.p.rapidapi.com/submissions/batch",
        {
          method: "POST",
          headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key": `${selectedKey}`, // Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
            "content-type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({
            submissions: [
              {
                source_code: inputT,
                stdin:
                  current_qs === 1
                    ? q1_testCase_1_input
                    : current_qs === 2
                    ? q2_testCase_1_input
                    : q3_testCase_1_input, //stateVarialble
                language_id: language_id,
                expected_output:
                  current_qs === 1
                    ? q1_testCase_1_expected_output
                    : current_qs === 2
                    ? q2_testCase_1_expected_output
                    : q3_testCase_1_expected_output, //stateVarialble
              },
              {
                source_code: inputT,
                stdin:
                  current_qs === 1
                    ? q1_testCase_2_input
                    : current_qs === 2
                    ? q2_testCase_2_input
                    : q3_testCase_2_input, //stateVarialble
                language_id: language_id,
                expected_output:
                  current_qs === 1
                    ? q1_testCase_2_expected_output
                    : current_qs === 2
                    ? q2_testCase_2_expected_output
                    : q3_testCase_2_expected_output, //stateVarialble
              },
              {
                source_code: inputT,
                stdin:
                  current_qs === 1
                    ? q1_testCase_3_input
                    : current_qs === 2
                    ? q2_testCase_3_input
                    : q3_testCase_3_input, //stateVarialble
                language_id: language_id,
                expected_output:
                  current_qs === 1
                    ? q1_testCase_3_expected_output
                    : current_qs === 2
                    ? q2_testCase_3_expected_output
                    : q3_testCase_3_expected_output, //stateVarialble
              },
            ],
          }),
        }
      );
      jsonResponse = await response.json();
      console.log(jsonResponse);
      console.log(
        jsonResponse.message ==
          "You have exceeded the DAILY quota for Batched Submissions on your current plan, BASIC. Upgrade your plan at https://rapidapi.com/judge0-official/api/judge0-ce"
      );
      count += 1;
    } while (
      jsonResponse.message !== undefined &&
      jsonResponse.message ===
        "You have exceeded the DAILY quota for Batched Submissions on your current plan, BASIC. Upgrade your plan at https://rapidapi.com/judge0-official/api/judge0-ce"
    );
    if (current_qs === 1) {
      set_q1_testCase_Current_output(
        q1_testCase_Current_output + "Submission Created ...\n"
      );
    } else if (current_qs === 2) {
      set_q2_testCase_Current_output(
        q2_testCase_Current_output + "Submission Created ...\n"
      );
    } else if (current_qs === 3) {
      set_q3_testCase_Current_output(
        q3_testCase_Current_output + "Submission Created ...\n"
      );
    }
    let jsonGetSolution = {
      submissions: [
        {
          status: { description: "In Queue" },
          stderr: null,
          compile_output: null,
        },
        {
          status: { description: "In Queue" },
          stderr: null,
          compile_output: null,
        },
        {
          status: { description: "In Queue" },
          stderr: null,
          compile_output: null,
        },
      ],
    };
    let flag = false;
    while (flag !== true) {
      if (current_qs === 1) {
        set_q1_testCase_Current_output(
          `Creating Submission ... \nSubmission Created ...\nChecking Submission Status\nstatus : ${jsonGetSolution.submissions[0].status.description}`
        );
      } else if (current_qs === 2) {
        set_q2_testCase_Current_output(
          `Creating Submisxxxxxxxxxxxxxxxxxxxxxxsion ... \nSubmission Created ...\nChecking Submission Status\nstatus : ${jsonGetSolution.submissions[0].status.description}`
        );
      } else if (current_qs === 3) {
        set_q3_testCase_Current_output(
          `Creating Submission ... \nSubmission Created ...\nChecking Submission Status\nstatus : ${jsonGetSolution.submissions[0].status.description}`
        );
      }
      if (
        jsonResponse[0].token &&
        jsonResponse[1].token &&
        jsonResponse[2].token
      ) {
        let url = `https://judge0-ce.p.rapidapi.com/submissions/batch?tokens=${jsonResponse[0].token},${jsonResponse[1].token},${jsonResponse[2].token}&base64_encoded=true&wait=true`;
        const getSolution = await fetch(url, {
          method: "GET",
          headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key": `${selectedKey}`, // Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
            "content-type": "application/json",
          },
        });
        jsonGetSolution = await getSolution.json();
        console.log(jsonGetSolution.submissions[1].status.description);
        console.log(jsonGetSolution);
        if (
          (jsonGetSolution.submissions[0].status.description === "Accepted" ||
            jsonGetSolution.submissions[0].status.description ===
              "Wrong Answer") &&
          jsonGetSolution.submissions[0].stderr === null &&
          jsonGetSolution.submissions[0].compile_output === null &&
          (jsonGetSolution.submissions[1].status.description === "Accepted" ||
            jsonGetSolution.submissions[1].status.description ===
              "Wrong Answer") &&
          jsonGetSolution.submissions[1].stderr === null &&
          jsonGetSolution.submissions[1].compile_output === null &&
          (jsonGetSolution.submissions[2].status.description === "Accepted" ||
            jsonGetSolution.submissions[2].status.description ===
              "Wrong Answer") &&
          jsonGetSolution.submissions[2].stderr === null &&
          jsonGetSolution.submissions[2].compile_output === null
        ) {
          flag = true;
        } else if (
          jsonGetSolution.submissions[1].status.description !== "In Queue" &&
          jsonGetSolution.submissions[1].status.description !== "Processing" &&
          jsonGetSolution.submissions[2].status.description !== "In Queue" &&
          jsonGetSolution.submissions[2].status.description !== "Processing" &&
          jsonGetSolution.submissions[0].status.description !== "In Queue" &&
          jsonGetSolution.submissions[0].status.description !== "Processing" &&
          (jsonGetSolution.submissions[1].stderr !== null ||
            jsonGetSolution.submissions[2].stderr !== null ||
            jsonGetSolution.submissions[0].stderr !== null)
        ) {
          flag = true;
        } else if (
          ((jsonGetSolution.submissions[1].status.description ===
            "Compilation Error" &&
            jsonGetSolution.submissions[1].stderr === null) ||
            (jsonGetSolution.submissions[0].status.description ===
              "Compilation Error" &&
              jsonGetSolution.submissions[0].stderr === null) ||
            (jsonGetSolution.submissions[2].status.description ===
              "Compilation Error" &&
              jsonGetSolution.submissions[2].stderr === null)) &&
          jsonGetSolution.submissions[1].status.description !== "In Queue" &&
          jsonGetSolution.submissions[1].status.description !== "Processing" &&
          jsonGetSolution.submissions[2].status.description !== "In Queue" &&
          jsonGetSolution.submissions[2].status.description !== "Processing" &&
          jsonGetSolution.submissions[0].status.description !== "In Queue" &&
          jsonGetSolution.submissions[0].status.description !== "Processing"
        ) {
          flag = true;
        } else if (
          (jsonGetSolution.submissions[0].status.description === "Accepted" ||
            jsonGetSolution.submissions[0].status.description ===
              "Wrong Answer") &&
          jsonGetSolution.submissions[0].stderr === null &&
          jsonGetSolution.submissions[0].compile_output !== null &&
          (jsonGetSolution.submissions[1].status.description === "Accepted" ||
            jsonGetSolution.submissions[1].status.description ===
              "Wrong Answer") &&
          jsonGetSolution.submissions[1].stderr === null &&
          jsonGetSolution.submissions[1].compile_output !== null &&
          (jsonGetSolution.submissions[2].status.description === "Accepted" ||
            jsonGetSolution.submissions[2].status.description ===
              "Wrong Answer") &&
          jsonGetSolution.submissions[2].stderr === null &&
          jsonGetSolution.submissions[2].compile_output !== null
        ) {
          flag = true;
        }
      } else {
        alert("token dont exists");
        break;
      }
    }
    if (flag) {
      let t1Output, t2Output, t3Output;
      for (var y = 0; y < jsonGetSolution.submissions.length; y++) {
        if (
          jsonGetSolution.submissions[y].stdout &&
          jsonGetSolution.submissions[y].stderr === null &&
          jsonGetSolution.submissions[y].compile_output === null
        ) {
          var b = new Buffer(jsonGetSolution.submissions[y].stdout, "base64");
          const output = b.toString();

          if (jsonGetSolution.submissions[y].status.id === 3) {
            console.log(output);
            if (current_qs === 1) {
              if (y === 0) {
                set_q1_testCase_1_output(
                  `${output}\nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`
                );
                t1Output = `${output}\nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`;

                set_q1_testCase_1_output_error(false);
                set_q1_testCase_Current_output(
                  `${output}\nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`
                );
              } else if (y === 1) {
                set_q1_testCase_2_output_error(false);
                set_q1_testCase_2_output(
                  `${output}\nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`
                );
                t2Output = `${output}\nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`;
              } else if (y === 2) {
                set_q1_testCase_3_output_error(false);
                set_q1_testCase_3_output(
                  `${output}\nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`
                );
                t3Output = `${output}\nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`;
              }
            } else if (current_qs == 2) {
              if (y === 0) {
                set_q2_testCase_1_output(
                  `${output}\nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`
                );
                t1Output = `${output}\nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`;

                set_q2_testCase_1_output_error(false);
                set_q2_testCase_Current_output(
                  `${output}\nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`
                );
              } else if (y === 1) {
                set_q2_testCase_2_output_error(false);
                set_q2_testCase_2_output(
                  `${output}\nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`
                );
                t2Output = `${output}\nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`;
              } else if (y === 2) {
                set_q2_testCase_3_output_error(false);
                set_q2_testCase_3_output(
                  `${output}\nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`
                );
                t3Output = `${output}\nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`;
              }
            } else if (current_qs == 3) {
              if (y === 0) {
                set_q3_testCase_1_output(
                  `${output}\nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`
                );
                t1Output = `${output}\nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`;

                set_q3_testCase_1_output_error(false);
                set_q3_testCase_Current_output(
                  `${output}\nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`
                );
              } else if (y === 1) {
                set_q3_testCase_2_output_error(false);
                set_q3_testCase_2_output(
                  `${output}\nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`
                );
                t2Output = `${output}\nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`;
              } else if (y === 2) {
                set_q3_testCase_3_output_error(false);
                set_q3_testCase_3_output(
                  `${output}\nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`
                );
                t3Output = `${output}\nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`;
              }
            }
          } else if (jsonGetSolution.submissions[y].status.id === 4) {
            if (current_qs === 1) {
              if (y === 0) {
                set_q1_testCase_1_output(
                  `Wrong Answer\nYour Output:\n${output}\nExpected Output:\n${q1_testCase_1_expected_output}
              \nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`
                );
                t1Output = `Wrong Answer\nYour Output:\n${output}\nExpected Output:\n${q1_testCase_1_expected_output}
            \nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`;

                set_q1_testCase_1_output_error(true);
                set_q1_testCase_Current_output(
                  `Wrong Answer\nYour Output:\n${output}\nExpected Output:\n${q1_testCase_1_expected_output}
              \nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`
                );
              } else if (y === 1) {
                set_q1_testCase_2_output_error(true);
                set_q1_testCase_2_output(
                  `Wrong Answer\nYour Output:\n${output}\nExpected Output:\n${q1_testCase_2_expected_output}
              \nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`
                );
                t2Output = `Wrong Answer\nYour Output:\n${output}\nExpected Output:\n${q1_testCase_2_expected_output}
            \nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`;
              } else if (y === 2) {
                set_q1_testCase_3_output_error(true);
                set_q1_testCase_3_output(
                  `Wrong Answer\nYour Output:\n${output}\nExpected Output:\n${q1_testCase_3_expected_output}
              \nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`
                );
                t3Output = `Wrong Answer\nYour Output:\n${output}\nExpected Output:\n${q1_testCase_3_expected_output}
            \nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`;
              }
            } else if (current_qs == 2) {
              if (y === 0) {
                set_q2_testCase_1_output_error(true);
                set_q2_testCase_1_output(
                  `Wrong Answer\nYour Output:\n${output}\nExpected Output:\n${q2_testCase_1_expected_output}
              \nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`
                );
                t1Output = `Wrong Answer\nYour Output:\n${output}\nExpected Output:\n${q2_testCase_1_expected_output}
            \nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`;
                set_q2_testCase_Current_output(
                  `Wrong Answer\nYour Output:\n${output}\nExpected Output:\n${q2_testCase_1_expected_output}
              \nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`
                );
              } else if (y === 1) {
                set_q2_testCase_2_output_error(false);
                set_q2_testCase_2_output(
                  `Wrong Answer\nYour Output:\n${output}\nExpected Output:\n${q2_testCase_2_expected_output}
              \nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`
                );
                t2Output = `Wrong Answer\nYour Output:\n${output}\nExpected Output:\n${q2_testCase_2_expected_output}
            \nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`;
              } else if (y === 2) {
                set_q2_testCase_3_output_error(true);
                set_q2_testCase_3_output(
                  `Wrong Answer\nYour Output:\n${output}\nExpected Output:\n${q2_testCase_3_expected_output}
              \nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`
                );
                t3Output = `Wrong Answer\nYour Output:\n${output}\nExpected Output:\n${q2_testCase_2_expected_output}
            \nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`;
              }
            } else if (current_qs == 3) {
              if (y === 0) {
                set_q3_testCase_1_output(
                  `Wrong Answer\nYour Output:\n${output}\nExpected Output:\n${q3_testCase_1_expected_output}
              \nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`
                );
                t1Output = `Wrong Answer\nYour Output:\n${output}\nExpected Output:\n${q3_testCase_1_expected_output}
            \nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`;

                set_q3_testCase_1_output_error(true);
                set_q3_testCase_Current_output(
                  `Wrong Answer\nYour Output:\n${output}\nExpected Output:\n${q3_testCase_1_expected_output}
              \nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`
                );
              } else if (y === 1) {
                set_q3_testCase_2_output_error(true);
                set_q3_testCase_2_output(
                  `Wrong Answer\nYour Output:\n${output}\nExpected Output:\n${q3_testCase_2_expected_output}
              \nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`
                );
                t2Output = `Wrong Answer\nYour Output:\n${output}\nExpected Output:\n${q3_testCase_2_expected_output}
            \nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`;
              } else if (y === 2) {
                set_q3_testCase_3_output_error(true);
                set_q3_testCase_3_output(
                  `Wrong Answer\nYour Output:\n${output}\nExpected Output:\n${q3_testCase_3_expected_output}
              \nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`
                );
                t3Output = `Wrong Answer\nYour Output:\n${output}\nExpected Output:\n${q3_testCase_3_expected_output}
            \nExecution Time : ${jsonGetSolution.submissions[y].time} Secs\nMemory used : ${jsonGetSolution.submissions[y].memory} bytes\n`;
              }
            }
          }
        } else if (jsonGetSolution.submissions[y].stderr) {
          var b = new Buffer(jsonGetSolution.submissions[y].stderr, "base64");
          const error = b.toString();
          if (current_qs === 1) {
            if (y === 0) {
              set_q1_testCase_1_output(`Error :${error}`);
              set_q1_testCase_Current_output(`Error :${error}`);
              set_q1_testCase_1_output_error(true);
              t1Output = `Error :${error}`;
            } else if (y === 1) {
              set_q1_testCase_2_output(`Error :${error}`);
              t2Output = `Error :${error}`;
              set_q1_testCase_2_output_error(true);
            } else if (y == 2) {
              set_q1_testCase_3_output(`Error :${error}`);
              t3Output = `Error :${error}`;
              set_q1_testCase_3_output_error(true);
            }
          } else if (current_qs === 2) {
            if (y === 0) {
              set_q2_testCase_1_output(`EEEEEEEEError :${error}`);
              set_q2_testCase_Current_output(`EEEEEEError :${error}`);
              set_q2_testCase_1_output_error(true);
              t1Output = `EEEEEError :${error}`;
            } else if (y === 1) {
              set_q2_testCase_2_output(`EEEEEEEEError :${error}`);
              t2Output = `EEEEEEEEEError :${error}`;
              set_q2_testCase_2_output_error(true);
            } else if (y == 2) {
              set_q2_testCase_3_output(`EEEEEError :${error}`);
              t3Output = `EEEEEError :${error}`;
              set_q2_testCase_3_output_error(true);
            }
          } else if (current_qs === 3) {
            if (y === 0) {
              set_q3_testCase_1_output(`Error :${error}`);
              set_q3_testCase_Current_output(`Error :${error}`);
              set_q3_testCase_1_output_error(true);
              t1Output = `Error :${error}`;
            } else if (y === 1) {
              set_q3_testCase_2_output(`Error :${error}`);
              t2Output = `Error :${error}`;
              set_q3_testCase_2_output_error(true);
            } else if (y == 2) {
              set_q3_testCase_3_output(`Error :${error}`);
              t3Output = `Error :${error}`;
              set_q3_testCase_3_output_error(true);
            }
          }
        } else {
          var b = new Buffer(
            jsonGetSolution.submissions[y].compile_output,
            "base64"
          );
          const compilation_error = b.toString();
          if (current_qs === 1) {
            if (y === 0) {
              set_q1_testCase_1_output(`EYyyyyrror :${compilation_error}`);
              set_q1_testCase_1_output_error(true);
              set_q1_testCase_Current_output(
                `yyyyyyError :${compilation_error}`
              );
              t1Output = `Eyyyyyrror :${compilation_error}`;
            } else if (y === 1) {
              set_q1_testCase_2_output_error(true);
              set_q1_testCase_2_output(`EEEEEEError :${compilation_error}`);
              t2Output = `EEEEEEError :${compilation_error}`;
            } else if (y === 2) {
              set_q1_testCase_3_output_error(true);
              set_q1_testCase_3_output(`Error :${compilation_error}`);
              t3Output = `Error :${compilation_error}`;
            }
          } else if (current_qs === 2) {
            if (y === 0) {
              set_q2_testCase_1_output(`Error :${compilation_error}`);
              set_q2_testCase_1_output_error(true);
              set_q2_testCase_Current_output(`Error :${compilation_error}`);
              t1Output = `Error :${compilation_error}`;
            } else if (y === 1) {
              set_q2_testCase_2_output_error(true);
              set_q2_testCase_2_output(`Error :${compilation_error}`);
              t2Output = `Error :${compilation_error}`;
            } else if (y === 2) {
              set_q2_testCase_3_output_error(true);
              set_q2_testCase_3_output(`Error :${compilation_error}`);
              t3Output = `Error :${compilation_error}`;
            }
          } else if (current_qs === 3) {
            if (y === 0) {
              set_q3_testCase_1_output(`Error :${compilation_error}`);
              set_q3_testCase_1_output_error(true);
              set_q3_testCase_Current_output(`Error :${compilation_error}`);
              t1Output = `Error :${compilation_error}`;
            } else if (y === 1) {
              set_q3_testCase_2_output_error(true);
              set_q3_testCase_2_output(`Error :${compilation_error}`);
              t2Output = `Error :${compilation_error}`;
            } else if (y === 2) {
              set_q3_testCase_3_output_error(true);
              set_q3_testCase_3_output(`Error :${compilation_error}`);
              t3Output = `Error :${compilation_error}`;
            }
          }
        }
      }
      if (current_qs === 1) {
        localStorage.setItem(
          "question_1",
          JSON.stringify({
            run_output: q1_run_output,
            q1_testCase_1_output: t1Output,
            q1_testCase_2_output: t2Output,
            q1_testCase_3_output: t3Output,
          })
        );
      } else if (current_qs === 2) {
        localStorage.setItem(
          "question_2",
          JSON.stringify({
            run_output: q2_run_output,
            q2_testCase_1_output: t1Output,
            q2_testCase_2_output: t2Output,
            q2_testCase_3_output: t3Output,
          })
        );
      } else if (current_qs === 3) {
        localStorage.setItem(
          "question_3",
          JSON.stringify({
            run_output: q3_run_output,
            q3_testCase_1_output: t1Output,
            q3_testCase_2_output: t2Output,
            q3_testCase_3_output: t3Output,
          })
        );
      }
    } else {
      alert("Contact Administrator");
    }
  }

  class CustomTextarea {
    constructor(element) {
      this.element = element;
      this.textarea = this.element.querySelector(".textarea");
      this.numbers = this.element.querySelector(".linenumbers");
      this.numberOfNumbers = 1;
      this.addMoreNumbers();
      this.initEventListeners();
    }

    addMoreNumbers() {
      let html = "";

      for (let i = this.numberOfNumbers; i < this.numberOfNumbers + 100; i++) {
        html += `<div class='number'>${i}</div>`;
      }

      this.numberOfNumbers += 100;
      this.numbers.innerHTML += html;
    }

    initEventListeners() {
      this.textarea.addEventListener("scroll", () => {
        this.numbers.style.transform = `translateY(-${this.textarea.scrollTop}px)`;

        if (
          Math.abs(
            this.numbers.offsetHeight -
              this.textarea.offsetHeight -
              this.textarea.scrollTop
          ) < 100
        ) {
          this.addMoreNumbers();
        }
      });
    }
  }

  $(document).ready(function () {
    "use strict";

    const textarea = new CustomTextarea(
      document.querySelector(".custom-textarea")
    );
    if (submitCode_qs1) {
      if (
        !q1_testCase_1_output_error &&
        !q1_testCase_2_output_error &&
        !q1_testCase_3_output_error
      ) {
        document.getElementById(
          "uncontrolled-tab-example-tab-Q1"
        ).style.backgroundColor = "#10b65c"; //green
        document.getElementById("uncontrolled-tab-example-tab-Q1").style.color =
          "white";
      } else {
        document.getElementById(
          "uncontrolled-tab-example-tab-Q1"
        ).style.backgroundColor = "#dc3545"; //red
        document.getElementById("uncontrolled-tab-example-tab-Q1").style.color =
          "white";
      }
    }
    if (submitCode_qs2) {
      if (
        !q2_testCase_1_output_error &&
        !q2_testCase_2_output_error &&
        !q2_testCase_3_output_error
      ) {
        document.getElementById(
          "uncontrolled-tab-example-tab-Q2"
        ).style.backgroundColor = "#10b65c";
        document.getElementById("uncontrolled-tab-example-tab-Q2").style.color =
          "white";
      } else {
        document.getElementById(
          "uncontrolled-tab-example-tab-Q2"
        ).style.backgroundColor = "#dc3545";
        document.getElementById("uncontrolled-tab-example-tab-Q2").style.color =
          "white";
      }
    }
    if (submitCode_qs3) {
      if (
        !q3_testCase_1_output_error &&
        !q3_testCase_2_output_error &&
        !q3_testCase_3_output_error
      ) {
        document.getElementById(
          "uncontrolled-tab-example-tab-Q3"
        ).style.backgroundColor = "#10b65c";
        document.getElementById("uncontrolled-tab-example-tab-Q3").style.color =
          "white";
      } else {
        document.getElementById(
          "uncontrolled-tab-example-tab-Q3"
        ).style.backgroundColor = "#dc3545";
        document.getElementById("uncontrolled-tab-example-tab-Q3").style.color =
          "white";
      }
    }
  });

  return (
    <>
      <Row>
        <Col md={6}>
          <Row>
            <div className="TestHeaderComp" style={{ paddingBottom: "7px" }}>
              <TestHeaderComp
                timer={3000}
                start={true}
                reset={false}
                timeKey="Time"
                noTotal={true}
                header="Coding"
                nextpage={"result"}
              ></TestHeaderComp>
            </div>
          </Row>
          <Row>
            <div
              className="basicRec"
              style={{
                marginTop: "5px",
                height: "550px",
                backgroundColor: "#F7F7F7",
              }}
            >
              <Tabs
                defaultActiveKey="Q1"
                inkBarStyle={{ background: "blue" }}
                id="uncontrolled-tab-example"
                style={{ marginBottom: "0px !important" }}
                className="mb-3"
                onClick={(e) => {
                  let qsNo = e.target.textContent.split("Q")[1];
                  set_current_qs(parseInt(qsNo));
                  if (parseInt(qsNo) === 1) {
                    set_question_current(question_1);
                    setInput(inputT_question_1);
                    document.getElementById("codeEditor").value =
                      inputT_question_1;
                    document.getElementsByClassName("customInput")[0].value =
                      user_input_question_1;
                    setUser_input(user_input_question_1);
                    setLanguage_id(language_id_question_1);
                    if (
                      document.getElementsByClassName("codeOutput")[0] !==
                      undefined
                    ) {
                      if (isSubmitCode_qs1) {
                        document.getElementsByClassName("codeOutput")[0].value =
                          q1_testCase_1_output;
                        set_q1_testCase_Current_output(q1_testCase_1_output);
                      } else {
                        if (q1_run_output !== undefined) {
                          document.getElementsByClassName(
                            "codeOutput"
                          )[0].value = q1_run_output;
                          set_q1_testCase_Current_output(q1_run_output);
                        } else {
                          document.getElementsByClassName(
                            "codeOutput"
                          )[0].value = "";
                          set_q1_testCase_Current_output();
                        }
                      }
                    }
                  } else if (parseInt(qsNo) === 2) {
                    set_question_current(question_2);
                    setInput(inputT_question_2);
                    document.getElementById("codeEditor").value =
                      inputT_question_2;
                    document.getElementsByClassName("customInput")[0].value =
                      user_input_question_2;
                    setUser_input(user_input_question_2);
                    setLanguage_id(language_id_question_2);

                    console.log(
                      document.getElementsByClassName("codeOutput")[0]
                    );
                    if (
                      document.getElementsByClassName("codeOutput")[0] !==
                      undefined
                    ) {
                      if (isSubmitCode_qs2) {
                        document.getElementsByClassName("codeOutput")[0].value =
                          q2_testCase_1_output;
                        set_q2_testCase_Current_output(q2_testCase_1_output);
                      } else {
                        if (q2_run_output !== undefined) {
                          document.getElementsByClassName(
                            "codeOutput"
                          )[0].value = q2_run_output;
                          set_q2_testCase_Current_output(q2_run_output);
                        } else {
                          document.getElementsByClassName(
                            "codeOutput"
                          )[0].value = "";
                          set_q2_testCase_Current_output();
                        }
                      }
                    }
                  } else if (parseInt(qsNo) === 3) {
                    set_question_current(question_3);
                    setInput(inputT_question_3);
                    document.getElementById("codeEditor").value =
                      inputT_question_3;
                    document.getElementsByClassName("customInput")[0].value =
                      user_input_question_3;
                    setUser_input(user_input_question_3);
                    setLanguage_id(language_id_question_3);

                    if (
                      document.getElementsByClassName("codeOutput")[0] !==
                      undefined
                    ) {
                      if (isSubmitCode_qs3) {
                        document.getElementsByClassName("codeOutput")[0].value =
                          q3_testCase_1_output;
                        set_q3_testCase_Current_output(q3_testCase_1_output);
                      } else {
                        if (q3_run_output !== undefined) {
                          document.getElementsByClassName(
                            "codeOutput"
                          )[0].value = q3_run_output;
                          set_q3_testCase_Current_output(q3_run_output);
                        } else {
                          document.getElementsByClassName(
                            "codeOutput"
                          )[0].value = "";
                          set_q3_testCase_Current_output();
                        }
                      }
                    }
                  }
                }}
              >
                <Tab
                  eventKey="Q1"
                  style={{ backgroundColor: "black" }}
                  title="Q1"
                >
                  <CodingQsComp qs={question_current}></CodingQsComp>
                </Tab>
                <Tab eventKey="Q2" title="Q2">
                  <CodingQsComp qs={question_current}></CodingQsComp>
                </Tab>
                <Tab eventKey="Q3" title="Q3">
                  <CodingQsComp qs={question_current}></CodingQsComp>
                </Tab>
              </Tabs>
            </div>
          </Row>
        </Col>

        <Col md={6}>
          <div style={{ marginLeft: "45px" }}>
            <Row
              style={{
                paddingBottom: "5px",
                paddingLeft: "40%",
                height: "40px",
                marginBottom: "10px",
              }}
            >
              <Col>
                <button
                  type="button"
                  style={{ color: "white", width: "fit-content" }}
                  className="btn scTest"
                >
                  Next Section
                </button>
              </Col>
              <Col>
                <button
                  type="button"
                  className="btn btn-success"
                  style={{
                    backgroundColor: "#081466",
                    width: "fit-content",
                    borderRadius: "10px",
                    color: "white",
                    padding: "7px 10px",
                  }}
                >
                  Finish Test
                </button>
              </Col>
            </Row>
            <Row style={{ marginTop: "5px" }}>
              <div
                className="basicRec"
                style={{ backgroundColor: "#F7F7F7", padding: "5px 5px" }}
              >
                <div class="custom-textarea">
                  <textarea
                    id="codeEditor"
                    class="textarea"
                    spellCheck={false}
                    defaultValue={inputT}
                    onChange={(e) => input(e)}
                  ></textarea>
                  <div class="linenumbers"></div>
                </div>
              </div>
            </Row>

            <Row
              style={{ paddingTop: "5px", paddingBottom: "0", height: "42px" }}
            >
              <Col lg={3}>
                <select
                  style={{ width: "90px" }}
                  value={language_id}
                  onChange={language}
                  id="tags"
                  className="form-control form-inline mb-2 language"
                >
                  <option value="54">C++</option>
                  <option value="50">C</option>
                  <option value="62">Java</option>
                  <option value="71">Python</option>
                </select>
              </Col>
              <Col lg={3}>
                <div
                  class="custom-control custom-checkbox"
                  style={{ paddingTop: "8px" }}
                >
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    style={{ marginRight: "4px" }}
                    onClick={(e) => {
                      console.log(e);
                      setCustomInputCheck(e.target.checked);
                    }}
                    id="defaultUnchecked"
                  />
                  <label class="custom-control-label" for="defaultUnchecked">
                    Custom Input
                  </label>
                </div>
              </Col>
              <Col lg={3}>
                <button
                  type="submit"
                  className="btn scTest ml-2 mr-2 "
                  style={{ color: "white", width: "fit-content" }}
                  onClick={(e) => {
                    current_qs === 1
                      ? setIsSubmitCode_qs1()
                      : current_qs === 2
                      ? setIsSubmitCode_qs2()
                      : setIsSubmitCode_qs3();
                    submit(e);
                  }}
                >
                  <i className="fas fa-cog fa-fw"></i> Run
                </button>
              </Col>
              <Col lg={3}>
                <button
                  type="submit"
                  className="btn scTest ml-2 mr-2 "
                  style={{ color: "white", width: "fit-content" }}
                  onClick={(e) => {
                    if (current_qs === 1) {
                      set_submitCode_qs1(true);
                    } else if (current_qs === 2) {
                      set_submitCode_qs2(true);
                    } else if (current_qs === 3) {
                      set_submitCode_qs3(true);
                    }
                    submitCode(e);
                  }}
                >
                  <i className="fas fa-cog fa-fw"></i> Submit
                </button>
              </Col>
            </Row>
            <Row>
              <div
                className="basicRec"
                style={{
                  marginTop: "5px",
                  height: "190px",
                  backgroundColor: "#F7F7F7",
                }}
              >
                <Tabs
                  defaultActiveKey="customInput"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="customInput" title="custom input">
                    <textarea
                      id="style-4"
                      className="scrollbar customInput"
                      spellCheck={false}
                      defaultValue={user_input}
                      onChange={userInput}
                    ></textarea>
                  </Tab>
                  <Tab eventKey="Result" title="result">
                    <Row>
                      {(current_qs === 1
                        ? submitCode_qs1
                        : current_qs === 2
                        ? submitCode_qs2
                        : submitCode_qs3) && (
                        <Col md={3}>
                          <div>
                            <Row className="" style={{ height: "20%" }}>
                              {(
                                current_qs === 1
                                  ? q1_testCase_1_output_error !== undefined
                                  : current_qs === 2
                                  ? q2_testCase_1_output_error !== undefined
                                  : q3_testCase_1_output_error !== undefined
                              ) ? (
                                <Col style={{ paddingLeft: "0%" }}>
                                  <button
                                    className={
                                      current_qs === 1
                                        ? !q1_testCase_1_output_error
                                          ? "btn scTest"
                                          : "btn btn-danger"
                                        : current_qs === 2
                                        ? !q2_testCase_1_output_error
                                          ? "btn scTest"
                                          : "btn btn-danger"
                                        : !q3_testCase_1_output_error
                                        ? "btn scTest"
                                        : "btn btn-danger"
                                    }
                                    onClick={(e) => {
                                      if (current_qs === 1) {
                                        document.getElementsByClassName(
                                          "codeOutput"
                                        )[0].value = q1_testCase_1_output;
                                        set_q1_testCase_Current_output(
                                          q1_testCase_1_output
                                        );
                                      } else if (current_qs === 2) {
                                        document.getElementsByClassName(
                                          "codeOutput"
                                        )[0].value = q2_testCase_1_output;
                                        set_q2_testCase_Current_output(
                                          q2_testCase_1_output
                                        );
                                      } else if (current_qs === 3) {
                                        document.getElementsByClassName(
                                          "codeOutput"
                                        )[0].value = q3_testCase_1_output;
                                        set_q3_testCase_Current_output(
                                          q3_testCase_1_output
                                        );
                                      }
                                    }}
                                    style={{
                                      marginBottom: "1px",
                                      color: "white",
                                      borderRadius: "0",
                                      width: "100%",
                                    }}
                                  >
                                    Test Case 1
                                  </button>
                                </Col>
                              ) : (
                                <Col style={{ paddingLeft: "0%" }}>
                                  <button
                                    className="btn btn-secondary"
                                    onClick={(e) => {
                                      if (current_qs === 1) {
                                        document.getElementsByClassName(
                                          "codeOutput"
                                        )[0].value = q1_testCase_1_output;
                                        set_q1_testCase_Current_output(
                                          q1_testCase_1_output
                                        );
                                      } else if (current_qs === 2) {
                                        document.getElementsByClassName(
                                          "codeOutput"
                                        )[0].value = q2_testCase_1_output;
                                        set_q2_testCase_Current_output(
                                          q2_testCase_1_output
                                        );
                                      } else if (current_qs === 3) {
                                        document.getElementsByClassName(
                                          "codeOutput"
                                        )[0].value = q3_testCase_1_output;
                                        set_q3_testCase_Current_output(
                                          q3_testCase_1_output
                                        );
                                      }
                                    }}
                                    style={{
                                      marginBottom: "1px",
                                      color: "white",
                                      borderRadius: "0",
                                      width: "100%",
                                    }}
                                  >
                                    Test Case 1
                                  </button>
                                </Col>
                              )}
                            </Row>
                            <Row className="">
                              {(
                                current_qs === 1
                                  ? q1_testCase_2_output_error !== undefined
                                  : current_qs === 2
                                  ? q2_testCase_2_output_error !== undefined
                                  : q3_testCase_2_output_error !== undefined
                              ) ? (
                                <Col style={{ paddingLeft: "0%" }}>
                                  <button
                                    className={
                                      current_qs === 1
                                        ? !q1_testCase_2_output_error
                                          ? "btn scTest"
                                          : "btn btn-danger"
                                        : current_qs === 2
                                        ? !q2_testCase_2_output_error
                                          ? "btn scTest"
                                          : "btn btn-danger"
                                        : !q3_testCase_2_output_error
                                        ? "btn scTest"
                                        : "btn btn-danger"
                                    }
                                    onClick={(e) => {
                                      if (current_qs === 1) {
                                        document.getElementsByClassName(
                                          "codeOutput"
                                        )[0].value = q1_testCase_2_output;
                                        set_q1_testCase_Current_output(
                                          q1_testCase_2_output
                                        );
                                      } else if (current_qs === 2) {
                                        document.getElementsByClassName(
                                          "codeOutput"
                                        )[0].value = q2_testCase_2_output;
                                        set_q2_testCase_Current_output(
                                          q2_testCase_2_output
                                        );
                                      } else if (current_qs === 3) {
                                        document.getElementsByClassName(
                                          "codeOutput"
                                        )[0].value = q3_testCase_2_output;
                                        set_q3_testCase_Current_output(
                                          q3_testCase_2_output
                                        );
                                      }
                                    }}
                                    style={{
                                      marginBottom: "1px",
                                      color: "white",
                                      borderRadius: "0",
                                      width: "100%",
                                    }}
                                  >
                                    Test Case 2
                                  </button>
                                </Col>
                              ) : (
                                <Col style={{ paddingLeft: "0%" }}>
                                  <button
                                    className="btn btn-secondary"
                                    onClick={(e) => {
                                      if (current_qs === 1) {
                                        document.getElementsByClassName(
                                          "codeOutput"
                                        )[0].value = q1_testCase_2_output;
                                        set_q1_testCase_Current_output(
                                          q1_testCase_2_output
                                        );
                                      } else if (current_qs === 2) {
                                        document.getElementsByClassName(
                                          "codeOutput"
                                        )[0].value = q2_testCase_2_output;
                                        set_q2_testCase_Current_output(
                                          q2_testCase_2_output
                                        );
                                      } else if (current_qs === 3) {
                                        document.getElementsByClassName(
                                          "codeOutput"
                                        )[0].value = q3_testCase_2_output;
                                        set_q3_testCase_Current_output(
                                          q3_testCase_2_output
                                        );
                                      }
                                    }}
                                    style={{
                                      marginBottom: "1px",
                                      color: "white",
                                      borderRadius: "0",
                                      width: "100%",
                                    }}
                                  >
                                    Test Case 2
                                  </button>
                                </Col>
                              )}
                            </Row>
                            <Row className="">
                              {(
                                current_qs === 1
                                  ? q1_testCase_3_output_error !== undefined
                                  : current_qs === 2
                                  ? q2_testCase_3_output_error !== undefined
                                  : q3_testCase_3_output_error !== undefined
                              ) ? (
                                <Col style={{ paddingLeft: "0%" }}>
                                  <button
                                    className={
                                      current_qs === 1
                                        ? !q1_testCase_3_output_error
                                          ? "btn scTest"
                                          : "btn btn-danger"
                                        : current_qs === 2
                                        ? !q2_testCase_3_output_error
                                          ? "btn scTest"
                                          : "btn btn-danger"
                                        : !q3_testCase_3_output_error
                                        ? "btn scTest"
                                        : "btn btn-danger"
                                    }
                                    onClick={(e) => {
                                      if (current_qs === 1) {
                                        document.getElementsByClassName(
                                          "codeOutput"
                                        )[0].value = q1_testCase_3_output;
                                        set_q1_testCase_Current_output(
                                          q1_testCase_3_output
                                        );
                                      } else if (current_qs === 2) {
                                        document.getElementsByClassName(
                                          "codeOutput"
                                        )[0].value = q2_testCase_3_output;
                                        set_q2_testCase_Current_output(
                                          q2_testCase_3_output
                                        );
                                      } else if (current_qs === 3) {
                                        document.getElementsByClassName(
                                          "codeOutput"
                                        )[0].value = q3_testCase_3_output;
                                        set_q3_testCase_Current_output(
                                          q3_testCase_3_output
                                        );
                                      }
                                    }}
                                    style={{
                                      marginBottom: "1px",
                                      color: "white",
                                      borderRadius: "0",
                                      width: "100%",
                                    }}
                                  >
                                    Test Case 3
                                  </button>
                                </Col>
                              ) : (
                                <Col style={{ paddingLeft: "0%" }}>
                                  <button
                                    className={"btn btn-secondary"}
                                    onClick={(e) => {
                                      if (current_qs === 1) {
                                        document.getElementsByClassName(
                                          "codeOutput"
                                        )[0].value = q1_testCase_3_output;
                                        set_q1_testCase_Current_output(
                                          q1_testCase_3_output
                                        );
                                      } else if (current_qs === 2) {
                                        document.getElementsByClassName(
                                          "codeOutput"
                                        )[0].value = q2_testCase_3_output;
                                        set_q2_testCase_Current_output(
                                          q2_testCase_3_output
                                        );
                                      } else if (current_qs === 3) {
                                        document.getElementsByClassName(
                                          "codeOutput"
                                        )[0].value = q3_testCase_3_output;
                                        set_q3_testCase_Current_output(
                                          q3_testCase_3_output
                                        );
                                      }
                                    }}
                                    style={{
                                      marginBottom: "1px",
                                      color: "white",
                                      borderRadius: "0",
                                      width: "100%",
                                    }}
                                  >
                                    Test Case 3
                                  </button>
                                </Col>
                              )}
                            </Row>
                          </div>
                        </Col>
                      )}
                      <Col
                        md={
                          (
                            current_qs === 1
                              ? submitCode_qs1
                              : current_qs === 2
                              ? submitCode_qs2
                              : submitCode_qs3
                          )
                            ? 9
                            : 12
                        }
                      >
                        <textarea
                          disabled
                          value={
                            current_qs === 1
                              ? q1_testCase_Current_output
                              : current_qs === 2
                              ? q2_testCase_Current_output
                              : q3_testCase_Current_output
                          }
                          readOnly
                          className="scrollbar codeOutput"
                          id="style-4"
                        ></textarea>
                      </Col>
                    </Row>
                  </Tab>
                </Tabs>
              </div>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
}
