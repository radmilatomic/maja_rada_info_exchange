import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";

import { setPlaces, setPlaceInput } from "../../actions";
import './style.css';

const mapDispatchToProps = dispatch => {
  return {
    setPlaces: places => dispatch(setPlaces(places)),
    setPlaceInput: flag => dispatch(setPlaceInput(flag)),
  };
};

const mapStateToProps = state => {
  return { showPlaceInput: state.showPlaceInput,
            admins:state.admins
             };
};

class ConnectedAddPlace extends Component {
  constructor(props) {
    super(props);
    
    this.exitAdd=this.exitAdd.bind(this);
    this.addMethod=this.addMethod.bind(this)
    this.fetchPlaces=this.fetchPlaces.bind(this)
    this.setData=this.setData.bind(this)
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

  addMethod(e){
    e.preventDefault()
    var form=new FormData(document.getElementById('form'))
   const url=new URL('https://radmilatomic.pythonanywhere.com/api/addplace')
   const request=new Request(url,{
    method:'POST',
    body:form,
    mode:'cors'
   });
   fetch(request).then(()=>this.fetchPlaces())
     .catch(function(error){console.log(error);})

  this.props.setPlaceInput(false);
  
  }


  

  exitAdd(e){
    e.preventDefault();
    
    this.props.setPlaceInput(false);
  }

  render() {
    if(this.props.showPlaceInput===true){
      
      
      return ReactDOM.createPortal(
        <form className='modal' id="form">
          <div id="detailsWrapper">
            <div className="inline-field">
              <div id="showId">Add description of place</div>
            </div>
            
            <div className="description-field"> <textarea id ="descriptionDetails" name="place" type="text"  ref={(a) => this.inputTask = a}/></div>
            <div className="adminSelect"> 
              <div className="detailsLabel">Suggested_by: </div>
              <select  ref={(a) => this.selectedUser = a} id="changeUser" name="suggested_by">
                {this.props.admins.map((admin)=><option key={admin.id}>{admin.name}</option>)}
              </select>
            </div>
            <div className="buttonsWrapper">
              <input className="buttonDetails" type="submit" value="Add To List" onClick={this.addMethod}/>
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

const AddPlace=connect(mapStateToProps,mapDispatchToProps)(ConnectedAddPlace)
export default AddPlace;