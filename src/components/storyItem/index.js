import React, {Component} from 'react'
import { connect } from "react-redux";

import './style.css';


const mapStateToProps = state => {
  return { stories: state.stories,
            admins:state.admins };
};

class ConnectedStoryItem extends Component{

    render(){
      if(this.props.stories.length>0){
        const selectedAdmin=this.props.admins.filter(admin=>admin.id===this.props.item.to_tell_by)[0]
        return(
          <section className="table-row">
            
            <div style={{width:'40%'}}> <div id="taskId" style={{width:'30px'}}>{this.props.item.id} </div> {this.props.item.story} </div>
            <span style={{width:'150px'}} > {this.props.item.told==="true"? 'Yes ':'No '} </span>
            <span style={{width:'150px'}} id="task-assignee" onClick={this.showUserDetails}> {selectedAdmin.password}</span>
            <input style={{width:'85px'}} type="submit"  value="Edit Story" className="taskButton"/>
            <input style={{width:'85px'}} type="submit" value="Delete Story"  className="taskButton"/>
          </section>
            )
    }
    return null
  }
}
const StoryItem=connect(mapStateToProps)(ConnectedStoryItem)
export default StoryItem