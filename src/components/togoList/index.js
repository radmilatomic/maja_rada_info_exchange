import React, {Component} from 'react'
import { connect } from "react-redux"; 

import TogoItem from '../togoItem'
import EditPlace from "../editPlace"
import DeletePlace from "../editPlace"
import './style.css';


const mapStateToProps = state => {
  return { places: state.places };
};

class ConnectedTogoList extends Component{
    render(){
        if(!this.props.places){
            return <div>Waiting for results</div>
        }
        return (
            <div>
            <DeletePlace/>
            <EditPlace/>
                <div className="table">
            {this.props.places.map((item)=><TogoItem item={item} key={item.id}/>)}
            </div>
            </div>
            )
    }
}

const TogoList=connect(mapStateToProps)(ConnectedTogoList) 
export default TogoList