import React, { useState } from "react";
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

const Proyect = () => {
  const classes = useStyles();
  const currentTime = new Date();

  const [project_name, setProyect_name] = useState("");
  const [initial_date, setInitial_date] = useState(currentTime);
  const [final_date, setfinal_date] = useState(currentTime);
  const [project_status, setProject_Status] = useState("");
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
    project_name.length > 1 &&
    project_status.length > 0;
  // initial_date.length > 1;

  const regular_expression = {
    name: /^[a-zA-Z0-9_-]{4,10}$/, // Letras, numeros, guion y guion_bajo
    letters: /^[a-zA-ZÀ-ÿ\s]{1,30}$/, // Letras y espacios,
    regex_date_validator: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
  };

  function handleStatus(value) {
    console.log(value);
    if (value === null) {
      console.log("entro if");
      setErrors({ ...errors, project_statusError: true });
    } else {
      console.log("entro else");
      // setErrors({ ...errors, status_Error: false });
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
    // if (regular_expression.regex_date_validator === '') {
    //   console.log('Fecha invalida');
    //   setErrors({ ...errors, initial_dateError: true });
    // } else {
    console.log("Fecha valida");
    setErrors({ ...errors, initial_dateError: false });
    setInitial_date(newInitialDate.toISOString());
    // }
  };

  const handleChangeFinalDate = (newFinalDate) => {
    // if (!regular_expression.regex_date_validator.test(newFinalDate)) {
    //   setErrors({ ...errors, final_dateError: true });
    // } else {
    setErrors({ ...errors, final_dateError: false });
    setfinal_date(newFinalDate.toISOString());
    // }
  };

  function handleChange(name, value) {
    switch (name) {
      case "project_name":
        if (!regular_expression.letters.test(value)) {
          setErrors({ ...errors, project_nameError: true });
        } else {
          setErrors({ ...errors, project_nameError: false });
          setProyect_name(value);
        }
        break;

      // case "initial_date":
      //   if (!regular_expression.regex_date_validator.test(value)) {
      //     setErrors({ ...errors, initial_dateError: true });
      //   } else {
      //     setErrors({ ...errors, initial_dateError: false });
      //     setInitial_date(value);
      //   }
      //   break;
      // case "final_date":
      //   if (!regular_expression.regex_date_validator.test(value)) {
      //     setErrors({ ...errors, final_dateError: true });
      //   } else {
      //     setErrors({ ...errors, final_dateError: false });
      //     setfinal_date(value);
      //   }
      //   break;
      case "project_status":
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
    let account = { project_name, initial_date, final_date, project_status };
    if (account) {
      let ac = JSON.stringify(account);
      localStorage.setItem("account", ac);
      fetch("http://localhost:1337/createProject", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_name: project_name,
          initial_date: initial_date,
          final_date: final_date,
          project_status: project_status,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            if (result === "El correo ya se encuentra registrado") {
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
          {screenWidth > 1030 && <Title text="Nuevo Proyecto" />}

          <Item text="Nombre del proyecto" />
          <Input
            attribute={{
              name: "project_name",
              inputType: "text",
              ph: "",
            }}
            handleChange={handleChange}
            param={errors.project_nameError}
          />
          {errors.project_nameError && (
            <ErrorNotification text="Requerido. Ingrese solo letras max 12" />
          )}

          <LocalizationProvider dateAdapter={AdapterMoment} >
            <Item text="Fecha de inicio" />
            <DesktopDatePicker 
              inputFormat="DD/MM/yyyy"
              value={initial_date}
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
              value={final_date}
              onChange={handleChangeFinalDate}
              renderInput={(params) => <TextField {...params} />}
            />
            {errors.final_dateError && (
              <ErrorNotification text="Required.Ingrese segun el formato asignado" />
            )}
          </LocalizationProvider>

          <Item text="Estado" />
          <Select
            className='select'
            options={statusList}
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

export default Proyect;
