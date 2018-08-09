import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";

import { setStories, renderEditStory } from "../../actions";
import './style.css';

const mapDispatchToProps = dispatch => {
  return {
    setStories: stories => dispatch(setStories(stories)),
    renderEditStory: flag => dispatch(renderEditStory(flag)),
  };
};

const mapStateToProps = state => {
  return { editStory: state.editStory,
            admins:state.admins,
            currentStory:state.currentStory,
             };
};

class ConnectedEditStory extends Component {
  constructor(props) {
    super(props);
    
    this.exitEdit=this.exitEdit.bind(this);
    this.fetchStories=this.fetchStories.bind(this)
    this.setData=this.setData.bind(this)
    this.toggle=this.toggle.bind(this)
    this.editMethod=this.editMethod.bind(this)
    this.modalRoot = document.getElementById('modal-root');
    this.state={
      visited:this.props.currentStory.visited
    }
  }

  setData(responseData){
  console.log(responseData);
  this.props.setStories(responseData); 
  this.props.renderEditStory(false);
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

  
  toggle(e){
    e.preventDefault();
    if(this.toldToggle.value==="Told"){
      this.toldToggle.value="Not Told";
     
    }
    else{
      this.toldToggle.value="Told";
     
    }
   
  }

  editMethod(e){
    e.preventDefault()
    var form=new FormData(document.getElementById('editStoryForm'))
    
    form.append("id",this.props.currentStory.id)
    form.append("told",this.toldToggle.value==="Told"?"true":"false");
    
    const url=new URL('https://radmilatomic.pythonanywhere.com/api/changestory')
    const request=new Request(url,{
    method:'POST',
    body:form,
    mode:'cors'
   });
   fetch(request).then(()=>this.fetchStories())
     .catch(function(error){console.log(error);})
  }

  exitEdit(e){
    e.preventDefault();
    
    this.props.renderEditStory(false);
    //console.log(this.props.currentStory);
  }

  render() {
    if(this.props.editStory===true){
      
      
      return ReactDOM.createPortal(
        <form className='modal' id="editStoryForm">
          
          <div id="detailsWrapper">
            <div className="inline-field">
              <div id="showId">Edit description of story</div>
            </div>
            
            <div className="description-field"> <textarea id ="descriptionDetails" name="story" type="text"  defaultValue={this.props.currentStory.story} ref={(a) => this.inputTask = a}/></div>
            <div className="buttonsWrapper"> 
            
              <div> <input type="submit" id="visitedFlag" className="buttonDetails"  value={this.props.currentStory.told==="true"?"Told":"Not Told"} onClick={this.toggle} ref={(b) => this.toldToggle = b}/></div>
              <div className="detailsLabel">To tell by: </div>
              <select  ref={(a) => this.selectedUser = a} id="changeUser" name="to_tell_by">
                {this.props.admins.map((admin)=><option key={admin.id}>{admin.name}</option>)}
              </select>
            </div>
            <div className="buttonsWrapper">
              <input className="buttonDetails" type="submit" value="Change" onClick={this.editMethod}/>
              <input className="buttonDetails" type ="submit" value ="Exit" onClick={this.exitEdit}/>
            </div>
          </div>
        </form>,
      this.modalRoot
    );
  }
  return null
  }
}

const EditStory=connect(mapStateToProps,mapDispatchToProps)(ConnectedEditStory)
export default EditStory;