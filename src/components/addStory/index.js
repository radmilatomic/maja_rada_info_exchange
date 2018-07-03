import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";

import { setStories, setStoryInput } from "../../actions";
import './style.css';

const mapDispatchToProps = dispatch => {
  return {
    setStories: stories => dispatch(setStories(stories)),
    setStoryInput: flag => dispatch(setStoryInput(flag)),
  };
};

const mapStateToProps = state => {
  return { showStoryInput: state.showStoryInput,
            admins:state.admins
             };
};

class ConnectedAddStory extends Component {
  constructor(props) {
    super(props);
    
    this.exitAdd=this.exitAdd.bind(this);
    this.addMethod=this.addMethod.bind(this)
    this.fetchStories=this.fetchStories.bind(this)
    this.setData=this.setData.bind(this)
    this.modalRoot = document.getElementById('modal-root');
  }

  setData(responseData){
  console.log(responseData);
  this.props.setStories(responseData); 
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

  addMethod(e){
    e.preventDefault()
    var form=new FormData(document.getElementById('form'))
   const url=new URL('https://radmilatomic.pythonanywhere.com/api/addstory')
   const request=new Request(url,{
    method:'POST',
    body:form,
    mode:'cors'
   });

   fetch(request).then(()=>this.fetchStories())
     .catch(function(error){console.log(error);})
  this.props.setStoryInput(false);
  }
  

  exitAdd(e){
    e.preventDefault();
    
    this.props.setStoryInput(false);
  }

  render() {
    if(this.props.showStoryInput===true){
      
      
      return ReactDOM.createPortal(
        <form className='modal' id="form">
          <div id="detailsWrapper">
            <div className="inline-field">
              <div id="showId">Add what you need to tell</div>
            </div>
            
            <div className="description-field"> <textarea id ="descriptionDetails" name="story" type="text" ref={(a) => this.inputTask = a}/></div>
            <div className="adminSelect"> 
              <div className="detailsLabel">To tell by: </div>
              <select  ref={(a) => this.selectedUser = a} id="changeUser" name="to_tell_by">
                {this.props.admins.map((admin)=><option key={admin.id}>{admin.name}</option>)}
              </select>
            </div>
            <div className="buttonsWrapper">
              <input className="buttonDetails" type="submit" value="Add To List" onClick={this.addMethod} />
              <input className="buttonDetails" type ="submit" value ="Exit" onClick={this.exitAdd}/>
            </div>
          </div>
        </form>,
      this.modalRoot
    );
  }
  return null
  }
}

const AddStory=connect(mapStateToProps,mapDispatchToProps)(ConnectedAddStory)
export default AddStory;