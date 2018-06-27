import React, {Component} from 'react'
import { connect } from "react-redux";
import { setStories } from "../../actions";

import './style.css';


const mapStateToProps = state => {
  return { stories: state.stories,
            admins:state.admins };
};

const mapDispatchToProps = dispatch => {
  return {
    setStories: stories => dispatch(setStories(stories)),
    
  };
};

class ConnectedStoryItem extends Component{
    constructor(props) {
    super(props);
    
    this.deleteStory=this.deleteStory.bind(this)
    this.fetchStories=this.fetchStories.bind(this)
    this.setData=this.setData.bind(this)
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
    console.log("story will be deleted on this click")
    e.preventDefault()
    
   const url=new URL('https://radmilatomic.pythonanywhere.com/api/deletestory/'+this.props.item.id)
   const request=new Request(url,{
    method:'GET',
    mode:'no-cors'
   });

   fetch(request).then(()=>this.fetchStories())
     .catch(function(error){console.log(error);})
  }

    render(){
      if(this.props.stories.length>0){
        const selectedAdmin=this.props.admins.filter(admin=>admin.id===this.props.item.to_tell_by)[0]
        return(
          <div className="story-item">
            
           
            <div className="storydiv"> {this.props.item.story} </div>
            <div className="bottom-details">
            <div className="story-details">
              <div style={{width:'150px'}} className="story-assignee" > Person to tell:{selectedAdmin.name}</div>
              <div> Told? {this.props.item.told==="true"? 'Yes ':'No '} </div>
            </div>
            <div className="story-buttons">
              <input style={{width:'85px'}} type="submit"  value="Edit Story" className="storyButton"/>
              <input style={{width:'85px'}} type="submit" value="Delete"  className="storyButton" onClick={this.deleteStory}/>
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