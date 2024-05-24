import React from "react";
import "./FilmFlip.css";
import { Button } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { history } from "../../App";
import moment from "moment";
function FilmFlip(props) {
  const { item } = props;
  return (
    <div className="flip-card bg-blue-300" style={{ height: 280 }}>
      <div style={{ height: 280 }}>
        <div className="flip-card-inner rounded-xl">
          <div
            className="flip-card-front"
            style={{ width: "300px", borderRadius: "12px" }}
          >
            <div
              style={{
                position: "relative",
                top: 0,
                left: 0,
                borderRadius: "12px",
              }}
            >
              <img
                src={item.hinhAnh}
                alt={item.tenPhim}
                style={{ height: 200, width: 300, borderRadius: "12px" }}
              ></img>
            </div>
            <div className="flex ml-2">
              <p className="mt-2">
                {moment(item.ngayKhoiChieu).format("DD-MM-YYYY")}
              </p>
            </div>
            <div className="flex ml-2 flex-start">
              <p className="font-bold text-left">{item.tenPhim}</p>
            </div>
          </div>
          <div
            className="flip-card-back"
            style={{
              position: "relative",
              borderRadius: "12px",
            }}
          >
            <div
              style={{
                position: "relative",
                top: 0,
                left: 0,
                borderRadius: "12px",
              }}
            >
              <img
                src={item.hinhAnh}
                alt="avatar"
                style={{ width: 300, height: 200, borderRadius: "12px" }}
              ></img>
            </div>
            <div
              className="w-full h-full rounded-xl"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: "rgba(0,0,0,0)",
                display: "flex",
                justifyContent: "center",
                // alignItems: "center",
              }}
            >
              <div>
                <div className="rounded-full cursor-pointer mt-12">
                  <PlayCircleOutlined style={{ fontSize: "50px" }} />
                </div>
                <div className="text-2xl mt-2 font-bold">{item.tenPhim}</div>
              </div>
            </div>
            <div className="flex ml-2">
              <p className="mt-2 text-black font-bold">
                Đạo diễn: {item.daoDien}
              </p>
            </div>
            <div className="flex ml-2 flex-start">
              <p className="font-bold text-left text-black">
                Diễn viên: {item.dienVien.join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilmFlip;
