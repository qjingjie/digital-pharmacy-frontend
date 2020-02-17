import React, { Component } from "react";
import { Redirect } from "react-router";
import { withTranslation } from "react-i18next";
import RouteBtn from "./RouteBtn";

class SelPay extends Component {
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
      <div className="l-selpay">
        <div className="l-text-container">
          <p className="m-payment-text">{this.props.t("selpay.helper")}</p>
          <p className="m-payment-price">
            {this.props.t("general.tprice")}: $
            {parseFloat(this.props.tpriceMem).toFixed(2)}
          </p>
          <div className="m-payment-container">
            <RouteBtn classname="m-payment-1" path="/payment" text="Option 1" />
            <RouteBtn classname="m-payment-2" path="/payment" text="Option 2" />
            <RouteBtn classname="m-payment-3" path="/payment" text="Option 3" />
            <RouteBtn classname="m-payment-4" path="/payment" text="Option 4" />
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("common")(SelPay);
