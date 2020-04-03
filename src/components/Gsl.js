import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Redirect } from "react-router";
import RouteBtn from "./RouteBtn";

function CartItems(props) {
  return (
    <div className="l3-cart-item-container">
      <span className="m3-cart-item-name">{props.name}</span>
      <span className="m3-cart-item-quantity">×{props.quantity}</span>
      <span className="m3-cart-item-price">${props.price}</span>
      <button
        className="m3-cart-item-delete"
        type="button"
        onClick={props.handleDelete}
      ></button>
    </div>
  );
}

function ItemInfo(props) {
  return (
    <div className="l3-iteminfo-container2">
      <div
        className="m3-iteminfo-img"
        style={{ backgroundImage: "url(" + props.img + ")" }}
      ></div>
      <button
        className="m3-iteminfo-close"
        type="button"
        onClick={props.handleClose}
      ></button>
      <span className="m3-iteminfo-brand">{props.brand}</span>
      <span className="m3-iteminfo-name">{props.name}</span>
      <span className="m3-iteminfo-price">
        {props.t("general.price")}: ${props.price}
      </span>
      <span className="m3-iteminfo-stock">
        {props.t("general.availstock")}: {props.stock}
      </span>
      <span className="m3-iteminfo-desc-label">
        {props.t("general.description")}
        <br></br>
        <div className="l3-iteminfo-desc-container">
          <p>{props.desc}</p>
        </div>
      </span>
      <div className="l3-iteminfo-counter-container">
        <button
          className="m3-iteminfo-minus"
          type="button"
          onClick={props.handleMinus}
          disabled={props.quantity <= 1 ? true : false}
        >
          -
        </button>
        <div className="m3-iteminfo-count">{props.quantity}</div>
        <button
          className="m3-iteminfo-plus"
          type="button"
          onClick={props.handlePlus}
          disabled={props.quantity === props.stock ? true : false}
        >
          +
        </button>
      </div>
      <span className="m3-iteminfo-subtotal">
        {props.t("general.subtotal")}: ${props.subtotal}
      </span>
      <button
        className="m3-iteminfo-addtocart"
        type="button"
        onClick={props.handleAddToCart}
        disabled={props.stock === "0" ? true : false}
      >
        {props.t("general.add")}
      </button>
    </div>
  );
}

function ItemCTA(props) {
  return (
    <div className="l3-itemcta-container2">
      <button
        className="m3-itemcta"
        style={{ backgroundImage: "url(" + props.img + ")" }}
        type="button"
        onClick={props.handleClick}
      >
        <p className="m3-itemcta-name">{props.name}</p>
        <div className="l3-itemcta-stock-container">
          <p className="m3-itemcta-stock-label">{props.t("general.stock")}:</p>
          <p
            className="m3-itemcta-stock"
            style={{
              color: props.stock === "0" ? "#cc1100" : "green"
            }}
          >
            {props.stock}
          </p>
        </div>
        <p className="m3-itemcta-price">${props.price}</p>
      </button>
    </div>
  );
}

function SideBar(props) {
  return (
    <div className="l3-sidebar-container">
      {props.bottom ? (
        <div>
          <img
            className="m3-sidebar-arrow-up"
            src={require("../icons/arrowup.svg")}
            alt="up"
          />
          <p>{props.t("status.more")}</p>
        </div>
      ) : props.top ? (
        <div>
          <p>{props.t("status.more")}</p>
          <img
            className="m3-sidebar-arrow-down"
            src={require("../icons/arrowdown.svg")}
            alt="down"
          />
        </div>
      ) : (
        <div>
          <img
            className="m3-sidebar-arrow-up"
            src={require("../icons/arrowup.svg")}
            alt="up"
          />
          <p>{props.t("status.more")}</p>
          <img
            className="m3-sidebar-arrow-down"
            src={require("../icons/arrowdown.svg")}
            alt="down"
          />
        </div>
      )}
    </div>
  );
}

