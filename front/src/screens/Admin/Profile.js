import React, { useEffect, useState } from "react";
import { Container, FormControl, InputGroup, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import MobileWidth from "../../components/MobileWidth";
import axiosInstance from "../../axios";
import createFilterOptions from "react-select-fast-filter-options";
import Select from "react-select";
import ConfirmDialogBox from "../../components/ConfirmDialogBox";

function Profile() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const navigate = useNavigate();
  const [formData, updateFormData] = useState({});
  const location = useLocation();
  const [colleges, setColleges] = useState([]);
  const [departments, setDepartments] = useState([]);
  const filterOptions = createFilterOptions(colleges);
  const filterOptions2 = createFilterOptions(departments);
  const [showConfirmDialogBox, setShowConfirmDialogBox] = useState(false);
  const [argConfirmModal, setArgConfirmModal] = useState();
  const [confirm_yes_func, set_confirm_yes_func] = useState();
  const [confirm_no_func, set_confirm_no_func] = useState();
  const [confirm_dialog_msg, set_confirm_dialog_msg] = useState("");
  const [confirm_dialog_title, set_confirm_dialog_title] = useState("");

  useEffect(() => {
    axiosInstance
      .get(`api/getUserData/${location.state.username}`)
      .then((res) => {
        let data = res.data.user;

        updateFormData(data);
      });
    const list = async () =>
      await axiosInstance
        .get("api/const")
        .then((res) => {
          setColleges(res.data.colleges);
          setDepartments(res.data.departments);
        })
        .catch((e) => console.log(e));
    list();

    return () => {};
  }, []);
  function confirm_no() {
    setShowConfirmDialogBox(false);
  }
  function confirm_del_yes() {
    console.log(formData);
    alert("Update here");
    //logic here
  }
  function confirm_del_yes_1() {
    console.log(formData);
    alert("Delete here");
    //logic here
  }
  function onSubmit(e) {
    e.preventDefault();
    set_confirm_yes_func(() => confirm_del_yes);
    set_confirm_no_func(() => confirm_no);
    set_confirm_dialog_msg("Are you sure you want to update this user?");
    set_confirm_dialog_title("Update it?");
    setShowConfirmDialogBox(true);
  }

  return (
    <div
      style={{ fontSize: "13.6px", padding: "0 60px", marginBottom: "20px" }}
    >
      {isDesktopOrLaptop ? (
        <>
          <ConfirmDialogBox
            showConfirmDialogBox={showConfirmDialogBox}
            setShowConfirmDialogBox={setShowConfirmDialogBox}
            confirm_no={confirm_no_func}
            confirm_yes={confirm_yes_func}
            arg={argConfirmModal}
            title={confirm_dialog_title}
            msg={confirm_dialog_msg}
          />
          <button
            style={{
              marginLeft: "1%",
              backgroundColor: "#293E6F",
              borderRadius: "5px",
              border: "none",
              marginTop: "40px",
              marginLeft: "50px",
            }}
            className="btn btn-secondary"
            onClick={(e) =>
              location.state.update
                ? navigate("/admin/registeredAdmin")
                : navigate("/admin/home")
            }
          >
            Back
          </button>
          <p
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "0px",
              marginTop: "10px",
              color: "#293e6f",
              textAlign: "center",
              marginLeft: "20px",
            }}
          >
            My Profile{" "}
          </p>
          <Container
            className="customLoginBorder"
            style={{
              width: "887px",
              boxShadow: "1.5px 1.5px 7px 3px rgba(0,0,0,0.2)",
              borderRadius: "40px",
              paddingBottom: "30px",
              marginTop: "15px",
              marginBottom: "50px",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}></div>
              <Form
                style={{ fontSize: "13.6px" }}
                onSubmit={(e) => onSubmit(e)}
              >
                <Form.Group
                  className="mb-3"
                  style={{ marginTop: "45px" }}
                  controlId="formBasicEmail"
                >
                  <Form.Label>Email address </Form.Label>
                  <Form.Control
                    type="email"
                    defaultValue={formData.email}
                    onChange={(e) => {
                      updateFormData({
                        ...formData,
                        ["email"]: e.target.value,
                      });
                    }}
                    disabled={location.state.update ? false : true}
                    required
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Label> Name </Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  onChange={(e) => {
                    updateFormData({
                      ...formData,
                      ["name"]: e.target.value,
                    });
                  }}
                  defaultValue={formData.name}
                  disabled={location.state.update ? false : true}
                  required
                />

                <Form.Group className="mb-3" style={{ marginTop: "25px" }}>
                  <Form.Label> Branch </Form.Label>
                  <Select
                    name="branch"
                    onChange={(e) => {
                      updateFormData({
                        ...formData,
                        ["branch"]: e.label,
                      });
                    }}
                    value={{ label: formData.branch, value: formData.branch }}
                    isDisabled={location.state.update ? false : true}
                    required
                    filterOptions={filterOptions2}
                    options={departments}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  style={{ marginTop: "25px" }}
                  controlId="formBasicPassword"
                >
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    onChange={(e) => {
                      updateFormData({
                        ...formData,
                        ["mobile"]: e.target.value,
                      });
                    }}
                    defaultValue={formData.mobile}
                    disabled={location.state.update ? false : true}
                    required
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  style={{ marginTop: "25px" }}
                  controlId="formBasicPassword"
                >
                  <Form.Label>College</Form.Label>
                  <Select
                    name="college"
                    onChange={(e) => {
                      updateFormData({
                        ...formData,
                        ["college"]: e.label,
                      });
                    }}
                    value={{ label: formData.college, value: formData.college }}
                    filterOptions={filterOptions}
                    options={colleges}
                    isDisabled={location.state.update ? false : true}
                    required
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  style={{ marginTop: "25px" }}
                  controlId="formBasicPassword"
                >
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="text"
                    name="age"
                    onChange={(e) => {
                      updateFormData({
                        ...formData,
                        ["age"]: parseInt(e.target.value),
                      });
                    }}
                    defaultValue={formData.age}
                    disabled={location.state.update ? false : true}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" style={{ marginTop: "25px" }}>
                  <Form.Label> Gender </Form.Label>
                  <Form.Select
                    onChange={(e) => {
                      updateFormData({
                        ...formData,
                        ["gender"]:
                          e.target.value === "1"
                            ? "Male"
                            : e.target.value === "2"
                            ? "Female"
                            : "Other",
                      });
                    }}
                    defaultValue={formData.gender}
                    disabled={location.state.update ? false : true}
                    name="gender"
                    required
                  >
                    <option
                      selected={formData.gender === "Male" ? "selected" : ""}
                      value="1"
                    >
                      Male
                    </option>
                    <option
                      selected={formData.gender === "Female" ? "selected" : ""}
                      value="2"
                    >
                      Female
                    </option>
                    <option
                      selected={formData.gender === "Other" ? "selected" : ""}
                      value="3"
                    >
                      Other
                    </option>
                  </Form.Select>
                </Form.Group>

                {location.state.update === 1 && (
                  <>
                    <Form.Check
                      style={{
                        border: "1px black",
                        marginTop: "20px",
                        marginBottom: "20px",
                        textAlign: "left",
                      }}
                      checked={formData.user_is_staff === "True" ? true : false}
                      name="user_is_staff"
                      onChange={(e) => {
                        updateFormData({
                          ...formData,
                          ["user_is_staff"]: e.target.checked
                            ? "True"
                            : "False",
                        });
                      }}
                      type="checkbox"
                      class="custom-control-label"
                      id="custom-switch"
                      label="Make this user staff?"
                    />

                    <Form.Check
                      style={{
                        border: "1px black",
                        marginTop: "20px",
                        marginBottom: "20px",
                        textAlign: "left",
                      }}
                      checked={
                        formData.user_is_superuser === "True" ? true : false
                      }
                      name="user_is_superuser"
                      onChange={(e) => {
                        updateFormData({
                          ...formData,
                          ["user_is_superuser"]: e.target.checked
                            ? "True"
                            : "False",
                        });
                      }}
                      type="checkbox"
                      class="custom-control-label"
                      id="custom-switch-1"
                      label="Make this user superadmin?"
                    />

                    <button
                      className="btn"
                      style={{ backgroundColor: "#10B65C", color: "white" }}
                      type="submit"
                    >
                      Save
                    </button>
                    <button
                      className="btn"
                      type="button"
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        margin: "0 auto 0 10px",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        set_confirm_yes_func(() => confirm_del_yes_1);
                        set_confirm_no_func(() => confirm_no);
                        set_confirm_dialog_msg(
                          "Are you sure you want to Delete this user?"
                        );
                        set_confirm_dialog_title("Delete it?");
                        setShowConfirmDialogBox(true);
                      }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </Form>
            </div>
          </Container>
        </>
      ) : (
        <MobileWidth />
      )}
    </div>
  );
}

export default Profile;
