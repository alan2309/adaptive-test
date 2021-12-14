import React from 'react'
import TestScreen from './TestScreen'
import Home from './Home';
import logo from '../img/logo.png'
import {Col,Row} from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';

function BaseScreen() {
    return (
        <div>
           


            <Row style={{height:'100px',margin:'0px'}}>
                <Col md={1}>
            <img style={{ width:"60px",height:"75px",marginLeft:'56px'}}
            src={logo}
            alt="logo"
            className="d-inline-block align-middle mr-2"
          />
          </Col>
          <Col md={11} style={{paddingTop:'10px',paddingLeft:'40px',paddingRight:'0px'}}>
              <Row style={{margin:'0px'}}>
          DJSCE INFORMATION TECHNOLOGY
          </Row>
          <Row style={{margin:'0px'}}>
          Placement Portal
          </Row>
          </Col>
          </Row>
          <Row style={{margin:'0px'}}>

           <Col style={{padding:'10px 90px'}} >
           <Router>
        <Routes>
        <Route path='/testScreen' exact element={<TestScreen/>}/>
        <Route path='/' exact element={<Home/>} />
        <Route path='/login' exact element={<Login/>} />
        </Routes>
        </Router>
            
            </Col>
            </Row>
        </div>
    )
}

export default BaseScreen
