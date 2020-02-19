import React, { Component } from "react";

// ------------------------------ CdCounter ------------------------------
// Count down counter for setting displaying time out duration.
// -------------------------------- Props --------------------------------
// -classname       -> className
// -initialCount    -> Initial count of the counter
// -interval        -> Counting interval
// -text            -> Text to be displayed
// -----------------------------------------------------------------------

class CdCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: parseInt(this.props.initialCount)
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      parseInt(this.props.interval)
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    if (this.props.initial !== 0) {
      this.setState(state => ({ count: state.count - 1 }));
    } else {
      this.setState({ count: 0 });
    }
  }

  render() {
    return (
      <div className={this.props.classname}>
        {this.props.dispcount === "True" ? this.state.count : null}{" "}
        {this.props.text}
      </div>
    );
  }
}

export default CdCounter;
