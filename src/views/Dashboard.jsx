import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col, DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar,
  covengersData
} from "variables/Variables.jsx";

class Dashboard extends Component {
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
  createCovengersLegend(json) {
    var legend = [];
    for (var i = 0; i < json["legends"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["legend"][i]);
    }
    return legend;
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={4} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-server text-warning" />}
                statsText="Total Patients"
                statsValue="10500"
                statsIcon={<i className="fa fa-users" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={4} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-success" />}
                statsText="Patients Treated"
                statsValue="7450"
                statsIcon={<i className="fa fa-stethoscope" />}
                statsIconText="Treated by drugs"
              />
            </Col>
            <Col lg={4} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-graph1 text-danger" />}
                statsText="Positive Response"
                statsValue="23"
                statsIcon={<i className="fa fa-thumbs-o-up" />}
                statsIconText="In the last hour"
              />
            </Col>
          </Row>

          <Row>
          <Col md={12}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Age Group"
                category="Patients data by Age"
                //stats="Campaign sent 2 days ago"
                content={
                  <div
                    id="covengersChartPreferences"
                    className="ct-chart"
                  >
                    <ChartistGraph data={covengersData.ageGroup} type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(covengersData.ageGroup)}</div>
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Filter by Age
              </Dropdown.Toggle>
               {/* 
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
               */}
            </Dropdown>
            
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Card 
                statsIcon="fa fa-clock-o"
                title="Age Distribution"
                category="Patients data by Age"
                //stats="Campaign sent 2 days ago"
                content={
                  <div
                    id="covengersAgeDistribution"
                    className="ct-chart"
                  >
                    <ChartistGraph data={covengersData.ageGroup} type="Pie" />
                  </div>
                }            
                legend={
                  <div className="legend">{this.createLegend(covengersData.ageGroup)}</div>
                }
              />
            </Col>
            <Col md={4}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Gender Distribution"
                category="Patients data by Age"
                //stats="Campaign sent 2 days ago"
                content={
                  <div
                    id="covengersGenderDistribution"
                    className="ct-chart"
                  >
                    <ChartistGraph data={covengersData.gender} type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(covengersData.gender)}</div>
                }
              />
            </Col>
            <Col md={4}>
                <Card
                  statsIcon="fa fa-clock-o"
                  title="Drug Response"
                  category="Patients data by Age"
                  //stats="Campaign sent 2 days ago"
                  content={
                    <div
                      id="covengersGenderDistribution"
                      className="ct-chart"
                    >
                      <ChartistGraph data={covengersData.ventilator} type="Pie" />
                    </div>
                  }
                  legend={
                    <div className="legend">{this.createLegend(covengersData.ventilator)}</div>
                  }
                />
              </Col>
          </Row>

          <Row>
          <Col md={12}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Country wise Distribution"
                category="Patients data by country"
                //stats="Campaign sent 2 days ago"
                content={
                  <div
                    id="covengersBarChartPreferences"
                    className="ct-chart"
                  >
                    <ChartistGraph 
                      data={covengersData.country} 
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

export default Dashboard;
