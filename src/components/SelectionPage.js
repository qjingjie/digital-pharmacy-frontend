import React, { Component } from "react";
import { Redirect } from "react-router";
import { withTranslation } from "react-i18next";
import RouteBtn from "./RouteBtn";

class SelectionPage extends Component {
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
      <div className="l-selectionpage">
        <div className="l-text-container">
          <p className="m-welcome"> {this.props.t("selectionpage.welcome")} </p>
          <p className="m-helper"> {this.props.t("selectionpage.helper")} </p>
        </div>

        <div className="l-btn-container">
          <div className="m-gsl-cta">
            <RouteBtn path="/gsl" text={this.props.t("selectionpage.gsl")} />
          </div>

          <div className="m-presc-cta">
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

export default withTranslation("common")(SelectionPage);
