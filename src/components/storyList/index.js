import React, {Component} from 'react'
import { connect } from "react-redux"; 

import StoryItem from '../storyItem'
import DeleteStory from "../deleteStory"
import EditStory from "../editStory"
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
            <div>
            <DeleteStory/>
            <EditStory/>
            <div className="table">
                
            {this.props.stories.map((item)=><StoryItem item={item} key={item.id}/>)}
            </div>
            </div>
            )
    }
}

const StoryList=connect(mapStateToProps)(ConnectedStoryList) 
export default StoryList