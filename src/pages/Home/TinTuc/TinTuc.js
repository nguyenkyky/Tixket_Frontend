import React, { useEffect, useState } from "react";
import "./style.css";
import { quanLyTinTucService } from "../../../services/QuanLyTinTucService";
import { NavLink } from "react-router-dom";
import moment from "moment";

function TinTuc() {
  const [news, setNews] = useState([]);
  // console.log(news);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await quanLyTinTucService.getAll();
        const news8 = data.data.slice(0, 8);
        setNews(news8);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="section-title my-8">
        <span className="text-3xl font-bold">NEWS</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {news?.map((item, index) => (
          <div key={index} className="news-card">
            <NavLink to={`/news/${item.maTinTuc}`}>
              <img
                src={item.hinhAnh}
                alt={item.title}
                className="w-full h-64"
              />
            </NavLink>
            <div className="p-4">
              <div className="text-gray-400 mb-2">
                {item.created_at
                  ? moment(item.created_at).format("DD-MM-YYYY")
                  : "01-06-2024"}
              </div>
              <NavLink
                to={`/news/${item.maTinTuc}`}
                className="text-white font-bold"
              >
                {item.title}
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TinTuc;
