import React,{useEffect,useState} from 'react'
import { isExpired, decodeToken } from "react-jwt";
import { useNavigate } from "react-router";
import axiosInstance from '../axios';
import {Col,Modal,Button,Row} from 'react-bootstrap';
import QuestionComp from "../components/TestScreeen/QuestionComp";
import TestHeaderComp from "../components/TestScreeen/TestHeaderComp";
import QuestionNavigatorComp from "../components/TestScreeen/QuestionNavigatorComp";
import Chart from 'react-apexcharts';


function Result() {
    const navigate = useNavigate()
    const [mrks,setmrks] = useState(0)
    const[done,setDone] = useState(0)
    const[notDone,setNotDone] = useState(0)
    const [opt, setOpt] =useState({});

    useEffect(()=>{
        var test=JSON.parse(localStorage.getItem('test'))
        const token = localStorage.getItem('access_token');
        const isMyTokenExpired = isExpired(token);
        if(isMyTokenExpired){
            navigate('/login')
            return
          }
          var test=JSON.parse(localStorage.getItem('test'))
          let ar = test['marks']
          let total = 0;
          let a=0;
          let b=0;
          for(let i=0;i<ar.length;i++){
              if(ar[i] === -1){
                  b++;
              }
              else{
                  a++;
                  total = total+ar[i]
              }
          }
          setDone(a)
          setNotDone(b)
          setmrks(total)
          if(!localStorage.getItem('result')){
          axiosInstance.post('api/marks',{
              data:{
                  username:test['username'],
                  marks:total
              }
        }).then((res)=>{
            localStorage.setItem('result',total)
        })
        .catch((e)=>console.log(e))
    }
    setOpt({
        
      plotOptions: {
        pie: {
          startAngle: 0,
          endAngle: 360
        }
      },
      dataLabels: {
        enabled: true,
        
      },
      fill: {
        type: 'gradient',
      },
      legend: {
        formatter: function(val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex]
        },
        fontSize: '20px',
      fontWeight: 400,
      markers: {
        width: 22,
        height: 22,
        strokeWidth: 0,
        strokeColor: '#fff',
        fillColors: undefined,
        radius: 0,
        marginRight:'10px'
    },
   
      },
      labels: ['Right', 'Wrong', 'Not Attempted'],
      
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
      });
    },[])
    return (
        <div>
            <Row >
          <Col md='12' >
            <div className='rectangle'>
        <TestHeaderComp timer={'69'} totalKey={'Total Questions Attempted'} totalValue={`${done}/${notDone}`}></TestHeaderComp>
        </div>
        </Col>
        </Row>
        <Row style={{marginTop:'15px'}}>
          <Col md='9'>
            <div className='rectangle' style={{minHeight:'500px',backgroundColor:'black'}} >
            <h2>Marks Scored :- {mrks}</h2>
            <Chart series={[44, 52,4]}  options={opt} type='donut' height={`400px`}/> 
        </div>
        </Col>
        <Col md='3' >
          <div className='rectangle' style={{minHeight:'500px',backgroundColor:'black'}}>
        <QuestionNavigatorComp attempted = {[5,5,5,5,5]}></QuestionNavigatorComp>
        </div>
        </Col>
        </Row>
            
        </div>
    )
}

export default Result
