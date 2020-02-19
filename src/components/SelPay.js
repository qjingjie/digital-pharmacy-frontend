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
      <div className="l-selpay">
        <div className="l-text-container">
          <p className="m-payment-text">{this.props.t("selpay.helper")}</p>
          <p className="m-payment-price">
            {this.props.t("general.tprice")}: $
            {parseFloat(this.props.tpriceMem).toFixed(2)}
          </p>
          <div className="m-payment-container">
            <RouteBtn
              classname="m-payment-1"
              path="/payment"
              text={this.props.t("selpay.credit")}
            />
            <RouteBtn
              classname="m-payment-2"
              path="/payment"
              text={this.props.t("selpay.qr")}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("common")(SelPay);
