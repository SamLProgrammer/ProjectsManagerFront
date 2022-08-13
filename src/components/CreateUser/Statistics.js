import React, { Component } from "react";
import Item from "../Login/components/Item";
import { TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Select from "react-select";
import { Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";

const currentTime = new Date();

export default class Statistics extends Component {
  constructor() {
    super();
    this.state = {
      initial_date: currentTime,
      final_date: currentTime,
      currentIdUser: 0,
      nameList: [],
      userList: [],
      hourWork: [],
    };
  }

  getAllUsers() {
    let baseUrl = "https://projectsmanagerfront.herokuapp.com/getUsers";
    let auxList = [];
    axios
      .get(baseUrl)
      .then((response) => {
        this.setState({ userList: response.data });
        response.data.map((celda) => {
          auxList.push({ label: celda.User_Name, id: celda.User_Id });
        });
        this.setState({ nameList: auxList });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount = () => {
    this.getAllUsers();
  };

  handleChangeInitialDate = (value) => {
    let newDate = value.toISOString();
    this.setState({ initial_date: newDate });
  };

  handleChangeFinalDate = (value) => {
    let newDate = value.toISOString();
    this.setState({ final_date: newDate });
  };

  handleList = (value) => {
    console.log(value);
    this.setState({ currentIdUser: value.id });
    console.log("el id actual es: ", this.state.currentIdUser);
  };

  sendParametersEmployee(userId) {
    console.log("Envia información del  usuario");
    let url = "https://projectsmanagerfront.herokuapp.com/hoursStatsPerUser";
    axios
      .post(url, {
        initial_time: this.state.initial_date,
        final_time: this.state.final_date,
        user_id: userId,
      })
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          this.setState({ hourWork: response.data });
          console.log(this.state.hourWork);
        }
      });
  }

  render() {
    return (
      <div className="Table">
        <h3 className="LabelTitleComponent">Estadisticas</h3>
        <div className="statistics">
          <div className="item-statistics">
            <LocalizationProvider  dateAdapter={AdapterMoment}>
              <Item text="Fecha de inicio" />
              <DesktopDatePicker className= "date"
                inputFormat="DD/MM/yyyy"
                value={this.state.initial_date}
                onChange={this.handleChangeInitialDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            </div>
            <div className="item-statistics">
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <Item text="Fecha final" />
              <DesktopDatePicker
                inputFormat="DD/MM/yyyy"
                value={this.state.final_date}
                onChange={this.handleChangeFinalDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          <div className="item-statistics">
            <Item text="Usuario" />
            <Select
              className="select"
              options={this.state.nameList}
              onChange={this.handleList}
            />
          </div>
          <div className="item-statistics">
            <Button
            className="button"
              variant="contained"
              color="primary"
              startIcon={<SearchIcon />}
              onClick={() =>
                this.sendParametersEmployee(this.state.currentIdUser)
              }
            >
              Buscar
            </Button>
          </div>
          </div>
        </div>
        <div>
          <h5 className="LabelTitleComponent">
            Horas Trabajadas: {this.state.hourWork.worked_hours}
          </h5>
          <h5 className="LabelTitleComponent">
            Horas Agendadas: {this.state.hourWork.pending_hours}
          </h5>
          <h5 className="LabelTitleComponent">
            Horas No Trabajadas: {this.state.hourWork.not_worked_hours}
          </h5>
        </div>
      </div>
    );
  }
}
