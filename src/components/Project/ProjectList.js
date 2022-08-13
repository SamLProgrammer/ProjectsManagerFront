import React, { Component, useEffect, useState } from "react";
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
import { formatStatus, formatDate } from "../../utilities";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Cookies from "universal-cookie";

const ProjectList = () => {
  const cookies = new Cookies();
  const [projects, setProjects] = useState([]);

  const getAllProjects = () => {
    let baseUrl =
      "http://projectsmanagerapp-env.eba-hc2swjbm.sa-east-1.elasticbeanstalk.com/getProjects";
    axios
      .get(baseUrl)
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveProjectIdToEdit = (projectId) => {
    localStorage.setItem("projec_to_edit", projectId);
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  const sendIdProject = (projectId) => {
    cookies.set("currentProjectId", projectId, { path: "/" });
  };

  const deletProject = (projectId) => {
    let baseUrl =
      "http://projectsmanagerapp-env.eba-hc2swjbm.sa-east-1.elasticbeanstalk.com/deleteProject";
    axios
      .delete(baseUrl, {
        data: {
          project_id: projectId,
        },
      })
      .then((response) => {
        console.log(response);
      });
    this.getAllProjects();
  };

  const getProjectToEdit = (projectId) => {
    let baseUrl =
      "http://projectsmanagerapp-env.eba-hc2swjbm.sa-east-1.elasticbeanstalk.com/getProjectToEdit";
    let aux;
    axios.post(baseUrl, { project_id: projectId }).then((response) => {
      if (response.data[0]) {
        aux = response.data[0];
      }
    });
  };

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
            {projects.map((celda, index) => {
              return (
                <TableRow key={index}>
                  <TableCell align="left" key={index}>
                    <Button
                      onClick={() => sendIdProject(celda.Project_Id)}
                      href="/admin/ActividadList"
                    >
                      {celda.Project_Name}
                    </Button>
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
                      startIcon={<DeleteIcon align="center" />}
                      onClick={() => deletProject(celda.Project_Id)}
                    >
                      Eliminar
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<EditIcon />}
                      onClick={() => getProjectToEdit(celda.Project_Id)}
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
};
export default ProjectList;
