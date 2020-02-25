import React, { Component } from "react";
import { Redirect } from "react-router";
import { withTranslation } from "react-i18next";
import RouteBtn from "./RouteBtn";

class SelPay extends Component {
  state = {
    redirect: false
  };

  componentDidMount() {
    this.page_timeout = setTimeout(
      () => this.setState({ redirect: true }),
      900000
    ); // Redirects to landing page after 3mins on inactivity
  }

  componentWillUnmount() {
    clearTimeout(this.page_timeout);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }
    return (
      <div className="l6-page-container">
        <div className="l6-headings-container">
          <h1 className="m6-payment-heading">
            {this.props.t("selpay.helper")}
          </h1>
          <h2 className="m6-payment-price">
            {this.props.t("general.tprice")}: $
            {parseFloat(this.props.tpriceMem).toFixed(2)}
          </h2>
          <div className="l6-payment-container">
            <RouteBtn
              classname="m6-payment-1"
              path="/Payment"
              text={this.props.t("selpay.credit")}
              payment="True"
              updatePayment={() => this.props.updatePayment("credit")}
            />
            <RouteBtn
              classname="m6-payment-2"
              path="/Payment"
              text={this.props.t("selpay.qr")}
              payment="True"
              updatePayment={() => this.props.updatePayment("qr")}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("common")(SelPay);
