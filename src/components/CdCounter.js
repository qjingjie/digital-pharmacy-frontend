import React, { Component } from "react";

// ------------------------------ CdCounter ------------------------------
// Count down counter for setting displaying time out duration.
// Can also be used to fetch data from a backend server at every interval.
// -------------------------------- Props --------------------------------
// -classname       -> className
// -initialCount    -> Initial count of the counter
// -interval        -> Counting interval
// -fetch           -> Set to True if retrieving data from backend
// -fetchRoute      -> Route for connecting to backend
// -dictKey         -> Key for retrieved data
// -fetchHandler    -> parent handler
// -dispcount       -> True if count is to be displayed
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

    if (this.props.fetch === "True") {
      fetch(this.props.fetchRoute)
        .then(response => response.json())
        .then(data => {
          this.props.handler(data[this.props.dictKey]);
        });
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
