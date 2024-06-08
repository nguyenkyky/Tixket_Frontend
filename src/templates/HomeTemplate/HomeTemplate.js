import { Fragment, useEffect } from "react";
import { Route } from "react-router";
import Header from "./Layout/Header/Header";
import HomeCarousel from "./Layout/HomeCarousel/HomeCarousel";
import { useDispatch } from "react-redux";
import Home from "../../pages/Home/Home";
import Footer from "./Layout/Footer/Footer";
import { kiemTraDangNhapAction } from "../../redux/actions/QuanLyNguoiDungAction";
export const HomeTemplate = ({ childComponent }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(kiemTraDangNhapAction());
  });
  return (
    <div className="home-template">
      <Header />

      {childComponent}

      <Footer />
    </div>
  );
};
