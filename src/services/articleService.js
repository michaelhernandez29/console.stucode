import HttpClient from "../lib/axios";

const articleService = {};

/**
 * Retrieves all articles.
 * @param {String} query - The query string for filtering or pagination.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of articles.
 */
const findAll = (query) => {
  return HttpClient.get(`/article${query}`);
};

/**
 * Retrieves article data by ID.
 * @returns {Promise<Object>} A promise that resolves to the article data.
 */
const findById = async (id) => {
  return HttpClient.get(`/article/${id}`);
};

/**
 * Updates a article by ID.
 * @param {String} id - The ID of the article to update.
 * @param {Object} data - The data to update for the article.
 * @returns {Promise<void>} A promise that resolves to the updated article object or null if not found.
 */
const updateById = async (id, data) => {
  return HttpClient.put(`/article/${id}`, data);
};

/**
 * Deletes an article by ID.
 * @memberof userService
 * @param {String} id - The ID of the article to delete.
 * @returns {Promise<void>} A promise that resolves after the article is deleted.
 */
const deleteById = async (id) => {
  await HttpClient.delete(`/article/${id}`);
};

articleService.findAll = findAll;
articleService.findById = findById;
articleService.updateById = updateById;
articleService.deleteById = deleteById;

export default articleService;
