import React, { useState } from "react";
import ErrorNotification from "../commons/ErrorNotification";
import Input from "../Login/components/Input";
import Item from "../Login/components/Item";
import Title from "../Login/components/Title";
import Button from "../commons/RegularButton";
import { Navigate, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Select from "react-select";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

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
const priorityList = [{ label: "Alta" }, { label: "Media" }, { label: "Baja" }];

const Activity = (props) => {
  // const project_id = 6;
  const cookies = new Cookies();
  let project_id = cookies.get("currentProjectId");
  const classes = useStyles();
  const [activity_name, setActivity_name] = useState("");
  const [estimated_hours, setEstimate_hours] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [created, setCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    activity_nameError: false,
    estimated_HoursError: false,
    priority_Error: false,
    status_Error: false,
  });

  let params =
    errors.activity_nameError === false &&
    errors.estimated_HoursError === false &&
    errors.status_Error === false &&
    errors.priority_Error === false &&
    estimated_hours.length > 1;

  const regular_expression = {
    name: /^[a-zA-Z0-9_-]{4,30}$/, // Letras, numeros, guion y guion_bajo
    letters: /^[a-zA-ZÀ-ÿ\s]{1,30}$/, // Letras y espacios,
    numbers: /^(([1-9])([0-9]*)){1,3}$/,
    regex_date_validator: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
  };

  function handleStatus(value) {
    console.log(value);
    if (value === null) {
      console.log("entro if");
      setErrors({ ...errors, status_Error: true });
    } else {
      console.log("entro else");
      // setErrors({ ...errors, status_Error: false });
      console.log(value);
      switch (value.label) {
        case "Finalizado":
          console.log("entro f");
          setStatus("F");
          break;
        case "Pendiente":
          console.log("entro p");
          setStatus("P");
          break;
        case "En progreso":
          setStatus("E");
          break;
        default:
          console.log("No hay valores");
          break;
      }
    }
  }

  //pr
  function handlePriority(value) {
    console.log(value);
    if (value === null) {
      console.log("entro if");
      setErrors({ ...errors, status_Error: true });
    } else {
      console.log("entro else");
      // setErrors({ ...errors, status_Error: false });
      console.log(value);
      switch (value.label) {
        case "Alta":
          console.log("entro f");
          setPriority("A");
          break;
        case "Media":
          console.log("entro p");
          setPriority("M");
          break;
        case "Baja":
          setPriority("B");
          break;
        default:
          console.log("No hay valores");
          break;
      }
    }
  }
  function handleChange(name, value) {
    switch (name) {
      case "activity_name":
        if (!regular_expression.letters.test(value)) {
          setErrors({ ...errors, activity_nameError: true });
        } else {
          setErrors({ ...errors, activity_nameError: false });
          setActivity_name(value);
        }
        break;
      case "estimated_hours":
        if (!regular_expression.numbers.test(value)) {
          setErrors({ ...errors, estimated_HoursError: true });
        } else {
          setErrors({ ...errors, estimated_HoursError: false });
          setEstimate_hours(value);
        }
        break;

      default:
        console.log("No hay valores");
        break;
    }
  }

  // Aca se realiza el envio de datos, revisar como se envia el Json de esta parte

  const aux = () => {
    // const { project_id } = this.props.location
    // console.log(props);
  };

  function handleSubmit() {
    aux();
    setIsLoading(true);
    let account = {
      project_id,
      activity_name,
      estimated_hours,
      priority,
      status,
    };
    if (account) {
      let ac = JSON.stringify(account);
      localStorage.setItem("account", ac);
      fetch("http://localhost:1337/createActivity", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_id: project_id,
          activity_name: activity_name,
          estimated_hours: estimated_hours,
          priority: priority,
          status: status,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            // if(result === "La actividad ya se encuentra registrada"){
            // }
          },
          (error) => {
            // alert("Registro fallooooo");
          }
        );
      setTimeout(() => setCreated(true), 2000);
    }
  }

  let open = true;
  let screenWidth = window.innerWidth;

  /* Formualrio Create Activity*/

  return (
    <>
      {created && <Navigate to="/admin/ActividadList" />}
      <div className="createUserContent">
        <div className="formCreateProyect">
          {screenWidth > 1030 && <Title text="Nueva actividad" />}

          <Item text="Nombre de la actividad" />
          <Input
            attribute={{
              name: "activity_name",
              inputType: "text",
              ph: "",
            }}
            handleChange={handleChange}
            param={errors.activity_nameError}
          />
          {errors.activity_nameError && (
            <ErrorNotification text="Requerido. Ingrese solo letras" />
          )}
          <Item text="Horas estimadas" />
          <Input
            attribute={{
              name: "estimated_hours",
              inputType: "text",
              ph: " ",
            }}
            handleChange={handleChange}
            param={errors.estimated_HoursError}
          />
          {errors.estimated_HoursError && (
            <ErrorNotification text="Requerido. Ingrese solo letras" />
          )}

          <Item text="Prioridad" />
          <Select
            className="select"
            options={priorityList}
            onChange={handlePriority}
          />
          {errors.priority_Error && (
            <ErrorNotification text="Requerido. Ingrese solo letras" />
          )}

          <Item text="Estado" />
          <Select
            className="select"
            options={statusList}
            onChange={handleStatus}
          />

          {errors.status_Error && (
            <ErrorNotification text="Requerido. Ingrese solo letras" />
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

export default Activity;
