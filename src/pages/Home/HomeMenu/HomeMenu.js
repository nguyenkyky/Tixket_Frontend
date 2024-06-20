import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Radio, Space, Tabs, Select, Tag, Modal, Button } from "antd";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import icon from "../../../assets/image/images.png";
import moment from "moment";
import dayjs from "dayjs";
import "./style.css";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { layDanhSachHeThongRapAction } from "../../../redux/actions/QuanLyRapActions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ToastContainer, toast } from "react-toastify";

dayjs.extend(advancedFormat);

const HomeMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalMapVisible, setIsModalMapVisible] = useState(false);
  const [map, setMap] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cumRap, setCumRap] = useState();
  // console.log("cumRap", cumRap);
  const [tabPosition, setTabPosition] = useState("left");
  const [selectedKhuVuc, setSelectedKhuVuc] = useState("Tất cả");

  const onChangeKhuVuc = (value) => {
    setSelectedKhuVuc(value);
    setActiveKey("0");
  };

  const showModal = (cumRap) => {
    setCumRap(cumRap);
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCancelMap = () => {
    setIsModalMapVisible(false);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const handleShowMap = (map) => {
    setMap(map);
    setIsModalMapVisible(true);
  };
  const [activeKey, setActiveKey] = useState("0");

  const onChange = (key) => {
    setActiveKey(key);
  };

  const getNextSevenDays = () => {
    return new Array(7)
      .fill(null)
      .map((_, i) => dayjs().add(i, "day").format("YYYY-MM-DD"));
  };
  const nextSevenDays = getNextSevenDays(); // Mảng các ngày dưới dạng "YYYY-MM-DD"

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

  const handleNavLinkClick = (maLichChieu) => {
    const userLogin = localStorage.getItem("USER_LOGIN");
    if (!userLogin) {
      toast.error("Bạn chưa đăng nhập!", { position: "top-center" });
    } else {
      navigate(`/checkout/${maLichChieu}`);
    }
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    centerMode: true,
    // centerPadding: "200px",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  useEffect(() => {
    const fetchShowtimes = async () => {
      dispatch(layDanhSachHeThongRapAction());
    };
    fetchShowtimes();
    // Đặt interval để gọi hàm mỗi phút
    const interval = setInterval(() => {
      fetchShowtimes();
    }, 60000); // Kiểm tra mỗi phút

    // Hàm dọn dẹp interval khi component bị unmount
    return () => clearInterval(interval);
  }, [dispatch]);

  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);

  const filterExpiredShowtimes = (lstLichChieuTheoPhim) => {
    const currentTime = moment();
    return lstLichChieuTheoPhim.filter((lichChieu) =>
      currentTime.isBefore(moment(lichChieu.ngayChieuGioChieu))
    );
  };

  const renderHeThongRap = () => {
    return heThongRapChieu?.map((heThongRap, index) => {
      const filteredCumRapChieu = heThongRap.cumRapChieu?.filter(
        (cumRap) =>
          selectedKhuVuc === "Tất cả" || cumRap.khuVuc === selectedKhuVuc
      );

      if (filteredCumRapChieu.length === 0) return null;

      return (
        <items
          tab={
            <img
              src={heThongRap.logo}
              className="rounded-full "
              alt={heThongRap.logo}
              width="50px"
            />
          }
          key={index}
        >
          <Tabs tabPosition={tabPosition}>
            {filteredCumRapChieu.map((cumRap, index) => {
              return (
                <items
                  tab={
                    <div style={{ width: "350px" }} className="flex">
                      <img
                        src={cumRap.hinhAnh}
                        alt={icon}
                        style={{
                          width: "100px",
                          height: "120px",
                          borderRadius: "4px",
                        }}
                      />
                      <div className="text-left ml-2 ">
                        <div className="text-base font-medium">
                          {cumRap.tenCumRap}
                        </div>
                        <p className="text-black">
                          <LocationOnOutlinedIcon />
                          {cumRap.diaChi.length > 50
                            ? cumRap.diaChi.substring(0, 50) + "..."
                            : cumRap.diaChi}
                        </p>
                        <div
                          style={{ width: "70px" }}
                          onClick={() => {
                            showModal(cumRap);
                          }}
                        >
                          <p className="text-blue-400 text-base mt-6">
                            Chi tiết
                          </p>
                        </div>
                      </div>
                    </div>
                  }
                  key={index}
                >
                  <Tabs
                    type="card"
                    items={nextSevenDays.map((date, i) => {
                      const filteredMovies = cumRap.danhSachPhim
                        .slice(0, 6)
                        .reduce((acc, phim, index) => {
                          const lichChieuPhuHop = filterExpiredShowtimes(
                            phim.lstLichChieuTheoPhim
                          )
                            .filter(
                              (lichChieu) =>
                                dayjs(lichChieu.ngayChieuGioChieu).format(
                                  "YYYY-MM-DD"
                                ) === date
                            )
                            .sort(
                              (a, b) =>
                                moment(a.ngayChieuGioChieu) -
                                moment(b.ngayChieuGioChieu)
                            );
                          if (lichChieuPhuHop.length > 0) {
                            const movieDetails = (
                              <div key={index} className="mt-5 ">
                                <div className="flex">
                                  <img
                                    src={phim.hinhAnh}
                                    alt={phim.hinhAnh}
                                    style={{
                                      width: "100px",
                                      height: "100px",
                                      borderRadius: "4px",
                                    }}
                                    onError={(e) => {
                                      e.target.onError = null;
                                      e.target.src =
                                        "https://i.ibb.co/cTfFTYP/Layer-2.png";
                                    }}
                                  />
                                  <div className="ml-2">
                                    <NavLink
                                      to={`/detail/${phim.maPhim}`}
                                      className="text-xl text-red-500"
                                    >
                                      {phim.tenPhim}
                                    </NavLink>
                                    <p className="text-base font-medium">
                                      {phim.dienVien.join(", ")}
                                    </p>
                                    <div className="flex">
                                      <ClockCircleOutlined />
                                      <p className="ml-1">
                                        {phim.thoiLuong} phút
                                      </p>
                                    </div>

                                    <div className="tags-container flex justify-start mt-1">
                                      {phim.theLoai
                                        .slice(0, 2)
                                        .map((tag, index) => (
                                          <Tag key={index}>{tag}</Tag>
                                        ))}
                                    </div>
                                  </div>
                                </div>
                                <div className="grid grid-cols-6 gap-2">
                                  {lichChieuPhuHop
                                    ?.slice(0, 12)
                                    .map((lichChieu, idx) => (
                                      <div
                                        style={{ borderRadius: "5px" }}
                                        onClick={() =>
                                          handleNavLinkClick(
                                            lichChieu.maLichChieu
                                          )
                                        }
                                        key={idx}
                                        className="border border-gray-300 p-2 text-center mt-2 cursor-pointer"
                                      >
                                        {moment(
                                          lichChieu.ngayChieuGioChieu
                                        ).format("hh:mm A")}
                                      </div>
                                    ))}
                                </div>
                              </div>
                            );
                            acc.push(movieDetails);
                          }
                          return acc;
                        }, []);

                      if (filteredMovies.length === 0) {
                        filteredMovies.push(
                          <div key="no-shows" className="mt-5 text-red-500">
                            Xin lỗi, không có suất chiếu vào ngày này, hãy chọn
                            một ngày khác.
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
                </items>
              );
            })}
          </Tabs>
        </items>
      );
    });
  };

  return (
    <div className="slider-container">
      <div className="section-title mb-8">
        <span className="text-3xl font-bold">SHOWTIMES</span>
      </div>
      <div className="flex mb-8">
        <Select
          style={{ width: 200, height: 40 }}
          showSearch
          placeholder="Chọn khu vực"
          optionFilterProp="children"
          onChange={onChangeKhuVuc}
          filterOption={filterOption}
          options={[
            {
              value: "Tất cả",
              label: "Tất cả",
            },
            {
              value: "Hà Nội",
              label: "Hà Nội",
            },
            {
              value: "TP.Hồ Chí Minh",
              label: "TP.Hồ Chí Minh",
            },
          ]}
        />
      </div>
      <div className="render-tab" style={{ marginLeft: "-24px" }}>
        <Tabs
          tabPosition={tabPosition}
          activeKey={activeKey}
          onChange={onChange}
        >
          {renderHeThongRap()}
        </Tabs>
      </div>
      <Modal
        className="modal-theater"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <div style={{ backgroundColor: "FDFCF0" }}>
          <Slider {...settings}>
            {cumRap?.banner?.map((bannerImage, index) => (
              <div key={index} className="modal-image">
                <img
                  src={bannerImage}
                  alt={`Banner ${index}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </Slider>
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
                <Button
                  className="bg-blue-300"
                  onClick={() => handleShowMap(cumRap?.map)}
                >
                  Xem Map
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        open={isModalMapVisible}
        onCancel={handleCancelMap}
        footer={null}
        centered
        // closeIcon={false}
        closeIcon={<CloseOutlined style={{}} />}
      >
        <div className="modal-map">
          <div
            style={{
              marginLeft: "20px",
              marginRight: "20px",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            <div className="mb-4">
              <iframe
                src={map}
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            </div>
          </div>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default HomeMenu;
