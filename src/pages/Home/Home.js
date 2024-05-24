import React, { useState, useEffect } from "react";
import HomeMenu from "./HomeMenu/HomeMenu";
import { useSelector, useDispatch } from "react-redux";
import Film from "../../components/Film/Film";
import MultipleRowSlick from "../../components/RSlick/MultipleRowSlick";
import { layDanhSachPhimAction } from "../../redux/actions/QuanLyPhimAction";
import { layDanhSachHeThongRapAction } from "../../redux/actions/QuanLyRapActions";
import HomeCarousel from "../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel";
// import LichChieuPhim from "../../components/LichChieuPhim/LichChieuPhim";
export default function Home(props) {
  const { arrFilm } = useSelector((state) => state.QuanLyPhimReducer);

  // console.log("arrFilm", arrFilm);
  const dispatch = useDispatch();

  // const renderFilm = () => {
  //   return arrFilm.map((phim, index) => {
  //     return <Film key={index} />;
  //   });
  // };

  useEffect(() => {
    const action = layDanhSachPhimAction();
    dispatch(action);
    dispatch(layDanhSachHeThongRapAction());
  }, []);
  return (
    <div style={{ backgroundColor: "#FDFCF0" }}>
      <div id="home">
        <HomeCarousel />
      </div>

      <section
        className="text-gray-600 body-font"
        style={{ backgroundColor: "#FDFCF0" }}
      >
        <div id="danh-sach-phim" className="container px-5 py-24 mx-auto">
          <MultipleRowSlick arrFilm={arrFilm} />
        </div>
      </section>

      <div id="lich-chieu" className="mx-36">
        <HomeMenu />
      </div>
    </div>
  );
}
