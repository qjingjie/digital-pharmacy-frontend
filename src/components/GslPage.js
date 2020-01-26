import React from "react";
import { withTranslation } from "react-i18next";
import { Redirect } from "react-router";
import "../styles/app.scss";

function CartItems(props) {
  return (
    <div className="m-cart-item">
      <span className="m-cart-item-name">{props.name}</span>
      <span className="m-cart-item-quantity">×{props.quantity}</span>
      <span className="m-cart-item-price">${props.price}</span>
      <button
        className="m-cart-item-delete"
        onClick={props.handleDelete}
      ></button>
    </div>
  );
}

function ItemInfo(props) {
  return (
    <div className="m-iteminfo">
      <div className="m-iteminfo-img"></div> {/* to be changed to img tag */}
      <button
        className="m-close-btn"
        type="button"
        onClick={props.handleClose}
      ></button>
      <span className="m-iteminfo-brand">Brand</span>
      <span className="m-iteminfo-name">{props.name}</span>
      <span className="m-iteminfo-price">Price: ${props.price} ea</span>
      <span className="m-iteminfo-stock">Available Stock: {props.stock}</span>
      <span className="m-iteminfo-desc">
        Description<br></br>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Dictumst quisque
        sagittis purus sit amet.
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
      <div className="m-iteminfo-subtotal">Subtotal: ${props.subtotal}</div>
      <button
        className="m-iteminfo-addtocart"
        type="button"
        onClick={props.handleAddToCart}
      >
        Add To Cart
      </button>
    </div>
  );
}

function ItemCTA(props) {
  return (
    <div className="l-item-cta">
      <button className="m-item-cta" type="button" onClick={props.handleClick}>
        <span>{props.name}</span>
        <br />
        <span>Stock:{props.stock}</span>
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
        <p>Swipe down for more items</p>
      ) : (
        <p>Swipe up for more items</p>
      )}
    </div>
  );
}

class GslPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      tprice: 0.0,
      selected: false,
      bottom: false, // Check if user scrolled to the bottom of item list
      //items: [], // use this when fetching from API
      items: [
        {
          id: 1,
          name: "test1",
          stock: 5,
          price: 99
        },
        {
          id: 2,
          name: "test2",
          stock: 99,
          price: 99
        },
        {
          id: 3,
          name: "test3",
          stock: 99,
          price: 99
        },
        {
          id: 4,
          name: "test4",
          stock: 99,
          price: 99
        },
        {
          id: 5,
          name: "test5",
          stock: 99,
          price: 99
        },
        {
          id: 6,
          name: "test6",
          stock: 99,
          price: 99
        },
        {
          id: 7,
          name: "test7",
          stock: 99,
          price: 99
        },
        {
          id: 8,
          name: "test8",
          stock: 99,
          price: 99
        },
        {
          id: 9,
          name: "test9",
          stock: 99,
          price: 99
        },
        {
          id: 10,
          name: "test10",
          stock: 99,
          price: 99
        },
        {
          id: 11,
          name: "test11",
          stock: 99,
          price: 99
        },
        {
          id: 12,
          name: "test12",
          stock: 99,
          price: 99
        },
        {
          id: 13,
          name: "test13",
          stock: 99,
          price: 99
        },
        {
          id: 14,
          name: "test14",
          stock: 99,
          price: 99
        },
        {
          id: 15,
          name: "test15",
          stock: 99,
          price: 99
        }
      ], // For testing only
      isLoaded: false,

      // For ItemInfo
      item_key: "",
      item_name: "",
      subtotal: 0,
      item_price: 0,
      quantity: 1,
      stock: 0,
      cart: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handlePlus = this.handlePlus.bind(this);
    this.handleMinus = this.handleMinus.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.id = setTimeout(() => this.setState({ redirect: true }), 1800000000);
    //fetch("https://demo4648819.mockable.io")
    //  .then(response => response.json())
    //  .then(data => {
    //    this.setState({
    //      isLoaded: true,
    //      items: data
    //    });
    //  }); //API call for listing items
  }

  componentWillUnmount() {
    clearTimeout(this.id);
  }

  handleClick(id) {
    this.setState({
      selected: true,
      item_key: this.state.items[id - 1].name + "-" + id,
      item_name: this.state.items[id - 1].name,
      subtotal: this.state.items[id - 1].price,
      item_price: this.state.items[id - 1].price,
      stock: this.state.items[id - 1].stock
    });
  }

  handleClose() {
    this.setState({
      selected: false,
      item_key: "",
      item_name: "",
      subtotal: 0,
      item_price: 0,
      stock: 0,
      quantity: 1
    });
  }

  handleScroll = e => {
    const bottom = e.target.scrollHeight - e.target.scrollTop <= 661;

    if (bottom) {
      this.setState({ bottom: true });
    } else {
      this.setState({ bottom: false });
    }
  };

  handlePlus() {
    this.setState(state => ({
      quantity:
        this.state.quantity == this.state.stock
          ? state.quantity
          : state.quantity + 1
    }));
    this.setState(state => ({ subtotal: state.quantity * state.item_price }));
  }

  handleMinus() {
    this.setState(state => ({
      quantity: this.state.quantity == 1 ? 1 : state.quantity - 1
    }));
    this.setState(state => ({ subtotal: state.quantity * state.item_price }));
  }

  handleAddToCart() {
    var new_item = {
      key: this.state.item_key,
      name: this.state.item_name,
      quantity: this.state.quantity,
      subtotal: this.state.subtotal
    };

    var i;
    var exist = false;
    var total = 0;

    for (i = 0; i < this.state.cart.length; i++) {
      if (this.state.cart[i].key === this.state.item_key) {
        total = this.state.tprice;
        total -= this.state.cart[i].subtotal;
        var new_cart = this.state.cart;
        new_cart[i].quantity = this.state.quantity;
        new_cart[i].subtotal = this.state.subtotal;
        total += new_cart[i].subtotal;
        this.setState({ cart: new_cart, tprice: total });
        exist = true;
      }
    }

    if (exist === false) {
      this.setState(state => ({
        cart: this.state.cart.concat(new_item),
        tprice: (state.tprice += new_item.subtotal)
      }));
    }
  }

  handleDelete(name) {
    var i;

    if (this.state.cart.length === 1) {
      this.setState({ cart: [], tprice: 0.0 });
    } else {
      for (i = 0; i < this.state.cart.length; i++) {
        if (this.state.cart[i].name === name) {
          var tmp_cart = this.state.cart;
          var total = this.state.tprice;
          total -= tmp_cart[i].subtotal;
          tmp_cart.splice(i, 1);
          this.setState({ cart: tmp_cart, tprice: total });
        }
      }
    }
  }

  render() {
    var { items, cart } = this.state;

    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }

    return (
      <div className="l-gsl">
        <SideBar bottom={this.state.bottom} />
        {this.state.selected ? (
          <div className="l-iteminfo">
            <ItemInfo
              name={this.state.item_name}
              id={this.state.selected_id}
              price={this.state.item_price}
              subtotal={this.state.subtotal}
              quantity={this.state.quantity}
              stock={this.state.stock}
              handleClose={this.handleClose}
              cart={this.state.cart}
              handlePlus={this.handlePlus}
              handleMinus={this.handleMinus}
              handleAddToCart={this.handleAddToCart}
            />
          </div>
        ) : (
          <div className="l-items" onScroll={this.handleScroll}>
            {items.map(item => (
              <ItemCTA
                key={item.name + "-" + item.id}
                name={item.name}
                stock={item.stock}
                price={item.price}
                handleClick={() => this.handleClick(item.id)}
              />
            ))}
          </div>
        )}

        <div className="l-cart-panel">
          <div className="cart-header">{this.props.t("general.cart")}</div>
          <div className="list-header">
            <p className="item">{this.props.t("general.item")}</p>
            <p className="qty">{this.props.t("general.quantity")}</p>
            <p className="price">{this.props.t("general.price")}</p>
          </div>
          <div className="m-item-list">
            {cart.map(item => (
              <CartItems
                key={item.name}
                name={item.name}
                quantity={item.quantity}
                price={item.subtotal}
                handleDelete={() => this.handleDelete(item.name)}
              />
            ))}
          </div>
          <div className="l-price-container">
            <p className="tprice-label">{this.props.t("general.tprice")}</p>
            <p className="tprice-amt">${this.state.tprice}</p>
          </div>
          <button className="m-checkout-cta" type="button">
            {this.props.t("general.payment")}
          </button>
        </div>
      </div>
    );
  }
}

export default withTranslation("common")(GslPage);
