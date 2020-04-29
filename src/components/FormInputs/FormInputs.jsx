/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { FormGroup, ControlLabel, FormControl, Row } from "react-bootstrap";
//const options=[{value: 'select'}, {value: 'other'}]
const options=["All","Chroloquin","Remdisivir","Favilavir","Plasma"]
function FieldGroup({ label, ...props }) {
  return (
    <FormGroup>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}



function Dropdown ({label,optionlist,...props}){
  return(
    <FormGroup>
      <ControlLabel>{label}</ControlLabel>
      <FormControl   
        componentClass="select" placeholder="select">
          <option value="">Select </option>
          {
           optionlist.map((option, index) => {
           return (<option key={index} value={option}>{option}</option>)
            })
         }
     </FormControl>
    </FormGroup>
  );
}
export class FormInputs extends Component {
  render() {
    var row = [];
    for (var i = 0; i < this.props.ncols.length; i++) {
      if(this.props.properties[i].label==="Gender"||this.props.properties[i].label==="Age Group"
      ||this.props.properties[i].label==="Country"){
        row.push(
          <div key={i} className={this.props.ncols[i]}>
            <Dropdown {...this.props.properties[i]} />
          </div>
        );
      }
      else{
      row.push(
        <div key={i} className={this.props.ncols[i]}>
          <FieldGroup {...this.props.properties[i]} />
        </div>
      );}
    }
    return <Row>{row}</Row>;
  }
}

export default FormInputs;