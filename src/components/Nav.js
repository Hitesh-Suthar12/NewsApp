import { Link } from "react-router-dom";
import { NewsAppHomeConfig } from "./NewsAppConfig";
import { capitalizeFirstLetter } from "../utils";

const Nav = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            NewsApp
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {NewsAppHomeConfig.map((item) => (
                <li className="nav-item" key={item.key}>
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={item.path}
                  >
                    {capitalizeFirstLetter(item.category)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
