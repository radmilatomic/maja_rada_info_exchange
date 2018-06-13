import React, { Component } from 'react';
import {Link } from "react-router-dom";
import {PATH} from "../../const"


import './style.css'

class Home extends Component{


 render(){
  return <div id="home"> 
  <div id="homecontainer">
  <Link to={PATH+"/totell"} style={{ textDecoration: 'none' }}><button className="linkButton">Sta treba da ti ispricam</button></Link>
  <Link to={PATH+"/togo"} style={{ textDecoration: 'none' }}><button className="linkButton">Gde treba da idemo</button></Link>
  </div>
  </div>
 }
}

export default Home