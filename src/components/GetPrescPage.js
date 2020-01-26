import React from "react";
import { withTranslation } from "react-i18next";
import { Redirect } from "react-router";
import ReactPlayer from "react-player";
import "../styles/app.scss";
import test from "../video/test.mp4";

const ScanLine = () => (
  <svg
    width="454"
    height="525"
    viewBox="0 0 454 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="scan-line">
      <rect
        id="Rectangle 108"
        x="23"
        y="8"
        width="408"
        height="10"
        fill="#FF0000"
      />
      <circle id="Ellipse 5" cx="12.5" cy="12.5" r="12.5" fill="#FF0000" />
      <circle id="Ellipse 6" cx="441.5" cy="12.5" r="12.5" fill="#FF0000" />
    </g>
  </svg>
);

const QrCode = props => (
  <div className="qr-container">
    <p>{props.text}</p>
    <img src={require("../img/qr-code.png")} alt="qr" />
    <ScanLine />
  </div>
);

class GetPrescPage extends React.Component {
  state = {
    redirect: false,
    qr_scanned: false
  };

  componentDidMount() {
    this.id = setTimeout(() => this.setState({ redirect: true }), 180000);
  }

  componentWillUnmount() {
    clearTimeout(this.id);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }
    return (
      <div>
        <div className="l-getpresc"></div>
        <ReactPlayer
          className="react-player"
          url={test}
          playing
          loop
          muted
          width="40%"
          height="40%"
        />
        <QrCode text={this.props.t("getpresc.qr")} />
      </div>
    );
  }
}

export default withTranslation("common")(GetPrescPage);
