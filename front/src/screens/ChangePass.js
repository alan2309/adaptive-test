import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axios";

function ChangePass() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFormData = Object.freeze({
    token: "",
    pass: "",
    cpass: "",
  });
  const [formData, updateFormData] = useState(initialFormData);

  useEffect(() => {
    updateFormData({
      ...formData,
      token: searchParams.get("token"),
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.pass === formData.cpass) {
      axiosInstance
        .post(`api/changepass`, { data: formData })
        .then((res) => {
          if (res.data.exists) {
            navigate("/login");
          } else {
            alert("Error occured");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      alert("password should be same");
    }
  };

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className="loginInpRec"
          onChange={handleChange}
          id="password-field"
          name="pass"
          type="password"
          placeholder="Password"
          style={{ width: "100%" }}
          required
        ></input>
        <input
          className="loginInpRec"
          onChange={handleChange}
          id="password-field"
          name="cpass"
          type="password"
          placeholder="Confirm Password"
          style={{ width: "100%" }}
          required
        ></input>
        <button
          style={{
            backgroundColor: "#10B65C",
            width: "150px",
            border: "none",
          }}
          type="submit"
          className="btn btn-primary"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}

export default ChangePass;
