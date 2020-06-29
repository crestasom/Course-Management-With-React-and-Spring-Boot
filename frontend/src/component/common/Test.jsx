import React, { Component } from 'react';
import AssignmentDataService from '../../service/AssignmentDataService';

export default class componentName extends Component {

    onClick=()=>{
        AssignmentDataService.getJscript().then(res=>{
         // let node=document.createElement("button")
        let g = document.createElement('div');
    g.setAttribute("id", "div1");
    g.innerHTML=res.data
        //  var textnode = document.createTextNode(res.data); 
            document.getElementById("div").appendChild(g)
        })
    }
  render() {
    return (

      <div> 
          <button onClick={this.onClick}>Click Here</button>
          <div id="div"></div>
           </div>
    );
  }
}
