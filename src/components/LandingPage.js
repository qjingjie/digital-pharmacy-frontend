import React, { Component } from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import RouteBtn from "./RouteBtn";

const PointerIcon = () => (
  <div className="ptr-icon">
    <svg
      width="40"
      height="103"
      viewBox="0 0 70 103"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.5181 7.89285L18.5181 66.2321L13.6877 44.4286C12.9808 41.2464 9.79982 39.2429 6.61884 39.95C3.43786 40.6571 1.43502 43.8393 2.14191 47.0214L9.21075 78.8429C9.5642 80.0214 10.2711 81.2 11.4492 82.1429L24.4088 92.1607V101H58.5749V95.1071C58.5749 86.7393 68 86.15 68 70.3571C68 66.5857 68 54.0929 68 49.1429C68 45.2536 64.819 42.0714 60.9312 42.0714C59.0461 42.0714 57.3967 42.7786 56.2186 43.9571C56.2186 43.7214 56.2186 43.4857 56.2186 43.25C56.2186 39.3607 53.0376 36.1786 49.1497 36.1786C47.2647 36.1786 45.4975 36.8857 44.2015 38.1821C43.4947 35 40.6671 32.6429 37.3683 32.6429C33.4805 32.6429 30.2995 35.825 30.2995 39.7143L30.2995 7.89285C30.2995 4.59285 27.7076 2 24.4088 2C21.11 2 18.5181 4.59285 18.5181 7.89285Z"
        stroke="whitesmoke"
        stroke-width="2.25949"
      />
    </svg>
  </div>
);

class LandingPage extends Component {
  componentDidMount() {
    this.props.updateCart([], 0.0);
  }

  render() {
    const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

    return (
      <div className="l-app">
        <AutoPlaySwipeableViews
          className="l-images"
          interval={parseInt("15000")} // Time interval between each image
        >
          <div className="m-imgA" />
          <div className="m-imgB" />
        </AutoPlaySwipeableViews>

        <div className="m-begin-panel">
          <p> Touch Anywhere To Begin </p>
          <PointerIcon />
        </div>
        <RouteBtn classname="m-hidden-btn" path="/selectionpage" />
      </div>
    );
  }
}

export default LandingPage;
