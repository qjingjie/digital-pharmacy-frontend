import React, { Component } from "react";
import { Redirect } from "react-router";
import { withTranslation } from "react-i18next";

class Prescription extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,

      nric: null,
      medicines: null,
      email_sub: false
    };
  }

  componentDidMount() {
    this.id = setTimeout(() => this.setState({ redirect: true }), 18000000000); // Redirects to landing page after 3mins on inactivity

    fetch("/test/")
      .then(response => response.json())
      .then(data => {
        console.log(data["medicines"][0]);
      });
  }

  componentWillUnmount() {
    clearTimeout(this.id);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }
    return <div>test</div>;
  }
}

export default withTranslation("common")(Prescription);
