import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Permissions() {
  const [allowed, setAllowed] = useState([]);
  const [notallowed, setNot] = useState([]);
  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const data = async () =>
      await axiosInstance
        .get("api/getuserslist")
        .then((res) => {
          if (res.data.exists) {
            setAllowed(res.data.allowed);
            setNot(res.data.notallowed);
          } else {
            alert("There is no ongoing test");
          }
        })
        .catch((e) => console.log(e));
    data();
  }, []);
  function onCheckChange(e) {
    var value = e.target.id;
    if (e.target.checked) {
      if (!items.includes(value)) {
        setItems((prevItem) => [...prevItem, value]);
      }
    } else {
      if (items.includes(value)) {
        setItems(items.filter((item) => item !== value));
      }
    }
  }

  function selectall(e) {
    if (!e.target.checked) {
      setItems([]);
    } else {
      setItems(
        notallowed.map((n) => {
          return `${n.id}`;
        })
      );
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    if (items.length === 0) {
      alert("select users to grant permission");
    } else {
      axiosInstance
        .post("api/permission", {
          data: { users: items },
        })
        .then((res) => {
          if (res.data.exists) {
            navigate("/admin/home");
          } else {
            alert("Some Error Occured");
          }
        })
        .catch((e) => console.log(e));
      console.log(items);
    }
  }

  return (
    <div>
      <Row>
        <Col>
          {allowed.map((a) => {
            return (
              <p>
                {a.first_name}-{a.email}
              </p>
            );
          })}
        </Col>

        <Col>
          <form onSubmit={submitHandler}>
            <input
              type="checkbox"
              onChange={(e) => selectall(e)}
              id="All"
              checked={items.length === notallowed.length ? true : false}
            />
            <span>All</span>
            <br />
            {notallowed.map((a) => {
              return (
                <Col key={a.id}>
                  <input
                    type="checkbox"
                    onChange={onCheckChange}
                    id={a.id}
                    value={a.id}
                    checked={items.includes(`${a.id}`) ? true : false}
                  />
                  <span>{a.first_name}</span>
                  <br />
                </Col>
              );
            })}
            <button type="submit">Grant Permission</button>
          </form>
        </Col>
      </Row>
    </div>
  );
}

export default Permissions;
