import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CreateUser from "./CreateUser/CreateUser";
import Project from "./Project/Project";
import ProjectList from "./Project/ProjectList";
import UserList from "./CreateUser/UserList";
import Activity from "./Activity/Activity";
import NavBar from "./NavBar/NavBar.js";
import ActivityList from "./Activity/ActivityList";
import RegisterAdmon from "./Register/RegisterAdmon";
import EditActivity from "./Activity/EditActivity";
import EditProyect from "./Project/EditProject";
import Statistics from "./CreateUser/Statistics";

const PagesAdmon = () => {
  return (
    <>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" exact element={<RegisterAdmon replace />} />
          <Route path="page" exact element={<RegisterAdmon replace />} />
          <Route path="createUser" exact element={<CreateUser />} />
          <Route path="userList" exact element={<UserList />} />
          <Route path="proyect" exact element={<Project />} />
          <Route path="proyectList" exact element={<ProjectList />} />
          <Route path="actividad" exact element={<Activity />} />
          <Route path="actividadList" exact element={<ActivityList />} />
          <Route path="editActividad" exact element={<EditActivity />} />
          <Route path="editProject" exact element={<EditProyect />} />
          <Route path="statistics" exact element={<Statistics />} />
        </Routes>
      </div>
    </>
  );
};
export default PagesAdmon;
