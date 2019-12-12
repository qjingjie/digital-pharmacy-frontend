import React from "react";
import { withTranslation } from "react-i18next";
import "../styles/statusbar.scss";

class StatusBar extends React.Component {
  constructor(props) {
    super(props);

    let monthNames = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC"
    ];

    let dayNames = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = null;
    if (hours >= 0 && hours < 6) {
      ampm = 1;
    } else if (hours >= 6 && hours < 9) {
      ampm = 2;
    } else if (hours >= 9 && hours < 12) {
      ampm = 3;
    } else if (hours >= 12 && hours < 18) {
      ampm = 4;
    } else {
      ampm = 5;
    }
    hours = hours % 12;
    hours = hours !== 0 ? hours : 12;
    minutes = ("0" + minutes).slice(-2);

    this.state = {
      month: "status.".concat(monthNames[date.getMonth()]),
      date: date.getDate(),
      year: date.getFullYear(),
      day: "status.".concat(dayNames[date.getDay()]),
      hour: hours,
      minute: minutes,
      am_pm: "status.".concat(ampm)
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    let monthNames = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC"
    ];

    let dayNames = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = null;
    if (hours >= 0 && hours < 6) {
      ampm = 1;
    } else if (hours >= 6 && hours < 9) {
      ampm = 2;
    } else if (hours >= 9 && hours < 12) {
      ampm = 3;
    } else if (hours >= 12 && hours < 18) {
      ampm = 4;
    } else {
      ampm = 5;
    }
    hours = hours % 12;
    hours = hours !== 0 ? hours : 12;
    minutes = ("0" + minutes).slice(-2);

    this.setState({
      month: "status.".concat(monthNames[date.getMonth()]),
      date: date.getDate(),
      year: date.getFullYear(),
      day: "status.".concat(dayNames[date.getDay()]),
      hour: hours,
      minute: minutes,
      am_pm: "status.".concat(ampm)
    });
  }

  render() {
    return (
      <div className="status_bar">
        <div className="clk_container">
          <p className="day"> {this.props.t(this.state.day)} </p>
          <p className="line1"> </p>
          <p className="date"> {this.state.date} </p>
          <p className="month"> {this.props.t(this.state.month)} </p>
          <p className="year"> {this.state.year} </p>
          <p className="line2"> </p>
          <p className="time">
            {this.state.hour}:{this.state.minute}
          </p>
          <p className="am_pm"> {this.props.t(this.state.am_pm)} </p>
        </div>
      </div>
    );
  }
}
export default withTranslation("common")(StatusBar);
