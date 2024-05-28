import HttpClient from "../lib/axios";

const likeService = {};

const likeArticle = async (articleId, userId) => {
  return HttpClient.post(`/like/${articleId}`, { userId });
};

const findUserArticleLike = async (articleId, userId) => {
  return HttpClient.get(`/like/${articleId}?userId=${userId}`);
};

const unlikeArticle = async (articleId, userId) => {
  await HttpClient.delete(`/like/${articleId}`, { data: { userId } });
};

likeService.likeArticle = likeArticle;
likeService.findUserArticleLike = findUserArticleLike;
likeService.unlikeArticle = unlikeArticle;

export default likeService;
