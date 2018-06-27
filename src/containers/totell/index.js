import React, { Component } from 'react';
import { connect } from "react-redux"; 
import './style.css'
import { setStories, setStoryInput } from "../../actions";
import AddStory from '../../components/addStory'
import StoryList from '../../components/storyList'

const mapDispatchToProps = dispatch => {
 return {
  setStories: stories => dispatch(setStories(stories)),
  setStoryInput:flag=>dispatch(setStoryInput(flag))
 };
};

const mapStateToProps = state => {
 return { stories: state.stories,
  };
};

class ConnectedToTell extends Component{

  constructor(props){
    super(props);
    this.showForm=this.showForm.bind(this)
  }

setData(responseData){
  console.log(responseData);
  this.props.setStories(responseData); 
 }

 showForm(e){
  e.preventDefault();
  this.props.setStoryInput(true)
  
 }

componentDidMount(){
  if(!this.props.stories){
   const url=new URL('https://radmilatomic.pythonanywhere.com/api/stories')
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
  return (
    <div id="totell">
    <AddStory/>
    <input type="submit" id="addStoryButton" value="Add Story to list" onClick={this.showForm}/>
    <div id="story-list"><StoryList/></div>
    </div>
    )
 }
}

const ToTell=connect(mapStateToProps,mapDispatchToProps)(ConnectedToTell)
export default ToTell