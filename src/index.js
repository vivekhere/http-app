import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Raven from "raven-js";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

Raven.config(
  "https://0c44cc6c380748bf867de5780e4af897@o523605.ingest.sentry.io/5635827",
  {
    release: "1-0-0",
    // in the log you can see what version this error is coming from
    environment: "development-test",
    // you can dynamically set this depending on the current environment
  }
).install();

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
