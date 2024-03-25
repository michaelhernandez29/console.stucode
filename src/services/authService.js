import Endpoints from "../constants/endpoints.js";
import HttpClient from "../lib/axios.js";

const authService = {};

/**
 * Registers a new user.
 * @param {Object} data - The registration data.
 * @returns {Promise} A promise resolving to the registration response.
 */
const register = (data) => {
  return HttpClient.post(Endpoints.REGISTER, data);
};

/**
 * Logs in a user with provided credentials.
 * @param {Object} credentials - The user's credentials.
 * @returns {Promise} A promise resolving to the login response.
 */
const login = (credentials) => {
  return HttpClient.post(Endpoints.LOGIN, credentials);
};

authService.register = register;
authService.login = login;

export default authService;
