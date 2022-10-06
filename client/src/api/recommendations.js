import axios from 'axios';

const youtubeUrlForSearchByTag = {
  base: 'https://youtube.googleapis.com/youtube/v3/search?part=snippet',
  maxResult: '&maxResults=25',
  order: '&order=viewCount',
  query: '&q=',
  apiKey: `&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
};

export const getRecommendedVids = async (tagName) => {
  let { base, maxResult, order, query, apiKey } = youtubeUrlForSearchByTag;
  query += tagName;
  return axios.get(base + maxResult + order + query + apiKey);
};
