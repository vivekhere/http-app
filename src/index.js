import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import logger from "./services/logService";
import "./index.css";

logger.init();

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
