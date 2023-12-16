import React from "react";
const defaultImage = process.env.REACT_APP_DEFAULT_IMAGE;

const Newsitem = ({
  title,
  description,
  imageUrl,
  newsUrl,
  author,
  date,
  source,
}) => {
  return (
    <div className="col-md-4 my-3" style={{ height: "100%" }}>
      <div className="container">
        <div className="card h-100">
          <img
            src={!imageUrl ? defaultImage : imageUrl}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {title && title.length > 40 ? title.slice(0, 40) + "..." : title}
            </h5>
            <p className="card-text">
              {description && description.length > 70
                ? description.slice(0, 70) + "..."
                : description}
            </p>
            <div className="mb-2">
              <span className="badge text-bg-danger">{source}</span>
            </div>
            <p className="card-text">
              <small className="text-body-secondary">
                By "{author ? author : "unknown"}" on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-outline-dark d-grid gap-2"
            >
              Read more &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsitem;