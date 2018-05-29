import React, { Component } from 'react';
import {Link } from "react-router-dom";


import './style.css'

class Home extends Component{


 render(){
  return <div> 
  <Link to="/totell"><button>Sta treba da ti ispricam</button></Link>
  <Link to="togo"><button>Gde treba da idemo</button></Link>
  </div>
 }
}

export default Home