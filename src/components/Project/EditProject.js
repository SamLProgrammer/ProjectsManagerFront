import React, { useEffect, useState } from "react";
import Input from "../Login/components/Input";
import Item from "../Login/components/Item";
import Title from "../Login/components/Title";
import ErrorNotification from "../commons/ErrorNotification";
import Button from "../commons/RegularButton";
import { Navigate, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Select from "react-select";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 2,
    color: "#fff",
  },
}));

const statusList = [
  { label: "Finalizado" },
  { label: "Pendiente" },
  { label: "En progreso" },
];

const EditProyect = () => {
  const classes = useStyles();

  const [projectId, setProjectIdServe] = useState(0);
  const [projectNAme, setProjectNameServe] = useState("");
  const [statusId, setStatusIdServe] = useState("");

  const [Project_Id, setProjectId] = useState(0);
  const [Project_Name, setProyect_name] = useState("");
  const [Initial_Date, setInitial_date] = useState('');
  const [Final_Date, setfinal_date] = useState('');
  const [Status_Id, setProject_Status] = useState("");
  const [created, setCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    project_nameError: false,
    initial_dateError: false,
    final_dateError: false,
    project_statusError: false,
  });

  let params =
    errors.project_nameError === false &&
    errors.initial_dateError === false &&
    errors.final_dateError === false &&
    errors.project_statusError === false &&
    Project_Name.length > 1 ;
    // Status_Id.length > 0;

  const regular_expression = {
    name: /^[a-zA-Z0-9_-]{4,10}$/, // Letras, numeros, guion y guion_bajo
    letters: /^[a-zA-ZÀ-ÿ\s]{1,30}$/, // Letras y espacios,
    regex_date_validator:
      /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
  };

  const getStoredProject = () => {
    let url = "https://projectsmanagerfront.herokuapp.com/getStoredProject";
    axios
      .get(url)
      .then((response) => {
        console.log(response);
        if (response.data) {
          setStatusIdServe(Status_Id);
          setProjectIdServe(response.data.Project_Id);
          setProyect_name(response.data.Project_Name);
          setInitial_date(response.data.Initial_Date.toLocaleString());
          setfinal_date(response.data.Final_Date.toLocaleString());
          setProject_Status(response.data.Status_Id)
          if(response.data === "F"){
            console.log("Estado F ", Status_Id);
            return statusList[0].label; 
          }else if (Status_Id === "E"){
            console.log("Estado ", Status_Id);
            return statusList[2].label;
          }else if (Status_Id === "P"){
            console.log("Estado ", Status_Id);
            return statusList[1].label;
          }else {
            return "Pendiente"
          }
          console.log(statusId);
          console.log(response.data.Status_Id);
          console.log("a ver que pedo con el estatus: ", statusIndex());
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getStoredProject();
  }, []);

  console.log("Status seteado : ", Status_Id);

  const statusIndex = () => {
    console.log("El estado del proyecto ers : ", Status_Id);
    if(Status_Id === "F"){
      console.log("Estado F ", Status_Id);
      return statusList[0].label; 
    }else if (Status_Id === "E"){
      console.log("Estado E", Status_Id);
      return statusList[2].label;
    }else if (Status_Id === "P"){
      console.log("Estado P", Status_Id);
      return statusList[1].label;
    }else {
      return "Pendiente"
    }
    // switch (Status_Id) {
    //   case "F":
    //     console.log("Estado ", Status_Id);
    //     return statusList[0].label;
    //   case "P":
    //     console.log("Estado ", Status_Id);
    //     return statusList[1].label;
    //   case "E":
    //     console.log("Estado ", Status_Id);
    //     return statusList[2].label;
    //   default:
    // }
  }

  function handleStatus(value) {
    console.log(value);
    if (value === null) {
      console.log("entro if");
      setErrors({ ...errors, project_statusError: true });
    } else {
      console.log("entro else");
      console.log(value);
      switch (value.label) {
        case "Finalizado":
          console.log("entro f");
          setProject_Status("F");
          break;
        case "Pendiente":
          console.log("entro p");
          setProject_Status("P");
          break;
        case "En progreso":
          setProject_Status("E");
          break;
        default:
          console.log("No hay valores");
          break;
      }
    }
  }

  const handleChangeInitialDate = (newInitialDate) => {
    console.log("Fecha valida");
    setErrors({ ...errors, initial_dateError: false });
    setInitial_date(newInitialDate.toISOString());
  };

  const handleChangeFinalDate = (newFinalDate) => {
    setErrors({ ...errors, final_dateError: false });
    setfinal_date(newFinalDate.toISOString());
    // }
  };

  function handleChange(name, value) {
    switch (name) {
      case "Project_Name":
        if (!regular_expression.letters.test(value)) {
          setErrors({ ...errors, project_nameError: true });
        } else {
          setErrors({ ...errors, project_nameError: false });
          setProyect_name(value);
        }
        break;

      case "Status_Id":
        if (!regular_expression.letters.test(value)) {
          setErrors({ ...errors, project_statusError: true });
        } else {
          setErrors({ ...errors, project_statusError: false });
          setProject_Status(value);
        }
        break;

      default:
        console.log("no hay valores.");
    }
  }

  function handleSubmit() {
    setIsLoading(true);
    let account = {
      Project_Id: Project_Id,
      Project_Name: Project_Name,
      Initial_Date: Initial_Date,
      Final_Date: Final_Date,
      Status_Id: Status_Id,
    };
    if (account) {
      let ac = JSON.stringify(account);
      localStorage.setItem("account", ac);
      let aux = JSON.stringify({
        Project_Id: Project_Id,
        Project_Name: Project_Name,
        Initial_Date: Initial_Date,
        Final_Date: Final_Date,
        Status_Id: Status_Id,
      });
      console.log(aux);
      fetch("https://projectsmanagerfront.herokuapp.com/editProject", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          Project_Id: projectId,
          Project_Name: Project_Name,
          Initial_Date: Initial_Date,
          Final_Date: Final_Date,
          Status_Id: Status_Id,
        }),
      })
        .then((res) => {
          console.clog(res)})
        .then(
          (result) => {
            if (result) {
              console.log(result);
            }
          },
          (error) => {
            //alert("Registro fallo");
          }
        );
      setTimeout(() => setCreated(true), 2000);
    }
    console.log(account);
  }

  let open = true;

  let screenWidth = window.innerWidth;

  /*Formulario CreateProject */

  return (
    <>
      {created && <Navigate to="/admin/proyectList " />}
      <div className="createUserContent">
        <div className="formCreateProyect">
          {screenWidth > 1030 && <Title text="Editar Proyecto" />}

          <Item text="Nombre del proyecto" />
          <Input
            attribute={{
              name: "Project_Name",
              inputType: "text",
              ph: "",
              defaultValue: Project_Name,
            }}
            handleChange={handleChange}
            param={errors.project_nameError}
          />
          {errors.project_nameError && (
            <ErrorNotification text="Requerido. Ingrese solo letras max 12" />
          )}

          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Item text="Fecha de inicio" />
            <DesktopDatePicker
              inputFormat="DD/MM/yyyy"
              value={Initial_Date}
              onChange={handleChangeInitialDate}
              renderInput={(params) => <TextField {...params} />}
            />
            {errors.initial_dateError && (
              <ErrorNotification text="Requerido. Ingrese segun el formato asignado" />
            )}
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Item text="Fecha final" />
            <DesktopDatePicker
              inputFormat="DD/MM/yyyy"
              value={Final_Date}
              onChange={handleChangeFinalDate}
              renderInput={(params) => <TextField {...params} />}
            />
            {errors.final_dateError && (
              <ErrorNotification text="Required.Ingrese segun el formato asignado" />
            )}
          </LocalizationProvider>

          <Item text="Estado" />
          <Select
            className="select"
            options={statusList}
            defaultValue={statusIndex()}
            onChange={handleStatus}
          />
          {errors.project_statusError && (
            <ErrorNotification text="Required. Ingrese el estado del proyecto" />
          )}
          <Button text="Guardar" handleOnClick={handleSubmit} param={params} />
        </div>

        {isLoading && (
          <Backdrop open={open} className={classes.backdrop}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </div>
    </>
  );
};

export default EditProyect;
