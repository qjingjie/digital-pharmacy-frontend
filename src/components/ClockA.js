import React from "react";
import "../styles/clockA.scss";

class ClockA extends React.Component {
  constructor() {
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
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours !== 0 ? hours : 12;
    minutes = ("0" + minutes).slice(-2);

    super();
    this.state = {
      month: monthNames[date.getMonth()],
      date: date.getDate(),
      year: date.getFullYear(),
      day: dayNames[date.getDay()],
      hour: hours,
      minute: minutes,
      am_pm: ampm
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
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours !== 0 ? hours : 12;
    minutes = ("0" + minutes).slice(-2);

    this.setState({
      month: monthNames[date.getMonth()],
      date: date.getDate(),
      year: date.getFullYear(),
      day: dayNames[date.getDay()],
      hour: hours,
      minute: minutes,
      am_pm: ampm
    });
  }

  render() {
    return (
      <div className="clkA_container">
        <p className="month"> {this.state.month} </p>
        <p className="date"> {this.state.date} </p>
        <p className="year"> {this.state.year} </p>
        <p className="line"> </p>
        <p className="day"> {this.state.day} </p>
        <p className="time">
          {this.state.hour}:{this.state.minute}
        </p>
        <p className="am_pm"> {this.state.am_pm} </p>
      </div>
    );
  }
}

export default ClockA;
