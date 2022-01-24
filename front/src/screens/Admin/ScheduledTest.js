import React,{useState,useEffect} from "react";
import { Row, Col } from "react-bootstrap";
import "../../css/SchdlTest.css";
import { useNavigate } from "react-router-dom";
import  axios  from "axios";

function ScheduledTest() {
  const [stests,setSTests] = useState([]);
  const [utests,setUTests] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const data = async ()=>{
      await axios.get('http://127.0.0.1:8000/api/admin/tests')
      .then(res=>{
        console.log(res.data)
        setSTests(res.data.stests);
        setUTests(res.data.utests);
      })
      .catch(e=>{
        console.log(e)
      })
    }

    data()
  },[])
  return (
    <div className="SchdlTest">
      <button
        style={{ marginLeft: "1%" }}
        className="btn btn-secondary"
        onClick={(e) => navigate("/admin/home")}
      >
        Back
      </button>
      <Row style={{ margin: "0 0 0 10%" }}>
        <Col md={6} style={{ marginRight: "0%" }}>
          {" "}
          <div
            className="basicRec"
            style={{ minHeight: window.screen.height - 400, width: "90%" }}
          >
            <h4 style={{ paddingLeft: "30%", paddingTop: "10px" }}>
              Scheduled Test
            </h4>
            <div className="lineThrough"></div>
            {stests.map((t,index)=>{
              return <p key={index}>{t.test_name}</p>
            })}
          </div>
        </Col>
        <Col md={6} style={{ marginRight: "0%" }}>
          {" "}
          <div
            className="basicRec"
            style={{ minHeight: window.screen.height - 400, width: "90%" }}
          >
            <h4 style={{ paddingLeft: "30%", paddingTop: "10px" }}>
              Upcoming Test
            </h4>
            <div className="lineThrough"></div>
            {utests.map((t,index)=>{
              return <p key={index}>{t.test_name}</p>
            })}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ScheduledTest;