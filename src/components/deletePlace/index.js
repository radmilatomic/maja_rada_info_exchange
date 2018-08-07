import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";

import { renderDeletePlace, setPlaces } from "../../actions";
import './style.css';

const mapDispatchToProps = dispatch => {
  return {
    renderDeletePlace: flag => dispatch(renderDeletePlace(flag)),
    setPlaces: places=>dispatch(setPlaces(places))
  };
};

const mapStateToProps = state => {
  return { deletePlace: state.deletePlace,
           placeToDelete:state.placeToDelete,
            
             };
};


class ConnectedDeletePlace extends Component {
  constructor(props) {
    super(props);
    this.exitDelete=this.exitDelete.bind(this);
    this.deleteMethod=this.deleteMethod.bind(this);
    this.fetchPlaces=this.fetchPlaces.bind(this)
    this.setData=this.setData.bind(this);
    this.modalRoot = document.getElementById('modal-root');
  }

  setData(responseData){
  console.log(responseData);
  this.props.setPlaces(responseData); 
 }

  exitDelete(){
    this.props.renderDeletePlace(false);
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

  deleteMethod(e){
    console.log("hello from deleteMethod");
    
    console.log("place will be deleted on this click")
    e.preventDefault()
    
    const url=new URL('https://radmilatomic.pythonanywhere.com/api/deleteplace/'+this.props.placeToDelete.id)
    const request=new Request(url,{
    method:'GET',
    mode:'no-cors'
   });

   fetch(request).then(()=>this.fetchPlaces())
     .catch(function(error){console.log(error);})

    this.props.renderDeletePlace(false);
  
  }

  render() {
    if(this.props.deletePlace===true){
      
      
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

const DeletePlace=connect(mapStateToProps,mapDispatchToProps)(ConnectedDeletePlace)
export default DeletePlace;