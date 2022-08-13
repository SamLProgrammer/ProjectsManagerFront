import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  CardActionArea,
  Divider,
  Paper,
} from "@material-ui/core";
import React, { Component } from "react";
import axios from "axios";
import Title from "../Login/components/Title";
import { Navigate, Link } from "react-router-dom";
import Item from "../Login/components/Item";
import AdvanceList from "./AdvanceList";
import { formatPriority, formatStatus } from "../../utilities";


let user_id = localStorage.getItem("user_id");
let dataUser = { user_id: user_id };

export default class UserActivities extends Component {
  constructor() {
    super();
    this.state = { activityList: [] };
  }

  sendIdActivity(activityId) {
    localStorage.setItem("currentActivityUser", activityId);
    let aux = localStorage.getItem("currentActivityUser");
    console.log("id activity" + aux);
  }

  componentDidMount = () => {
    this.getActivitiesUser();
  };

  getActivitiesUser() {
    let baseUrl = "http://projectsmanagerapp-env.eba-hc2swjbm.sa-east-1.elasticbeanstalk.com/getAllActivityUser";
    axios
      .post(baseUrl, dataUser)
      .then((response) => {
        this.setState({ activityList: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
      console.log("Enviando usuario número", dataUser.user_id);
      console.log(dataUser)
  }
  render() {
    return (
      <div className="userActivities">
        <div>
          <h3 className="LabelTitleComponent">Actividades Asignadas</h3>
          <Grid container spacing={3}>
            {this.state.activityList.map((item) => {
              return (
                <Grid item xs={12} sm={6} md={4}>
                  <Card variant="outlined" sx={{ minWidth: 200 }}>
                    <CardContent>
                      <Typography color="text.secondary" gutterBottom>
                        {item.Activity_Name}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="div"
                        color="secondary"
                      >
                        {"Prioridad: "}
                        {formatPriority(item.Priority_Id)}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="primary">
                        {"Estado: "}
                        {formatStatus(item.Status_Id)}
                      </Typography>
                      <Typography variant="body2">
                        {"Horas estimadas: "}
                        {item.Estimated_Hours}
                        <br />
                      </Typography>
                    </CardContent>

                    <Divider variant="middle" />
                    {/* <CardActionArea
                      className="a4"
                      component={Link}
                      to="/employee/advance"
                      justifyContent="center"
                      alignItems="center"
                    > */}
                      <CardActions justify="center">
                        {/* <Button className="a5" size="small" color="primary">
                          <Link
                            className="a5"
                            to="/employee/advance"
                            onClick={() =>
                              this.sendIdActivity(item.Activity_Id)
                            }
                          >
                            <Item
                              className="a5"
                              text="Crear Avance"
                              onClick={() =>
                                this.sendIdActivity(item.Activity_Id)
                              }
                            />
                          </Link>
                        </Button> */}
                        <Button
                        // variant="contained"
                        // startIcon={<EditIcon />}
                        onClick={() =>
                          this.sendIdActivity(item.Activity_Id)
                        }
                        href="/employee/advance"
                      >
                        Crear Avance
                      </Button>
                      </CardActions>
                    {/* </CardActionArea> */}
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </div>
        <div>
          <AdvanceList />
        </div>
      </div>
    );
  }
}
