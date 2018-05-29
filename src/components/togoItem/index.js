import React, {Component} from 'react'
import { connect } from "react-redux";

import './style.css';


const mapStateToProps = state => {
  return { places: state.places,
            admins:state.admins };
};

class ConnectedTogoItem extends Component{

    render(){
      if(this.props.places.length>0){
        const selectedAdmin=this.props.admins.filter(admin=>admin.id===this.props.item.suggested_by)[0]
        return(
          <section className="table-row">
            
            <div style={{width:'40%'}}> <div id="taskId" style={{width:'30px'}}>{this.props.item.id} </div> {this.props.item.description} </div>
            <span style={{width:'150px'}} > {this.props.item.visited==="true"? 'Yes ':'No '} </span>
            <span style={{width:'150px'}} id="task-assignee" onClick={this.showUserDetails}> {selectedAdmin.password}</span>
            <input style={{width:'85px'}} type="submit"  value="Edit Plan" className="taskButton"/>
            <input style={{width:'85px'}} type="submit" value="Delete"  className="taskButton"/>
          </section>
            )
    }
    return null
  }
}
const TogoItem=connect(mapStateToProps)(ConnectedTogoItem)
export default TogoItem