import React, {Component} from 'react'
import { connect } from "react-redux"; 

import StoryItem from '../storyItem'

import './style.css';


const mapStateToProps = state => {
  return { stories: state.stories };
};

class ConnectedStoryList extends Component{
    render(){
        if(!this.props.stories){
            return <div>Waiting for results</div>// ovo radimo da nam ne pukne aplikacija ako nema nista u store-u
        }
        return (
            <div className="table">
                <div className="table-row">
                    <div style={{width:'40%'}}>
                        <div id="taskId" style={{width:'30px'}}> ID </div> DESCRIPTION 
                    </div>
                    <span style={{width:'150px'}}>DONE</span>
                    <span style={{width:'150px'}}>ASSIGNEE</span>
                    <div style={{width:'130px'}}></div>
                    <div style={{width:'130px'}}></div>
                </div>
            {this.props.stories.map((item)=><StoryItem item={item} key={item.id}/>)}
            </div>
            )
    }
}

const StoryList=connect(mapStateToProps)(ConnectedStoryList) 
export default StoryList