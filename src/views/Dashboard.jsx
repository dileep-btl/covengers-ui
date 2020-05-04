import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col, DropdownButton, MenuItem } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import {
  colorCodes,
  DASHBOARD_API,
  DASHBOARD_DETAIL_API
} from "variables/Variables.jsx";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
const options = ["All", "Chloroquine", "Remdisivir", "Favilavir", "Plasma"];
const names = ["all", "chloroquin", "remdisivir", "favilavir", "plasma"];
const legendColors = colorCodes.codes;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: options[0],
      // selectedName:names[0],
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

      //Drug Distribution Data
      drugUsage: {},
      drugUsageChartData: {},

      //Age Distribution Data
      ageDistributionData: {},
      ageDistributionChartData: {},

      //Gender Distribution Data
      genderDistributionData: {},
      genderDistributionChartData: {},

      //BCG Distribution Data
      bcgDistributionData: {},
      bcgDistributionChartData: {},

      //Drug Response Data
      drugResponseData: {},

      //Country Response Data
      countryResponseData: {},
      countryResponseChartData: {},

      legendPosition: "bottom"
    };
    this.handleFilter = this.handleFilter.bind(this);
    //this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(eventKey, event) {
    //this.setState({selectedName:names[eventKey]});
    //console.log(eventKey+"  "+names[eventKey]+"  "+this.state.selectedName);
    this.setState({ selectedOption: options[eventKey] });
    this.handleFilter(eventKey);
    //console.log(eventKey+" "+ options[eventKey]+"  "+this.state.selectedOption);
  }
  async componentDidMount() {
    const url_drugstats = DASHBOARD_API;
    const response = await fetch(url_drugstats);
    const data = await response.json();
    //console.log(data);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ drug: "all" })
      body: JSON.stringify({ drug: this.state.defaultFilter })
    };
    const url_dashboarddetail = DASHBOARD_DETAIL_API;
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
      drugUsageChartData: {
        labels: data.responseString.drugUse.legend,
        datasets: [
          {
            data: data.responseString.drugUse.series,
            backgroundColor: legendColors
          }
        ]
      },

      //Set Age Distribution Data
      ageDistributionData: data_dashboarddetail.responseString.ageGroup,
      ageDistributionChartData: {
        labels: data_dashboarddetail.responseString.ageGroup.legend,
        datasets: [
          {
            data: data_dashboarddetail.responseString.ageGroup.series,
            backgroundColor: legendColors
          }
        ]
      },

      //Set Gender Distribution Data
      genderDistributionData: data_dashboarddetail.responseString.gender,
      genderDistributionChartData: {
        labels: data_dashboarddetail.responseString.gender.legend,
        datasets: [
          {
            data: data_dashboarddetail.responseString.gender.series,
            backgroundColor: legendColors
          }
        ]
      },

      //Set BCG Distribution Data
      bcgDistributionData: data_dashboarddetail.responseString.bcg,
      bcgDistributionChartData: {
        labels: data_dashboarddetail.responseString.bcg.legend,
        datasets: [
          {
            data: data_dashboarddetail.responseString.bcg.series,
            backgroundColor: legendColors
          }
        ]
      },

      //Set Ventilator Distribution Data
      drugResponseData: data_dashboarddetail.responseString.ventilator,
      drugResponseChartData: {
        labels: data_dashboarddetail.responseString.ventilator.legend,
        datasets: [
          {
            data: data_dashboarddetail.responseString.ventilator.series,
            backgroundColor: legendColors
          }
        ]
      },

      //Set Country Distribution Data
      countryResponseData: {
        labels: data_dashboarddetail.responseString.country.legend,
        series: [data_dashboarddetail.responseString.country.series]
      },

      countryResponseChartData: {
        labels: data_dashboarddetail.responseString.country.legend,
        datasets: [
          {
            data: data_dashboarddetail.responseString.country.series,
            backgroundColor: legendColors
          }
        ]
      }
    });

    //console.log(this.state.countryResponseData);
  }

  async handleFilter(eventKey) {
    //console.log(names[eventKey]);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ drug: "all" })
      body: JSON.stringify({ drug: names[eventKey] })
    };
    const response_dashboarddetail = await fetch(
      DASHBOARD_DETAIL_API,
      requestOptions
    );

    const data_dashboarddetail = await response_dashboarddetail.json();
    //console.log(JSON.stringify(data_dashboarddetail));

    this.setState({
      isLoaded: true,

      //Set Age Distribution Data
      ageDistributionData: data_dashboarddetail.responseString.ageGroup,
      ageDistributionChartData: {
        labels: data_dashboarddetail.responseString.ageGroup.legend,
        datasets: [
          {
            data: data_dashboarddetail.responseString.ageGroup.series,
            backgroundColor: legendColors
          }
        ]
      },

      //Set Gender Distribution Data
      genderDistributionData: data_dashboarddetail.responseString.gender,
      genderDistributionChartData: {
        labels: data_dashboarddetail.responseString.gender.legend,
        datasets: [
          {
            data: data_dashboarddetail.responseString.gender.series,
            backgroundColor: legendColors
          }
        ]
      },

      //Set BCG Vaccination Distribution Data
      bcgDistributionData: data_dashboarddetail.responseString.bcg,
      bcgDistributionChartData: {
        labels: data_dashboarddetail.responseString.bcg.legend,
        datasets: [
          {
            data: data_dashboarddetail.responseString.bcg.series,
            backgroundColor: legendColors
          }
        ]
      },

      //Set Drug Response Distribution Data
      drugResponseData: data_dashboarddetail.responseString.ventilator,
      drugResponseChartData: {
        labels: data_dashboarddetail.responseString.ventilator.legend,
        datasets: [
          {
            data: data_dashboarddetail.responseString.ventilator.series,
            backgroundColor: legendColors
          }
        ]
      },

      //Set Country Distribution Data
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
    //var types = ["#6188e2", "#a748ca", "warning", "error", "danger"];
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
                  statsIconText="Total patients"
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
                  /*
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
                  */
                  content={
                    <div id="covengersChartPreferences" className="ct-chart">
                      <Doughnut
                        data={this.state.drugUsageChartData}
                        options={{
                          title: {
                            display: false,
                            text: "",
                            fontSize: 25
                          },
                          legend: {
                            display: true,
                            position: this.state.legendPosition
                          },
                          label: {
                            display: true,
                            render: "percentage",
                            fontColor: ["green", "white", "red"],
                            precision: 2
                          },
                          labels: {
                            render: "percentage",
                            //fontColor: ["green", "white", "red"],
                            precision: 2
                          },
                          maintainAspectRatio: false
                        }}
                      />
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
              <Col md={2}>
                <div>
                  <DropdownButton
                    id="dropdown-basic-button"
                    title={this.state.selectedOption}
                    onSelect={this.handleSelect.bind(this)}
                  >
                    {options.map((opt, i) => (
                      <MenuItem key={i} eventKey={i}>
                        {opt}
                      </MenuItem>
                    ))}
                  </DropdownButton>
                </div>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md={3}>
                <Card
                  statsIcon="fa"
                  title="Age Distribution"
                  category="Patients data by Age"
                  //stats="Campaign sent 2 days ago"
                  /*
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
                  */
                  content={
                    <div id="covengersAgeDistribution" className="ct-chart">
                      <Pie
                        data={this.state.ageDistributionChartData}
                        options={{
                          title: {
                            display: false,
                            text: "",
                            fontSize: 25
                          },
                          legend: {
                            display: true,
                            position: this.state.legendPosition
                          },
                          label: {
                            display: true
                          },
                          maintainAspectRatio: false
                        }}
                      />
                    </div>
                  }
                />
              </Col>
              <Col md={3}>
                <Card
                  statsIcon="fa"
                  title="Gender Distribution"
                  category="Patients data by Gender"
                  //stats="Campaign sent 2 days ago"
                  /*
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
                  */
                  content={
                    <div id="covengersGenderDistribution" className="ct-chart">
                      <Pie
                        data={this.state.genderDistributionChartData}
                        options={{
                          title: {
                            display: false,
                            text: "",
                            fontSize: 25
                          },
                          legend: {
                            display: true,
                            position: this.state.legendPosition
                          },
                          label: {
                            display: true
                          },
                          maintainAspectRatio: false
                        }}
                      />
                    </div>
                  }
                />
              </Col>

              <Col md={3}>
                <Card
                  statsIcon="fa"
                  title="Drug Response"
                  category="Patients data by Drug response"
                  //stats="Campaign sent 2 days ago"
                  /*
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
                  */
                  content={
                    <div id="covengersDrugDistribution" className="ct-chart">
                      <Pie
                        data={this.state.drugResponseChartData}
                        options={{
                          title: {
                            display: false,
                            text: "",
                            fontSize: 25
                          },
                          legend: {
                            display: true,
                            position: this.state.legendPosition
                          },
                          label: {
                            display: true
                          },
                          maintainAspectRatio: false
                        }}
                      />
                    </div>
                  }
                />
              </Col>
              <Col md={3}>
                <Card
                  statsIcon="fa"
                  title="BCG Vaccination"
                  category="Patients vaccinated with BCG"
                  //stats="Campaign sent 2 days ago"
                  /*
                  content={
                    <div id="covengersGenderDistribution" className="ct-chart">
                      <ChartistGraph
                        data={this.state.bcgDistributionData}
                        type="Pie"
                      />
                    </div>
                  }
                  legend={
                    <div className="legend">
                      {this.createLegendNew(this.state.bcgDistributionData)}
                    </div>
                  }
                  */

                  content={
                    <div id="covengersGenderDistribution" className="ct-chart">
                      <Pie
                        data={this.state.bcgDistributionChartData}
                        options={{
                          title: {
                            display: false,
                            text: "",
                            fontSize: 25
                          },
                          legend: {
                            display: true,
                            position: this.state.legendPosition
                          },
                          label: {
                            display: true
                          },
                          maintainAspectRatio: false
                        }}
                      />
                    </div>
                  }
                />
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Card
                  statsIcon="fa"
                  title="Country Wise Distribution"
                  category="Patients data by country"
                  //stats="Campaign sent 2 days ago"
                  content={
                    <div id="covengersBarChartPreferences" className="ct-chart">
                      {/*}
                      <ChartistGraph
                        data={this.state.countryResponseData}
                        type="Bar"
                        options={optionsBar}
                        responsiveOptions={responsiveBar}
                      />

                      legend={
                        <div className="legend">{this.createLegend(covengersData.country)}</div>
                      }
                      */}
                      <Bar
                        data={this.state.countryResponseChartData}
                        options={{
                          title: {
                            display: false,
                            text: "",
                            fontSize: 25
                          },
                          legend: {
                            display: false,
                            position: this.props.legendPosition
                          },
                          maintainAspectRatio: false
                        }}
                      />
                    </div>
                  }
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
