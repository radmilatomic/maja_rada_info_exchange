import React, {Component} from 'react'
import { connect } from "react-redux";
import { setStories,renderDeleteStory,renderEditStory,currentStorySet,story2Delete } from "../../actions";
import DeleteStory from "../deleteStory"
import './style.css';


const mapStateToProps = state => {
  return { stories: state.stories,
            admins:state.admins,
            deleteStory:state.deleteStory,
            editStory:state.editStory
          };
};

const mapDispatchToProps = dispatch => {
  return {
    setStories: stories => dispatch(setStories(stories)),
    renderDeleteStory:flag=>dispatch(renderDeleteStory(flag)),
    renderEditStory:flag=>dispatch(renderEditStory(flag)),
    currentStorySet:item=>dispatch(currentStorySet(item)),
    story2Delete:story=>dispatch(story2Delete(story)),
  };
};

class ConnectedStoryItem extends Component{
    constructor(props) {
    super(props);
    
    this.deleteStory=this.deleteStory.bind(this)
    this.fetchStories=this.fetchStories.bind(this)
    this.setData=this.setData.bind(this)
    this.editStory=this.editStory.bind(this)
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

  deleteStory(e){
    e.preventDefault();
    this.props.renderDeleteStory(true);
    this.props.story2Delete(this.props.item);
    console.log(this.props.storyToDelete)
  }

  editStory(e){
    console.log("Hello form edit story button");
    this.props.renderEditStory(true);
    this.props.currentStorySet(this.props.item);
    console.log(this.props.editStory);
    //console.log(this.props.currentPlace);
    //console.log(this.props.item);
  }

    render(){
      if(this.props.stories.length>0){
        const selectedAdmin=this.props.admins.filter(admin=>admin.id===this.props.item.to_tell_by)[0]
        return(
          <div>
          <DeleteStory item={this.props.item}/>
          <div className="story-item">
            
           
            <div className="storydiv"> {this.props.item.story} </div>
            <div className="bottom-details">
            <div className="story-details">
              <div style={{width:'150px'}} className="story-assignee" > Person to tell:{" "+selectedAdmin.name}</div>
              <div> Told? {this.props.item.told==="true"? 'Yes ':'No '} </div>
            </div>
            <div className="story-buttons">
              <input style={{width:'85px'}} type="submit"  value="Edit Story" className="storyButton" onClick={this.editStory}/>
              <input style={{width:'85px'}} type="submit" value="Delete"  className="storyButton" onClick={this.deleteStory}/>
            </div>
            </div>
          </div>
          </div>
            )
    }
    return null
  }
}
const StoryItem=connect(mapStateToProps,mapDispatchToProps)(ConnectedStoryItem)
export default StoryItem