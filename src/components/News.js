import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { capitalizeFirstLetter, uppercaseAll } from "../utils";
import { fetchData } from "../Actions";

const News = ({ category, country }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    document.title = `News - ${capitalizeFirstLetter(category)}`;
    if (!loading) {
      loadPage(false);
    }
  }, [category, country]);

  const loadPage = async (loadMore) => {
    if (loading) return;
    const currentPage = loadMore ? page + 1 : 0;
    setLoading(true);

    try {
      const { articles: list, totalResults } = await fetchData({
        category,
        country,
        page: currentPage,
      });

      if (list?.length) {
        if (loadMore) {
          setArticles((art) => art.concat(list));
        } else {
          setArticles(list);
        }
        setTotalResults(totalResults);
      } else {
        throw new Error();
      }
    } catch (e) {
      console.log("Something went wrong!");
    } finally {
      setPage(currentPage);
      setLoading(false);
    }
  };

  return (
    <div className="container my-3 pt-5 mb-3">
      <h2 className="container my-3 text-center">
        TOP HEADLINES ABOUT - {uppercaseAll(category)}
      </h2>
      <hr className="border border-danger border-2 opacity-50 mb-5" />
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles?.length || 0}
        next={() => {
          loadPage(true);
        }}
        hasMore={articles?.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles?.map((element, index) => (
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
