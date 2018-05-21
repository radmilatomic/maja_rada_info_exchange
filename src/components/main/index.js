import React, { Component } from 'react';
import {Route, NavLink, Switch, BrowserRouter  } from "react-router-dom";
import './style.css'

import Login from '../../containers/login'
import Home from '../../containers/home'
import ToGo from '../../containers/togo'
import ToTell from '../../containers/totell'


class Main extends Component{

    render(){
        return(
          <div id="main">
            <Switch>
            <Route exact path="/" component ={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/totell" component ={ToTell}/>
            <Route exact path="/togo" component ={ToGo}/>
            </Switch>
            </div>
        );
    }
}

export default Main