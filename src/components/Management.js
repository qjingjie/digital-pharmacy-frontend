import React, { Component } from "react";
import { Redirect } from "react-router";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";

function InventorySlot(props) {
  return (
    <div className="l-inventory">
      <button className="m-inventory" type="button" onClick={props.handleClick}>
        <p>
          ID: {props.id}
          <br></br>
          <br></br>
          {props.t("general.brand")}:<br></br>
          {props.brand}
          <br></br>
          <br></br>
          {props.t("general.item")}:<br></br>
          {props.name}
          <br></br>
          <br></br>
          {props.t("general.stock")}:<br></br>
        </p>
        <p
          className="m-stock"
          style={{ color: props.stock === 0 ? "red" : "green" }}
        >
          {props.stock}
        </p>
      </button>
    </div>
  );
}

const InventorySlotWithTrans = withTranslation("common")(InventorySlot);

class AddInventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      update_stock: parseInt(this.props.stock)
    };

    this.handlePlus = this.handlePlus.bind(this);
    this.handleMinus = this.handleMinus.bind(this);
  }

  handlePlus(count) {
    this.setState(state => ({
      update_stock:
        state.update_stock + count >= 100 ? 100 : state.update_stock + count
    }));
  }

  handleMinus(count) {
    this.setState(state => ({
      update_stock:
        state.update_stock - count <= 0 ? 0 : state.update_stock - count
    }));
  }

  render() {
    return (
      <div className="l-management-base">
        <button
          className="m-management-close"
          type="button"
          onClick={this.props.handleClose}
        ></button>

        <p className="l-management-addinventory">
          ID: {this.props.id}
          <br></br>
          <br></br>
          {this.props.t("general.brand")}: {this.props.brand}
          <br></br>
          <br></br>
          {this.props.t("general.item")}: {this.props.name}
        </p>

        <p className="l-stock-text">{this.props.t("general.stock")}</p>
        <div className="l-stock-container">
          <button type="button" onClick={() => this.handleMinus(10)}>
            -10
          </button>
          <button type="button" onClick={() => this.handleMinus(1)}>
            -1
          </button>
          <div>
            <p>{this.state.update_stock}</p>
          </div>
          <button type="button" onClick={() => this.handlePlus(1)}>
            +1
          </button>
          <button type="button" onClick={() => this.handlePlus(10)}>
            +10
          </button>
        </div>

        <button
          className="m-update-stock"
          type="button"
          onClick={() =>
            this.props.handleUpdate(this.state.update_stock, this.props.id)
          }
        >
          {this.props.t("general.update_stock")}
        </button>
      </div>
    );
  }
}

const AddInventoryWithTrans = withTranslation("common")(AddInventory);

class Management extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updated_cart: null,
      isLoaded: false,
      onExit: false,
      selected: false,

      item_id: "",
      item_brand: "",
      item_name: "",
      stock: 0
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }

  componentDidMount() {
    fetch("/OTCMedicine")
      .then(response => response.json())
      .then(data => {
        this.setState({
          updated_cart: data,
          isLoaded: true
        });
      }); // Fetch current cart data from backend
  }

  handleClick(identifier) {
    var i;
    for (i = 0; i < this.state.updated_cart.medicines.length; i++) {
      if (this.state.updated_cart.medicines[i].id === identifier) {
        this.setState({
          selected: true,
          item_id: identifier,
          item_brand: "test", //this.state.updated_cart.medicines[i].brand,
          item_name: this.state.updated_cart.medicines[i].name,
          stock: this.state.updated_cart.medicines[i].stock,
          img: this.state.updated_cart.medicines[i].pic
        });
        break;
      }
    }
  }

  handleUpdate(new_stock, identifier) {
    var cart_update = this.state.updated_cart;
    var i;
    for (i = 0; i < this.state.updated_cart.medicines.length; i++) {
      if (this.state.updated_cart.medicines[i].id === identifier) {
        cart_update.medicines[i].stock = new_stock;
        this.setState({
          updated_cart: cart_update,
          selected: false,
          item_id: "",
          item_brand: "",
          item_name: "",
          stock: 0
        });
      }
    }
  }

  handleClose() {
    this.setState({
      selected: false,
      item_id: "",
      item_brand: "",
      item_name: "",
      stock: 0
    });
  }

  handleExit() {
    this.setState({ onExit: true });
    var jsonOut = { updated_cart: this.state.updated_cart };

    // Send cart items to backend server
    fetch("/updateDBOTC", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonOut)
    });
    setTimeout(() => this.props.history.push("/"), 3000);
  }

  render() {
    return (
      <div className="l-management">
        {this.state.onExit ? (
          <div className="l-management-base">
            <p>{this.props.t("general.exiting")}</p>
          </div>
        ) : this.state.selected ? (
          <AddInventoryWithTrans
            id={this.state.item_id}
            brand={this.state.item_brand}
            name={this.state.item_name}
            stock={this.state.stock}
            handleClose={this.handleClose}
            handleUpdate={this.handleUpdate}
          />
        ) : (
          <div className="l-inventory-list">
            <button className="m-home-btn" onClick={this.handleExit}>
              {this.props.t("general.update_exit")}
            </button>
            {this.state.isLoaded
              ? this.state.updated_cart.medicines.map(item => (
                  <InventorySlotWithTrans
                    key={item.name}
                    id={item.id}
                    brand="test"
                    name={item.name}
                    stock={parseInt(item.stock)}
                    handleClick={() => this.handleClick(item.id)}
                  />
                ))
              : null}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(withTranslation("common")(Management));
