import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";
import './style.css'

import Login from '../../containers/login'
import Home from '../../containers/home'
import ToGo from '../../containers/togo'
import ToTell from '../../containers/totell'
import PrivateRoute from '../privateRoute';
import {PATH} from "../../const"


class Main extends Component{

    render(){
        return(
          <div id="main">
            <Switch>
            <PrivateRoute exact path={PATH+"/"} component ={Home}/>
            <Route exact path={PATH+"/login"} component={Login}/>
            <PrivateRoute exact path={PATH+"/totell"} component ={ToTell}/>
            <PrivateRoute exact path={PATH+"/togo"} component ={ToGo}/>
            </Switch>
            </div>
        );
    }
}

export default Main