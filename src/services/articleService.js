import HttpClient from "../lib/axios";

const articleService = {};

/**
 * Retrieves all articles.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of articles.
 */
const findAll = () => {
  return HttpClient.get("/article");
};

articleService.findAll = findAll;

export default articleService;
