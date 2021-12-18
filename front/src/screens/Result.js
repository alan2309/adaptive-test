import React,{useEffect,useState} from 'react'
import { isExpired, decodeToken } from "react-jwt";
import { useNavigate } from "react-router";
import axiosInstance from '../axios';

function Result() {
    const navigate = useNavigate()
    const [mrks,setmrks] = useState(0)
    const[done,setDone] = useState(0)
    const[notDone,setNotDone] = useState(0)

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
    },[])
    return (
        <div>
            <h2>Marks Scored :- {mrks}</h2>
            <p>Attempted:{done} and Not attempted:{notDone}</p>
            <button onClick={()=>navigate('/logout')}>Logout</button>
        </div>
    )
}

export default Result
