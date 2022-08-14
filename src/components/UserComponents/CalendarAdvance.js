import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import axios from "axios";

let user_id = localStorage.getItem("user_id");
let dataUser = { user_id: user_id };
let eventFormat = [];

export default class CalendarAdvance extends Component {
  constructor() {
    super();
    this.state = { advances: [] };
  }

  componentDidMount = () => {
    this.getAdvancesForUser();
    this.generateEvent();
  };

  getAdvancesForUser() {
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

  generateEvent() {
    let advances = this.state.advances;
    let myEvent = {}
    let eventsArray = []
    for (let i = 0; i < advances.length; i++) {
      myEvent.id = advances[i].Advance_Id;
      myEvent.title = advances[i].Advance_Comments;
      myEvent.start = advances[i].Initial_Time;
      myEvent.end = advances[i].Final_Time;
      eventsArray.push({...myEvent});
    }
    return eventsArray;
  }

  render() {
    return (
      <div className="userActivities">
        <div className="Calendar">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
            // timeZone='local'
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="timeGridWeek"
            events={ this.generateEvent() }
            slotMinTime="04:00:00"
            slotMaxTime="19:00:00"
          ></FullCalendar>
        </div>
      </div>
    );
  }
}
