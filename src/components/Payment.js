import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import CdCounter from "../components/CdCounter";

class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      transactionPass: false,
      payment_error: false
    };
  }

  componentDidMount() {
    this.page_timeout = setTimeout(
      () => this.setState({ redirect: true }),
      60000
    ); // Redirects to payment selection page after 1min on inactivity

    var jsonOut = {
      transactionPass: this.state.transactionPass,
      payment_option: this.props.paymentOption
    };

    fetch("/paymentOTC/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonOut)
    }).then(response =>
      response.json().then(data => {
        if (data === "True") {
          this.setState({ transactionPass: true });
        } else {
          setTimeout(() => this.setState({ payment_error: true }), 3000);
        }
      })
    );
  }

  componentWillUnmount() {
    clearTimeout(this.page_timeout);
    clearTimeout(this.transit_page);
  }

  render() {
    if (this.state.redirect) {
      this.props.history.goBack();
    }

    if (this.state.transactionPass) {
      this.transit_page = setTimeout(
        () => this.props.history.push("/collection"),
        500
      );
    }

    return (
      <div>
        {this.state.transactionPass ? (
          <p className="m-waitpayment-text">
            {this.props.t("payment.success")}
          </p>
        ) : (
          <p className="m-waitpayment-text">{this.props.t("payment.wait")}</p>
        )}
        <img
          className="m-pos-icon"
          src={require("../icons/POS.svg")}
          alt="POS"
        />
        <CdCounter
          classname="m-counter"
          initialCount="60"
          interval="1000"
          dispcount="True"
          text={this.props.t("general.timeout")}
        />
      </div>
    );
  }
}

export default withRouter(withTranslation("common")(Payment));
