import React,{useEffect,useState} from 'react'
import { isExpired, decodeToken } from "react-jwt";
import { useNavigate } from "react-router";
import axiosInstance from '../axios';
import {Col,Row} from 'react-bootstrap';
import TestHeaderComp from "../components/TestScreeen/TestHeaderComp";
import Chart from 'react-apexcharts';
import '../css/ResultScreen.css'


function Result() {
    const navigate = useNavigate()
    const [mrks,setmrks] = useState(0)
    const[done,setDone] = useState(0)
    const[right,setRight] = useState(0)
    const[wrong,setWrong] = useState(0)
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
          let c=0;
          for(let i=0;i<ar.length;i++){
              if(ar[i] === -1){
                  b++;
              }
              
              else{
                if(ar[i]===0){
                    c++;
                   }
                  a++;
                  total = total+ar[i]
              }
          }
          setDone(a)
          setWrong(c)
          setRight(a-c)
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
          return val
        },
        horizontalAlign: 'right', 
        floating: true,
        fontSize: '20px',
      fontWeight: 400,
      markers: {
        width: 22,
        height: 22,
        strokeWidth: 0,
        strokeColor: '#fff',
        radius: 0,
    },
    onItemClick: {
        toggleDataSeries: true
    },
    onItemHover: {
        highlightDataSeries: true
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
      if (document.fullscreenElement !== null) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
      }
  
  }
    },[])

    function timeleft(){
      if(localStorage.getItem("timetaken")){
        return localStorage.getItem("timetaken");
      }
      else{var test=JSON.parse(localStorage.getItem('test'))
     var diff = 0;
     const nowd = new Date()
  const nowh = nowd.getHours()
  const nowm = nowd.getMinutes()
  const nows = nowd.getSeconds()


  let myar = test['STime'].split(" ")
  let stime = myar[4].split(":")
 if(nowh>stime[0]){
   diff = diff+(nowh-stime[1])*3600
 }
 if(nowm>stime[1]){
   diff= diff+((nowm-stime[1])*60)
 }
 else{
   diff = diff - ((stime[1]-nowm)*60)
 }

 if(nows>stime[2]){
   diff = diff+(nows-stime[2])
 }
 else{
   diff = diff - (stime[2]-nows)
 }
 let hours = parseInt(diff / 3600);
let minutes = parseInt((diff % 3600) / 60);
let seconds = parseInt(diff % 60);
localStorage.setItem("timetaken",`${hours}:${minutes}:${seconds}`);
 return (`${hours}:${minutes}:${seconds}`);}
  }
    return (
        <div>
            <Row >
          <Col md='12' >
            <div className='rectangle'>
        <TestHeaderComp timer={timeleft()} timeKey='Time Taken' totalKey={'Questions Attempted'} marks={mrks} totalValue={`${done}/${notDone+done}`}></TestHeaderComp>
        </div>
        </Col>
        </Row>
        <Row style={{marginTop:'15px'}}>
          <Col md='12'>
            <div className='rectangle' style={{minHeight:'500px',color:'#788094'}} >
            <h3 style={{paddingLeft:'20px',fontWeight: '600',
fontSize: '24px',lineHeight: '36px',color: '#293E6F'}}>Analysis</h3>
            <Chart series={[right,wrong,notDone]}  options={opt} type='donut' height={`400px`}/> 
        </div>
        </Col>
        
        </Row>
            
        </div>
    )
}

export default Result
