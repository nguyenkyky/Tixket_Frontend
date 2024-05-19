import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./style.css";
import { getCarouselAction } from "../../../../redux/actions/CarouselActions";

function HomeCarousel(props) {
  const { arrImg } = useSelector((state) => state.CarouselReducer);
  const dispatch = useDispatch();

  // console.log("arrImg", arrImg);
  const contentStyle = {
    height: "800px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    backgroundPosition: "center",
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
  };

  useEffect(() => {
    // try {
    //   const result = await axios({
    //     url: "http://localhost:4000/banner/all",
    //     method: "GET",
    //   });
    //   console.log("result", result);
    //   dispatch({
    //     type: "SET_CAROUSEL",
    //     arrImg: result.data.data,
    //   });
    // } catch (errors) {
    //   console.log("errors", errors);
    // }
    dispatch(getCarouselAction);
  }, []);

  const renderImg = () => {
    return arrImg.map((item, index) => {
      return (
        <div key={index}>
          <div
            style={{
              ...contentStyle,
              backgroundImage: `url(${item.hinhAnh})`,
              marginTop: "96px",
            }}
          >
            <img
              src={item.hinhAnh}
              className="w-full opacity-0"
              alt="carousel"
            />
          </div>
        </div>
      );
    });
  };
  return <Carousel autoplay>{renderImg()}</Carousel>;
}

export default HomeCarousel;
