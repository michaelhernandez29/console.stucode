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

/**
 * Retrieves a list of users based on a query.
 * @param {String} query - The query string for filtering or pagination.
 * @returns {Promise<Object>} A promise that resolves to the list of users.
 */
const findAll = async (query) => {
  return HttpClient.get(`${Endpoints.USER}${query}`);
};

/**
 * Updates a user by ID.
 * @param {String} id - The ID of the user to update.
 * @param {Object} data - The data to update for the user.
 * @returns {Promise<void>} A promise that resolves to the updated user object or null if not found.
 */
const updateById = async (id, data) => {
  return HttpClient.put(`${Endpoints.USER}/${id}`, data);
};

/**
 * Deletes a user by ID.
 * @memberof userService
 * @param {String} id - The ID of the user to delete.
 * @returns {Promise<void>} A promise that resolves after the user is deleted.
 */
const deleteById = async (id) => {
  await HttpClient.delete(`/user/${id}`);
};

userService.register = register;
userService.login = login;
userService.findById = findById;
userService.findAll = findAll;
userService.updateById = updateById;
userService.deleteById = deleteById;

export default userService;
