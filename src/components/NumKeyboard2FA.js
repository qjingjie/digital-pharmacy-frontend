import React, { Component } from "react";

// ----------------------- NumKeyboard2FA -----------------------
// 4x3 Numeric keyboard and 6 input field 2FA
// -------------------------- Props --------------------------
// enter                  -> enter text (translation purposes)
// handle                -> handle enter button (update parent)

class NumKeyboard2FA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code2FA: [null, null, null, null, null, null]
    };

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(value) {
    if (value === "bkspace") {
      if (this.state.code2FA[0] !== null) {
        if (this.state.code2FA[5] !== null) {
          let code = this.state.code2FA;
          code[5] = null;
          this.setState({ code2FA: code });
        } else {
          var i;
          for (i = 0; i < this.state.code2FA.length; i++) {
            if (this.state.code2FA[i] === null) {
              let code = this.state.code2FA;
              code[i - 1] = null;
              this.setState({ code2FA: code });
              break;
            }
          }
        }
      }
    } else {
      var j;
      for (j = 0; j < this.state.code2FA.length; j++) {
        if (this.state.code2FA[j] === null) {
          let code = this.state.code2FA;
          code[j] = value;
          this.setState({ code2FA: code });
          break;
        }
      }
    }
  }

  render() {
    return (
      <div className="m-numkeyboard2fa-container">
        <div className="m-code2fa-container">
          <div className="m-code2fa-box">
            <p>{this.state.code2FA[0]}</p>
          </div>
          <div className="m-code2fa-box">
            <p>{this.state.code2FA[1]}</p>
          </div>
          <div className="m-code2fa-box">
            <p>{this.state.code2FA[2]}</p>
          </div>
          <div className="m-code2fa-box">
            <p>{this.state.code2FA[3]}</p>
          </div>
          <div className="m-code2fa-box">
            <p>{this.state.code2FA[4]}</p>
          </div>
          <div className="m-code2fa-box">
            <p>{this.state.code2FA[5]}</p>
          </div>
        </div>

        <div className="m-keyboard-container">
          <button
            onClick={() => {
              this.handleInput(1);
            }}
            type="button"
          >
            1
          </button>
          <button
            onClick={() => {
              this.handleInput(2);
            }}
            type="button"
          >
            2
          </button>
          <button
            onClick={() => {
              this.handleInput(3);
            }}
            type="button"
          >
            3
          </button>
          <button
            onClick={() => {
              this.handleInput(4);
            }}
            type="button"
          >
            4
          </button>
          <button
            onClick={() => {
              this.handleInput(5);
            }}
            type="button"
          >
            5
          </button>
          <button
            onClick={() => {
              this.handleInput(6);
            }}
            type="button"
          >
            6
          </button>
          <button
            onClick={() => {
              this.handleInput(7);
            }}
            type="button"
          >
            7
          </button>
          <button
            onClick={() => {
              this.handleInput(8);
            }}
            type="button"
          >
            8
          </button>
          <button
            onClick={() => {
              this.handleInput(9);
            }}
            type="button"
          >
            9
          </button>
          <button
            onClick={() => {
              this.handleInput("bkspace");
            }}
            type="button"
          >
            back
          </button>
          <button
            onClick={() => {
              this.handleInput(0);
            }}
            type="button"
          >
            0
          </button>
          <button
            onClick={() => {
              this.props.handle(this.state.code2FA);
            }}
            type="button"
          >
            {this.props.enter}
          </button>
        </div>
      </div>
    );
  }
}
export default NumKeyboard2FA;
