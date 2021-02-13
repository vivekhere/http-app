import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) toast("An unexpected error occurred.");

  // to pass control to our catch block return a rejected promise
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

// Logging errors

// Here in our httpService currently if we have an error we log it in the console.
// This is fine on a development machine but when we deploy our application to
// production evvironment, this is not going to be helpful because this console
// is part of the end users browser and we don't have access to that console.
// So, we need to store this error or log it somewhere where we can access and
// that is when we use Logging as a Service provider.
// sentry.io is the most famous logging as a service provider.
