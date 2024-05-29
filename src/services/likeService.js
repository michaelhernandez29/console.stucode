import HttpClient from "../lib/axios";

const likeService = {};

/**
 * Likes an article.
 * @param {number} articleId - The ID of the article to like.
 * @param {number} userId - The ID of the user who is liking the article.
 * @returns {Promise<any>} A promise that resolves to the response data from the server.
 */
const likeArticle = async (articleId, userId) => {
  return HttpClient.post(`/like/${articleId}`, { userId });
};

/**
 * Finds the like status of a user for a specific article.
 * @param {number} articleId - The ID of the article.
 * @param {number} userId - The ID of the user.
 * @returns {Promise<any>} A promise that resolves to the response data from the server.
 */
const findUserArticleLike = async (articleId, userId) => {
  return HttpClient.get(`/like/${articleId}?userId=${userId}`);
};

/**
 * Removes the like of an article by a user.
 * @param {number} articleId - The ID of the article to unlike.
 * @param {number} userId - The ID of the user who is unliking the article.
 * @returns {Promise<any>} A promise that resolves when the unlike operation is successful.
 */
const unlikeArticle = async (articleId, userId) => {
  await HttpClient.delete(`/like/${articleId}`, { data: { userId } });
};

/**
 * Finds all likes of a user.
 * @param {number} userId - The ID of the user.
 * @returns {Promise<any>} A promise that resolves to the response data from the server.
 */
const findUserLikes = async (query) => {
  return HttpClient.get(`/like?${query}`);
};

likeService.likeArticle = likeArticle;
likeService.findUserArticleLike = findUserArticleLike;
likeService.unlikeArticle = unlikeArticle;
likeService.findUserLikes = findUserLikes;

export default likeService;
