import React, { Component } from 'react';
import { connect } from "react-redux";
import './style.css'
import TogoList from '../../components/togoList'
import AddPlace from '../../components/addPlace'
import { setPlaces, setPlaceInput } from "../../actions";

const mapDispatchToProps = dispatch => {
 return {
  setPlaces: places => dispatch(setPlaces(places)),
  setPlaceInput:flag=>dispatch(setPlaceInput(flag))
 };
};

const mapStateToProps = state => {
  return { showPlaceInput: state.showPlaceInput,
             };
};

class ConnectedToGo extends Component{
  constructor(props){
    super(props);
    this.showForm=this.showForm.bind(this)
  }

setData(responseData){
  console.log(responseData);
  this.props.setPlaces(responseData);
 }

 showForm(e){
  e.preventDefault();
  this.props.setPlaceInput(true)
  console.log(this.props.showPlaceInput)
 }

componentDidMount(){
  
   const url=new URL('https://radmilatomic.pythonanywhere.com/api/places')
   const request=new Request(url,{
    method:'GET',
    mode:'cors'
   });

   fetch(request).then(response=>
     response.json()).then(responseData=>this.setData(responseData))
     .catch(function(error){console.log(error);})
  }

 render(){
  return (
    <div id="togo">
    <AddPlace/>
    <input  id="addPlaceButton" type="submit" value="Add Place To List" onClick={this.showForm}/>
    <div><TogoList/></div>
    </div>)
 }
}

const ToGo=connect(mapStateToProps,mapDispatchToProps)(ConnectedToGo)
export default ToGo