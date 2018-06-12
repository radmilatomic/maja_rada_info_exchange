import React, { Component } from 'react';
import {Link } from "react-router-dom";
import {PATH} from "../../const"


import './style.css'

class Home extends Component{


 render(){
  return <div> 
  <Link to={PATH+"/totell"}><button>Sta treba da ti ispricam</button></Link>
  <Link to={PATH+"/togo"}><button>Gde treba da idemo</button></Link>
  </div>
 }
}

export default Home