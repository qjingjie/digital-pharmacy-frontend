import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";

const Star = props => (
  <div className={props.classname}>
    <svg
      onClick={() => console.log("testing")}
      xmlns="http://www.w3.org/2000/svg"
      width="70"
      height="70"
      viewBox="0 0 512 512"
    >
      <path
        d="M480,208H308L256,48,204,208H32l140,96L118,464,256,364,394,464,340,304Z"
        style={{
          stroke: "rgba(255, 255, 255, 1)",
          strokeLinejoin: "round",
          strokeWidth: "10px"
        }}
      />
    </svg>
  </div>
);

class Collection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      compeleted: false
    };
  }

  componentDidMount() {
    var jsonOut = { cart: this.props.cartMem };

    // Send cart items to backend server
    fetch("/updateDBOTC", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonOut)
    }).then(response =>
      response.json().then(data => {
        if (data === "Done") {
          this.setState({ compeleted: true });
        }
      })
    );

    var bar_interval = (this.props.item_count * 8000) / 98;
    this.interval = setInterval(() => {
      this.state.compeleted
        ? this.setState({ progress: 100 })
        : this.state.progress <= 98
        ? this.setState(state => ({ progress: state.progress + 1 }))
        : this.setState({ progress: 98 });
    }, bar_interval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    if (this.state.progress === 100) {
      this.next = setTimeout(() => this.props.history.push("/"), 500);
    }
    return (
      <div>
        {this.state.progress === 100 ? (
          <div>
            <p>{this.props.t("collection.thank")}</p>
            <p>{this.props.t("collection.rate")}</p>
            <div className="m-rating-container">
              <Star classname="m-star-1" />
              <Star classname="m-star-2" />
              <Star classname="m-star-3" />
              <Star classname="m-star-4" />
              <Star classname="m-star-5" />
            </div>
          </div>
        ) : (
          <p>{this.props.t("collection.wait")}</p>
        )}

        <div
          className="m-progress-bar"
          style={{ "--width": this.state.progress }}
        >
          {this.state.progress === 100 ? (
            <p>{this.props.t("collection.complete")}</p>
          ) : (
            <p>{this.props.t("collection.inprogress")}</p>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(withTranslation("common")(Collection));
