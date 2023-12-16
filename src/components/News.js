import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { capitalizeFirstLetter, uppercaseAll } from "../utils";
import { fetchData } from "../Action/Index";

const News = ({ category, country }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    document.title = `News - ${capitalizeFirstLetter(category)}`;
    setLoading(true);
    setPage(0);
    fetchData({ category, country, page: 0 })
      .then(({ articles, totalResults }) => {
        setArticles(articles);
        setTotalResults(totalResults);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        console.log("Something went wrong!");
      });
  }, [category, country]);

  useEffect(() => {
    fetchData({ category, country, page: page })
      .then(({ articles: list, totalResults }) => {
        setArticles([...articles, ...list]);
        setTotalResults(totalResults);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        console.log("Something went wrong!");
      });
  }, [page, articles, category, country]);

  return (
    <div className="container my-3 pt-5 mb-3">
      <h2 className="container my-3 text-center">
        TOP HEADLINES ABOUT - {uppercaseAll(category)}
      </h2>
      <hr className="border border-danger border-2 opacity-50 mb-5" />
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={(articles && articles.length) || 0}
        next={() => setPage(page + 1)}
        hasMore={articles && articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles &&
              articles.map((element, index) => (
                <Newsitem
                  key={element.title + index}
                  title={element.title}
                  description={element.description}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: "in",
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
};

export default News;
