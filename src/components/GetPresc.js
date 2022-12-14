import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router";
//import ReactPlayer from "react-player";
import CdCounter from "../components/CdCounter";
import NumKeyboard2FA from "../components/NumKeyboard2FA";

class AwaitQR extends Component {
  componentDidMount() {
    this.props.handle();
  }

  render() {
    return (
      <div className="l4-info-container">
        <h1 className="m4-qr-heading">{this.props.text}</h1>
        <img
          className="m4-qrcode"
          src={require("../img/qr_code.png")}
          alt="qr"
        />
      </div>
    );
  }
}

class Await2FA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      incorrectCode: false
    };

    this.submit2FA = this.submit2FA.bind(this);
    this.resetError = this.resetError.bind(this);
  }

  componentDidMount() {
    this.timeout = setTimeout(
      () => this.props.handleTimeout(),
      parseInt(this.props.timeout)
    );
    fetch("/securitycode/");
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    fetch("/flushqr/");
  }

  submit2FA(code) {
    var i;
    for (i = 0; i < code.length; i++) {
      if (code[i] === null) {
        this.setState({ incorrectCode: true });
        return;
      }
    }
    // send code to backend from here onwards
    fetch("/PrescriptionMed/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(code)
    }).then(response =>
      response.json().then(data => {
        if (data === "True") {
          this.props.history.push("/Prescription");
        } else {
          this.setState({ incorrectCode: true });
        }
      })
    );
  }

  resetError() {
    this.setState({ incorrectCode: false });
  }

  render() {
    return (
      <div className="l4-info-container">
        <h1 className="m4-2fa-heading">{this.props.t("getpresc.helper2fa")}</h1>
        {this.state.incorrectCode ? (
          <p className="m4-2fa-error">{this.props.t("getpresc.incorrect")}</p>
        ) : null}
        <NumKeyboard2FA handle={this.submit2FA} resetError={this.resetError} />
        <CdCounter
          classname="m4-2fa-counter"
          initialCount={this.props.timeoutSec}
          interval="1000"
          text={this.props.timeoutText}
          dispcount="True"
        />
      </div>
    );
  }
}

const Await2FAwithRouterTrans = withRouter(withTranslation("common")(Await2FA)); // Gives Await2FA the access to history.push

class GetPresc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      qr_scanned: false,
      error: false
    };

    this.handleTimeout = this.handleTimeout.bind(this);
    this.chkQR = this.chkQR.bind(this);
  }

  componentDidMount() {
    this.page_timeout = setTimeout(
      () => this.setState({ redirect: true }),
      900000 //15 mins
    );
  }

  componentWillUnmount() {
    clearTimeout(this.page_timeout);
  }

  handleTimeout() {
    this.setState({ qr_scanned: false });
  }

  chkQR() {
    fetch("/qrcode/").then(response =>
      response.json().then(data => {
        if (data === "manage") {
          this.props.history.push("/Management");
        } else {
          if (data === "True") {
            this.setState({ qr_scanned: true });
          } else {
            this.setState({ error: true });
          }
        }
      })
    );
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }

    if (this.state.error) {
      this.chkQR();
    }
    return (
      <div className="l4-page-container">
        {this.state.qr_scanned ? (
          <div>
            <div className="l4-image2" />
            <Await2FAwithRouterTrans
              timeout="60000"
              timeoutSec="60"
              handleTimeout={this.handleTimeout}
              timeoutText={this.props.t("general.timeout")}
            />
          </div>
        ) : (
          <div>
            <div className="l4-image1" />
            <AwaitQR
              text={
                this.state.error
                  ? this.props.t("getpresc.qr_error")
                  : this.props.t("getpresc.qr")
              }
              handle={this.chkQR}
            />
          </div>
        )}
      </div>
    );
  }
}

export default withTranslation("common")(GetPresc);
