import { useNavigate, useLocation } from "react-router-dom";
import { FiInfo } from "react-icons/fi";
import { useMediaQuery } from "react-responsive";
import MobileWidth from "../../components/MobileWidth";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import { MDBDataTableV5 } from "mdbreact";
import { OverlayTrigger, Popover } from "react-bootstrap";
import Alert from "../../components/Admin/Alert";
import Loader from "../../components/Loader";
import ConfirmDialogBox from "../../components/ConfirmDialogBox";
import { Row, Col } from "react-bootstrap";

function ViewAdmin() {
  const [isLoading, setIsloading] = useState(true);
  const [isAlertSuccessMsgLoaded, setIsAlertSuccessMsgLoaded] = useState(false);
  const [isAlertMsgLoaded, setIsAlertMsgLoaded] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [dangerMsg, setDangerMsg] = useState("");
  const [data, setTData] = useState({ columns: [], rows: [] });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const columns = [
    {
      label: "Action Time",
      field: "action_time",
      sort: "disabled",
    },
    {
      label: "Change message",
      field: "change_message",
      sort: "disabled",
    },
    {
      label: "Object",
      field: "object_repr",
      sort: "disabled",
    },
    {
      label: "Admin",
      field: "user",
      sort: "disabled",
    },
  ];
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        In this section, all the changes made by the admin as well as the admins who are registered are displayed. 
      </Popover.Body>
    </Popover>
  );
  const [showConfirmDialogBox, setShowConfirmDialogBox] = useState(false);
  const [argConfirmModal, setArgConfirmModal] = useState();
  const [confirm_yes_func, set_confirm_yes_func] = useState();
  const [confirm_no_func, set_confirm_no_func] = useState();
  const [confirm_dialog_msg, set_confirm_dialog_msg] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    setIsloading(false);
    if (`${sessionStorage.getItem("super")}` === "true") {
      axiosInstance
        .get("/api/getAllAdmin")
        .then((res) => {
          setTData({ columns: columns, rows: res.data.ls });
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      navigate(-1);
    }
    return () => {};
  }, []);

  return (
    <>
      {isDesktopOrLaptop ? (
        <>
          {isLoading ? (
            <Loader />
          ) : (
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
              <div className="SchdlTest">
                <ConfirmDialogBox
                  showConfirmDialogBox={showConfirmDialogBox}
                  setShowConfirmDialogBox={setShowConfirmDialogBox}
                  title={"Delete it?"}
                  confirm_no={confirm_no_func}
                  confirm_yes={confirm_yes_func}
                  arg={argConfirmModal}
                  msg={confirm_dialog_msg}
                />

                <button
                  style={{
                    marginLeft: "10%",
                    backgroundColor: "#293E6F",
                    borderRadius: "5px",
                    border: "none",
                    marginTop:"2%",
                  }}
                  className="btn btn-secondary"
                  onClick={(e) => navigate("/admin/home")}
                >
                  Back
                </button>
                <p
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    marginTop: "10px",
                    color: "#293e6f",
                    textAlign: "center",
                    marginLeft: "30px",
                  }}
                >
                  Admin History{" "}
                  <OverlayTrigger
                    trigger="hover"
                    placement="bottom"
                    overlay={popover}
                  >
                    <button
                      style={{
                        backgroundColor: "white",
                        outline: "none",
                        border: "none",
                        marginLeft: "0px",
                        padding: "0px",
                      }}
                    >
                      <FiInfo
                        className="info"
                        style={{
                          height: "15px",
                          width: "15px",
                          marginTop: "5px",
                        }}
                      />
                    </button>
                  </OverlayTrigger>
                </p>
                <Row style={{ margin: "0 0 0 10%" }}>
                  <Col md={12} style={{ marginRight: "0%" }}>
                    <div
                      style={{
                        height: "100%",
                        width: "90%",
                        fontSize: "13.6px",
                        background: "#FFFFFF",
                        border: "2px solid #E5E5E5",
                        boxSizing: "border-box",
                        borderRadius: "14px",
                        marginBottom: "40px",
                      }}
                    >
                      <h4
                        style={{
                          paddingTop: "10px",
                          fontSize: "15.6px",
                          textAlign: "center",
                        }}
                      >
                        Recent Actions
                      </h4>
                      <div className="scrollbar" id="style-4">
                        <MDBDataTableV5
                          className="viewScdlTestTable"
                          responsive
                          fixed
                          striped
                          bordered
                          noBottomColumns
                          hover
                          exportToCSV={true}
                          entries={5}
                          entriesOptions={[5, 15, 30, 50]}
                          data={data}
                          style={{ marginTop: "5px", marginBottom: "0" }}
                          fullPagination
                          materialSearch
                        />
                      </div>
                    </div>
                  </Col>
                 
                </Row>
              </div>
            </>
          )}
        </>
      ) : (
        <MobileWidth />
      )}
    </>
  );
}

export default ViewAdmin;