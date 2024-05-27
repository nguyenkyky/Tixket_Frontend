import React, { useState } from "react";
import YouTube from "react-youtube";
import { PlayCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "./FilmFlip.css";
import { Button, Tag } from "antd";

function FilmFlip(props) {
  const { item } = props;
  console.log(item);
  const navigate = useNavigate();

  const handlePlayClick = () => {
    navigate(`/detail/${item.maPhim}?tab=3`);
  };

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
            <div className="flex ml-2 justify-between">
              <p className="mt-2">
                {moment(item.ngayKhoiChieu).format("DD-MM-YYYY")}
              </p>
              <div className="tags-container flex justify-end mt-2">
                {item.theLoai.slice(0, 2).map((tag, index) => (
                  <Tag color="purple" key={index}>
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>
            <div className="flex ml-2  flex-start">
              <p className="font-bold text-left">
                {item.tenPhim.length > 80
                  ? item.tenPhim.substring(0, 80) + "..."
                  : item.tenPhim}
              </p>
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
                alignItems: "center",
              }}
            >
              <div className="cursor-pointer mb-20" onClick={handlePlayClick}>
                <PlayCircleOutlined style={{ fontSize: "50px" }} />
              </div>
            </div>
            <div className="flex ml-2">
              <p className="mt-2 text-black font-bold">
                Đạo diễn:{" "}
                {item.daoDien?.length > 25
                  ? item.daoDien?.substring(0, 25) + "..."
                  : item.daoDien}
              </p>
            </div>
            <div className="flex ml-2 flex-start">
              <p className="font-bold text-left text-black">
                Diễn viên:{" "}
                {item.dienVien.join(", ").length > 50
                  ? item.dienVien.join(", ").substring(0, 50) + "..."
                  : item.dienVien.join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilmFlip;
