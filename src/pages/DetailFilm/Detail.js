import React, { useEffect, useState } from "react";
import "./styles.css";
import icon from "../../assets/image/images.png";
import "../../assets/styles/circle.css";
import { Tabs, Rate, Tag, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, NavLink } from "react-router-dom";
import { layThongTinChiTietPhim } from "../../redux/actions/QuanLyRapActions";
import moment from "moment";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

function Detail(props) {
  const getNextSevenDays = () => {
    return new Array(7)
      .fill(null)
      .map((_, i) => dayjs().add(i, "day").format("YYYY-MM-DD"));
  };
  const nextSevenDays = getNextSevenDays(); // Mảng các ngày dưới dạng "YYYY-MM-DD"
  const filmDetail = useSelector((state) => state.QuanLyPhimReducer.filmDetail);
  const [activeTab, setActiveTab] = useState("1");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cumRap, setCumRap] = useState();
  const showModal = (cumRap) => {
    setCumRap(cumRap);
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  let { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();

  const getYoutubeEmbedUrl = (url) => {
    try {
      const urlObj = new URL(url);
      const urlParams = new URLSearchParams(urlObj.search);
      return `https://www.youtube.com/embed/${urlParams.get("v")}`;
    } catch (error) {
      return "";
    }
  };

  useEffect(() => {
    const fetchShowtimes = async () => {
      dispatch(layThongTinChiTietPhim(id));
    };
    fetchShowtimes();
    // Đặt interval để gọi hàm mỗi phút
    const interval = setInterval(() => {
      fetchShowtimes();
    }, 60000); // Kiểm tra mỗi phút

    // Hàm dọn dẹp interval khi component bị unmount
    return () => clearInterval(interval);
  }, [id]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [location.search]);

  const { TabPane } = Tabs;
  return (
    <div className="image-container">
      <img
        className="detail-background"
        src={filmDetail.hinhAnh}
        alt="Descriptive Alt Text"
      />
      <div className="blur-effect">
        <div className="content">
          <div className="grid grid-cols-12" style={{ paddingTop: "150px" }}>
            <div className="col-span-5 col-start-3">
              <div className="grid grid-cols-3">
                <img
                  className="col-span-1"
                  src={filmDetail.hinhAnh}
                  style={{ width: "100%", height: 350, borderRadius: "5px" }}
                  alt="123"
                />
                <div
                  className="col-span-2"
                  style={{ marginTop: "10%", marginLeft: "20px" }}
                >
                  <p className="text-sm text-white">
                    Ngày chiếu:{" "}
                    {moment(filmDetail.ngayKhoiChieu).format("DD.MM.YYYY")}
                  </p>
                  <p
                    className="text-4xl text-white"
                    style={{ lineHeight: "3.5rem" }}
                  >
                    {filmDetail.tenPhim}
                  </p>
                  <p className="text-white">{filmDetail.moTa}</p>
                </div>
              </div>
            </div>
            <div className="col-span-4 col-start-9">
              <div className="text-2xl text-white" style={{ marginLeft: "9%" }}>
                <Rate allowHalf value={filmDetail.danhGia / 2} />
              </div>
              <div className={`c100 p${filmDetail.danhGia * 10} big`}>
                <span>{filmDetail.danhGia}</span>
                <div className="slice">
                  <div className="bar"></div>
                  <div className="fill"></div>
                </div>
              </div>
            </div>
          </div>

          <Tabs
            activeKey={activeTab}
            centered
            className="mt-20"
            onChange={(key) => setActiveTab(key)}
          >
            <TabPane
              tab={
                <span
                  className={`text-2xl ${
                    activeTab === "1" ? "text-red-600" : "text-white"
                  }`}
                >
                  Lịch chiếu
                </span>
              }
              key="1"
              style={{ minHeight: 300 }}
            >
              <div
                className="mt-20 px-5 py-5 ml-72 w-2/3"
                style={{ borderRadius: "10px", backgroundColor: "#FDFCF0" }}
              >
                <Tabs tabPosition="left">
                  {filmDetail.heThongRapChieu?.map((htr, index) => {
                    return (
                      <TabPane
                        key={index}
                        tab={
                          <div>
                            <img src={htr.logo} width={50} height={50}></img>
                          </div>
                        }
                      >
                        <Tabs tabPosition="left">
                          {htr.cumRapChieu?.map((cumRap, index) => {
                            return (
                              <Tabs.TabPane
                                tab={
                                  <div
                                    style={{ width: "300px" }}
                                    className="flex"
                                  >
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
                                      <div
                                        style={{ width: "70px" }}
                                        onClick={() => {
                                          showModal(cumRap);
                                        }}
                                      >
                                        <p className="text-red-400 text-base">
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
                                    const currentTime = moment();
                                    const children = cumRap.lichChieuPhim
                                      ?.filter(
                                        (lich) =>
                                          dayjs(lich.ngayChieuGioChieu).format(
                                            "YYYY-MM-DD"
                                          ) === date &&
                                          moment(
                                            lich.ngayChieuGioChieu
                                          ).isAfter(currentTime)
                                      )
                                      ?.slice(0, 12)
                                      .map((lich, index) => (
                                        <NavLink
                                          to={`/checkout/${lich.maLichChieu}`}
                                          key={index}
                                          className="border border-gray-300 p-2 text-center mt-2"
                                        >
                                          {moment(
                                            lich.ngayChieuGioChieu
                                          ).format("hh:mm A")}
                                        </NavLink>
                                      ));
                                    return {
                                      label: dayjs(date).format("ddd D-M"),
                                      key: `tab-${i + 1}`,
                                      children: children.length ? (
                                        <div className="grid grid-cols-6 gap-2">
                                          {children}
                                        </div>
                                      ) : (
                                        <div>Không có suất chiếu.</div>
                                      ),
                                    };
                                  })}
                                />
                              </Tabs.TabPane>
                            );
                          })}
                        </Tabs>
                      </TabPane>
                    );
                  })}
                </Tabs>
              </div>
            </TabPane>
            <TabPane
              tab={
                <span
                  className={`text-2xl ${
                    activeTab === "2" ? "text-red-600" : "text-white"
                  }`}
                >
                  Thông tin
                </span>
              }
              key="2"
            >
              <div
                className="mt-20 px-5 py-5 ml-72 w-2/3"
                style={{ borderRadius: "10px", backgroundColor: "#FDFCF0" }}
              >
                <div className="grid grid-cols-12">
                  <div className="col-span-10 col-start-2">
                    <div className="grid grid-cols-5">
                      <img
                        className="col-span-2"
                        src={filmDetail.hinhAnh}
                        style={{
                          height: 350,
                          borderRadius: "10px",
                          width: "100%",
                        }}
                        alt="123"
                      />
                      <div className="col-span-3 ml-5">
                        <p className="text-xl text-black">
                          Ngày khởi chiếu:{" "}
                          {moment(filmDetail.ngayKhoiChieu).format(
                            "DD.MM.YYYY"
                          )}
                        </p>
                        <hr
                          style={{
                            borderTop: "1px solid red",
                            marginTop: "2px",
                          }}
                        />

                        <p
                          className="text-4xl text-black "
                          style={{ lineHeight: "3.5rem" }}
                        >
                          {filmDetail.tenPhim}
                        </p>
                        <hr
                          style={{
                            borderTop: "1px solid red",
                            marginTop: "2px",
                          }}
                        />
                        <div className="flex">
                          <p className="text-black text-base font-medium">
                            Đạo diễn:
                          </p>
                          <p className="text-black text-base ml-2">
                            {filmDetail.daoDien}
                          </p>
                        </div>
                        <div className="flex">
                          <p className="text-black text-base font-medium">
                            Diễn viên:
                          </p>
                          <p className="text-black text-base ml-2">
                            {filmDetail.dienVien?.join(", ")}
                          </p>
                        </div>
                        <div className="flex">
                          <p className="text-black text-base font-medium">
                            Thời lượng:
                          </p>
                          <p className="text-black text-base ml-2">
                            {filmDetail.thoiLuong} phút
                          </p>
                        </div>
                        <div className="flex">
                          <p className="text-black text-base font-medium">
                            Thể loại:
                          </p>
                          <div
                            className="tags-container flex justify-start ml-2 "
                            style={{ marginTop: "2px" }}
                          >
                            {filmDetail.theLoai
                              ?.slice(0, 2)
                              .map((tag, index) => (
                                <Tag color="purple" key={index}>
                                  {tag}
                                </Tag>
                              ))}
                          </div>
                        </div>

                        <p className="text-black text-base mt-5">
                          {filmDetail.moTa}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane
              tab={
                <span
                  className={`text-2xl ${
                    activeTab === "3" ? "text-red-600" : "text-white"
                  }`}
                >
                  Trailer
                </span>
              }
              key="3"
            >
              <div
                className="mt-20 px-5 py-5 ml-72 w-2/3"
                style={{ borderRadius: "10px", backgroundColor: "#FDFCF0" }}
              >
                <iframe
                  width="100%"
                  height="500"
                  src={getYoutubeEmbedUrl(filmDetail.trailer)}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </TabPane>
          </Tabs>
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
              <div className="modal-info">
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
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Detail;
