import React, { Component } from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {isAuth, setAdmins} from "../../actions";

import './style.css'

const mapDispatchToProps = dispatch => {
 return {
  isAuth: flag => dispatch(isAuth(flag)),
  setAdmins:admins=>dispatch(setAdmins(admins))
 };
};

const mapStateToProps = state => {
 return { auth: state.auth,
          admins:state.admins
 };
};

class ConnectedLogin extends Component{

setAdmins(response){
  console.log(response)
  this.props.setAdmins(response);
}

componentDidMount(){
  
   const url=new URL('http://radmilatomic.pythonanywhere.com/api/admins')
   const request=new Request(url,{
    method:'GET',
    mode:'cors'
   });

   fetch(request).then(response=>
     response.json()).then(responseData=>this.setAdmins(responseData))
     .catch(function(error){console.log(error);})
  }

    signUp(){
        this.props.isAuth(true);

    }


 render(){
    if(this.props.auth) {
   return <Redirect to={{
    pathname:'/',
   }}
   />
  }

  return (
    <div id="signInContainer">
      <div id="signIn">
        <h2>SIGN IN</h2>
          <div className="group">
            <input className="loginInput"
              ref={(a) => this.inputEmail = a}
              type="text"
              required="required"
              onChange={(event) => this.setState({email: event.target.value})}/>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label className="loginLabel">Email</label>
          </div>
          <div className="group">
            <input className="loginInput"
              ref={(a) => this.inputPass = a}
              type="password"
              required="required"
              onChange={(event) => this.setState({password: event.target.value})}/>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label className="loginLabel">password</label>
          </div>
          <div className="btn-box">
            <button className="btn btn-submit"
              type="button"
              onClick={() => this.signUp()}>LogIn
            </button>
          </div>
       <p id="notValidMail"></p>
      </div>
    </div>
  );
 }
}

const Login = connect(mapStateToProps, mapDispatchToProps)(ConnectedLogin);
export default Login;