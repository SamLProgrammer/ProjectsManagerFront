import React, { useEffect, useState } from "react";
import ErrorNotification from "../commons/ErrorNotification";
import Input from "../Login/components/Input";
import Item from "../Login/components/Item";
import Title from "../Login/components/Title";
import Button from "../commons/RegularButton";
import { Navigate, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Cookies from "universal-cookie";
import Select from "react-select";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 2,
    color: "#fff",
  },
}));
const statusSe = [
  { label: "Finalizado" },
  { label: "Pendiente" },
  { label: "En progreso" },
];
const prioritySe = [{ label: "Alta" }, { label: "Media" }, { label: "Baja" }];

const Activity = () => {

  const [Activity_Id, setActivityIdServe] = useState(0);
  const [activity_name, setActivityNameServe] = useState("");
  const [estimated_Hours, setestimated_HoursServe] = useState("");
  const [activity_priority_Id, setePriorityIdServe] = useState("");
  const [activity_status_Id, setStatusIdServe] = useState("");
  let Activity_Description = ''; 

  const cookies = new Cookies();
  let Project_Id = cookies.get("currentProjectId");
  const classes = useStyles();
  const [Activity_Name, setActivity_name] = useState("");
  const [Estimated_Hours, setEstimate_hours] = useState("");
  const [Priority_Id, setPriority] = useState(activity_priority_Id);
  const [Status_Id, setStatus] = useState("");
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
    errors.priority_Error === false;
    // Estimated_Hours.length > 1;

  const regular_expression = {
    name: /^[a-zA-Z0-9_-]{4,10}$/, // Letras, numeros, guion y guion_bajo
    letters: /^[a-zA-ZÀ-ÿ\s]{1,12}$/, // Letras y espacios,
    numbers: /^[1-9][0-9]*$/,
    regex_date_validator:
      /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
  };

  function priorityIndex() {
    switch (activity_priority_Id) {
      case "A":
        return prioritySe[0];

      case "M":
        return prioritySe[1];

      case "B":
        return prioritySe[2];
      default:
    }
  }
  function statusIndex() {
    switch (activity_status_Id) {
      case "F":
        return statusSe[0];

      case "P":
        return statusSe[1];

      case "E":
        return statusSe[2];
      default:
    }
  }
  function handleChange(name, value) {
    switch (name) {
      case "Activity_Name":
        if (!regular_expression.letters.test(value)) {
          setErrors({ ...errors, activity_nameError: true });
        } else {
          setErrors({ ...errors, activity_nameError: false });
          setActivity_name(value);
        }
        break;
      case "Estimated_Hours":
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

  const getStoredActivity = () => {
    let url = "https://projectsmanagerfront.herokuapp.com/getStoredActivity";
    axios.get(url)
    .then((response) => {
      console.log(response);
      if(response.data) {
        setActivityIdServe(response.data.Activity_Id);
        setActivityNameServe(response.data.Activity_Name);
        setestimated_HoursServe(response.data.Estimated_Hours);
        setePriorityIdServe(response.data.Priority_Id);
        setStatusIdServe(response.data.Status_Id);
      }
    })
    .catch((error) => {})
  }

  useEffect(() => {
    getStoredActivity();
  }, []);
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

  //envio de los datos editados
  function handleSubmit() {
    setIsLoading(true);
    let account = {
      activity_name: Activity_Name,
      Project_Id,
      Activity_Name,
      Activity_Description,
      Estimated_Hours,
      Priority_Id,
      Status_Id,
    };
    if (account) {
      let ac = JSON.stringify(account);
      localStorage.setItem("account", ac);
      fetch("https://projectsmanagerfront.herokuapp.com/editActivity", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Activity_Id: Activity_Id,
          Project_Id: Project_Id,
          Activity_Name: Activity_Name,
          Activity_Description: "DGHDHDHDHD",
          Estimated_Hours: Estimated_Hours,
          Priority_Id: Priority_Id,
          Status_Id: Status_Id,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            console.log(result);
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
      {created && <Navigate to="/admin/actividadList" />}
      <div className="createUserContent">
        <div className="formCreateProyect">
          {screenWidth > 1030 && <Title text="Editar actividad" />}

          <Item text="Nombre de la actividad" />
          <Input
            attribute={{
              name: "Activity_Name",
              inputType: "text",
              ph: "",
              defaultValue: activity_name,
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
              name: "Estimated_Hours",
              inputType: "text",
              ph: "Horas estimas para esta actividad",
              contenteditable: "true",
              defaultValue: estimated_Hours,
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
            options={prioritySe}
            defaultValue={Priority_Id}
            onChange={handlePriority}
          />
          {errors.priority_Error && (
            <ErrorNotification text="Requerido. Ingrese solo letras" />
          )}

          <Item text="Estado" />
          <Select
            className="select"
            options={statusSe}
            defaultValue={statusIndex}
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
