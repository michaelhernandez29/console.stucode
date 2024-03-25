import axios from "axios";

/**
 * A singleton class for managing HTTP requests using Axios.
 */
class HttpClient {
  /**
   * Creates an instance of HttpClient.
   * @constructor
   * @returns {HttpClient} The HttpClient instance.
   */
  constructor() {
    if (HttpClient.instance) {
      return HttpClient.instance;
    }

    /**
     * The Axios instance configured with base URL.
     * @type {import("axios").AxiosInstance}
     */
    this.client = axios.create({
      baseURL: "http://localhost:3609/v1",
    });

    // Interceptor for handling response errors
    this.client.interceptors.response.use(
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

    HttpClient.instance = this;
    return this;
  }

  /**
   * Sets the authorization token in the HTTP client headers.
   * @param {String} token The authorization token.
   */
  setAuthorizationToken(token) {
    this.client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  /**
   * Retrieves the Axios instance configured with base URL.
   * @returns {import("axios").AxiosInstance} The Axios instance.
   */
  getClient() {
    return this.client;
  }
}

// Creating a single instance of HttpClient
const instance = new HttpClient();
Object.freeze(instance);

export default instance.getClient();
