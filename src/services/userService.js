import HttpClient from "../lib/axios";

const userService = {};

/**
 * Retrieves user data by ID.
 * @returns {Promise<Object>} A promise that resolves to the user data.
 */
const findById = async (id) => {
  return HttpClient.get(`/user/${id}`);
};

userService.findById = findById;

export default userService;
