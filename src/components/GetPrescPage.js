import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router";
//import ReactPlayer from "react-player";
import CdCounter from "../components/CdCounter";
import NumKeyboard2FA from "../components/NumKeyboard2FA";
import test from "../video/test1.mp4";

class AwaitQR extends Component {
  componentDidMount() {
    this.props.handle();
  }

  render() {
    return (
      <div className="l-info-container">
        <p className="m-qr-text">{this.props.text}</p>
        <img
          className="m-qrcode"
          src={require("../img/qr_code.png")}
          alt="qr"
        />
        {/*<img
          className="m-scan-line"
          src={require("../icons/scan-line.svg")}
          alt="scanline"
        >*</img>*/}
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
        setTimeout(() => this.setState({ incorrectCode: false }), 3000);
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
          this.props.history.push("/prescription");
        } else {
          this.setState({ incorrectCode: true });
          setTimeout(() => this.setState({ incorrectCode: false }), 3000);
        }
      })
    );
  }
  render() {
    return (
      <div className="l-info-container">
        <p className="m-title-2fa">{this.props.t("getpresc.helper2fa")}</p>
        {this.state.incorrectCode ? (
          <p className="m-error-2fa">{this.props.t("getpresc.incorrect")}</p>
        ) : null}
        <NumKeyboard2FA enter="enter" handle={this.submit2FA} />
        <CdCounter
          classname="m-counter-2fa"
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

class GetPrescPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      qr_scanned: false
    };

    this.handleTimeout = this.handleTimeout.bind(this);
    this.chkQR = this.chkQR.bind(this);
  }

  componentDidMount() {
    this.page_timeout = setTimeout(
      () => this.setState({ redirect: true }),
      180000000
    );
  }

  componentWillUnmount() {
    clearTimeout(this.page_timeout);
  }

  handleTimeout() {
    this.setState({ qr_scanned: false });
  }

  chkQR() {
    var jsonOut = { qr: true };

    fetch("/qrcode/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonOut)
    }).then(response =>
      response.json().then(data => {
        if (data === "manage") {
          this.props.history.push("/management");
        } else {
          if (data === "True") {
            this.setState({ qr_scanned: true });
          }
        }
      })
    );
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }
    return (
      <div className="l-getpresc">
        {this.state.qr_scanned ? (
          <Await2FAwithRouterTrans
            timeout="60000"
            timeoutSec="60"
            handleTimeout={this.handleTimeout}
            timeoutText={this.props.t("general.timeout")}
          />
        ) : (
          <AwaitQR text={this.props.t("getpresc.qr")} handle={this.chkQR} />
        )}
        {/*<ReactPlayer
          className="m-react-player"
          url={test}
          playing
          loop
          muted
          width="600px"
          height="600px"
        />*/}
      </div>
    );
  }
}

export default withTranslation("common")(GetPrescPage);
