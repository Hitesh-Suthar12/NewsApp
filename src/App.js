import React from "react";
import News from "./components/News";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LoadingBar from "react-top-loading-bar";
import Footer from "./components/Footer";
import { NewsAppHomeConfig } from "./components/NewsAppConfig";

const App = () => {
  // const [progress, setProgress] = useState(0);
  return (
    <div>
      <Router>
        <Nav />
        {/* <LoadingBar color="#f11946" progress={progress} /> */}
        <Routes>
          {NewsAppHomeConfig.map(({ path, key, category }) => (
            <Route
            key={key}
              exact
              path={path}
              element={<News key={key} category={category} />}
            />
          ))}
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default App;