import React from "react";
import "./FilmFlip.css";
import { Button } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { history } from "../../App";
function FilmFlip(props) {
  const { item } = props;
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front" style={{ width: "300px" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              borderRadius: "5px",
              // background: `url(${item.hinhAnh})`,
              // backgroundPosition: "center",
              //   backgroundSize: "cover",
            }}
          >
            <img
              src={item.hinhAnh}
              alt={item.tenPhim}
              style={{ height: 200, width: 300 }}
            ></img>
          </div>
        </div>
        <div
          className="flip-card-back"
          style={{ position: "relative", backgroundColor: "rgba(0,0,0,.9)" }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              borderRadius: "5px",
            }}
          >
            <img
              src={item.hinhAnh}
              alt="avatar"
              style={{ width: 300, height: 200 }}
            ></img>
          </div>
          <div
            className="w-full h-full"
            style={{
              position: "absolute",
              backgroundColor: "rgba(0,0,0,.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <div className="rounded-full cursor-pointer">
                <PlayCircleOutlined style={{ fontSize: "50px" }} />
              </div>
              <div className="text-2xl mt-2 font-bold">{item.tenPhim}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-orange-300 w-full text-center cursor-pointer py-2 bg-indigo-300 my-2 text-success-50 font-bold">
        <NavLink to={`/detail/${item.maPhim}`}>CHI TIẾT</NavLink>
      </div>
    </div>
  );
}

export default FilmFlip;
