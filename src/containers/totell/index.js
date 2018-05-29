import React, { Component } from 'react';
import { connect } from "react-redux"; 
import './style.css'
import { setStories } from "../../actions";
import StoryList from '../../components/storyList'

const mapDispatchToProps = dispatch => {
 return {
  setStories: stories => dispatch(setStories(stories)),
 };
};

const mapStateToProps = state => {
 return { stories: state.stories,
  };
};

class ConnectedToTell extends Component{

setData(responseData){
  console.log(responseData);
  this.props.setStories(responseData); 
 }

componentDidMount(){
  if(!this.props.stories){
   const url=new URL('http://radmilatomic.pythonanywhere.com/api/stories')
   const request=new Request(url,{
    method:'GET',
    mode:'cors'
   });

   fetch(request).then(response=>
     response.json()).then(responseData=>this.setData(responseData))
     .catch(function(error){console.log(error);})
  }
}

 render(){
  return (<div><StoryList/></div>)
 }
}

const ToTell=connect(mapStateToProps,mapDispatchToProps)(ConnectedToTell)
export default ToTell