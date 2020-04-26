import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import { PREDICT_API } from "variables/Variables.jsx";
import { optionsBar, responsiveBar } from "variables/Variables.jsx";

class Recommendations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      age: 0,
      sugar: "",
      weight: "",
      cough: 0,
      cold: 0,
      fever: 0,
      sorethroat: 0,
      bodyache: 0,
      fatigue: 0,
      bcg: 0,
      bp: 0,
      g6pd: 0,
      icu: 0,
      ventilator: 0,
      chloroquin: 0,
      remdisivir: 0,
      favilavir: 0,
      plasma: 0,
      country: "",
      gender: "",
      insightsHeaders: [],
      insightsValues: [],
      drugRecommendations: {}
    };
  }

  handleDataChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCheckboxChange(event) {
    const isChecked = event.target.checked;
    // alert(isChecked);

    if (isChecked) {
      this.setState({ [event.target.name]: 1 });
    } else {
      this.setState({ [event.target.name]: 0 });
    }
  }

  async componentDidMount() {
    this.setState({
      isLoaded: true,
      //dashboardData: data.responseString,

      age: "",
      sugar: "",
      weight: "",
      cough: 0,
      cold: 0,
      fever: 0,
      sorethroat: 0,
      bodyache: 0,
      fatigue: 0,
      bcg: 0,
      bp: 0,
      g6pd: 0,
      icu: 0,
      ventilator: 0,
      chloroquin: 0,
      remdisivir: 0,
      favilavir: 0,
      plasma: 0,
      country: "",
      gender: "",
      insightsHeaders: [],
      insightsValues: [],
      drugRecommendations: {}
    });

    //alert("component mounted");
  }

  async handleSubmit(event) {
    //console.log(this.state);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([
        {
          age: this.state.age,
          sugar: this.state.sugar,
          weight: this.state.weight,
          cough: this.state.cough,
          cold: this.state.cough,
          fever: this.state.fever,
          sorethroat: this.state.sorethroat,
          bodyache: this.state.bodyache,
          fatigue: this.state.fatigue,
          bcg: this.state.bcg,
          bp: this.state.bp,
          g6pd: this.state.g6pd,
          icu: this.state.icu,
          ventilator: this.state.ventilator,
          chloroquin: this.state.chloroquin,
          remdisivir: this.state.remdisivir,
          favilavir: this.state.favilavir,
          plasma: this.state.plasma,
          country: this.state.country,
          gender: this.state.gender
        }
      ])
    };

    const url_recommendation = PREDICT_API;

    //For Local Testing
    //const url_recommendation = "http://127.0.0.1:12345/predict";

    const response_recommendation = await fetch(
      url_recommendation,
      requestOptions
    );
    const data_recommendation = await response_recommendation.json();
    console.log(data_recommendation.responseString.values);

    this.setState({
      insightsHeaders: data_recommendation.responseString.labels,
      insightsValues: [data_recommendation.responseString.values],
      drugRecommendations: {
        labels: data_recommendation.responseString.labels,
        series: [data_recommendation.responseString.values]
      }
    });
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
              <Col md={8}>
                <Card
                  title="Patient Details"
                  content={
                    <FormInputs
                      ncols={["col-md-3", "col-md-3", "col-md-3", "col-md-3"]}
                      properties={[
                        {
                          label: "Age",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "Age",
                          defaultValue: this.state.age,
                          name: "age",
                          onChange: this.handleDataChange.bind(this)
                        },
                        {
                          label: "Country",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Country",
                          defaultValue: this.state.country,
                          name: "country",
                          onChange: this.handleDataChange.bind(this)
                        },
                        {
                          label: "Gender",
                          type: "select",
                          bsClass: "form-control",
                          placeholder: "Gender",
                          defaultValue: this.state.gender,
                          name: "gender",
                          onChange: this.handleDataChange.bind(this)
                        },
                        {
                          label: "Weight (Pounds)",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "",
                          defaultValue: this.state.weight,
                          name: "weight",
                          onChange: this.handleDataChange.bind(this)
                        }
                      ]}
                    />
                  }
                />
                <Card
                  title="Health Records"
                  content={
                    <FormInputs
                      ncols={[
                        "col-md-4",
                        "col-md-4",
                        "col-md-4",
                        "col-md-4",
                        "col-md-4",
                        "col-md-4",
                        "col-md-4",
                        "col-md-4",
                        "col-md-4"
                      ]}
                      properties={[
                        {
                          label: "Sugar",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Sugar",
                          defaultValue: this.state.sugar,
                          name: "sugar",
                          onChange: this.handleDataChange.bind(this)
                        },
                        {
                          label: "G6PD",
                          type: "checkbox",
                          bsClass: "form-control",
                          placeholder: "Age",
                          defaultValue: this.state.age,
                          name: "g6pd",
                          onChange: this.handleCheckboxChange.bind(this)
                        },
                        {
                          label: "High Blood Pressure",
                          type: "checkbox",
                          bsClass: "form-control",
                          placeholder: "High Blood Pressure",
                          defaultValue: this.state.bp,
                          name: "bp",
                          onChange: this.handleCheckboxChange.bind(this)
                        },
                        {
                          label: "Cough",
                          type: "checkbox",
                          bsClass: "form-control",
                          placeholder: "Cough",
                          defaultValue: this.state.cough,
                          name: "cough",
                          onChange: this.handleCheckboxChange.bind(this)
                        },
                        {
                          label: "Cold",
                          type: "checkbox",
                          bsClass: "form-control",
                          placeholder: "Cold",
                          defaultValue: this.state.cold,
                          name: "cold",
                          onChange: this.handleCheckboxChange.bind(this)
                        },
                        {
                          label: "Fever",
                          type: "checkbox",
                          bsClass: "form-control",
                          placeholder: "Fever",
                          defaultValue: this.state.fever,
                          name: "fever",
                          onChange: this.handleCheckboxChange.bind(this)
                        },
                        {
                          label: "Sore Throat",
                          type: "checkbox",
                          bsClass: "form-control",
                          placeholder: "Sore Throat",
                          defaultValue: this.state.sorethroat,
                          name: "sorethroat",
                          onChange: this.handleCheckboxChange.bind(this)
                        },
                        {
                          label: "Bodyache",
                          type: "checkbox",
                          bsClass: "form-control",
                          placeholder: "Bodyache",
                          defaultValue: this.state.bodyache,
                          name: "bodyache",
                          onChange: this.handleCheckboxChange.bind(this)
                        },
                        {
                          label: "Fatigue",
                          type: "checkbox",
                          bsClass: "form-control",
                          placeholder: "Fatigue",
                          defaultValue: this.state.fatigue,
                          name: "fatigue",
                          onChange: this.handleCheckboxChange.bind(this)
                        }
                      ]}
                    />
                  }
                />
                <Card
                  title="Treatments"
                  content={
                    <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "BCG",
                          type: "checkbox",
                          bsClass: "form-control",
                          placeholder: "BCG",
                          defaultValue: this.state.bcg,
                          name: "bcg",
                          onChange: this.handleCheckboxChange.bind(this)
                        },
                        {
                          label: "ICU",
                          type: "checkbox",
                          bsClass: "form-control",
                          placeholder: "ICU",
                          defaultValue: this.state.icu,
                          name: "icu",
                          onChange: this.handleCheckboxChange.bind(this)
                        },
                        {
                          label: "Ventilator",
                          type: "checkbox",
                          bsClass: "form-control",
                          placeholder: "Ventlator",
                          defaultValue: this.state.ventilator,
                          name: "ventilator",
                          onChange: this.handleCheckboxChange.bind(this)
                        }
                      ]}
                    />
                  }
                />
                <Button
                  bsStyle="info"
                  pullRight
                  fill
                  type="submit"
                  onClick={() => {
                    this.handleSubmit();
                  }}
                >
                  Get Insights
                </Button>
                <div className="clearfix" />
              </Col>
              <Col md={4}>
                <Row>
                  <Col md={12}>
                    <Card
                      statsIcon="fa"
                      title="Drug Efficacy Score"
                      category="Drug recommendations"
                      //stats="Campaign sent 2 days ago"
                      content={
                        <div
                          id="covengersBarChartPreferences"
                          className="ct-chart"
                        >
                          <ChartistGraph
                            data={this.state.drugRecommendations}
                            type="Bar"
                            options={optionsBar}
                            responsiveOptions={responsiveBar}
                          />
                        </div>
                      }
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Grid>
        </div>
      );
    }
  }
}

export default Recommendations;
