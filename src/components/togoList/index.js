import React, {Component} from 'react'
import { connect } from "react-redux"; 

import TogoItem from '../togoItem'

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
            
                <div className="table">
            {this.props.places.map((item)=><TogoItem item={item} key={item.id}/>)}
            </div>
            )
    }
}

const TogoList=connect(mapStateToProps)(ConnectedTogoList) 
export default TogoList