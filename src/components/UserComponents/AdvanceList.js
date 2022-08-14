import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import axios from "axios";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import EditIcon from "@material-ui/icons/Edit";
import { formatDate } from "../../utilities";

let user_id = localStorage.getItem("user_id");
let dataUser = { user_id: user_id };
export default class AdvanceList extends Component {
  constructor() {
    super();
    this.state = {
      advances: [],
    };
  }

  componentDidMount = () => {
    this.getAdvacesForUser();
  };

  getAdvacesForUser() {
    let baseUrl = "https://projectsmanagerserver-node.herokuapp.com//getAdvancesByUser";
    axios
      .post(baseUrl, dataUser)
      .then((response) => {
        this.setState({ advances: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // chargeLocalStorage(ad_id, init_time, fina_time, adv_com){
  //   localStorage.setItem("advance_id", ad_id);
  //   localStorage.setItem("initial_time", init_time);
  //   localStorage.setItem("final_time", fina_time);
  //   localStorage.setItem("description", adv_com);
  // }

  getAdvancetoEdit(advanceId) {
    let baseUrl = "https://projectsmanagerserver-node.herokuapp.com//getAdvanceToEdit";
    console.log(advanceId)
    let data = {advance_id: advanceId}
    console.log(data)
    axios.post(baseUrl, data).then((response) => {
      if (response.data) {
        console.log('si hay respuesta del avance');
        console.log(response.data);
        localStorage.setItem("advance_id", String(response.data.Advance_Id));
        localStorage.setItem("initial_time", String(response.data.Initial_Time));
        localStorage.setItem("final_time", response.data.Final_Time);
        localStorage.setItem("description", response.data.Advance_Comments);
        // this.chargeLocalStorage(response.data.Advance_Id, response.data.Initial_Time, response.data.Final_Time, response.data.Advance_Comments);
      }
    });
    this.getAdvacesForUser();
  }

  render() {
    return (
      <div>
        <h3 className="LabelTitleComponent">Avances realizados </h3>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow hover>
                <TableCell align="center">ID AVANCE</TableCell>
                <TableCell align="center">HORA INICIAL</TableCell>
                <TableCell align="center">HORA FINAL</TableCell>
                <TableCell align="center">DESCRIPCIÓN</TableCell>
                <TableCell align="center">ACCIONES</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.advances.map((celda) => {
                {
                  /* {list.map((celda) => { */
                }
                return (
                  <TableRow>
                    <TableCell align="center">{celda.Advance_Id}</TableCell>
                    <TableCell align="center">
                      {formatDate(celda.Initial_Time)}
                    </TableCell>
                    <TableCell align="center">
                      {formatDate(celda.Final_Time)}
                    </TableCell>
                    <TableCell align="center">
                      {celda.Advance_Comments}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<EditIcon />}
                        onClick={() => {
                          this.getAdvancetoEdit(celda.Advance_Id);
                          localStorage.setItem(
                            "currentActivityId",
                            celda.Activity_Id
                          );
                        }}
                        href="/employee/editAdvance"
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
