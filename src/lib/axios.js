import axios from "axios";

const HttpClient = axios.create({
  baseURL: "http://localhost:3609/v1",
});

HttpClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error?.response) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  },
);

const setAuthorizationToken = (token) => {
  HttpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

HttpClient.setAuthorizationToken = setAuthorizationToken;

export default HttpClient;
