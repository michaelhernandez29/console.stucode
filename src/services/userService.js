import Endpoints from "../constants/endpoints";
import HttpClient from "../lib/axios";

const userService = {};

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

/**
 * Retrieves user data by ID.
 * @returns {Promise<Object>} A promise that resolves to the user data.
 */
const findById = async (id) => {
  return HttpClient.get(`/user/${id}`);
};

userService.register = register;
userService.login = login;
userService.findById = findById;

export default userService;
