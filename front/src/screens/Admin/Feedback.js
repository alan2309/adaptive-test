import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios";
import { MDBDataTable, MDBInput } from "mdbreact";
import Alert from "../../components/Admin/Alert";
import Loader from "../../components/Loader";
import $ from "jquery";

function Feedback() {
  const [data, setTData] = useState({ columns: [], rows: [] });
  const [successMsg, setSuccessMsg] = useState("");
  const [dangerMsg, setDangerMsg] = useState("");
  const [isAlertMsgLoaded, setIsAlertMsgLoaded] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const [areAllChecked, setAreAllChecked] = useState(false);
  const checkAllHandler = (val) => {
    let c = $(".checkboxFeedback:checkbox");
    c.prop("checked", val);
    setAreAllChecked(val);
  };

  function checkAllSelected(rowLength) {
    let c = $(".checkboxFeedback:checkbox:checked").length;
    console.log(rowLength);
    console.log(c);
    let areAllSected = parseInt(c) === parseInt(rowLength);
    setAreAllChecked(areAllSected ? true : false);
    document.getElementById("selectAllCheckboc").checked = areAllSected
      ? true
      : false;
  }
  useEffect(() => {
    setIsloading(true);

    axiosInstance
      .get("api/feedback")
      .then((res) => {
        console.log(res.data);
        setIsloading(false);
        let rowArr = res.data.feedback_data.map((v, index) => ({
          ...v,
          checkBtn: (
            <MDBInput
              label=" "
              defaultChecked={areAllChecked ? true : v.checkBtn}
              type="checkbox"
              name="checkboxFeedback"
              className="checkboxFeedback"
              id={"checkbox" + v.userId}
              onChange={(e) => checkAllSelected(res.data.feedback_data.length)}
            />
          ),
        }));

        const columns = [
          {
            label: (
              <MDBInput
                label=" "
                type="checkbox"
                id="selectAllCheckboc"
                title="Select all"
                onChange={(e) => {
                  checkAllHandler(e.target.checked);
                }}
                defaultChecked={res.data.takeFeedback}
              />
            ),
            field: "checkBtn",
          },
          {
            label: "id",
            field: "userId",
          },
          {
            label: "Email",
            field: "email",
          },
          {
            label: "Rating",
            field: "rating",
          },
          {
            label: "Comment",
            field: "comment",
          },
        ];

        setTData({
          columns: columns,
          rows: rowArr,
        });
      })
      .catch((e) => {
        setIsloading(false);
        setIsAlertMsgLoaded(true);
        setDangerMsg("Error Occured");
        console.log(e);
      });
  }, []);

  return (
    <>
      <Alert
        msg={successMsg}
        setIsAlertMsgLoaded={setIsAlertMsgLoaded}
        isAlertMsgLoaded={isAlertMsgLoaded}
        type="success"
      ></Alert>
      <Alert
        msg={dangerMsg}
        setIsAlertMsgLoaded={setIsAlertMsgLoaded}
        isAlertMsgLoaded={isAlertMsgLoaded}
        type="danger"
      ></Alert>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <button
            type="button"
            onClick={(e) => {
              let x = $(".checkboxFeedback:checkbox:checked");
              let arrIdFeedback = [];
              let userId = [];
              let isAllSelected = 0;
              if (!areAllChecked && x.length !== 0) {
                x.map((xx) =>
                  userId.push(parseInt(x[xx].id.split("checkbox")[1]))
                );

                console.log(userId);
              } else {
                console.log("all select");
                if (!x.length === 0) {
                } else {
                  isAllSelected = 1;
                }
              }
              // axiosInstance.post('api/takeFeedback')
            }}
          >
            Take Feedbacks
          </button>
          <MDBDataTable
            className="feedbackTable"
            striped
            bordered
            noBottomColumns
            hover
            exportToCSV={true}
            data={data}
            noRecordsFoundLabel={"No Feedbacks"}
          />
        </>
      )}
    </>
  );
}

export default Feedback;
