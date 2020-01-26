import React from "react";
import { Redirect } from "react-router";
import { withTranslation } from "react-i18next";
import FwdBtn from "./FwdBtn";
import "../styles/app.scss";

class SelectionPage extends React.Component {
  state = {
    redirect: false
  };

  componentDidMount() {
    this.id = setTimeout(() => this.setState({ redirect: true }), 18000000000); // Redirects to landing page after 3mins on inactivity
  }

  componentWillUnmount() {
    clearTimeout(this.id);
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
            <FwdBtn path="/gsl" text={this.props.t("selectionpage.gsl")} />
          </div>

          <div className="m-presc-cta">
            <FwdBtn
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
