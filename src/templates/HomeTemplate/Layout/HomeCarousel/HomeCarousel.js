import React, { useEffect } from "react";
import { Carousel, Row } from "antd";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./style.css";
import { getCarouselAction } from "../../../../redux/actions/CarouselActions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomeCarousel(props) {
  const { arrImg } = useSelector((state) => state.CarouselReducer);
  const dispatch = useDispatch();

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow custom-carousel-next-arrow`}
        style={{ ...style, display: "block", right: "30px" }}
        onClick={onClick}
      />
    );
  };

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow custom-carousel-prev-arrow`}
        style={{ ...style, display: "block", left: "0" }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: "200px", // Đặt khoảng cách ở giữa cho các hình ảnh bên cạnh
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  useEffect(() => {
    dispatch(getCarouselAction);
  }, []);

  // const renderImg = () => {
  //   return arrImg.map((item, index) => {
  //     return (
  //       <div key={index}>
  //         <div
  //           style={{
  //             ...contentStyle,
  //             backgroundImage: `url(${item.hinhAnh})`,
  //             marginTop: "96px",
  //           }}
  //         >
  //           <img
  //             src={item.hinhAnh}
  //             className="w-full opacity-0"
  //             alt="carousel"
  //           />
  //         </div>
  //       </div>
  //     );
  //   });
  // };
  // return <Carousel autoplay>{renderImg()}</Carousel>;
  return (
    <div className="carousel-container" style={{ marginTop: "96px" }}>
      <Slider {...settings}>
        {arrImg.map((item, index) => (
          <div key={index} className="carousel-item">
            <img
              src={item.hinhAnh}
              alt={`Banner ${index + 1}`}
              className="banner-image"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HomeCarousel;
