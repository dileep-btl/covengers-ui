import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col, ButtonGroup, Button } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { optionsBar, responsiveBar } from "variables/Variables.jsx";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      defaultFilter: "all",

      //Stats Card Data
      totalPatientsLabel: "",
      totalPatients: 0,
      patientsRespondedToDrugsLabel: "",
      patientsRespondedToDrugsLegend: "",
      patientsRespondedToDrugs: 0,
      PatientsWithDrugsLabel: "",
      patientsWithDrugsLegend: "",
      PatientsWithDrugs: 0,
      drugUsage: {},

      //Age Distribution Data
      ageDistributionData: {},

      //Gender Distribution Data
      genderDistributionData: {},

      //Drug Response Data
      drugResponseData: {},

      //Drug Response Data
      countryResponseData: {}
    };
  }

  async componentDidMount() {
    const url_drugstats = "http://3.134.99.156/dashboard";
    const response = await fetch(url_drugstats);
    const data = await response.json();
    //console.log(data);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ drug: "all" })
      body: JSON.stringify({ drug: this.state.defaultFilter })
    };
    const url_dashboarddetail = "http://3.134.99.156/dashboarddetail";
    const response_dashboarddetail = await fetch(
      url_dashboarddetail,
      requestOptions
    );
    const data_dashboarddetail = await response_dashboarddetail.json();
    //console.log(data_dashboarddetail);

    this.setState({
      isLoaded: true,
      //dashboardData: data.responseString,

      //Set Stats Card Data
      totalPatientsLabel: data.responseString.TotalPatients.labels[0],
      totalPatients: data.responseString.TotalPatients.series[0],
      patientsRespondedToDrugsLabel:
        data.responseString.PatientsRespondedToDrugs.labels[0],
      patientsRespondedToDrugs:
        data.responseString.PatientsRespondedToDrugs.series[0],
      patientsRespondedToDrugsLegend:
        data.responseString.PatientsRespondedToDrugs.legend[0],
      patientsWithDrugsLabel: data.responseString.PatientsWithDrugs.labels[0],
      patientsWithDrugs: data.responseString.PatientsWithDrugs.series[0],
      patientsWithDrugsLegend: data.responseString.PatientsWithDrugs.legend[0],

      //Set Drug Distribution Data
      drugUsage: data.responseString.drugUse,

      //Set Age Distribution Data
      ageDistributionData: data_dashboarddetail.responseString.ageGroup,

      //Set Gender Distribution Data
      genderDistributionData: data_dashboarddetail.responseString.gender,

      //Set Gender Distribution Data
      drugResponseData: data_dashboarddetail.responseString.ventilator,

      //Set Gender Distribution Data
      countryResponseData: {
        labels: data_dashboarddetail.responseString.country.legend,
        series: [data_dashboarddetail.responseString.country.series]
      }
    });

    //console.log(this.state.countryResponseData);
  }

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  createLegendNew(json) {
    var legend = [];
    var types = ["danger", "warning", "info", "error", ""];
    for (var i = 0; i < json["legend"].length; i++) {
      var type = "fa fa-circle text-" + types[i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["legend"][i]);
    }
    return legend;
  }

  //Render the Dashboard
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
              <Col lg={4} sm={6}>
                <StatsCard
                  bigIcon={<i className="pe-7s-server text-warning" />}
                  statsText={this.state.totalPatientsLabel}
                  statsValue={this.state.totalPatients}
                  statsIcon={<i className="fa fa-users" />}
                  statsIconText="Updated now"
                />
              </Col>
              <Col lg={4} sm={6}>
                <StatsCard
                  bigIcon={<i className="pe-7s-graph1 text-danger" />}
                  statsText={this.state.patientsWithDrugsLabel}
                  statsValue={this.state.patientsWithDrugs}
                  statsIcon={<i className="fa fa-thumbs-o-up" />}
                  statsIconText={this.state.patientsWithDrugsLegend}
                />
              </Col>
              <Col lg={4} sm={6}>
                <StatsCard
                  bigIcon={<i className="pe-7s-wallet text-success" />}
                  statsText={this.state.patientsRespondedToDrugsLabel}
                  statsValue={this.state.patientsRespondedToDrugs}
                  statsIcon={<i className="fa fa-stethoscope" />}
                  statsIconText={this.state.patientsRespondedToDrugsLegend}
                />
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Card
                  statsIcon="fa"
                  title="Drug Distribution"
                  category="Drug Distribution data"
                  //stats="Campaign sent 2 days ago"
                  content={
                    <div id="covengersChartPreferences" className="ct-chart">
                      <ChartistGraph data={this.state.drugUsage} type="Pie" />
                    </div>
                  }
                  legend={
                    <div className="legend">
                      {this.createLegendNew(this.state.drugUsage)}
                    </div>
                  }
                />
              </Col>
            </Row>

            <Row>
              <Col md={2}>
                <div>
                  <b>Filter by Drug:</b>
                </div>
              </Col>
              <Col md={7}>
                <ButtonGroup aria-label="Basic example">
                  <Button variant="secondary">All</Button>
                  <Button variant="secondary">Chloroquin</Button>
                  <Button variant="secondary">Remdisivir</Button>
                  <Button variant="secondary">Favilavir</Button>
                  <Button variant="secondary">Plasma</Button>
                </ButtonGroup>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md={4}>
                <Card
                  statsIcon="fa"
                  title="Age Distribution"
                  category="Patients data by Age"
                  //stats="Campaign sent 2 days ago"
                  content={
                    <div id="covengersAgeDistribution" className="ct-chart">
                      <ChartistGraph
                        data={this.state.ageDistributionData}
                        type="Pie"
                      />
                    </div>
                  }
                  legend={
                    <div className="legend">
                      {this.createLegendNew(this.state.ageDistributionData)}
                    </div>
                  }
                />
              </Col>
              <Col md={4}>
                <Card
                  statsIcon="fa"
                  title="Gender Distribution"
                  category="Patients data by Age"
                  //stats="Campaign sent 2 days ago"
                  content={
                    <div id="covengersGenderDistribution" className="ct-chart">
                      <ChartistGraph
                        data={this.state.genderDistributionData}
                        type="Pie"
                      />
                    </div>
                  }
                  legend={
                    <div className="legend">
                      {this.createLegendNew(this.state.genderDistributionData)}
                    </div>
                  }
                />
              </Col>
              <Col md={4}>
                <Card
                  statsIcon="fa"
                  title="Drug Response"
                  category="Patients data by Age"
                  //stats="Campaign sent 2 days ago"
                  content={
                    <div id="covengersGenderDistribution" className="ct-chart">
                      <ChartistGraph
                        data={this.state.drugResponseData}
                        type="Pie"
                      />
                    </div>
                  }
                  legend={
                    <div className="legend">
                      {this.createLegendNew(this.state.drugResponseData)}
                    </div>
                  }
                />
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Card
                  statsIcon="fa"
                  title="Country wise Distribution"
                  category="Patients data by country"
                  //stats="Campaign sent 2 days ago"
                  content={
                    <div id="covengersBarChartPreferences" className="ct-chart">
                      <ChartistGraph
                        data={this.state.countryResponseData}
                        type="Bar"
                        options={optionsBar}
                        responsiveOptions={responsiveBar}
                      />
                    </div>
                  }
                  /*
                legend={
                  <div className="legend">{this.createLegend(covengersData.country)}</div>
                }
                */
                />
              </Col>
            </Row>
          </Grid>
        </div>
      );
    }
  }
}

export default Dashboard;
