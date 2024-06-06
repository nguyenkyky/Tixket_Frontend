import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PlayCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { Tag, Modal, Button } from "antd";
import "./FilmFlip.css";

function FilmFlip(props) {
  const dispatch = useDispatch();
  const { item } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const handlePlayClick = () => {
    setIsModalVisible(true);
  };

  const handleDetailClick = () => {
    navigate(`/detail/${item.maPhim}?tab=3`);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getYoutubeEmbedUrl = (url) => {
    try {
      const urlObj = new URL(url);
      const urlParams = new URLSearchParams(urlObj.search);
      return `https://www.youtube.com/embed/${urlParams.get("v")}`;
    } catch (error) {
      return "";
    }
  };

  const handleTagClick = (tag) => {
    dispatch({ type: "SET_THE_LOAI_PHIM", payload: tag });
  };

  return (
    <div className="flip-card bg-blue-300">
      <div>
        <div className="flip-card-inner rounded-xl">
          <div
            className="flip-card-front"
            style={{ width: "300px", borderRadius: "12px" }}
          >
            <div
              className="image-flip-container"
              style={{ borderRadius: "12px" }}
              // style={{
              //   position: "relative",
              //   top: 0,
              //   left: 0,
              //   borderRadius: "12px",
              // }}
            >
              <img
                src={item.hinhAnh}
                alt={item.tenPhim}
                className="card-image"
                style={{
                  height: 380,
                  width: 300,
                  borderRadius: "12px",
                }}
              />
              <div className="button-overlay">
                <Button
                  icon={<PlayCircleOutlined />}
                  size="large"
                  onClick={handlePlayClick}
                  className="overlay-button"
                >
                  Xem Trailer
                </Button>
                <Button
                  icon={<InfoCircleOutlined />}
                  size="large"
                  onClick={handleDetailClick}
                  className="overlay-button"
                >
                  Chi Tiết
                </Button>
              </div>
            </div>
            <div className="flex justify-between">
              <p className="mt-2">
                {moment(item.ngayKhoiChieu).format("DD-MM-YYYY")}
              </p>
              <div className="tags-container flex justify-end mt-2">
                {item.theLoai.slice(0, 2).map((tag, index) => (
                  <Tag
                    style={{
                      color: "#000",
                      // background: "#fff",
                      // borderColor: "#f6d38b",
                      cursor: "pointer",
                    }}
                    key={index}
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>
            <div className="flex  flex-start">
              <p className="font-bold text-left">
                {item.tenPhim.length > 80
                  ? item.tenPhim.substring(0, 80) + "..."
                  : item.tenPhim}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <div className="modal-content">
          <div style={{ borderRadius: "10px", width: "100%" }}>
            <iframe
              id="youtube-player"
              width="100%"
              height="500"
              src={getYoutubeEmbedUrl(item.trailer)}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default FilmFlip;