const SideBarWithTrans = withTranslation("common")(SideBar);
const ItemCTAWithTrans = withTranslation("common")(ItemCTA);
const ItemInfoWithTrans = withTranslation("common")(ItemInfo);

class Gsl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,

      // For shopping cart
      tprice: parseFloat(this.props.tpriceMem).toFixed(2),
      emptyText: null,

      // For item list
      selected: false,
      isTopList: true,
      isBottomList: false, // Check if user scrolled to the bottom of item list
      items: null, // Fetched from API
      isLoaded: false, // Check if API is loaded

      // For ItemInfo
      item_id: "",
      item_brand: "",
      item_name: "",
      subtotal: 0.0,
      item_price: 0,
      quantity: 1,
      stock: 0,
      desc: "",
      img: "",
      cart: this.props.cartMem
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handlePlus = this.handlePlus.bind(this);
    this.handleMinus = this.handleMinus.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEmpty = this.handleEmpty.bind(this);
  }

  componentDidMount() {
    this.page_timeout = setTimeout(
      () => this.setState({ redirect: true }),
      900000 // 15 mins
    );

    fetch("/OTCMedicine/")
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoaded: true,
          items: data
        });
      });
  }

  componentWillUnmount() {
    clearTimeout(this.page_timeout);
  }

  handleClick(identifier) {
    var i;
    for (i = 0; i < this.state.items.medicines.length; i++) {
      if (this.state.items.medicines[i].id === identifier) {
        this.setState({
          selected: true,
          item_id: identifier,
          item_brand: this.state.items.medicines[i].brand,
          item_name: this.state.items.medicines[i].name,
          subtotal: parseFloat(this.state.items.medicines[i].cost),
          item_price: parseFloat(this.state.items.medicines[i].cost),
          stock: this.state.items.medicines[i].stock,
          desc: this.state.items.medicines[i].description,
          img: this.state.items.medicines[i].pic
        });
        break;
      }
    }
  }

  handleClose() {
    this.setState({
      selected: false,
      item_id: "",
      item_name: "",
      subtotal: 0,
      item_price: 0,
      stock: 0,
      quantity: 1
    });
  }

  handleScroll = e => {
    const top = e.target.scrollHeight - e.target.scrollTop === 1320;
    const bottom = e.target.scrollHeight - e.target.scrollTop <= 661;

    if (top) {
      this.setState({ isTopList: true });
    } else {
      this.setState({ isTopList: false });
    }

    if (bottom) {
      this.setState({ isBottomList: true });
    } else {
      this.setState({ isBottomList: false });
    }
  };

  handlePlus() {
    this.setState(state => ({
      quantity:
        this.state.quantity === this.state.stock
          ? state.quantity
          : state.quantity + 1
    }));
    this.setState(state => ({
      subtotal: (state.quantity * state.item_price).toFixed(2)
    }));
  }

  handleMinus() {
    this.setState(state => ({
      quantity: this.state.quantity === 1 ? 1 : state.quantity - 1
    }));
    this.setState(state => ({
      subtotal: (state.quantity * state.item_price).toFixed(2)
    }));
  }

  handleAddToCart() {
    var new_item = {
      id: this.state.item_id,
      brand: this.state.item_brand,
      name: this.state.item_name,
      quantity: this.state.quantity,
      subtotal: this.state.subtotal,
      description: this.state.desc,
      pic: this.state.img
    };

    var i;
    var exist = false;
    var total = 0.0;
    var new_cart = this.state.cart;

    for (i = 0; i < this.state.cart.length; i++) {
      if (this.state.cart[i].id === this.state.item_id) {
        total = parseFloat(this.state.tprice);
        total -= parseFloat(this.state.cart[i].subtotal);
        new_cart[i].quantity = this.state.quantity;
        new_cart[i].subtotal = this.state.subtotal;
        total += parseFloat(new_cart[i].subtotal);
        this.setState({ cart: new_cart, tprice: parseFloat(total).toFixed(2) });
        this.props.updateCart(new_cart, total);
        exist = true;
        if (new_cart >= 6) {
          this.setState({ exceedBd: true });
        }
      }
    }

    if (exist === false) {
      total = parseFloat(this.state.tprice);
      total += parseFloat(new_item.subtotal);

      this.setState({
        cart: this.state.cart.concat(new_item),
        tprice: parseFloat(total).toFixed(2)
      });
      this.props.updateCart(new_cart.concat(new_item), total);
      if (this.state.cart.length === 5) {
        this.setState({ exceedBd: true });
      }
    }
    this.handleClose();
  }

  handleDelete(id) {
    var i;

    if (this.state.cart.length - 1 <= 5) {
      this.setState({ exceedBd: false });
    }

    if (this.state.cart.length === 1) {
      this.setState({ cart: [], tprice: 0.0 });
      this.props.updateCart([], 0.0);
    } else {
      for (i = 0; i < this.state.cart.length; i++) {
        if (this.state.cart[i].id === id) {
          var tmp_cart = this.state.cart;
          var total = this.state.tprice;
          total -= tmp_cart[i].subtotal;
          tmp_cart.splice(i, 1);
          this.setState({ cart: tmp_cart, tprice: total.toFixed(2) });
          this.props.updateCart(tmp_cart, total);
        }
      }
    }
  }

  handleEmpty() {
    this.setState({
      emptyText: this.props.t("general.empty")
    });
    setTimeout(() => {
      this.setState({ emptyText: null });
    }, 1000);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }

    return (
      <div className="l3-page-container">
        {this.state.selected ? null : (
          <SideBarWithTrans
            bottom={this.state.isBottomList}
            top={this.state.isTopList}
          />
        )}
        {this.state.selected ? (
          <div className="l3-iteminfo-container">
            <ItemInfoWithTrans
              name={this.state.item_name}
              brand={this.state.item_brand}
              id={this.state.selected_id}
              price={this.state.item_price}
              subtotal={this.state.subtotal}
              quantity={this.state.quantity}
              stock={this.state.stock}
              desc={this.state.desc}
              img={this.state.img}
              handleClose={this.handleClose}
              cart={this.state.cart}
              handlePlus={this.handlePlus}
              handleMinus={this.handleMinus}
              handleAddToCart={this.handleAddToCart}
            />
          </div>
        ) : this.state.isLoaded ? (
          <div className="l3-itemcta-container" onScroll={this.handleScroll}>
            {this.state.items.medicines.map(item => (
              <ItemCTAWithTrans
                key={item.name}
                name={item.name}
                stock={item.stock}
                price={parseFloat(item.cost)}
                img={item.pic}
                handleClick={() => this.handleClick(item.id)}
              />
            ))}
          </div>
        ) : null}

        <div className="l3-cart-container">
          <h1 className="m3-cart-header">{this.props.t("general.cart")}</h1>
          <div className="l3-cart-headings-container">
            <h2 className="m3-cart-heading-item">
              {this.props.t("general.item")}
            </h2>
            <h2 className="m3-cart-heading-quantity">
              {this.props.t("general.quantity")}
            </h2>
            <h2 className="m3-cart-heading-price">
              {this.props.t("general.subtotal")}
            </h2>
          </div>
          <div className="l3-cart-list-container">
            {this.state.cart.map(item => (
              <CartItems
                key={item.name}
                name={item.name}
                quantity={item.quantity}
                price={item.subtotal}
                handleDelete={() => this.handleDelete(item.id)}
              />
            ))}
          </div>
          <div className="l3-cart-price-container">
            <p className="m3-tprice-label">{this.props.t("general.tprice")}</p>
            <p className="m3-tprice">${this.state.tprice}</p>
          </div>
          <RouteBtn
            classname="m3-checkout-cta"
            path="/SelPay"
            text={this.props.t("general.payment")}
            chkCart="True"
            tprice={parseInt(this.state.tprice)}
            handleEmpty={this.handleEmpty}
          />

          <div className="m3-error-prompt">{this.state.emptyText}</div>
        </div>
      </div>
    );
  }
}

export default withTranslation("common")(Gsl);
