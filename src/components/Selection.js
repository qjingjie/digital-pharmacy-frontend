import React, { Component } from "react";
import { Redirect } from "react-router";
import { withTranslation } from "react-i18next";
import RouteBtn from "./RouteBtn";

class Selection extends Component {
  state = {
    redirect: false
  };

  componentDidMount() {
    this.page_timeout = setTimeout(
      () => this.setState({ redirect: true }),
      900000
    ); // set 15 mins page timeout
    this.props.updateCart([], 0.0);

    fetch("/startingpage/");
  }

  componentWillUnmount() {
    clearTimeout(this.page_timeout);
    fetch("/flushqr/");
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }
    return (
      <div className="l2-page-container">
        <div className="l2-heading-container">
          <h1 className="m2-welcome">
            {" "}
            {this.props.t("selectionpage.welcome")}{" "}
          </h1>
          <h2 className="m2-helper">
            {" "}
            {this.props.t("selectionpage.helper")}{" "}
          </h2>
        </div>

        <div className="l2-btn-container">
          <div className="m2-gsl-cta">
            <RouteBtn path="/Gsl" text={this.props.t("selectionpage.gsl")} />
          </div>

          <div className="m2-presc-cta">
            <RouteBtn
              path="/getpresc"
              text={this.props.t("selectionpage.presc")}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("common")(Selection);
