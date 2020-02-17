import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Redirect } from "react-router";
import RouteBtn from "./RouteBtn";

function CartItems(props) {
  return (
    <div className="m-cart-item">
      <span className="m-cart-item-name">{props.name}</span>
      <span className="m-cart-item-quantity">×{props.quantity}</span>
      <span className="m-cart-item-price">${props.price}</span>
      <button
        className="m-cart-item-delete"
        type="button"
        onClick={props.handleDelete}
      ></button>
    </div>
  );
}

function ItemInfo(props) {
  return (
    <div className="m-iteminfo">
      <div
        className="m-iteminfo-img"
        style={{ backgroundImage: "url(" + props.img + ")" }}
      ></div>
      <button
        className="m-close-btn"
        type="button"
        onClick={props.handleClose}
      ></button>
      <span className="m-iteminfo-brand">{props.brand}</span>
      <span className="m-iteminfo-name">{props.name}</span>
      <span className="m-iteminfo-price">
        {props.t("general.price")}: ${props.price} ea
      </span>
      <span className="m-iteminfo-stock">
        {props.t("general.availstock")}: {props.stock}
      </span>
      <span className="m-iteminfo-desc">
        {props.t("general.description")}
        <br></br>
        {props.desc}
      </span>
      <div className="m-iteminfo-counter">
        <button
          className="m-iteminfo-minus"
          type="button"
          onClick={props.handleMinus}
        >
          -
        </button>
        <div className="m-iteminfo-count">{props.quantity}</div>
        <button
          className="m-iteminfo-plus"
          type="button"
          onClick={props.handlePlus}
        >
          +
        </button>
      </div>
      <div className="m-iteminfo-subtotal">
        {props.t("general.subtotal")}: ${props.subtotal}
      </div>
      <button
        className="m-iteminfo-addtocart"
        type="button"
        onClick={props.handleAddToCart}
      >
        {props.t("general.add")}
      </button>
    </div>
  );
}

function ItemCTA(props) {
  return (
    <div className="l-item-cta">
      <button
        className="m-item-cta"
        style={{ backgroundImage: "url(" + props.img + ")" }}
        type="button"
        onClick={props.handleClick}
      >
        <span>{props.name}</span>
        <br />
        <span>
          {props.t("general.stock")}:{props.stock}
        </span>
        <br />
        <span>${props.price}</span>
      </button>
    </div>
  );
}

function SideBar(props) {
  return (
    <div className="m-sidebar">
      {props.bottom ? (
        <div>
          <img
            className="m-sidebar-up"
            src={require("../icons/arrowup.svg")}
            alt="up"
          />
          <p>{props.t("status.more")}</p>
        </div>
      ) : props.top ? (
        <div>
          <p>{props.t("status.more")}</p>
          <img
            className="m-sidebar-down"
            src={require("../icons/arrowdown.svg")}
            alt="down"
          />
        </div>
      ) : (
        <div>
          <img
            className="m-sidebar-up"
            src={require("../icons/arrowup.svg")}
            alt="up"
          />
          <p>{props.t("status.more")}</p>
          <img
            className="m-sidebar-down"
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

class GslPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,

      // For shopping cart
      tprice: parseFloat(this.props.tpriceMem),
      exceedBd: false, // Check if there are more than 5 different items in cart
      isBottomCart: false, // Check if the bottom of the cart list is reached if exceedBd is true
      renderEmpty: false,
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
    this.handleScrollCart = this.handleScrollCart.bind(this);
    this.handlePlus = this.handlePlus.bind(this);
    this.handleMinus = this.handleMinus.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEmpty = this.handleEmpty.bind(this);
  }

  componentDidMount() {
    this.id = setTimeout(() => this.setState({ redirect: true }), 1800000000);

    fetch("/OTCMedicine/")
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoaded: true,
          items: data
        });
      }); //API call for listing items
  }

  componentWillUnmount() {
    clearTimeout(this.id);
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

  handleScrollCart = e => {
    const bottomCart = e.target.scrollHeight - e.target.scrollTop <= 350;

    if (bottomCart) {
      this.setState({ isBottomCart: true });
    } else {
      this.setState({ isBottomCart: false });
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
      name: this.state.item_name,
      quantity: this.state.quantity,
      subtotal: this.state.subtotal
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
      renderEmpty: true,
      emptyText: this.props.t("general.empty")
    });
    setTimeout(() => {
      this.setState({ renderEmpty: false, emptyText: null });
    }, 1000);
  }

  render() {
    const cart_arr_down = (
      <div className="m-cart-arrowdown">
        <img src={require("../icons/arrowdown.svg")} alt="down" />
      </div>
    );
    const cart_arr_up = (
      <div className="m-cart-arrowup">
        <img src={require("../icons/arrowup.svg")} alt="up" />
      </div>
    );

    if (this.state.redirect) {
      this.state.updateCart([], 0.0);
      return <Redirect push to="/" />;
    }

    return (
      <div className="l-gsl">
        {this.state.selected ? null : (
          <SideBarWithTrans
            bottom={this.state.isBottomList}
            top={this.state.isTopList}
          />
        )}
        {this.state.selected ? (
          <div className="l-iteminfo">
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
          <div className="l-items" onScroll={this.handleScroll}>
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

        <div className="l-cart-panel">
          <div className="cart-header">{this.props.t("general.cart")}</div>
          <div className="list-header">
            <p className="item">{this.props.t("general.item")}</p>
            <p className="qty">{this.props.t("general.quantity")}</p>
            <p className="price">{this.props.t("general.subtotal")}</p>
          </div>
          <div className="m-cart-list" onScroll={this.handleScrollCart}>
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
          {this.state.exceedBd
            ? this.state.isBottomCart
              ? cart_arr_up
              : cart_arr_down
            : null}
          <div className="l-price-container">
            <p className="tprice-label">{this.props.t("general.tprice")}</p>
            <p className="tprice-amt">${this.state.tprice}</p>
          </div>
          <RouteBtn
            classname="m-checkout-cta"
            path="/selectpayment"
            text={this.props.t("general.payment")}
            chkCart="True"
            tprice={this.state.tprice}
            handleEmpty={this.handleEmpty}
          />

          <div className="m-error-prompt">{this.state.emptyText}</div>
        </div>
      </div>
    );
  }
}

export default withTranslation("common")(GslPage);
