import React,{useEffect,useState} from 'react'
import { useNavigate ,useLocation} from 'react-router-dom'
import { Row, Col,Modal,Button } from "react-bootstrap";
import DateTimePicker from 'react-datetime-picker';
import axiosInstance from '../../axios';
import { MDBDataTable } from 'mdbreact';
import {CSVLink, CSVDownload} from 'react-csv';


function ViewSchdlTest() {
    const navigate=useNavigate()
    const location = useLocation();
    const [rows,setRows] = useState([]);
    const [data,setTData] = useState({});

    const columns=[
        {
          label: 'Student',
          field: 'name',
        },
        {
          label: 'Start Time',
          field: 'sdate',
        },
        {
          label: 'End Time',
          field: 'edate',
        },
        {
          label: 'Marks',
          field: 'marks',
        }
      ]
    const  headers = [
        { label: "Student", key: "name" },
        { label: "Start Time", key: "sdate" },
        { label: "End Time", key: "edate" },
        { label: "Marks", key: "marks" }
      ];
      
    
    useEffect(() => {
     axiosInstance.get(`/api/admin/resultTest/${location.state.id}`).then((res)=>{
         console.log(res.data)
        
         setRows(res.data.studentNameArr)
         setTData({columns:columns,rows:res.data.studentNameArr})
     })
    }, [])
    return (
        <div>
            
             <button
        style={{ marginLeft: "1%" ,marginBottom:'5px'}}
        className="btn btn-secondary"
        onClick={(e) => navigate("/admin/scheduledTest")}
      >
        Back
      </button>
            <div className='basicRec' style={{padding:'20px 15px'}}>
            
          <Row style={{margin:'2% 0'}}>
          <Col md={3}>Test Name: </Col>
          <Col md={9}><input type='string' defaultValue={location.state.name} disabled></input></Col>

          </Row>
          <Row style={{margin:'2% 0'}}>
            <Col md={3}>Start Time:</Col>
            <Col md={9}>
              <DateTimePicker 
              disabled
              value={location.state.start}
            /></Col>
          </Row>
          <Row style={{margin:'2% 0'}}>
            <Col md={3}>End Time:</Col>
            <Col md={9}>
              <DateTimePicker 
              disabled
              value={location.state.end}
            /></Col>
          </Row>
          <MDBDataTable
      striped
      bordered
      noBottomColumns
      hover
      exportToCSV={true}

      data={data}
    />
    
    <CSVLink data={rows} headers={headers}>
  Download csv
</CSVLink>
        
      
            </div>
        </div>
    )
}

export default ViewSchdlTest
