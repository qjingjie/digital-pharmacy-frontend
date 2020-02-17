import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// ------------------------------ RouteBtn ------------------------------------
// Creates a button that allows for route change
// *Optional- Check if shopping cart is empty (Prevent route change)
// -------------------------------- Props -------------------------------------
// -classname       -> className
// -path            -> path to be routed to
// -chkCart         -> True if cart has to be checked for emptiness
// -tprice          -> Total price of cart items (Required if chkCart = True)
// -handleEmpty     -> Handle cart emptiness
// -text            -> Text to be displayed
// ----------------------------------------------------------------------------

class RouteBtn extends Component {
  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);
  }

  routeChange() {
    if (this.props.chkCart === "True") {
      if (this.props.tprice === 0) {
        this.props.handleEmpty();
      } else {
        let path = this.props.path;
        this.props.history.push(path);
      }
    } else {
      let path = this.props.path;
      this.props.history.push(path);
    }
  }

  render() {
    return (
      <button
        className={this.props.classname}
        type="button"
        onClick={this.routeChange}
      >
        {this.props.text}
      </button>
    );
  }
}

export default withRouter(RouteBtn);
