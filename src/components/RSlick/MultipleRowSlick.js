import React from "react";
import Slider from "react-slick";
import "./style.css";
import Film from "../Film/Film";
import FilmFlip from "../Film/FilmFlip";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_PHIM_DANG_CHIEU,
  SET_PHIM_SAP_CHIEU,
} from "../../redux/actions/types/QuanLyPhimType";
// import styleSlick from "./MultipleRowSlick.module.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} slick-next`}
      style={{ ...style, display: "block", color: "black" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} slick-prev`}
      style={{ ...style, display: "block", color: "black" }}
      onClick={onClick}
    />
  );
}

const MultipleRowSlick = (props) => {
  const { dangChieu, sapChieu } = useSelector(
    (state) => state.QuanLyPhimReducer
  );
  let activeClassDangChieu =
    dangChieu === true ? "active_Film" : "none_active_Film";
  let activeClassSapChieu =
    sapChieu === true ? "active_Film" : "none_active_Film";

  const dispatch = useDispatch();
  const renderFilm = () => {
    return props.arrFilm.map((phim, index) => {
      return (
        <div className="mt-8" key={index}>
          <FilmFlip item={phim} />
        </div>
      );
    });
  };

  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 2,
    speed: 500,
    rows: 2,
    slidesPerRow: 2,
    // variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="slider-container">
      <button
        type="button"
        className={`${activeClassDangChieu} px-8 py-3 font-semibold rounded-full text-white bg-gray-800 mr-6 border dark:text-gray-100`}
        onClick={() => {
          const action = { type: SET_PHIM_DANG_CHIEU };
          dispatch(action);
        }}
      >
        PHIM ĐANG CHIẾU
      </button>
      <button
        type="button"
        className={`${activeClassSapChieu} px-8 py-3 font-semibold rounded-full text-white bg-white text-gray-800 border dark:text-gray-100`}
        onClick={() => {
          const action = { type: SET_PHIM_SAP_CHIEU };
          dispatch(action);
        }}
      >
        PHIM SẮP CHIẾU
      </button>

      <Slider {...settings}>
        {renderFilm()}
        {renderFilm()}
      </Slider>
    </div>
  );
};

export default MultipleRowSlick;
