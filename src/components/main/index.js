import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";
import './style.css'

import Login from '../../containers/login'
import Home from '../../containers/home'
import ToGo from '../../containers/togo'
import ToTell from '../../containers/totell'
import PrivateRoute from '../privateRoute';


class Main extends Component{

    render(){
        return(
          <div id="main">
            <Switch>
            <PrivateRoute exact path="/" component ={Home}/>
            <Route exact path="/login" component={Login}/>
            <PrivateRoute exact path="/totell" component ={ToTell}/>
            <PrivateRoute exact path="/togo" component ={ToGo}/>
            </Switch>
            </div>
        );
    }
}

export default Main