import React, {Component} from 'react'
import { connect } from "react-redux";
import { setPlaces } from "../../actions";

import './style.css';


const mapStateToProps = state => {
  return { places: state.places,
            admins:state.admins };
};

const mapDispatchToProps = dispatch => {
  return {
    setPlaces: places => dispatch(setPlaces(places)),
    
  };
};

class ConnectedTogoItem extends Component{

    constructor(props) {
    super(props);
    
    this.deletePlace=this.deletePlace.bind(this)
    this.fetchPlaces=this.fetchPlaces.bind(this)
    this.setData=this.setData.bind(this)
  }

  setData(responseData){
  console.log(responseData);
  this.props.setPlaces(responseData); 
 }

  fetchPlaces(){
    const url=new URL('http://radmilatomic.pythonanywhere.com/api/places')
   const request=new Request(url,{
    method:'GET',
    mode:'cors'
   });

   fetch(request).then(response=>
     response.json()).then(responseData=>this.setData(responseData))
     .catch(function(error){console.log(error);})
  }


  deletePlace(e){
    console.log("place will be deleted on this click")
    e.preventDefault()
    
   const url=new URL('http://radmilatomic.pythonanywhere.com/api/deleteplace/'+this.props.item.id)
   const request=new Request(url,{
    method:'GET',
    mode:'no-cors'
   });

   fetch(request).then(()=>this.fetchPlaces())
     .catch(function(error){console.log(error);})
  }



    render(){
      if(this.props.places.length>0){
        const selectedAdmin=this.props.admins.filter(admin=>admin.id===this.props.item.suggested_by)[0]
        return(
          <section className="table-row">
            
            <div style={{width:'40%'}}> <div id="taskId" style={{width:'30px'}}>{this.props.item.id} </div> {this.props.item.description} </div>
            <span style={{width:'150px'}} > {this.props.item.visited==="true"? 'Yes ':'No '} </span>
            <span style={{width:'150px'}} id="task-assignee" onClick={this.showUserDetails}> {selectedAdmin.name}</span>
            <input style={{width:'85px'}} type="submit"  value="Edit Plan" className="taskButton"/>
            <input style={{width:'85px'}} type="submit" value="Delete"  className="taskButton" onClick={this.deletePlace}/>
          </section>
            )
    }
    return null
  }
}
const TogoItem=connect(mapStateToProps, mapDispatchToProps)(ConnectedTogoItem)
export default TogoItem