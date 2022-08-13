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
import Select from "react-select";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { TextField } from "@mui/material";


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 2,
    color: "#fff",
  },
}));

const documentType = [
  { label: "Cédula" },
  { label: "Pasaporte" },
  { label: "Tarjeta de identidad" },
];

const CreateUser = () => {
  const classes = useStyles();
  const currentTime = new Date();

  const [user_name, setUser_name] = useState("");
  const [user_last_name, setUser_last_name] = useState("");
  const [identity_document_type, setIdentity_document_type] = useState("");
  const [identity_document_word, setIdentity_document_word] = useState("");
  const [birth_date, setBird_date] = useState(currentTime);
  const [salary, setSalary] = useState("");
  const [weekly_hours, setWeekly_hours] = useState("");
  const [user_email, setUser_email] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [user_password, setUser_password] = useState("");

  const [passwordAgain, setPasswordAgain] = useState("");
  const [user_status, setUser_status] = useState("");
  const [boss_id, setBoss_id] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [created, setCreated] = useState(false);

  const [errors, setErrors] = useState({
    usernameError: false,
    lastNameError: false,
    identity_document_typeError: false,
    identity_document_wordError: false,
    bird_dateError: false,
    salaryError: false,
    weeklyError: false,
    user_mailError: false,
    phone_numberError: false,
    user_passwordError: false,
    passwordAgainError: false,
  });

  let params =
    errors.usernameError === false &&
    errors.lastNameError === false &&
    errors.salaryError === false &&
    errors.passwordError === false &&
    errors.passwordAgainError === false &&
    user_name.length > 1 &&
    user_last_name.length > 1 &&
    salary.length > 1 &&
    user_password.length > 5 &&
    user_password === passwordAgain;

  const regular_expression = {
    name: /^[a-zA-Z0-9_-]{4,10}$/, // Letras, numeros, guion y guion_bajo
    letters: /^[\w'\-][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*\-(){}|~<>;:[\]]{1,60}$/, // Letras y espacios,
    lastmame: /^[a-zA-ZÀ-ÿ\s]{1,20}$/, // Letras y espacios,
    letterscc: /^[PTNC]{1}$/,
    number: /^\d{1,10}$/, // 1 a 10 numeros.
    hours: /^\d{1,2}$/, // 1 a2 numeros.
    email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    regex_date_validator: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/,
  };

  function handleDocument(value) {
    if (value === null) {
      setErrors({ ...errors, identity_document_typeError: true });
    } else {
      switch (value.label) {
        case "Cédula":
          setIdentity_document_type("C");
          break;
        case "Pasaporte":
          setIdentity_document_type("P");
          break;
        case "Tarjeta de identidad":
          setIdentity_document_type("T");
          break;
        default:
          break;
      }
    }
  }

  function handleChange(name, value) {
    switch (name) {
      case "user_name":
        if (!regular_expression.letters.test(value)) {
          setErrors({ ...errors, usernameError: true });
        } else {
          setErrors({ ...errors, usernameError: false });
          setUser_name(value);
        }
        break;

      case "lastName":
        if (!regular_expression.letters.test(value)) {
          setErrors({ ...errors, lastNameError: true });
        } else {
          setErrors({ ...errors, lastNameError: false });
          setUser_last_name(value);
        }
        break;
      case "identity_document_type":
        if (!regular_expression.letterscc.test(value)) {
          setErrors({ ...errors, identity_document_typeError: true });
        } else {
          setErrors({ ...errors, identity_document_typeError: false });
          setIdentity_document_type(value);
        }
        break;
      case "identity_document_word":
        if (!regular_expression.number.test(value)) {
          setErrors({ ...errors, identity_document_wordError: true });
        } else {
          setErrors({ ...errors, identity_document_wordError: false });
          setIdentity_document_word(value);
        }
        break;
      case "bird_date":
        if (!regular_expression.regex_date_validator.test(value)) {
          setErrors({ ...errors, bird_dateError: true });
        } else {
          setErrors({ ...errors, bird_dateError: false });
          setBird_date(value);
        }
        break;

      case "salary":
        if (!regular_expression.number.test(value)) {
          setErrors({ ...errors, salaryError: true });
        } else {
          setErrors({ ...errors, salaryError: false });
          setSalary(value);
        }
        break;
      case "weekly_hours":
        if (!regular_expression.hours.test(value)) {
          setErrors({ ...errors, weeklyError: true });
        } else {
          setErrors({ ...errors, weeklyError: false });
          setWeekly_hours(value);
        }
        break;
      case "user_mail":
        if (!regular_expression.email.test(value)) {
          setErrors({ ...errors, user_mailError: true });
        } else {
          setErrors({ ...errors, user_mailError: false });
          setUser_email(value);
        }
        break;
      case "phone_number":
        if (!regular_expression.number.test(value)) {
          setErrors({ ...errors, phone_numberError: true });
        } else {
          setErrors({ ...errors, phone_numberError: false });
          setPhone_number(value);
        }
        break;

      case "password":
        if (!regular_expression.password.test(value)) {
          setErrors({ ...errors, user_passwordError: true });
        } else {
          setErrors({ ...errors, user_passwordError: false });
          setUser_password(value);
        }
        break;
      case "passwordAgain":
        if (user_password.length < 8) {
          setErrors({ ...errors, passwordError: true });
        } else if (user_password === value) {
          setErrors({
            ...errors,
            passwordError: false,
            passwordAgainError: false,
          });
          setPasswordAgain(value);
        } else {
          setErrors({
            ...errors,
            passwordError: false,
            passwordAgainError: true,
          });
        }
        break;
      default:
        console.log("no hay valores.");
    }
  }

  const handleBirthDay = (newBirthDay) => {
    setErrors({...errors, bird_dateError: false});
    setBird_date(newBirthDay.toISOString())
  }

  function handleSubmit() {
    setIsLoading(true);
    let account = {
      boss_id,
      user_name,
      user_last_name,
      identity_document_type,
      identity_document_word,
      bird_date: birth_date,
      salary,
      weekly_hours,
      user_mail: user_email,
      phone_number,
      user_password,
      user_status,
    };
    if (account) {
      let ac = JSON.stringify(account);
      localStorage.setItem("account", ac);
      fetch("http://localhost:1337/createUser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: user_name,
          user_last_name: user_last_name,
          identity_document_type: identity_document_type,
          identity_document_word: identity_document_word,
          birth_date: birth_date,
          salary: salary,
          weekly_hours: weekly_hours,
          user_email: user_email,
          phone_number: phone_number,
          user_password: user_password,
          user_status: 1,
          boss_id: 1,
        }),
      })
        .then((res) => {
          JSON.stringify(res);
          // alert(res);
        })
        .then(
          (result) => {
            // alert(JSON.stringify(result));
          },
          (error) => {
            //alert(error);
          }
        );
      setTimeout(() => setCreated(true), 2000);
    }
  }

  let open = true;

  let screenWidth = window.innerWidth;

  /*Formulario CreateUser */

  return (
    <>
      {created && <Navigate to="/admin/userList" />}
      <div className="createUserContent">
        <div className="formCreateUser">
          {screenWidth > 1030 && <Title text="Registrar" />}

          <Item text="Nombre" />
          <Input
            attribute={{
              name: "user_name",
              inputType: "text",
              ph: "",
            }}
            handleChange={handleChange}
            param={errors.usernameError}
          />
          {errors.usernameError && (
            <ErrorNotification text="Requerido. Ingrese solo letras max 12" />
          )}

          <Item text="Apellido" />
          <Input
            attribute={{
              name: "lastName",
              inputType: "text",
              ph: "",
            }}
            handleChange={handleChange}
            param={errors.lastNameError}
          />
          {errors.lastNameError && (
            <ErrorNotification text="Requerido.  Ingrese solo letras max 20." />
          )}

          <Item text="Seleccione  tipo de documento" />
          <Select
            className="select"
            options={documentType}
            onChange={handleDocument}
          />
          {errors.identity_document_typeError && (
            <ErrorNotification text="Required.ingrese solo dos caracteres" />
          )}

          <Item text="Ingrese número de identidad" />
          <Input
            attribute={{
              name: "identity_document_word",
              inputType: "text",
              ph: "",
            }}
            handleChange={handleChange}
            param={errors.identity_document_wordError}
          />
          {errors.identity_document_wordError && (
            <ErrorNotification text="Required.Ingrese solo numeros max 10" />
          )}

          <Item text="Fecha de nacimiento" />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
             inputFormat='DD/MM/yyyy'
             value={birth_date}
             onChange={handleBirthDay}
             renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          {errors.bird_dateError && (
            <ErrorNotification text="Requerido. Ingrese segun el formato asignado" />
          )}

          <Item text="Salario" />
          <Input
            attribute={{
              name: "salary",
              inputType: "text",
              ph: "",
            }}
            handleChange={handleChange}
            param={errors.salaryError}
          />
          {errors.salaryError && (
            <ErrorNotification text="Requerido.Ingrese solo numeros" />
          )}

          <Item text="Horas de trabajo semanales" />
          <Input
            attribute={{
              name: "weekly_hours",
              inputType: "text",
              ph: "",
            }}
            handleChange={handleChange}
            param={errors.weeklyError}
          />
          {errors.weeklyError && (
            <ErrorNotification text="Requerido.Ingrese solo numeros max 2" />
          )}

          <Item text="Correo Electronico" />
          <Input
            attribute={{
              name: "user_mail",
              inputType: "email",
              ph: "",
            }}
            handleChange={handleChange}
            param={errors.user_mailError}
          />
          {errors.user_mailError && <ErrorNotification text="Required." />}

          <Item text="Telefono" />
          <Input
            attribute={{
              name: "phone_number",
              inputType: "text",
              ph: "",
            }}
            handleChange={handleChange}
            param={errors.phone_numberError}
          />
          {errors.phone_numberError && (
            <ErrorNotification text="Requerido.Ingrese solo numeros" />
          )}

          <Item text="Password" />
          <Input
            attribute={{
              name: "password",
              inputType: "password",
              ph: "",
            }}
            handleChange={handleChange}
            param={errors.passwordError}
          />
          {errors.passwordError && (
            <ErrorNotification text="min. 8 characters" />
          )}

          <Item text="Confirmar password" />
          <Input
            attribute={{
              name: "passwordAgain",
              inputType: "password",
              ph: "",
            }}
            handleChange={handleChange}
            param={errors.passwordAgainError}
          />
          {errors.passwordAgainError && (
            <ErrorNotification text="Password don't match" />
          )}

          <Button text="Guardar" handleOnClick={handleSubmit} param={params} />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to="/login" style={{ color: "#ff9b2f" }}>
              <Item text="Volver pagina login" />
            </Link>
          </div>
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

export default CreateUser;
