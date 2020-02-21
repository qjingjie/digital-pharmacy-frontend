import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import RouteBtn from "./RouteBtn";

const Star = props => (
  <div className={props.classname}>
    <svg
      onClick={props.handle}
      width="86"
      height="83"
      viewBox="0 0 86 83"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        fill: props.fill,
        transform: props.size,
        pointerEvents: props.disable ? "none" : "auto"
      }}
    >
      <path
        d="M45.2418 2.93179L55.4188 23.5527C56.22 25.1759 57.7686 26.3011 59.56 26.5614L82.3165 29.8681C84.367 30.1661 85.1858 32.686 83.702 34.1323L67.2353 50.1834C65.939 51.447 65.3475 53.2675 65.6535 55.0517L69.5408 77.7162C69.891 79.7584 67.7475 81.3158 65.9134 80.3516L45.5594 69.6509C43.9571 68.8085 42.0429 68.8085 40.4406 69.6509L20.0866 80.3516C18.2525 81.3158 16.109 79.7584 16.4592 77.7162L20.3465 55.0517C20.6525 53.2675 20.061 51.447 18.7647 50.1834L2.29799 34.1323C0.814198 32.686 1.63298 30.1661 3.68352 29.8681L26.44 26.5614C28.2314 26.3011 29.78 25.1759 30.5812 23.5527L40.7582 2.9318C41.6752 1.07368 44.3248 1.07368 45.2418 2.93179Z"
        stroke="#F5F5F5"
        stroke-width="3"
      />
    </svg>
  </div>
);

class Collection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      compeleted: false,
      rating: 0,

      disabled: false, //disable click events on svg
      star1_fill: "#e79b25",
      star1_size: "scale(1)",
      star2_fill: "rgba(255, 255, 255, 0.25)",
      star2_size: "scale(1)",
      star3_fill: "rgba(255, 255, 255, 0.25)",
      star3_size: "scale(1)",
      star4_fill: "rgba(255, 255, 255, 0.25)",
      star4_size: "scale(1)",
      star5_fill: "rgba(255, 255, 255, 0.25)",
      star5_size: "scale(1)"
    };

    this.handleRate = this.handleRate.bind(this);
  }

  componentDidMount() {
    var jsonOut = { cart: this.props.cartMem };

    // Send cart items to backend server
    fetch("/updateDBOTC/", {
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

  handleRate(rating) {
    if (rating === "1") {
      this.setState({ star1_size: "scale(1.1)", rating: 1, disabled: true });
    }
    if (rating === "2") {
      this.setState({
        star1_size: "scale(1.1)",
        star2_fill: "#e79b25",
        star2_size: "scale(1.1)",
        rating: 2,
        disabled: true
      });
    }
    if (rating === "3") {
      this.setState({
        star1_size: "scale(1.1)",
        star2_fill: "#e79b25",
        star2_size: "scale(1.1)",
        star3_fill: "#e79b25",
        star3_size: "scale(1.1)",
        rating: 3,
        disabled: true
      });
    }
    if (rating === "4") {
      this.setState({
        star1_size: "scale(1.1)",
        star2_fill: "#e79b25",
        star2_size: "scale(1.1)",
        star3_fill: "#e79b25",
        star3_size: "scale(1.1)",
        star4_fill: "#e79b25",
        star4_size: "scale(1.1)",
        rating: 4,
        disabled: true
      });
    }
    if (rating === "5") {
      this.setState({
        star1_size: "scale(1.1)",
        star2_fill: "#e79b25",
        star2_size: "scale(1.1)",
        star3_fill: "#e79b25",
        star3_size: "scale(1.1)",
        star4_fill: "#e79b25",
        star4_size: "scale(1.1)",
        star5_fill: "#e79b25",
        star5_size: "scale(1.1)",
        rating: 5,
        disabled: true
      });
    }
  }
  render() {
    if (this.state.disabled === true) {
      this.next = setTimeout(() => this.props.history.push("/"), 3000);
    }
    return (
      <div>
        {this.state.progress === 100 ? (
          <div>
            <p className="m-heading-completed-tk">
              {this.props.t("collection.thank")}
            </p>
            <p className="m-heading-completed-rate">
              {this.props.t("collection.rate")}
            </p>
            <div className="m-rating-container">
              <Star
                classname="m-star-1"
                fill={this.state.star1_fill}
                size={this.state.star1_size}
                disable={this.state.disabled}
                handle={() => this.handleRate("1")}
              />
              <Star
                classname="m-star-2"
                fill={this.state.star2_fill}
                size={this.state.star2_size}
                disable={this.state.disabled}
                handle={() => this.handleRate("2")}
              />
              <Star
                classname="m-star-3"
                fill={this.state.star3_fill}
                size={this.state.star3_size}
                disable={this.state.disabled}
                handle={() => this.handleRate("3")}
              />
              <Star
                classname="m-star-4"
                fill={this.state.star4_fill}
                size={this.state.star4_size}
                disable={this.state.disabled}
                handle={() => this.handleRate("4")}
              />
              <Star
                classname="m-star-5"
                fill={this.state.star5_fill}
                size={this.state.star5_size}
                disable={this.state.disabled}
                handle={() => this.handleRate("5")}
              />
            </div>
            <RouteBtn
              classname="m-home"
              path="/"
              chkcart="False"
              payment="False"
            />
          </div>
        ) : (
          <p className="m-heading-inprogress">
            {this.props.t("collection.wait")}
          </p>
        )}

        {this.state.disabled ? (
          <p className="m-rated">{this.props.t("collection.rated")}</p>
        ) : null}

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
