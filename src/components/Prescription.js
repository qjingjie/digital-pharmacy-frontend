import React, { Component } from "react";
import { Redirect } from "react-router";
import { withTranslation } from "react-i18next";
import RouteBtn from "./RouteBtn";

function PrescItem(props) {
  return (
    <div className="l5-prescription-item-container">
      <img src={props.img} alt="medicine" />

      <div>
        <p className="m5-item-left-align-small">{props.brand}</p>
        <p className="m5-item-left-align-large">{props.name}</p>
      </div>

      <p className="m5-item-center-align">×{props.presc_quantity}</p>
      <div className="l5-prescription-qty-container">
        <button
          className="m5-minus"
          type="button"
          onClick={() => props.minus(props.id)}
          disabled={props.purchasing === 0 ? true : false}
        >
          -
        </button>
        <p className="m5-qty-center-align">{props.purchasing}</p>
        <button
          className="m5-plus"
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
      <p className="m5-item-center-align">×{props.purchased}</p>
      <p
        className="m5-item-center-align"
        style={{ color: props.stock === 0 ? "#cc1100" : "green" }}
      >
        {props.stock}
      </p>
      <p className="m5-item-center-align">${props.price}</p>
      <p className="m5-item-center-align">
        ${(props.purchasing * props.price).toFixed(2)}
      </p>
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
    this.page_timeout = setTimeout(
      () => this.setState({ redirect: true }),
      900000
    );

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

          if (
            data.medicines.medicine[i].purchasing >=
            data.medicines.medicine[i].stock
          ) {
            data.medicines.medicine[i].purchasing =
              data.medicines.medicine[i].stock;
          }

          data.medicines.medicine[i]["subtotal"] =
            (data.medicines.medicine[i].quantity -
              data.medicines.medicine[i].collected) *
            data.medicines.medicine[i].price;
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
    clearTimeout(this.page_timeout);

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
          med_list[i].subtotal = med_list[i].purchasing * med_list[i].price;
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
          med_list[i].subtotal = med_list[i].purchasing * med_list[i].price;
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
      <div className="l5-page-container">
        <div className="l5-prescription-info-container">
          <h1 className="m5-nric">
            {this.props.t("general.nric")}: {this.state.nric}
          </h1>
          <h1 className="m5-prescription-id">
            {this.props.t("general.presc_id")}: {this.state.presc_id}
          </h1>
          <h1 className="m5-valid-date">
            {this.props.t("general.valid")}: {this.state.valid_till}
          </h1>
        </div>
        <div className="l5-email-message-container">
          <p className="m5-email-message">
            {this.props.t("prescription.email")}
          </p>
          <p className="m5-email-question">
            {this.props.t("prescription.sub_email")}:
          </p>
          <label className="m5-slider-switch">
            <input
              type="checkbox"
              defaultChecked={this.state.email_sub}
              onClick={this.toggle}
            ></input>
            <span>
              <p>{this.props.t("general.yes")}</p>
              <p>{this.props.t("general.no")}</p>
            </span>
          </label>
        </div>
        <div className="l5-prescription-panel-container">
          <div className="l5-prescription-headings-container">
            <h2 className="m5-headings-left-align">
              {this.props.t("general.item")}
            </h2>
            <h2 className="m5-headings-center-align">
              {this.props.t("general.presc_qty")}
            </h2>
            <h2 className="m5-headings-center-align">
              {this.props.t("general.select_qty")}
            </h2>
            <h2 className="m5-headings-center-align">
              {this.props.t("general.prev_qty")}
            </h2>
            <h2 className="m5-headings-center-align">
              {" "}
              {this.props.t("general.stock")}
            </h2>
            <h2 className="m5-headings-center-align">
              {this.props.t("general.price")}
            </h2>
            <h2 className="m5-headings-center-align">
              {this.props.t("general.subtotal")}
            </h2>
          </div>
          <div className="l5-prescription-list-container">
            {this.state.isLoaded
              ? this.state.medicines.map(item => (
                  <PrescItem
                    key={item.name}
                    id={item.id}
                    brand={item.brand}
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
          {this.state.renderEmpty ? (
            <div className="l5-empty-prompt-container">
              <p>{this.props.t("prescription.error")}</p>
              <button type="button" onClick={this.handleClose}>
                {this.props.t("general.ok")}
              </button>
            </div>
          ) : null}
          <div className="l5-prescription-total-container">
            <p className="m5-prescription-total-label">
              {this.props.t("general.tprice")}:
            </p>{" "}
            <p className="m5-prescription-total">${this.state.tprice}</p>
          </div>
          <RouteBtn
            classname="m5-checkoutpresc-cta"
            path="/SelPay"
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
