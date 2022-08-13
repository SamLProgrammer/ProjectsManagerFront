import React, { Component, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "universal-cookie";
import { formatPriority, formatStatus } from "../../utilities";
import { TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default class ActivityList extends Component {
  constructor() {
    super();
    this.state = {
      activitys: [],
      users: [],
      activitiesAssignment: [],
      currentDate: new Date(),
      finalizationDate: '',
    };
  }

  getActivitiesPerProject() {
    const cookies = new Cookies();
    let baseUrl = "http://localhost:1337/getActivity";
    let projectId = cookies.get("currentProjectId");
    let data = { project_id: projectId };
    axios
      .post(baseUrl, data)
      .then((response) => {
        console.log(response.data);
        this.setState({ activitys: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getAllUsers() {
    let baseUrl = "http://localhost:1337/getUsers";
    axios
      .get(baseUrl)
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  userAssign(userId) {
    let auxUser = this.state.users.find((user) => user.User_Id === userId);
    console.log(this.state.users)
    console.log("usuario asignado es");
    // console.log(auxUser);
    // if(auxUser.hasOwnProperty(auxUser.User_Name)){
    //   return auxUser.User_Name;
    // }
    // return '.';
  }

  componentDidMount = () => {
    this.getActivitiesPerProject();
    this.getAllUsers();
  };

  sendAsignament = (activityId, userId, finalDate) => {
    console.log(activityId, userId);
    let data = {activity_id: activityId,
      user_id: userId,
      initial_time: new Date(),
      final_time: finalDate,}
    let baseUrl = "http://localhost:1337/assignActivityToUser";
    axios.post(baseUrl, data);
    console.log("envio de assigment")
    console.log(data)

    window.alert("Usuario asignado");
  };

  deleteActivity(activityId) {
    let baseUrl = "http://localhost:1337/deleteActivity";
    axios
      .post(baseUrl, {
         activity_id: activityId,
      })
      .then((response) => {
        console.log(response);
      });
    this.getActivitiesPerProject();
  }

  getActivityToEdit(activityId) {
    let baseUrl = "http://localhost:1337/getActivityToEdit";
    axios.post(baseUrl, { activity_id: activityId }).then((response) => {
      // if (response.data) {
        // localStorage.setItem("activity_id", response.data.Activity_Id);
        // localStorage.setItem("activity_name", response.data.Activity_Name);
        // localStorage.setItem(
        //   "activity_estimated_Hours",
        //   response.data.Estimated_Hours
        // );
        // localStorage.setItem("activity_priority_Id", response.data.Priority_Id);
        // localStorage.setItem("activity_status_Id", response.data.Status_Id);
        // console.log("entro:" + response.data.Status_Id);
      // }
    });
    this.getActivitiesPerProject();
  }

  handleFinalizationDate = (finalDate, index) => {
    this.setState({ finalizationDate: finalDate });
  };

  render() {
    return (
      <div className="Table">
        <div className="regularButtonActivity">
          <Button>
            <Link className="a2" to="/admin/actividad">
              Crear Actividad
            </Link>
          </Button>
        </div>

        <h3 className="LabelTitleComponent">Lista de Actividades </h3>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow hover>
                <TableCell align="center">NOMBRE</TableCell>
                <TableCell align="center">HORAS ESTIMADAS</TableCell>
                <TableCell align="center">PRIORIDAD</TableCell>
                <TableCell align="center">ESTADO</TableCell>
                <TableCell align="center">FINALIZACIÓN</TableCell>
                <TableCell align="center">RESPONSABLE</TableCell>
                <TableCell align="center">ACCIONES</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.activitys.map((celda) => {
                return (
                  <TableRow key={celda.Activity_Id}>
                    <TableCell align="left">{celda.Activity_Name}</TableCell>
                    <TableCell align="center">
                      {celda.Estimated_Hours}
                    </TableCell>
                    <TableCell align="center">
                      {formatPriority(celda.Priority_Id)}
                    </TableCell>
                    <TableCell align="center">
                      {formatStatus(celda.Status_Id)}
                    </TableCell>
                    <TableCell>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                          inputFormat="DD/MM/yyyy"
                          value={celda.Final_Time}
                          onChange={this.handleFinalizationDate}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </TableCell>
                    <TableCell align="center">
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Empleado
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={this.userAssign(celda.User_Id)}
                          label="Employee"
                          // onChange={handleChange}
                        >
                          {this.state.users.map((userAux, index) => {
                            return (
                              <MenuItem
                                value={userAux.User_Name}
                                onClick={() =>
                                  this.sendAsignament(
                                    celda.Activity_Id,
                                    userAux.User_Id,
                                    this.state.finalizationDate
                                  )
                                }
                              >
                                {userAux.User_Name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        align="center"
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon align="center" />}
                        onClick={() => this.deleteActivity(celda.Activity_Id)}
                      >
                        Eliminar
                      </Button>

                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<EditIcon />}
                        onClick={() =>
                          this.getActivityToEdit(celda.Activity_Id)
                        }
                        href="/admin/editActividad"
                      >
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
