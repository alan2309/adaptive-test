
import React from 'react'
import TestScreen from './screens/TestScreen'
import Home from './screens/Home'
import logo from './img/logo.png'
import {Col,Navbar,Button,Row} from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from './screens/Login';
import Logout from './screens/logout';
import Result from './screens/Result';

function App() {
  return (
    <div className="App" id='element'>
       <div>
       <Navbar style={{backgroundColor:"#fff",boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)",color:"black",paddingTop:"0px",paddingBottom:"0px"}} expand="xl">
               
               <Navbar.Brand className="navBrand">
                   <img className="logoImage" height="80px" width="80px" alt="logo" src={logo}></img>
                       <div className="logoTitle">
                           <h5 className="djsce">DJSCE</h5>
                           <h5 className="it">INFORMATION TECHNOLOGY</h5>
                       </div>
               </Navbar.Brand>
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
           
        
           </Navbar>
           
         <Row style={{margin:'20px 0 0 0'}}>

          <Col style={{padding:'10px 90px'}} >
          <Router>
       <Routes>
       <Route path='/testScreen' exact element={<TestScreen/>}/>
       <Route path='/' exact element={<Home/>} />
       <Route path='/login' exact element={<Login/>} />
       <Route path='/result' exact element={<Result/>} />
       <Route path='/logout' exact element={<Logout/>} />
       </Routes>
       </Router>
           
           </Col>
           </Row>
       </div>
    </div>
  );
}

export default App;

