import React from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import ClockA from "./ClockA";
import FwdBtn from "./FwdBtn";
import "../styles/landingpage.scss";

class LandingPage extends React.Component {
  render() {
    const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

    return (
      <div className="landingpage">
        <div className="info_panel_container">
          <ClockA />
        </div>

        <AutoPlaySwipeableViews className="images" interval={parseInt("15000")}>
          <div className="imgA">
            <p> Medicine Collection On The Go... </p>
          </div>
          <div className="imgB">
            <p> 24 Hours Hassle Free Medicine Collection </p>
          </div>
        </AutoPlaySwipeableViews>

        <div className="begin_panel_container">
          <p> Touch Anywhere To Begin </p>
        </div>
        <img
          className="ptr_icon"
          src={require("../icons/pointer.svg")}
          alt="pointer"
        />
        <FwdBtn path="/selectionpage" name="hidden_btn" />
      </div>
    );
  }
}

export default LandingPage;
