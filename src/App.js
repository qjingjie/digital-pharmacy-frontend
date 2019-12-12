import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withTranslation, Trans } from "react-i18next";
import LandingPage from "./components/LandingPage";
import SelectionPage from "./components/SelectionPage";
import StatusBar from "./components/StatusBar";
import "./styles/app.scss";

function LangSwitch(props) {
  return (
    <div className="langswitch">
      <button
        className="en_button"
        onClick={() => props.fortrans.changeLanguage("en")}
      >
        ENG
      </button>
      <button
        className="ch_button"
        onClick={() => props.fortrans.changeLanguage("ch")}
      >
        中文
      </button>
    </div>
  );
}

function WithStatusBar(props) {
  return (
    <div className="app_container2">
      <StatusBar />
      <LangSwitch fortrans={props.tolang} />
      <Switch>
        <Route exact path="/selectionpage" component={SelectionPage} />
      </Switch>
    </div>
  );
}

class App extends React.Component {
  render() {
    const { t, i18n } = this.props;
    return (
      <main>
        <div className="app_container">
          <Router>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route
                render={props => <WithStatusBar {...props} tolang={i18n} />}
              />
            </Switch>
          </Router>
        </div>
      </main>
    );
  }
}

export default withTranslation("common")(App);
