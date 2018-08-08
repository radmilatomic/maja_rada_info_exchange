import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";

import { renderDeleteStory, setStories } from "../../actions";
import './style.css';

const mapDispatchToProps = dispatch => {
  return {
    renderDeleteStory: flag => dispatch(renderDeleteStory(flag)),
    setStories: stories=>dispatch(setStories(stories))
  };
};

const mapStateToProps = state => {
  return { deleteStory: state.deleteStory,
            storyToDelete:state.storyToDelete,
            
             };
};


class ConnectedDeleteStory extends Component {
  constructor(props) {
    super(props);
    this.exitDelete=this.exitDelete.bind(this);
    this.deleteMethod=this.deleteMethod.bind(this);
    this.fetchStories=this.fetchStories.bind(this)
    this.setData=this.setData.bind(this);
    this.modalRoot = document.getElementById('modal-root');
  }

  setData(responseData){
  console.log(responseData);
  this.props.setStories(responseData); 
 }

  exitDelete(){
    this.props.renderDeleteStory(false);
  }

  fetchStories(){
    const url=new URL('https://radmilatomic.pythonanywhere.com/api/stories')
    const request=new Request(url,{
    method:'GET',
    mode:'cors'
   });

   fetch(request).then(response=>
     response.json()).then(responseData=>this.setData(responseData))
     .catch(function(error){console.log(error);})
  }

  deleteMethod(e){
    console.log("hello from deleteMethod");
    
    console.log("story will be deleted on this click")
    e.preventDefault()
    
    const url=new URL('https://radmilatomic.pythonanywhere.com/api/deletestory/'+this.props.storyToDelete.id)
    const request=new Request(url,{
    method:'GET',
    mode:'no-cors'
   });

   fetch(request).then(()=>this.fetchStories())
     .catch(function(error){console.log(error);})

    this.props.renderDeleteStory(false);
  
  }

  render() {
    if(this.props.deleteStory===true){
      
      
      return ReactDOM.createPortal(
        <div className='modal' id="delete-form">
         
            <div className="buttonsWrapper">
              <div>Are you sure you want to delete?</div>
              <input className="buttonDetails" type="submit" value="YES" onClick={this.deleteMethod}/>
              <input className="buttonDetails" type ="submit" value ="NO" onClick={this.exitDelete}/>
              </div>
            
        </div>,
      this.modalRoot
    );
  }
  return null
  }
}

const DeleteStory=connect(mapStateToProps,mapDispatchToProps)(ConnectedDeleteStory)
export default DeleteStory;