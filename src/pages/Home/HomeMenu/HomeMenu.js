import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Radio, Space, Tabs, Select, Tag } from "antd";
import { NavLink } from "react-router-dom";
import icon from "../../../assets/image/images.png";
import moment from "moment";
import dayjs from "dayjs";
import "./style.css";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { layDanhSachHeThongRapAction } from "../../../redux/actions/QuanLyRapActions";

dayjs.extend(advancedFormat);

const HomeMenu = () => {
  const dispatch = useDispatch();
  const [tabPosition, setTabPosition] = useState("left");
  const [selectedKhuVuc, setSelectedKhuVuc] = useState("Tất cả");

  const onChangeKhuVuc = (value) => {
    setSelectedKhuVuc(value);
    setActiveKey("0");
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

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

  useEffect(() => {

    const fetchShowtimes = async () => { 
       dispatch(layDanhSachHeThongRapAction());
    }
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
        <Tabs.TabPane
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
                <Tabs.TabPane
                  tab={
                    <div style={{ width: "320px" }} className="flex">
                      <img
                        src={cumRap.hinhAnh}
                        alt={icon}
                        style={{
                          width: 50,
                          height: 60,
                          borderRadius: "4px",
                        }}
                      />
                      <div className="text-left ml-2">
                        {cumRap.tenCumRap}
                        <p className="text-red-400">Chi tiết</p>
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
                          ).filter(
                            (lichChieu) =>
                              dayjs(lichChieu.ngayChieuGioChieu).format(
                                "YYYY-MM-DD"
                              ) === date
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
                                    <p>{phim.thoiLuong} phút</p>
                                    <div className="tags-container flex justify-start mt-7">
                                      {phim.theLoai
                                        .slice(0, 2)
                                        .map((tag, index) => (
                                          <Tag color="purple" key={index}>
                                            {tag}
                                          </Tag>
                                        ))}
                                    </div>
                                  </div>
                                </div>
                                <div className="grid grid-cols-6 gap-2">
                                  {lichChieuPhuHop
                                    ?.slice(0, 12)
                                    .map((lichChieu, idx) => (
                                      <NavLink
                                        style={{ borderRadius: "5px" }}
                                        to={`/checkout/${lichChieu.maLichChieu}`}
                                        key={idx}
                                        className="border border-gray-300 p-2 text-center mt-2"
                                      >
                                        {moment(
                                          lichChieu.ngayChieuGioChieu
                                        ).format("hh:mm A")}
                                      </NavLink>
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
                </Tabs.TabPane>
              );
            })}
          </Tabs>
        </Tabs.TabPane>
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
    </div>
  );
};

export default HomeMenu;
