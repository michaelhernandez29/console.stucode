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

articleService.findAll = findAll;

export default articleService;
