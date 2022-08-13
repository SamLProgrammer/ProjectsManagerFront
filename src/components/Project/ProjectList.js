import React, { Component, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ActivityList from "../Activity/ActivityList";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "universal-cookie";
import { formatStatus, formatDate } from "../../utilities";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const cookies = new Cookies();
export default class ProjectList extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
    };
  }

  getAllProjects() {
    let baseUrl = "http://localhost:1337/getProjects";
    axios
      .get(baseUrl)
      .then((response) => {
        this.setState({ projects: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  saveProjectIdToEdit(projectId) {
    localStorage.setItem("projec_to_edit", projectId);
  }

  componentDidMount = () => {
    this.getAllProjects();
  };

  sendIdProject(projectId) {
    cookies.set("currentProjectId", projectId, { path: "/" });
    let pid = cookies.get("currentProjectId");
  }

  deletProject(projectId) {
    let baseUrl = "http://localhost:1337/deleteProject";
    axios
      .post(baseUrl, {
        project_id: projectId,        
      })
      .then((response) => {
        console.log(response);
      });
    this.getAllProjects();
  }

  getProjectToEdit(projectId) {
    let baseUrl = "http://localhost:1337/getProjectToEdit";
    axios.post(baseUrl, { project_id: projectId }).then((response) => {
      if (response.data[0]) {
      } else {
        console.log("NO Entro al response");
      }
    });
  }
  render() {
    return (
      <div className="Table">
        <h3 className="LabelTitleComponent">Lista de Proyectos </h3>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow hover>
                <TableCell align="center">NOMBRE</TableCell>
                <TableCell align="center">FECHA INICIO</TableCell>
                <TableCell align="center">FECHA FINAL</TableCell>
                <TableCell align="center">ESTADO</TableCell>
                <TableCell align="center">ACCIONES</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.projects.map((celda, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="left">
                      <Link
                        className="a2"
                        to={{
                          pathname: "/admin/ActividadList",
                          // pathname: "/proyectList",
                          project_id: celda.Project_Id,
                        }}
                        onClick={() => this.sendIdProject(celda.Project_Id)}
                      >
                        {celda.Project_Name}
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      {formatDate(celda.Initial_Date)}
                    </TableCell>
                    <TableCell align="center">
                      {formatDate(celda.Final_Date)}
                    </TableCell>
                    <TableCell align="center">
                      {formatStatus(celda.Status_Id)}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        align="center"
                        variant="contained"
                        color="secondary"
                        margin="spacing(1)"
                        startIcon={<DeleteIcon align="center" />}
                        onClick={() => this.deletProject(celda.Project_Id)}
                      >
                        Eliminar
                      </Button>

                      <Button
                        variant="contained"
                        color="primary"
                        margin="spacing(1)"
                        startIcon={<EditIcon />}
                        onClick={() => this.getProjectToEdit(celda.Project_Id)}
                        href="/admin/editProject"
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
