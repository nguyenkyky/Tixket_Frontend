import { useEffect, useState } from "react";
import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";
import {
  cumRapTheoKhuVucAction,
  layDanhSachHeThongRapAction,
} from "../../redux/actions/QuanLyRapActions";
import { Button, Form, Input, Modal, Tabs } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { quanLyRapService } from "../../services/QuanLyRapService";
import dayjs from "dayjs";
import moment from "moment-timezone";

import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

function Theater(props) {
  const [selectedLocation, setSelectedLocation] = useState("");

  const [selectedTheater, setSelectedTheater] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cumRapTheoKhuVuc, setCumRapTheoKhuVuc] = useState();
  const [cumRap, setCumRap] = useState();
  const [lichChieu, setLichChieu] = useState();
  const [isScheduleModalVisible, setIsScheduleModalVisible] = useState(false);
  // console.log(lichChieu);
  // console.log(cumRapTheoKhuVuc);
  const dispatch = useDispatch();

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    setSelectedTheater("");
    setCumRapTheoKhuVuc([]);
  };
  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);

  const handleTheaterClick = async (theater) => {
    try {
      setSelectedTheater(theater);

      const encodedLocation = selectedLocation
        ? encodeURIComponent(selectedLocation)
        : "";
      const encodedTheater = encodeURIComponent(theater);
      const result = await quanLyRapService.layCumRapTheoKhuVuc(
        encodedLocation,
        encodedTheater
      );
      if (result) {
        // console.log(result);
        setCumRapTheoKhuVuc(result.data.data);
      }
    } catch (e) {
      console.log(e);
      setCumRapTheoKhuVuc([]);
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setIsScheduleModalVisible(false);
  };

  const handleShowSchedule = () => {
    setIsModalVisible(false);
    setIsScheduleModalVisible(true);
  };

  const getNextSevenDays = () => {
    return new Array(7)
      .fill(null)
      .map((_, i) => dayjs().add(i, "day").format("YYYY-MM-DD"));
  };
  const nextSevenDays = getNextSevenDays();

  const showModal = async (maCumRap) => {
    const result = await quanLyRapService.layThongTinChiTietCumRap(
      selectedTheater,
      maCumRap
    );
    const lichChieuApi = await quanLyRapService.layLichChieuTheoRap2(
      selectedTheater,
      maCumRap
    );

    setCumRap(result.data.data);
    setLichChieu(lichChieuApi.data);
    setIsModalVisible(true);
  };

  const renderLichChieu = () => {
    return (
      <Tabs
        type="card"
        items={nextSevenDays.map((date, i) => {
          const filteredMovies = lichChieu?.danhSachPhim.reduce(
            (acc, phim, index) => {
              const lichChieuPhuHop = phim.lstLichChieuTheoPhim.filter(
                (lichChieu) =>
                  dayjs(lichChieu.ngayChieuGioChieu).format("YYYY-MM-DD") ===
                  date
              );
              if (lichChieuPhuHop.length > 0) {
                const movieDetails = (
                  <div key={index} className="mt-5 ">
                    <div className="flex">
                      <img
                        src={phim.hinhAnh}
                        alt={phim.hinhAnh}
                        width="100"
                        height="100"
                        onError={(e) => {
                          e.target.onError = null;
                          e.target.src = "https://i.ibb.co/cTfFTYP/Layer-2.png";
                        }}
                      />
                      <div className="ml-2">
                        <NavLink
                          to={`/detail/${phim.maPhim}`}
                          className="text-xl text-red-500"
                        >
                          {phim.tenPhim}
                        </NavLink>
                        <p>120 phút</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                      {lichChieuPhuHop?.map((lichChieu, idx) => (
                        <NavLink
                          style={{ borderRadius: "5px" }}
                          to={`/checkout/${lichChieu.maLichChieu}`}
                          key={idx}
                          className="border border-gray-300 p-2 text-center mt-2"
                        >
                          {moment(lichChieu.ngayChieuGioChieu).format(
                            "hh:mm A"
                          )}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                );
                acc.push(movieDetails);
              }
              return acc;
            },
            []
          );

          if (filteredMovies?.length === 0) {
            filteredMovies.push(
              <div key="no-shows" className="mt-5 text-red-500">
                Xin lỗi, không có suất chiếu vào ngày này, hãy chọn một ngày
                khác.
              </div>
            );
          }

          return {
            label: dayjs(date).format("ddd D-M"),
            key: `tab-${i + 1}`,
            children: filteredMovies,
          };
        })}
      />
    );
  };

  const locations = [
    "TP.Hồ Chí Minh",
    "Hải Phòng",
    "Đắk Lắk",
    "Hậu Giang",
    "Hưng Yên",
    "Phú Thọ",
    "Thái Nguyên",
    "Hà Nội",
    "Quảng Ninh",
    "Trà Vinh",
    "Hà Tĩnh",
    "Khánh Hòa",
    "Quảng Ngãi",
    "Tiền Giang",
    "Đà Nẵng",
    "Bà Rịa-Vũng Tàu",
    "Yên Bái",
    "Phú Yên",
    "Kon Tum",
    "Sóc Trăng",
    "Cần Thơ",
    "Bình Định",
    "Vĩnh Long",
    "Đồng Tháp",
    "Lạng Sơn",
    "Sơn La",
    "Đồng Nai",
    "Bình Dương",
    "Kiên Giang",
    "Bạc Liêu",
    "Nghệ An",
    "Tây Ninh",
  ];

  useEffect(() => {
    const action = layDanhSachHeThongRapAction();
    dispatch(action);
  }, []);
  return (
    <div
      style={{
        marginTop: "96px",
        backgroundColor: "#FDFCF0",
        paddingTop: "40px",
      }}
    >
      <div className="theater-container pt-8">
        <h1>TIXKET CINEMAS</h1>
        <div className="theater-locations">
          <div className="border-right">
            {locations.slice(0, 7).map((location, index) => (
              <div
                key={index}
                className={`location-item ${
                  selectedLocation === location ? "selected" : ""
                }`}
                onClick={() => handleLocationClick(location)}
              >
                <p>{location}</p>
              </div>
            ))}
          </div>
          <div className="border-right">
            {locations.slice(7, 13).map((location, index) => (
              <div
                key={index}
                className={`location-item ${
                  selectedLocation === location ? "selected" : ""
                }`}
                onClick={() => handleLocationClick(location)}
              >
                <p>{location}</p>
              </div>
            ))}
          </div>
          <div className="border-right">
            {locations.slice(13, 19).map((location, index) => (
              <div
                key={index}
                className={`location-item ${
                  selectedLocation === location ? "selected" : ""
                }`}
                onClick={() => handleLocationClick(location)}
              >
                <p>{location}</p>
              </div>
            ))}
          </div>
          <div className="border-right">
            {locations.slice(19, 25).map((location, index) => (
              <div
                key={index}
                className={`location-item ${
                  selectedLocation === location ? "selected" : ""
                }`}
                onClick={() => handleLocationClick(location)}
              >
                <p>{location}</p>
              </div>
            ))}
          </div>
          <div className="border-right">
            {locations.slice(25, 32).map((location, index) => (
              <div
                key={index}
                className={`location-item ${
                  selectedLocation === location ? "selected" : ""
                }`}
                onClick={() => handleLocationClick(location)}
              >
                <p>{location}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="theater">
          {heThongRapChieu?.map((heThongRapChieu, index) => (
            <div
              key={index}
              className={`location-item ${
                selectedTheater === heThongRapChieu.maHeThongRap
                  ? "selected-theater"
                  : ""
              }`}
              onClick={() => handleTheaterClick(heThongRapChieu.maHeThongRap)}
            >
              <p>{heThongRapChieu.tenHeThongRap}</p>
            </div>
          ))}
        </div>
        <div className="theater-details">
          {cumRapTheoKhuVuc &&
            cumRapTheoKhuVuc.length > 0 &&
            cumRapTheoKhuVuc.map((cumRap, index) => (
              <div key={index} onClick={() => showModal(cumRap.maCumRap)}>
                <p>{cumRap.tenCumRap}</p>
              </div>
            ))}
        </div>
      </div>
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <div className="modal-content">
          <div
            className="modal-image"
            style={{
              backgroundImage: `url(${cumRap?.hinhAnh})`,
            }}
          >
            <div className="modal-overlay">
              <div className="modal-info flex items-center justify-between">
                <div>
                  <p className="font-bold">{cumRap?.tenCumRap}</p>
                  <div className="flex">
                    <p className="font-semibold">Địa chỉ: </p>
                    <p style={{ marginLeft: "4px" }}> {cumRap?.diaChi}</p>
                  </div>
                  <div className="flex">
                    <p className="font-semibold">Hotline: </p>
                    <p style={{ marginLeft: "4px" }}> {cumRap?.hotline}</p>
                  </div>
                </div>
                <div>
                  <Button className="bg-blue-300" onClick={handleShowSchedule}>
                    Lịch chiếu
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        open={isScheduleModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        // closeIcon={false}
        closeIcon={<CloseOutlined style={{}} />}
      >
        <div className="modal-schedule">
          <div
            style={{
              marginLeft: "20px",
              marginRight: "20px",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            {renderLichChieu()}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Theater;
