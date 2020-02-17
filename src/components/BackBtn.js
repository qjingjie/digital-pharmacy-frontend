import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// ------------------------------ BackBtn --------------------------------
// Creates a button that returns to the previous page
// -------------------------------- Props --------------------------------
// -classname       -> className
// -text            -> Text to be displayed
// -----------------------------------------------------------------------

const BackIcon = () => (
  <div className="back-icon">
    <svg
      width="12"
      height="20"
      viewBox="0 0 24 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="22.2374"
        y1="1.23744"
        x2="1.75962"
        y2="21.7153"
        stroke="#F5F5F5"
        strokeWidth="3.5"
      />
      <line
        x1="22.2404"
        y1="39.7152"
        x2="1.76256"
        y2="19.2374"
        stroke="#F5F5F5"
        strokeWidth="3.5"
      />
    </svg>
  </div>
);

class BackBtn extends Component {
  constructor(props) {
    super(props);
    this.routeBack = this.routeBack.bind(this);
  }

  routeBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <button
        className={this.props.name}
        type="button"
        onClick={this.routeBack}
      >
        <BackIcon />
        <p>{this.props.text}</p>
      </button>
    );
  }
}

export default withRouter(BackBtn);
