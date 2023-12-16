
const baseUrl = process.env.REACT_APP_NEWS_API;
const apiKey = process.env.REACT_APP_NEWS_API_KEY;

export const fetchData = async ({ country, category, page }) => {
  let url = `${baseUrl}/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=10`;
  let data = await fetch(url);
  let response = await data.json();
  return {
    articles: response.articles,
    totalResults: response.totalResults,
  };
};