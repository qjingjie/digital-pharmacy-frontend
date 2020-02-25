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
        () => this.props.history.push("/Collection"),
        500
      );
    }

    return (
      <div>
        {this.state.transactionPass ? (
          <h1 className="m7-waitpayment-text">
            {this.props.t("payment.success")}
          </h1>
        ) : (
          <p className="m7-waitpayment-text">{this.props.t("payment.wait")}</p>
        )}
        {this.props.paymentOption === "qr" ? (
          <img
            className="m7-pos-icon"
            src={require("../icons/POS-QR.svg")}
            alt="POS"
          />
        ) : (
          <img
            className="m7-pos-icon"
            src={require("../icons/POS-NFC.svg")}
            alt="POS"
          />
        )}

        <CdCounter
          classname="m7-counter"
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
