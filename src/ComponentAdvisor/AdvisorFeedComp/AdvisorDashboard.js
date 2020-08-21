import React, { Component } from "react";
import axios from "axios";
import AdvisorChart from "./AdvisorChart";
import AdvisorChart2 from "./AdvisorChart2";
import { Container, Row, Col, Card } from "react-bootstrap";
import ContentBox from "../../shared/components/UIElements/ContentBox";
export default class AdvisorDashboard extends Component {
  constructor(props) {
    super(props);
    this.getChartData = this.getChartData.bind(this);
    this.getChartData2 = this.getChartData2.bind(this);
    this.ChangeLocation = this.ChangeLocation.bind(this);
    this.state = {
      dataAllName: [],
      dataAllRatio: [],
      dataSpecificHosipitalName: [],
      dataSpecificProblemName: [],
      dataSpecificProblemRatio: [],
      locationArray: 0,
      chartData: {},
    };
  }
  ChangeLocation(e) {
    this.setState({
      locationArray: e.target.value,
    });
  }

  getChartData() {
    let label = this.state.dataAllName;
    let ratios = this.state.dataAllRatio;
    let chunkData = {
      labels: label,
      datasets: [
        {
          label: "",
          data: ratios,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
        },
      ],
    };
    return chunkData;
  }

  getChartData2() {
    let index = this.state.locationArray;
    let label = this.state.dataSpecificProblemName[index];
    let ratios = this.state.dataSpecificProblemRatio[index];
    let chunkData = {
      labels: label,
      datasets: [
        {
          label: "Case",
          data: ratios,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
        },
      ],
    };
    return chunkData;
  }
  componentDidMount() {
    let ArrayDataAllName;
    let ArrayDataAllRatio;
    let ArraySpecificHospitalName;
    let ArraySpecificProblemName;
    let ArraySpecificProblemRatio;

    axios
      .get("https://medical-express.herokuapp.com/api/dashboard")
      .then((response) => {
        ArrayDataAllName = response.data.data.all.map((item) => item.name);
        ArrayDataAllRatio = response.data.data.all.map((item) => item.ratio);
        ArraySpecificHospitalName = response.data.data.specific.map(
          (item) => item.hospital_name
        );
        ArraySpecificProblemName = response.data.data.specific.map((item) =>
          item.problem.map((item2) => [item2.name])
        );
        ArraySpecificProblemRatio = response.data.data.specific.map((item) =>
          item.problem.map((item2) => [item2.ratio])
        );

        this.setState({
          dataAllName: ArrayDataAllName,
          dataAllRatio: ArrayDataAllRatio,
          dataSpecificHosipitalName: ArraySpecificHospitalName,
          dataSpecificProblemName: ArraySpecificProblemName,
          dataSpecificProblemRatio: ArraySpecificProblemRatio,
        });

        console.log(this.state.dataSpecificHosipitalName);
        console.log(this.state.dataSpecificProblemName);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <Card style={{padding:15}}>
        <Card style={{padding:15}}>
          <AdvisorChart
            chartData={this.getChartData}
            location=""
            legendPosition="bottom"
          />
        </Card>
        <br/>
        <Card style={{padding:15}}>
          <div>
            <AdvisorChart2
              chartData={this.getChartData2}
              location={
                this.state.dataSpecificHosipitalName[this.state.locationArray]
              }
              legendPosition="bottom"
            />
          </div>
          <div >
            {this.state.dataSpecificHosipitalName.map((item, index) => (
              <div className="d-flex">
                <button className="align-self-start mr-auto" onClick={this.ChangeLocation} value={index}>
                  {item}
                </button>
              </div>
            ))}
          </div>
        </Card>
      </Card>
    );
  }
}
