import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./style.css";
import FilmFlip from "../Film/FilmFlip";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_PHIM_DANG_CHIEU,
  SET_PHIM_SAP_CHIEU,
} from "../../redux/actions/types/QuanLyPhimType";
import { Button, Input } from "antd";
import { timKiemPhimAction } from "../../redux/actions/QuanLyPhimAction";
import { NavLink } from "react-router-dom";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} slick-slick-next`}
      style={{ ...style, display: "block", color: "black" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} slick-slick-prev`}
      style={{ ...style, display: "block", color: "black" }}
      onClick={onClick}
    />
  );
}

const MultipleRowSlick = (props) => {
  const { Search } = Input;
  const { dangChieu, sapChieu } = useSelector(
    (state) => state.QuanLyPhimReducer
  );
  let activeClassDangChieu =
    dangChieu === true ? "active_Film" : "none_active_Film";
  let activeClassSapChieu =
    sapChieu === true ? "active_Film" : "none_active_Film";

  const dispatch = useDispatch();

  const onSearch = (value) => {
    dispatch(timKiemPhimAction(value));
  };

  const settings = {
    className: "center",

    centerMode: true,
    infinite: false,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 500,
    rows: 2,
    slidesPerRow: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const handleButtonClick = (type) => {
    if (
      (type === SET_PHIM_DANG_CHIEU && dangChieu) ||
      (type === SET_PHIM_SAP_CHIEU && sapChieu)
    ) {
      dispatch({ type: "SET_PHIM_DEFAULT" });
    } else {
      dispatch({ type });
    }
  };

  return (
    <div className="slider-container">
      <div className="section-title mb-8">
        <span className="text-3xl font-bold">MOVIE SELECTION</span>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-6">
          <button
            type="button"
            className={`${activeClassDangChieu} px-8 py-3 font-semibold rounded-xl text-white bg-gray-800 border dark:text-gray-100`}
            onClick={() => handleButtonClick(SET_PHIM_DANG_CHIEU)}
          >
            PHIM ĐANG CHIẾU
          </button>
          <button
            type="button"
            className={`${activeClassSapChieu} px-8 py-3 font-semibold rounded-xl text-white bg-white text-gray-800 border dark:text-gray-100`}
            onClick={() => handleButtonClick(SET_PHIM_SAP_CHIEU)}
          >
            PHIM SẮP CHIẾU
          </button>
        </div>
        <div className="flex items-center" style={{ width: "500px" }}>
          <Search
            className=""
            placeholder="Tìm kiếm phim hoặc diễn viên"
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </div>
      </div>
      <Slider {...settings}>
        {props.arrFilm.map((phim, index) => (
          <div className="mt-8" key={index}>
            <FilmFlip item={phim} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MultipleRowSlick;
