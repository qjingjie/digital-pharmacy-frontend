import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import common_en from "./translation/en/common.json";
import common_ch from "./translation/ch/common.json";

i18next.init({
  whitelist: ["en", "ch"],
  nonExplicitWhitelist: true,
  load: "languageOnly",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  lng: "en", // Language to use
  resources: {
    en: {
      common: common_en // 'common' os the custom namespace
    },
    ch: {
      common: common_ch
    }
  }
});

ReactDOM.render(
  <I18nextProvider i18n={i18next}>
    <App />
  </I18nextProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
