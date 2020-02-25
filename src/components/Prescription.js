import React, { Component } from "react";
import { Redirect } from "react-router";
import { withTranslation } from "react-i18next";
import RouteBtn from "./RouteBtn";

function PrescItem(props) {
  return (
    <div className="l-presc-item">
      <img src={props.img} alt="medicine" />

      <p className="l-left">{props.name}</p>

      <p className="l-center">×{props.presc_quantity}</p>
      <div className="l-presc-qty-container">
        <button
          className="m-minus"
          type="button"
          onClick={() => props.minus(props.id)}
          disabled={props.purchasing === 0 ? true : false}
        >
          -
        </button>
        <p className="l-center">{props.purchasing}</p>
        <button
          className="m-plus"
          type="button"
          onClick={() => props.plus(props.id)}
          disabled={
            props.purchasing === props.stock
              ? true
              : props.purchasing === props.presc_quantity - props.purchased
              ? true
              : false
          }
        >
          +
        </button>
      </div>
      <p className="l-center">×{props.purchased}</p>
      <p
        className="l-center"
        style={{ color: props.stock === 0 ? "red" : "green" }}
      >
        {props.stock}
      </p>
      <p className="l-center">${props.price}</p>
      <p className="l-center">${(props.purchasing * props.price).toFixed(2)}</p>
    </div>
  );
}

class Prescription extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,

      isLoaded: false,
      nric: null,
      presc_id: null,
      valid_till: null,
      medicines: null,
      email_sub: null,

      tprice: 0,
      renderEmpty: false
    };

    this.handleEmpty = this.handleEmpty.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handlePlus = this.handlePlus.bind(this);
    this.handleMinus = this.handleMinus.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.id = setTimeout(() => this.setState({ redirect: true }), 18000000000); // Redirects to landing page after 3mins on inactivity

    fetch("/PMed/")
      .then(response => response.json())
      .then(data => {
        var total = 0;
        var i;

        for (i = 0; i < data.medicines.medicine.length; i++) {
          total +=
            (data.medicines.medicine[i].quantity -
              data.medicines.medicine[i].collected) *
            data.medicines.medicine[i].price;

          data.medicines.medicine[i]["purchasing"] =
            data.medicines.medicine[i].quantity -
            data.medicines.medicine[i].collected;
        }

        this.setState({
          nric: data.medicines.NRIC,
          presc_id: data.medicines.PrescriptionID,
          email_sub: data.medicines.Email,
          valid_till: data.medicines.ValidDate,
          medicines: data.medicines.medicine,
          isLoaded: true,
          tprice: total.toFixed(2)
        });
      });
  }

  componentWillUnmount() {
    clearTimeout(this.id);

    var cart = this.state.medicines;
    cart[0]["Email"] = this.state.email_sub; // Email selection will be returned in the first medicine object (some weird issue with assigning it outside)

    this.props.updateCart(cart, this.state.tprice, true);
  }

  handleEmpty() {
    this.setState({
      renderEmpty: true
    });
  }

  handleClose() {
    this.setState({
      renderEmpty: false
    });
  }

  handlePlus(identifier) {
    var i;
    var med_list = this.state.medicines;
    var total = parseFloat(this.state.tprice);

    for (i = 0; i < med_list.length; i++) {
      if (med_list[i].id === identifier) {
        if (
          med_list[i].purchasing + 1 <=
          med_list[i].quantity - med_list[i].collected
        ) {
          med_list[i].purchasing += 1;
          total += parseFloat(med_list[i].price);

          console.log(total);
        }
      }
    }
    this.setState({ medicines: med_list, tprice: total.toFixed(2) });
  }

  handleMinus(identifier) {
    var i;
    var med_list = this.state.medicines;
    var total = parseFloat(this.state.tprice);

    for (i = 0; i < med_list.length; i++) {
      if (med_list[i].id === identifier) {
        if (med_list[i].purchasing - 1 >= 0) {
          med_list[i].purchasing -= 1;
          total -= parseFloat(med_list[i].price);
        }
      }
    }
    this.setState({
      medicines: med_list,
      tprice: total.toFixed(2)
    });
  }

  toggle() {
    this.setState(state => ({
      email_sub: !state.email_sub
    }));
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }
    return (
      <div className="l-prescription">
        <div className="l-prescription-info">
          <p className="m-nric">Nric: {this.state.nric}</p>
          <p className="m-prescribe-id">
            Prescription ID: {this.state.presc_id}
          </p>
          <p className="m-valid-date">Valid till: {this.state.valid_till}</p>
        </div>
        <div className="l-email-msg">
          <p className="l-email-message">
            Medicine usage instructions will be sent to your provided email
            address if the email service option is selected.{" "}
          </p>
          <p className="l-email-ques">Currently subscribed to email service?</p>
          <label className="m-slider-switch">
            <input
              type="checkbox"
              defaultChecked={this.state.email_sub}
              onClick={this.toggle}
            ></input>
            <span>
              <p>Yes</p>
              <p>No</p>
            </span>
          </label>
        </div>
        <div className="l-presc-panel-container">
          <div className="l-presc-headings">
            <p className="l-left">{this.props.t("general.item")}</p>
            <p className="l-center">Prescribed Quantity</p>
            <p className="l-center">Selected Quantity</p>
            <p className="l-center">Previously Purchased</p>
            <p className="l-center"> {this.props.t("general.stock")}</p>
            <p className="l-center">{this.props.t("general.price")}</p>
            <p className="l-center">{this.props.t("general.subtotal")}</p>
          </div>
          <div className="l-presc-list-container">
            {this.state.isLoaded
              ? this.state.medicines.map(item => (
                  <PrescItem
                    key={item.name}
                    id={item.id}
                    name={item.name}
                    presc_quantity={item.quantity}
                    purchased={item.collected}
                    purchasing={item.purchasing}
                    stock={item.stock}
                    price={item.price}
                    img={item.pic}
                    plus={this.handlePlus}
                    minus={this.handleMinus}
                  />
                ))
              : null}
          </div>
          <div className="m-presc-arrow-container"></div>
          {this.state.renderEmpty ? (
            <div className="m-empty-prompt">
              <button type="button" onClick={this.handleClose}>
                OK
              </button>
            </div>
          ) : null}
          <div className="l-presc-total-container">
            <p className="l-presc-total-label">
              {this.props.t("general.tprice")}:
            </p>{" "}
            <p className="l-presc-total-price">${this.state.tprice}</p>
          </div>
          <RouteBtn
            classname="m-checkoutpresc-cta"
            path="/selectpayment"
            text={this.props.t("general.payment")}
            chkCart="True"
            tprice={parseInt(this.state.tprice)}
            handleEmpty={this.handleEmpty}
          />
        </div>
      </div>
    );
  }
}

export default withTranslation("common")(Prescription);
