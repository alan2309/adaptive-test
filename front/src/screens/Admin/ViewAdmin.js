import { useNavigate } from "react-router-dom";
import { FiInfo } from "react-icons/fi";
import { useMediaQuery } from "react-responsive";
import MobileWidth from "../../components/MobileWidth";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import { OverlayTrigger, Popover } from "react-bootstrap";
import Alert from "../../components/Admin/Alert";
import Loader from "../../components/Loader";
import ConfirmDialogBox from "../../components/ConfirmDialogBox";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Modal, Form } from "react-bootstrap";

function ViewAdmin() {
  const [isLoading, setIsloading] = useState(true);
  const [isAlertSuccessMsgLoaded, setIsAlertSuccessMsgLoaded] = useState(false);
  const [isAlertDangerMsgLoaded, setIsAlertDangerMsgLoaded] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [dangerMsg, setDangerMsg] = useState("");
  const [data, setTData] = useState({ columns: [], rows: [] });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const [formData2, updateFormData2] = useState({ email: "", superuser: "" });
  const columns = [
    {
      label: "Email",
      field: "email",
      sort: "disabled",
    },
    {
      label: "First Name",
      field: "first_name",
      sort: "disabled",
    },
    {
      label: "Last Name",
      field: "last_name",
      sort: "disabled",
    },
    {
      label: "Staff Status",
      field: "is_staff",
      sort: "disabled",
    },
    {
      label: "Super Staff Status",
      field: "is_superuser",
      sort: "disabled",
    },
    {
      label: "Edit",
      field: "editBtn",
      sort: "disabled",
    },
  ];
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        Here all the recent actions of admin's are listed. All admin's details
        are listed here and can create a new admin.
      </Popover.Body>
    </Popover>
  );
  const [show, setShow] = useState(false);
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
        .get("/api/getAllAdminData")
        .then((res) => {
          setTData({
            columns: columns,
            rows: res.data.data.map((v, index) => ({
              ...v,
              editBtn: (
                <button
                  style={{
                    border: "none",
                    backgroundColor: "none",
                    display:
                      v.is_superuser === "True" &&
                      !(v.username === sessionStorage.getItem("username"))
                        ? "none"
                        : "block",
                  }}
                  onClick={() => {
                    // deleteRow(v.id)
                    // console.log(v.username)
                    navigate("/admin/updateProfile", {
                      state: { username: v.username, update: 1 },
                    });
                  }}
                  disabled={
                    v.is_superuser === "True" &&
                    !(v.username === sessionStorage.getItem("username"))
                      ? true
                      : false
                  }
                >
                  {" "}
                  <i className="fa fa-edit" style={{ color: "#10B65C" }}></i>
                </button>
              ),
              is_staff: (
                <i
                  className={
                    v.is_staff === "True" ? "fa fa-check" : "fa fa-times"
                  }
                  style={{ color: v.is_staff === "True" ? "#10B65C" : "red" }}
                ></i>
              ),
              is_superuser: (
                <i
                  className={
                    v.is_superuser === "True" ? "fa fa-check" : "fa fa-times"
                  }
                  style={{
                    color: v.is_superuser === "True" ? "#10B65C" : "red",
                  }}
                ></i>
              ),
            })),
          });
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
          <Alert
            msg={successMsg}
            setIsAlertMsgLoaded={setIsAlertSuccessMsgLoaded}
            isAlertMsgLoaded={isAlertSuccessMsgLoaded}
            type="success"
          ></Alert>
          <Alert
            msg={dangerMsg}
            setIsAlertMsgLoaded={setIsAlertDangerMsgLoaded}
            isAlertMsgLoaded={isAlertDangerMsgLoaded}
            type="danger"
          ></Alert>

          {isLoading ? (
            <Loader />
          ) : (
            <>
              <Modal
                id="Login_page"
                show={show}
                onHide={() => setShow(false)}
                centered
              >
                <Modal.Body
                  style={{
                    textAlign: "center",
                    padding: "20px 20px 15px 20px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: "600",
                      fontSize: "16px",
                      color: "#293E6F",
                      textAlign: "center",
                    }}
                  >
                    Add new admin?
                  </p>

                  <p
                    style={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: "normal",
                      fontSize: "14px",
                      color: "#293E6F",
                      textAlign: "center",
                    }}
                  >
                    Enter the email address of the person you want as an admin
                    and if you want the person to be superadmin, Click on the
                    checkbox and send a mail.
                  </p>

                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      axiosInstance
                        .post("api/sendMailAdmin", {
                          data: {
                            email: formData2.email,
                            superuser: formData2.superuser,
                          },
                        })
                        .then((res) => {
                          console.log(res.data);
                          if (parseInt(res.data.statuscode) === 1) {
                            setShow(false);
                            setIsAlertSuccessMsgLoaded(true);
                            setSuccessMsg("Mail sent successfully");
                          } else {
                            setIsAlertDangerMsgLoaded(true);
                            setDangerMsg(res.data.msg);
                          }
                        })
                        .catch((e) => console.log(e));
                    }}
                  >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control
                        onChange={(e) => {
                          updateFormData2({
                            ...formData2,
                            email: e.target.value,
                          });
                        }}
                        name="email"
                        type="email"
                        placeholder="Email Id"
                        style={{ width: "100%" }}
                        required
                        value={formData2.email}
                      />
                    </Form.Group>
                    <Form.Check
                      style={{
                        border: "1px black",
                        marginTop: "20px",
                        marginBottom: "20px",
                        textAlign: "left",
                      }}
                      value={formData2.superuser}
                      name="superuser"
                      onChange={(e) => {
                        updateFormData2({
                          ...formData2,
                          ["superuser"]: !formData2.superuser,
                        });
                      }}
                      type="checkbox"
                      class="custom-control-label"
                      id="custom-switch"
                      label="Make this user superadmin?"
                    />
                    <button
                      style={{
                        backgroundColor: "#10B65C",
                        width: "100px",
                        border: "none",
                        marginTop: "20px",
                      }}
                      type="submit"
                      className="btn btn-primary"
                    >
                      Send
                    </button>
                  </Form>
                </Modal.Body>
              </Modal>

              <div className="SchdlTest" style={{ paddingTop: "50px" }}>
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
                    marginTop: "2%",
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
                  Admin{" "}
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
                        width: "90%",
                        fontSize: "13.6px",
                        background: "#FFFFFF",
                        border: "2px solid #E5E5E5",
                        boxSizing: "border-box",
                        borderRadius: "14px",
                        marginBottom: "40px",
                        padding: "10px 10px 0 10px",
                      }}
                    >
                      <MDBDataTable
                        striped
                        bordered
                        noBottomColumns
                        hover
                        displayEntries={false}
                        noRecordsFoundLabel={"No Upcoming Test"}
                        data={data}
                      />
                      <button
                        className="btn"
                        type="button"
                        // onClick={(e) => navigate("/admin/registerAdmin")}
                        onClick={(e) => setShow(true)}
                        style={{
                          backgroundColor: "#10B65C",
                          borderRadius: "100px",
                          margin: "10px",
                          marginLeft: "96%",
                        }}
                        title="Add new admin"
                      >
                        <i className="fa fa-add" style={{ color: "white" }}></i>
                      </button>
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
