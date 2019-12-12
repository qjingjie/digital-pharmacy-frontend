import React from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import { withTranslation } from "react-i18next";
import FwdBtn from "./FwdBtn";
import "../styles/selectionpage.scss";

class SelectionPage extends React.Component {
  state = {
    redirect: false
  };

  componentDidMount() {
    this.id = setTimeout(() => this.setState({ redirect: true }), 180000); // Redirects to landing page after 3mins on inactivity
  }

  componentWillUnmount() {
    clearTimeout(this.id);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }
    return (
      <div className="selectionpage">
        <p className="helper_txt"> {this.props.t("selectionpage.helper")} </p>
        <div className="btn_container">
          <div className="gsl_txt">{this.props.t("selectionpage.gsl")}</div>
          <div className="presc_txt">{this.props.t("selectionpage.presc")}</div>
          <FwdBtn path="/gsl" name="gsl_btn" />

          <FwdBtn path="/inforequest" name="presc_btn" />
        </div>
      </div>
    );
  }
}

export default withTranslation("common")(SelectionPage);
