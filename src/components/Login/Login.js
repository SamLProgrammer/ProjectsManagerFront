import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Title from "./components/Title";
import Input from "./components/Input";
import Item from "./components/Item";
import Button from "../commons/RegularButton";
import ModalError from "../commons/ModalError";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import logo from "../assets/logo2.png";


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 2,
    color: "#08eeff",
  },
}));

const Login = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  const [login_user, setUsername] = useState("");
  const [user_password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);

  const open = true;

  const [errors, setErrors] = useState({
    usernameError: false,
    passwordError: false,
  });

  const redirectByRol = (rol) => {
    if (rol === null) {
      console.log("admin" + rol);
      navigate("/admin");
    } else if (rol !== null) navigate("/employee");
  };
  function handleChange(name, value) {
    switch (name) {
      case "login_user":
        setErrors({ usernameError: false, passwordError: false });
        setHasErrors(false);
        setUsername(value);
        break;
      case "user_password":
        setErrors({ usernameError: false, passwordError: false });
        setHasErrors(false);
        setPassword(value);
        break;
      default:
        console.log("no hay valores");
    }
  }

  function showErrors() {
    setHasErrors(true);
    setErrors({ usernameError: true, passwordError: true });
  }

  function stopIsLoading() {
    setIsLoading(false);
    showErrors();
  }

  function handleOnClick() {
    setIsLoading(true);
    let baseUrl = "http://projectsmanagerapp-env.eba-hc2swjbm.sa-east-1.elasticbeanstalk.com/login";
    let login = { login_user: login_user, user_password: user_password };
    axios
      .post(baseUrl, login)
      .then((response) => {
        if (response.data) {
          let ac = JSON.stringify(login);
          localStorage.setItem("account", ac);
          localStorage.setItem("user_id", response.data.id);
          localStorage.setItem("user_name", response.data.user_name);
          console.log("entro" + response.data.boss_id);
          console.log(localStorage.getItem("user_name"));

          redirectByRol(response.data.boss_id);
        }
      })
      .catch((error) => {
        console.log(error.data);
      });
  }

  function clearErrorModal() {
    setHasErrors(false);
    setErrors({ usernameError: false, passwordError: false });
  }

  let params = errors.usernameError === false && errors.passwordError === false;
  return (
    <>
      <div className="LoginContent">
      <div className="login-container">
          <div className="login-left-container">
            <img src={logo} alt="P-WorkFlow" width="450" />
          </div>
          </div>
        <div className="Login">
          <div className="LoginHigher" />
          <div className="LoginLower">
            <Title text="Bienvenidos" />

            {hasErrors && (
              <ModalError
                title="A ocurrido un error!"
                text="Usuario o password no existe."
                handleOnClick={clearErrorModal}
              />
            )}

            <div className="ItemUserLogin">
              <Item text="Usuario" />
              <Input
                attribute={{
                  name: "login_user",
                  inputType: "text",
                  ph: "Ingrese correo",
                }}
                handleChange={handleChange}
                param={errors.usernameError}
              />
            </div>
            <div className="ItemPasswordLogin">
              <Item text="Password" />
              <Input
                attribute={{
                  name: "user_password",
                  inputType: "password",
                  ph: "",
                }}
                handleChange={handleChange}
                param={errors.passwordError}
              />
            </div>

            <Button
              text="Iniciar Sesion"
              handleOnClick={handleOnClick}
              param={params}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link to="/auth/register" style={{ color: "#aa6dc4" }}>
                <Item text="Olvidaste Contraseña" />
              </Link>
            </div>

            {isLoading && (
              <Backdrop open={open} className={classes.backdrop}>
                <CircularProgress color="inherit" />
              </Backdrop>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
