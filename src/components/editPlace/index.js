import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";

import { setPlaces, renderEditPlace } from "../../actions";
import './style.css';

const mapDispatchToProps = dispatch => {
  return {
    setPlaces: places => dispatch(setPlaces(places)),
    renderEditPlace: flag => dispatch(renderEditPlace(flag)),
  };
};

const mapStateToProps = state => {
  return { editPlace: state.editPlace,
            admins:state.admins,
            currentPlace:state.currentPlace,
             };
};

class ConnectedEditPlace extends Component {
  constructor(props) {
    super(props);
    
    this.exitEdit=this.exitEdit.bind(this);
    
    this.fetchPlaces=this.fetchPlaces.bind(this)
    this.setData=this.setData.bind(this)
    this.toggle=this.toggle.bind(this)
    this.modalRoot = document.getElementById('modal-root');
  }

  setData(responseData){
  console.log(responseData);
  this.props.setPlaces(responseData); 
 }

  fetchPlaces(){
    const url=new URL('https://radmilatomic.pythonanywhere.com/api/places')
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
    if(this.visitedToggle.value==="Visited"){
      this.visitedToggle.value="Not Visited";
    }
    else{
      this.visitedToggle.value="Visited";
    }
  }

  editMethod(e){
    e.preventDefault()
    var form=new FormData(document.getElementById('editPlaceForm'))
   const url=new URL('https://radmilatomic.pythonanywhere.com/api/changeplace')
   const request=new Request(url,{
    method:'POST',
    body:form,
    mode:'cors'
   });
   fetch(request).then(()=>this.fetchPlaces())
     .catch(function(error){console.log(error);})

  
  
  }

  exitEdit(e){
    e.preventDefault();
    
    this.props.renderEditPlace(false);
    //console.log(this.props.currentPlace);
  }

  render() {
    if(this.props.editPlace===true){
      
      
      return ReactDOM.createPortal(
        <form className='modal' id="editPlaceForm">
          <div id="detailsWrapper">
            <div className="inline-field">
              <div id="showId">Edit description of place</div>
            </div>
            
            <div className="description-field"> <textarea id ="descriptionDetails" name="place" type="text"  defaultValue={this.props.currentPlace.description} ref={(a) => this.inputTask = a}/></div>
            <div className="buttonsWrapper"> 
              <div> <input id="visitedFlag" type="submit" className="buttonDetails" name="visited" value={this.props.currentPlace.visited==="true"?"Visited":"Not Visited"} onClick={this.toggle} ref={(b) => this.visitedToggle = b}/></div>
              <div className="detailsLabel">Suggested_by: </div>
              <select  ref={(a) => this.selectedUser = a} id="changeUser" name="suggested_by">
                {this.props.admins.map((admin)=><option key={admin.id}>{admin.name}</option>)}
              </select>
            </div>
            <div className="buttonsWrapper">
              <input className="buttonDetails" type="submit" value="Change"/>
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

const EditPlace=connect(mapStateToProps,mapDispatchToProps)(ConnectedEditPlace)
export default EditPlace;