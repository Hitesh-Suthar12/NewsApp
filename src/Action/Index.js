import axios from "axios";
const baseUrl = process.env.REACT_APP_NEWS_API;
const apiKey = process.env.REACT_APP_NEWS_API_KEY;

export const fetchData = async ({ category, page }) => {
  let url = `${baseUrl}/top-headlines?country=ind&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=10`;
  let { data: response } = await axios.get(url);
  console.log(response);
  return {
    articles: response.articles,
    totalResults: response.totalResults,
  };
};
