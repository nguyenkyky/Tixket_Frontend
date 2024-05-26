import { Fragment, useEffect } from "react";
import { Route } from "react-router";
import Header from "./Layout/Header/Header";
import HomeCarousel from "./Layout/HomeCarousel/HomeCarousel";
import Home from "../../pages/Home/Home";
import Footer from "./Layout/Footer/Footer";
export const HomeTemplate = ({ childComponent }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div className="home-template">
      <Header />

      {childComponent}

      <Footer />
    </div>
  );
};
