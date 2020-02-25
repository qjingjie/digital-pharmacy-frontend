import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import BackBtn from "./BackBtn";

const monthNames = [
  "/ 1 /",
  "/ 2 /",
  "/ 3 /",
  "/ 4 /",
  "/ 5 /",
  "/ 6 /",
  "/ 7 /",
  "/ 8 /",
  "/ 9 /",
  "/ 10 /",
  "/ 11 /",
  "/ 12 /"
];

const dayNames = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

class StatusBar extends Component {
  constructor(props) {
    super(props);

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
      month: monthNames[date.getMonth()],
      date: date.getDate(),
      year: date.getFullYear(),
      day: "status.".concat(
        dayNames[date.getDay() === 0 ? 6 : date.getDay() - 1]
      ),
      hour: hours,
      minute: minutes,
      am_pm: "status.".concat(ampm),
      lang: this.props.trans.languages[0],
      lang_dis: this.props.trans.languages[0] === "en" ? "中文" : "EN"
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
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
      month: monthNames[date.getMonth()],
      date: date.getDate(),
      year: date.getFullYear(),
      day: "status.".concat(
        dayNames[date.getDay() === 0 ? 6 : date.getDay() - 1]
      ),
      hour: hours,
      minute: minutes,
      am_pm: "status.".concat(ampm)
    });
  }

  handleClick() {
    if (this.state.lang === "en") {
      this.setState({
        lang: "ch",
        lang_dis: "EN"
      });
      this.props.trans.changeLanguage("ch");
    } else {
      this.setState({
        lang: "en",
        lang_dis: "中文"
      });
      this.props.trans.changeLanguage("en");
    }
  }

  render() {
    return (
      <header>
        <BackBtn name="m10-back" text={this.props.t("status.back")} />
        <button
          className="m10-langswitch"
          type="button"
          onClick={this.handleClick}
        >
          {this.state.lang_dis}
        </button>
        <div className="l10-clk-container">
          <p className="m10-day"> {this.props.t(this.state.day)} </p>
          <p className="m10-line1"> </p>
          <p className="m10-date"> {this.state.date} </p>
          <p className="m10-month"> {this.props.t(this.state.month)} </p>
          <p className="m10-year"> {this.state.year} </p>
          <p className="m10-line2"> </p>
          <p className="m10-time">
            {this.state.hour}:{this.state.minute}
          </p>
          <p className="m10-am_pm"> {this.props.t(this.state.am_pm)} </p>
        </div>
      </header>
    );
  }
}
export default withTranslation("common")(StatusBar);
