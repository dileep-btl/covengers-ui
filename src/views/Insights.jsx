import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  Table,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { StatsCard } from "components/StatsCard/StatsCard.jsx";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import { thArray, tdArray, covengersData } from "variables/Variables.jsx";
import { insightHeader, insightData } from "variables/Variables.jsx";
import avatar from "assets/img/faces/face-3.jpg";
import { CORRELATION_API } from "variables/Variables.jsx";
const agegrouplist = covengersData.ageGroup.names;
const genderlist = covengersData.gender.names;
class Insights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ageGroup: "",
      gender: "",
      diabetes: 0,
      bp: 0,
      g6pd: 0,
      bcg: 0,
      insightData: [
        ["Chloroquine", 0],
        ["Remdesivir", 0],
        ["Favilavir", 0],
        ["Plasma", 0]
      ],
      insightHeader: ["Drug", "Success Rate"]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDataChange(event) {
    const value = event.target.value;

    this.setState({ [event.target.name]: event.target.value });
  }

  handleCheckboxChange(event) {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.setState({ [event.target.name]: 1 });
    } else {
      this.setState({ [event.target.name]: 0 });
    }
  }

  componentDidMount() {
    this.setState({
      isLoaded: true,
      ageGroup: agegrouplist[1],
      gender: genderlist[0],
      diabetes: 0,
      bp: 0,
      g6pd: 0,
      bcg: 0
    });
  }

  async handleSubmit(event) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ageGroup: this.state.ageGroup,
        gender: this.state.gender,
        diabetes: this.state.diabetes,
        bp: this.state.bp,
        g6pd: this.state.g6pd,
        bcg: this.state.bcg
      })
    };

    const url_insight = CORRELATION_API;
    const response_insight = await fetch(url_insight, requestOptions);
    const data_insight = await response_insight.json();
    console.log("Data:" + JSON.stringify(data_insight));

    this.setState({
      insightHeader: data_insight.header,
      insightData: data_insight.data
    });

    console.log("Data:" + this.state.insightData);
  }

  render() {
    var { isLoaded } = this.state;

    if (!isLoaded) {
      return (
        <div>
          <i>Loading...</i>
        </div>
      );
    } else {
      return (
        <div className="content">
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Card
                  title="Filters"
                  content={
                    <form>
                      <FormInputs
                        ncols={["col-md-6", "col-md-6"]}
                        properties={[
                          {
                            label: "Age Group",
                            type: "select",
                            bsClass: "form-control",
                            placeholder: "Age Group",
                            defaultValue: this.state.ageGroup,
                            name: "ageGroup",
                            optionlist: agegrouplist,
                            onChange: this.handleDataChange.bind(this)
                          },
                          {
                            label: "Gender",
                            type: "select",
                            bsClass: "form-control",
                            placeholder: "Gender",
                            defaultValue: this.state.gender,
                            name: "gender",
                            optionlist: genderlist,
                            onChange: this.handleDataChange.bind(this)
                          }
                        ]}
                      />
                      <FormInputs
                        ncols={["col-md-4", "col-md-4", "col-md-4"]}
                        properties={[
                          {
                            label: "Diabetes",
                            type: "checkbox",
                            bsClass: "form-control",
                            placeholder: "Diabetes",
                            defaultValue: "",
                            name: "diabetes",
                            onChange: this.handleCheckboxChange.bind(this)
                          },
                          {
                            label: "G6PD",
                            type: "checkbox",
                            bsClass: "form-control",
                            placeholder: "Gender",
                            defaultValue: "",
                            name: "g6pd",
                            onChange: this.handleCheckboxChange.bind(this)
                          },
                          {
                            label: "Blood Pressure",
                            type: "checkbox",
                            bsClass: "form-control",
                            placeholder: "Blood Pressure",
                            defaultValue: "",
                            name: "bp",
                            onChange: this.handleCheckboxChange.bind(this)
                          },
                          {
                            label: "BCG",
                            type: "checkbox",
                            bsClass: "form-control",
                            placeholder: "bcg",
                            defaultValue: "",
                            name: "bcg",
                            onChange: this.handleCheckboxChange.bind(this)
                          }
                        ]}
                      />
                      <div className="clearfix" />
                    </form>
                  }
                />
              </Col>
            </Row>
            <Col md={12}>
              <Button
                bsStyle="info"
                pullRight
                fill
                type="submit"
                onClick={this.handleSubmit}
              >
                Get Insights
              </Button>
            </Col>
            <div className="clearfix" />
            <br />
            <br />
            <Row>
              <Col md={12}>
                <Card
                  title="Success Rate"
                  content={
                    <Row>
                      <Col lg={3} sm={6}>
                        <StatsCard
                          bigIcon={<i className="pe-7s-server text-warning" />}
                          statsText={this.state.insightData[0][0]}
                          statsValue={this.state.insightData[0][1]}
                          statsIcon={<i className="fa fa-users" />}
                          statsIconText={this.state.insightData[0][0]}
                        />
                      </Col>
                      <Col lg={3} sm={6}>
                        <StatsCard
                          bigIcon={<i className="pe-7s-server text-warning" />}
                          statsText={this.state.insightData[1][0]}
                          statsValue={this.state.insightData[1][1]}
                          statsIcon={<i className="fa fa-users" />}
                          statsIconText={this.state.insightData[1][0]}
                        />
                      </Col>
                      <Col lg={3} sm={6}>
                        <StatsCard
                          bigIcon={<i className="pe-7s-server text-warning" />}
                          statsText={this.state.insightData[2][0]}
                          statsValue={this.state.insightData[2][1]}
                          statsIcon={<i className="fa fa-users" />}
                          statsIconText={this.state.insightData[2][0]}
                        />
                      </Col>
                      <Col lg={3} sm={6}>
                        <StatsCard
                          bigIcon={<i className="pe-7s-server text-warning" />}
                          statsText={this.state.insightData[3][0]}
                          statsValue={this.state.insightData[3][1]}
                          statsIcon={<i className="fa fa-users" />}
                          statsIconText={this.state.insightData[3][0]}
                        />
                      </Col>
                    </Row>
                  }
                />
                <div className="clearfix" />
              </Col>
            </Row>
          </Grid>
        </div>
      );
    }
  }
}

export default Insights;
