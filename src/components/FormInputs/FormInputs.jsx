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

function FieldGroup({ label, ...props }) {
  return (
    <FormGroup>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}


function Dropdowngender({label,...props}){
  return(
    <FormGroup>
        <ControlLabel>{label}</ControlLabel>
      <FormControl   
              componentClass="select" placeholder="select">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
     </FormControl>
    </FormGroup>
  );
}
function Dropdownagegroup ({label,...props}){
  return(
    <FormGroup>
        <ControlLabel>{label}</ControlLabel>
      <FormControl   
              componentClass="select" placeholder="select">
            <option value="">Select AgeGroup</option>
            <option value="1">0-18</option>
            <option value="2">18-40</option>
            <option value="3">40-60</option>
            <option value="4">Above 60</option>
     </FormControl>
    </FormGroup>
  );
}
function Dropdowncountry ({label,...props}){
  return(
    <FormGroup>
        <ControlLabel>{label}</ControlLabel>
      <FormControl   
              componentClass="select" placeholder="select">
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="Australia">Australia</option>
            <option value="Srilanka">Srilanka</option>
            <option value="Newzealand">Newzealand</option>
            <option value="Russia">Russia</option>
            <option value="Canada">Canada</option>
            <option value="China">China</option>
            <option value="Brazil">Brazil</option>
            <option value="France">France</option>
     </FormControl>
    </FormGroup>
  );
}

export class FormInputs extends Component {
  render() {
    var row = [];
    for (var i = 0; i < this.props.ncols.length; i++) {
      if(this.props.properties[i].label==="Gender"){
        row.push(
          <div key={i} className={this.props.ncols[i]}>
            <Dropdowngender {...this.props.properties[i]}/>
          </div>
        );
      }
      else if(this.props.properties[i].label==="Country"){
        row.push(
          <div key={i} className={this.props.ncols[i]}>
            <Dropdowncountry {...this.props.properties[i]}/>
          </div>
        );
      }
      else if(this.props.properties[i].label==="Age Group"){
        row.push(
          <div key={i} className={this.props.ncols[i]}>
            <Dropdownagegroup {...this.props.properties[i]}/>
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