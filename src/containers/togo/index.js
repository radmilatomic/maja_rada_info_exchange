import React, { Component } from 'react';
import { connect } from "react-redux";
import './style.css'
import TogoList from '../../components/togoList'
import { setPlaces } from "../../actions";

const mapDispatchToProps = dispatch => {
 return {
  setPlaces: places => dispatch(setPlaces(places)),
 };
};

class ConnectedToGo extends Component{

setData(responseData){
  console.log(responseData);
  this.props.setPlaces(responseData);
 }

componentDidMount(){
  
   const url=new URL('http://radmilatomic.pythonanywhere.com/api/places')
   const request=new Request(url,{
    method:'GET',
    mode:'cors'
   });

   fetch(request).then(response=>
     response.json()).then(responseData=>this.setData(responseData))
     .catch(function(error){console.log(error);})
  }

 render(){
  return <div><TogoList/></div>
 }
}

const ToGo=connect(null,mapDispatchToProps)(ConnectedToGo)
export default ToGo