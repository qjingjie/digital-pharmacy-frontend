import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import CdCounter from "../components/CdCounter";

class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      transactionPass: false
    };

    this.handleTransaction = this.handleTransaction.bind(this);
  }

  componentDidMount() {
    this.id = setTimeout(() => this.setState({ redirect: true }), 60000); // Redirects to payment selection page after 1min on inactivity
  }

  componentWillUnmount() {
    clearTimeout(this.id);
    clearTimeout(this.next);

    var jsonOut = { cart: this.props.cartMem, transactionPass: false };

    // Send cart items to backend server
    fetch("/updateDBOTC", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonOut)
    });
  }

  handleTransaction(newstate) {
    this.setState({
      transactionPass: newstate
    });
  }

  render() {
    if (this.state.redirect) {
      this.props.history.goBack();
    }

    if (this.state.transactionPass) {
      this.next = setTimeout(() => this.props.history.push("/collection"), 500);
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
          fetch="True"
          fetchRoute="/paymentOTC"
          dictKey="transactionPass"
          handler={this.handleTransaction}
          dispcount="True"
          text={this.props.t("general.timeout")}
        />
      </div>
    );
  }
}

export default withRouter(withTranslation("common")(Payment));
