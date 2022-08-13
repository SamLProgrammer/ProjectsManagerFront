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
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import toast, { Toaster } from "react-hot-toast";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 2,
    color: "#fff",
  },
}));

const Advance = () => {
  const notify = () => {
    toast.success("Avance creado.", {
      position: "bottom-center",
      autoClose: 5000,
      style: {
        background: "#0d151bba",
        color: "#fff",
        boxShadow: "0 4px 10px #3eecf2",
        border: "1px solid #3eecf2",
        padding: "10px 30px 10px 30px",
        fontSize: 18,
        fontFamily: "Montserrat",
      },

      hideProgressBar: false,
      newestOnTop: false,
      closeOnClickrtl: false,
      pauseOnFocusLoss: false,
      draggable: true,
      pauseOnHover: true,
    });
  };
  const notifyError = () => {
    toast.error(
      "Advertencia! Los avances agendados para esta actividad podrían no satisfacer el tiempo límite de entrega, se recomienda agendar un avance de mayor duración o liberar tiempo de avances en futuras actividades.",
      {
        position: "bottom-center",
        autoClose: 7000,
        style: {
          background: "#0d151bba",
          color: "#fff",
          boxShadow: "0 4px 10px #3eecf2",
          border: "1px solid #3eecf2",
          padding: "10px 30px 10px 30px",
          fontSize: 18,
          fontFamily: "Montserrat",
        },

        hideProgressBar: false,
        newestOnTop: false,
        closeOnClickrtl: false,
        pauseOnFocusLoss: false,
        draggable: true,
        pauseOnHover: true,
      }
    );
  };

  const notifyOverlapping = () => {
    toast.error(
      "El avance se cruza con otro avance agendado.",
      {
        position: "bottom-center",
        autoClose: 3000,
        style: {
          background: "#0d151bba",
          color: "#fff",
          boxShadow: "0 4px 10px #3eecf2",
          border: "1px solid #3eecf2",
          padding: "10px 30px 10px 30px",
          fontSize: 18,
          fontFamily: "Montserrat",
        },

        hideProgressBar: false,
        newestOnTop: false,
        closeOnClickrtl: false,
        pauseOnFocusLoss: false,
        draggable: true,
        pauseOnHover: true,
      }
    );
  }
  
  const notifyTimeOut = () => {
    toast.error(
      "El avance excede el tiempo para su desarrollo.",
      {
        position: "bottom-center",
        autoClose: 3000,
        style: {
          background: "#0d151bba",
          color: "#fff",
          boxShadow: "0 4px 10px #3eecf2",
          border: "1px solid #3eecf2",
          padding: "10px 30px 10px 30px",
          fontSize: 18,
          fontFamily: "Montserrat",
        },

        hideProgressBar: false,
        newestOnTop: false,
        closeOnClickrtl: false,
        pauseOnFocusLoss: false,
        draggable: true,
        pauseOnHover: true,
      }
    );
  }

  const notifyTimeOff = () => {
    toast.error(
      "El avance excede la jornada laboral.",
      {
        position: "bottom-center",
        autoClose: 3000,
        style: {
          background: "#0d151bba",
          color: "#fff",
          boxShadow: "0 4px 10px #3eecf2",
          border: "1px solid #3eecf2",
          padding: "10px 30px 10px 30px",
          fontSize: 18,
          fontFamily: "Montserrat",
        },

        hideProgressBar: false,
        newestOnTop: false,
        closeOnClickrtl: false,
        pauseOnFocusLoss: false,
        draggable: true,
        pauseOnHover: true,
      }
    );
  }
  
  const classes = useStyles();
  const currentTime = new Date();

  let currentActivity = localStorage.getItem("currentActivityUser");
  let currentUser = localStorage.getItem("user_id");
  const [Initial_Time, setInitial_Time] = useState(currentTime);
  const [Final_Time, setFinal_Time] = useState(currentTime);
  const [advanceDescription, setAdvanceDescription] = useState("");
  const [created, setCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    Initial_TimeError: false,
    Final_TimeError: false,
    advanceDescriptionError: false,
  });

  let params =
    errors.Initial_TimeError === false &&
    errors.Final_TimeError === false &&
    errors.advanceDescriptionError === false &&
    advanceDescription.length > 1;

  const regular_expression = {
    name: /^[a-zA-Z0-9_-]{1,20}$/, // Letras, numeros, guion y guion_bajo
    letters: /^[\w'\-][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*\-(){}|~<>;:[\]]{1,60}$/, // Letras y espacios,
    number: /^\d{1,6}$/, // 1 a 10 numeros.,
    regex_date_validator: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
    hour: /^(?:0?[1-9]|1[0-2]):[0-5][0-9]\s?(?:[aApP](\.?)[mM]\1)$/,
  };

  const handleInitialHour = (newInitialTime) => {
    setErrors({ ...errors, Initial_TimeError: false });
    setInitial_Time(newInitialTime.toLocaleString());
    setErrors({ ...errors, Final_TimeError: false });
    // setFinal_Time(new Date(newInitialTime.toISOString().slice(0, -1)));
    setFinal_Time(newInitialTime.toLocaleString());
    // setFinal_Time(newInitialTime.toISOString());
  };

  const handleFinalHour = (newFinalTime) => {
    setErrors({ ...errors, Final_TimeError: false });
    setFinal_Time(newFinalTime.toLocaleString());
  };

  function handleChange(name, value) {
    switch (name) {
      // case "Initial_Time":
      //   if (!regular_expression.hour.test(value)) {
      //     setErrors({ ...errors, Initial_TimeError: true });
      //   } else {
      //     setErrors({ ...errors, Initial_TimeError: false });
      //     setInitial_Time(value);
      //   }
      //   break;
      // case "Final_Time":
      //   if (!regular_expression.hour.test(value)) {
      //     setErrors({ ...errors, Final_TimeError: true });
      //   } else {
      //     setErrors({ ...errors, Final_TimeError: false });
      //     setFinal_Time(value);
      //   }
      //   break;
      case "advanceDescription":
        if (!regular_expression.letters.test(value)) {
          setErrors({ ...errors, advanceDescriptionError: true });
        } else {
          setErrors({ ...errors, advanceDescriptionError: false });
          setAdvanceDescription(value);
        }
        break;

      default:
        console.log("no hay valores.");
    }
  }

  function handleSubmit() {
    setIsLoading(true);
    let newResult;
    let account = {
      activity_id: currentActivity,
      user_id: currentUser,
      comments: advanceDescription,
      initial_hour: Initial_Time,
      final_hour: Final_Time,
    };
    if (account) {
      let ac = JSON.stringify(account);
      localStorage.setItem("account", ac);
      fetch("http://projectsmanagerapp-env.eba-hc2swjbm.sa-east-1.elasticbeanstalk.com/createAdvance", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: currentUser,
          activity_id: currentActivity,
          comments: advanceDescription,
          initial_hour: Initial_Time,
          final_hour: Final_Time,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            console.log("Entramos al resultado del server")
            console.log(result);
            newResult = result;
            if (result.warning === true) {
              notifyError();
              setTimeout(() => setCreated(true), 7000);
            } else if(result.overlapped === true){
              notifyOverlapping();
              setTimeout(() => setCreated(true), 3000);
            }else if(result.time_out_of_bounds){
              notifyTimeOut();
              setTimeout(() => setCreated(true), 3000);

            }else if (result.time_off){
              notifyTimeOut();
              setTimeout(() => setCreated(true), 3000);
            }else {
              // notify();
              setTimeout(() => setCreated(true), 2000);
            }
          },
          (error) => {
            //alert("Registro fallo");
          }
          );
          setTimeout(() => setCreated(true), 2000);
    }
    console.log(account);
    console.log('resoult');
    console.log(newResult);
  }

  let open = true;

  let screenWidth = window.innerWidth;

  /*Formulario CreateProject */

  return (
    <>
      {created && <Navigate to="/employee/Activities " />}
      <div className="createUserContent">
        <div className="formCreateProyect">
          {screenWidth > 1030 && <Title text="Nuevo Avance" />}

          <Item text="Hora de inicio" />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker
              value={Initial_Time}
              onChange={handleInitialHour}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          {errors.Initial_TimeError && (
            <ErrorNotification text="Requerido. Ingrese segun el formato asignado" />
          )}

          <Item text="Hora final" />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker
              value={Final_Time}
              onChange={handleFinalHour}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          {errors.Final_TimeError && (
            <ErrorNotification text="Required.Ingrese segun el formato asignado" />
          )}
          <Item text="Descripcion" />
          <Input
            attribute={{
              name: "advanceDescription",
              inputType: "text",
              ph: "",
            }}
            handleChange={handleChange}
            param={errors.advanceDescriptionError}
          />
          {errors.advanceDescriptionError && (
            <ErrorNotification text="Requerido. Ingrese solo letras max 30" />
          )}
          <Button text="Guardar" handleOnClick={handleSubmit} param={params} />
          <Toaster />
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

export default Advance;
