import Raven from "raven-js";

function init() {
  Raven.config(
    "https://0c44cc6c380748bf867de5780e4af897@o523605.ingest.sentry.io/5635827",
    {
      release: "1-0-0",
      // in the log you can see what version this error is coming from
      environment: "development-test",
      // you can dynamically set this depending on the current environment
    }
  ).install();
}

function log(error) {
  Raven.captureException(error);
}

export default {
  init,
  log,
};
