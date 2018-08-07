import React, {Component} from 'react'
import { connect } from "react-redux";
import { setPlaces,renderDeletePlace,renderEditPlace,currentPlaceSet } from "../../actions";
import DeletePlace from "../deletePlace"

import './style.css';


const mapStateToProps = state => {
  return { places: state.places,
            admins:state.admins,
            deletePlace:state.deletePlace,
            currentPlace:state.currentPlace };
};

const mapDispatchToProps = dispatch => {
  return {
    setPlaces: places => dispatch(setPlaces(places)),
    renderDeletePlace:flag=>dispatch(renderDeletePlace(flag)),
    renderEditPlace:flag=>dispatch(renderEditPlace(flag)),
    currentPlaceSet:item=>dispatch(currentPlaceSet(item)),
  };
};

class ConnectedTogoItem extends Component{

    constructor(props) {
    super(props);
    
    this.deletePlace=this.deletePlace.bind(this)
    this.fetchPlaces=this.fetchPlaces.bind(this)
    this.setData=this.setData.bind(this)
    this.editPlace=this.editPlace.bind(this)
  }

  setData(responseData){
  console.log(responseData);
  this.props.setPlaces(responseData); 
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


  deletePlace(e){
    console.log("hello from delete Place")
    this.props.renderDeletePlace(true);
    console.log(this.props.deletePlace)
  }

  editPlace(e){
    //console.log("Hello form edit place button");
    this.props.renderEditPlace(true);
    this.props.currentPlaceSet(this.props.item);
    //console.log(this.props.currentPlace);
    //console.log(this.props.item);
  }


    render(){
      if(this.props.places.length>0){
        const selectedAdmin=this.props.admins.filter(admin=>admin.id===this.props.item.suggested_by)[0]
        return(
          <div>
         
          
          <div className="place-item">
            
            <div className="placediv">  {this.props.item.description} </div>
             <div className="bottom-details">
             <div className="place-details">
             <div className="place-assignee">Suggested by: {" "+selectedAdmin.name}</div>
            <div > Visited?{this.props.item.visited==="true"? ' Yes ':' No '} </div>
            </div>
            <div className="place-buttons">
            <input style={{width:'85px'}} type="submit"  value="Edit Plan" className="placeButton" onClick={this.editPlace}/>
            <input style={{width:'85px'}} type="submit" value="Delete"  className="placeButton" onClick={this.deletePlace}/>
          </div>
          </div>
          </div>
          </div>
            )
    }
    return null
  }
}
const TogoItem=connect(mapStateToProps, mapDispatchToProps)(ConnectedTogoItem)
export default TogoItem