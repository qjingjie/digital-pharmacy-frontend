import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withTranslation } from "react-i18next";
import Landing from "./components/Landing";
import Selection from "./components/Selection";
import StatusBar from "./components/StatusBar";
import GetPresc from "./components/GetPresc";
import Management from "./components/Management";
import Prescription from "./components/Prescription";
import Gsl from "./components/Gsl";
import SelPay from "./components/SelPay";
import Payment from "./components/Payment";
import Collection from "./components/Collection";
import "./styles/app.scss";

// For pages with the status bar displayed
function WithStatusBar(props) {
  return (
    <div className="l0-app-container">
      <StatusBar trans={props.trans} />
      <Switch>
        <Route
          exact
          path="/Selection"
          render={props1 => (
            <Selection {...props1} updateCart={props.updateCart} />
          )}
        />
        <Route exact path="/GetPresc" component={GetPresc} />
        <Route
          exact
          path="/Prescription"
          render={props6 => (
            <Prescription {...props6} updateCart={props.updateCart} />
          )}
        />
        <Route exact path="/Management" component={Management} />
        <Route
          exact
          path="/Gsl"
          render={props2 => (
            <Gsl
              {...props2}
              tpriceMem={props.tpriceMem}
              cartMem={props.cartMem}
              updateCart={props.updateCart}
            />
          )}
        />
        <Route
          exact
          path="/SelPay"
          render={props3 => (
            <SelPay
              {...props3}
              tpriceMem={props.tpriceMem}
              updatePayment={props.updatePayment}
            />
          )}
        />
      </Switch>
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [], // update this cart to transfer data between pages
      tprice: 0.0, // update this cart to transfer data between pages
      item_count: 0,
      payment_option: null
    };

    this.updateCart = this.updateCart.bind(this);
    this.updatePayment = this.updatePayment.bind(this);
  }

  updateCart(newCart, newPrice, is_Presc = false) {
    var i,
      item_count = 0;

    if (!is_Presc) {
      if (newCart.length !== 0) {
        for (i = 0; i < newCart.length; i++) {
          item_count += newCart[i].quantity;
        }
      } else {
        item_count = 0;
      }
    } else {
      if (newCart.length !== 0) {
        for (i = 0; i < newCart.length; i++) {
          item_count += newCart[i].purchasing;
        }
      } else {
        item_count = 0;
      }
    }

    this.setState({ cart: newCart, tprice: newPrice, item_count: item_count });
  }

  updatePayment(payment_option) {
    this.setState({ payment_option: payment_option });
  }

  render() {
    const { i18n } = this.props;
    return (
      <main>
        <div className="l0-app-container">
          <Router>
            <Switch>
              <Route
                exact
                path="/"
                render={props0 => (
                  <Landing {...props0} updateCart={this.updateCart} />
                )}
              />
              <Route
                exact
                path="/Payment"
                render={props4 => (
                  <Payment
                    {...props4}
                    paymentOption={this.state.payment_option}
                  />
                )}
              />
              <Route
                exact
                path="/Collection"
                render={props5 => (
                  <Collection
                    {...props5}
                    item_count={this.state.item_count}
                    cartMem={this.state.cart}
                  />
                )}
              />
              <Route
                render={props => (
                  <WithStatusBar
                    {...props}
                    trans={i18n}
                    updateCart={this.updateCart}
                    cartMem={this.state.cart}
                    tpriceMem={this.state.tprice}
                    updatePayment={this.updatePayment}
                  />
                )}
              />
            </Switch>
          </Router>
        </div>
      </main>
    );
  }
}

export default withTranslation("common")(App);
