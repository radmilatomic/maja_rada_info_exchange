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
          <section className="table-row">
            
            <div style={{width:'40%'}}> <div id="taskId" style={{width:'30px'}}>{this.props.item.id} </div> {this.props.item.story} </div>
            <span style={{width:'150px'}} > {this.props.item.told==="true"? 'Yes ':'No '} </span>
            <span style={{width:'150px'}} id="task-assignee" onClick={this.showUserDetails}> {selectedAdmin.name}</span>
            <input style={{width:'85px'}} type="submit"  value="Edit Story" className="storyButton"/>
            <input style={{width:'85px'}} type="submit" value="Delete Story"  className="storyButton" onClick={this.deleteStory}/>
          </section>
            )
    }
    return null
  }
}
const StoryItem=connect(mapStateToProps,mapDispatchToProps)(ConnectedStoryItem)
export default StoryItem