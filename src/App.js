import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withTranslation } from "react-i18next";
import LandingPage from "./components/LandingPage";
import SelectionPage from "./components/SelectionPage";
import StatusBar from "./components/StatusBar";
import GetPrescPage from "./components/GetPrescPage";
import GslPage from "./components/GslPage";
import "./styles/app.scss";

function WithStatusBar(props) {
  return (
    <div className="l-app">
      <StatusBar trans={props.trans} />
      <Switch>
        <Route exact path="/selectionpage" component={SelectionPage} />
        <Route exact path="/getpresc" component={GetPrescPage} />
        <Route exact path="/gsl" component={GslPage} />
      </Switch>
    </div>
  );
}

class App extends React.Component {
  render() {
    const { t, i18n } = this.props;
    return (
      <main>
        <div className="l-app">
          <Router>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route
                render={props => <WithStatusBar {...props} trans={i18n} />}
              />
            </Switch>
          </Router>
        </div>
      </main>
    );
  }
}

export default withTranslation("common")(App);
