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

authService.register = register;

export default authService;
