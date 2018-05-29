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
                <div className="table-row">
                    <div style={{width:'40%'}}>
                        <div id="taskId" style={{width:'30px'}}> ID </div> DESCRIPTION 
                    </div>
                    <span style={{width:'150px'}}>DONE</span>
                    <span style={{width:'150px'}}>ASSIGNEE</span>
                    <div style={{width:'130px'}}></div>
                    <div style={{width:'130px'}}></div>
                </div>
            {this.props.places.map((item)=><TogoItem item={item} key={item.id}/>)}
            </div>
            )
    }
}

const TogoList=connect(mapStateToProps)(ConnectedTogoList) 
export default TogoList