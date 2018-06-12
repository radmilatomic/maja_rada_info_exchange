import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";

import { setPlaceInput } from "../../actions";
import './style.css';

const mapDispatchToProps = dispatch => {
  return {
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
  
    this.modalRoot = document.getElementById('modal-root');
  }



  

  exitAdd(e){
    e.preventDefault();
    
    this.props.setPlaceInput(false);
  }

  render() {
    if(this.props.showPlaceInput===true){
      
      
      return ReactDOM.createPortal(
        <form className='modal'>
          <div id="detailsWrapper">
            <div className="inline-field">
              <div id="showId">Add description of place</div>
            </div>
            
            <div className="description-field"> <textarea id ="descriptionDetails" type="text"  ref={(a) => this.inputTask = a}/></div>
            <div className="adminSelect"> 
              <div className="detailsLabel">Suggested_by: </div>
              <select  ref={(a) => this.selectedUser = a} id="changeUser">
                {this.props.admins.map((admin)=><option key={admin.id}>{admin.name}</option>)}
              </select>
            </div>
            <div className="buttonsWrapper">
              <input className="buttonDetails" type="submit" value="Add To List"/>
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