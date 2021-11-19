import React, { Component } from "react";
import ReactDOM from "react-dom";

const portalRoot = document.getElementById('portal');

export default class Portal extends Component{

    constructor(){
        super();
        this.el = document.createElement('div');
    }

    componentDidMount = () =>{
        if(portalRoot !== null){
            portalRoot.appendChild(this.el);
        }
    }
    componentWillMount = () =>{
        if(portalRoot !== null){
            if(portalRoot.contains(this.el)){
                portalRoot.removeChild(this.el);
            }
        }
    }

    render(){
       const {children} = this.props;
       return ReactDOM.createPortal(children, this.el);
    }
}