import React, { useEffect, useState } from "react";
import "./styles.css";
import icon from "../../assets/image/images.png";
import "../../assets/styles/circle.css";
import { Tabs, Rate } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
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

  let { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();

  const getYoutubeEmbedUrl = (url) => {
    try {
      const urlObj = new URL(url);
      const urlParams = new URLSearchParams(urlObj.search);
      return `https://www.youtube.com/embed/${urlParams.get("v")}`;
    } catch (error) {
      console.error("Invalid URL", error);
      return "";
    }
  };

  useEffect(() => {
    dispatch(layThongTinChiTietPhim(id));

    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [id, location.search]);

  const { TabPane } = Tabs;
  return (
    <div className="image-container">
      <img
        className="detail-background"
        src={filmDetail.hinhAnh}
        alt="Descriptive Alt Text"
      />
      <div className="blur-effect">
        <div className="grid grid-cols-12">
          <div className="col-span-5 col-start-3">
            <div className="grid grid-cols-3">
              <img
                className="col-span-1"
                src={filmDetail.hinhAnh}
                style={{ width: 200, height: 350 }}
                alt="123"
              />
              <div className="col-span-2" style={{ marginTop: "10%" }}>
                <p className="text-sm text-white">
                  Ngày chiếu:{" "}
                  {moment(filmDetail.ngayKhoiChieu).format("DD.MM.YYYY")}
                </p>
                <p
                  className="text-4xl text-white "
                  style={{ lineHeight: "3.5rem" }}
                >
                  {filmDetail.tenPhim}
                </p>
                <p className="text-white">{filmDetail.moTa}</p>
              </div>
            </div>
          </div>
          <div className="col-span-4 col-start-9">
            <p className="text-2xl text-white" style={{ marginLeft: "9%" }}>
              <Rate allowHalf value={filmDetail.danhGia / 2} />
            </p>
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
                          {htr.tenHeThongRap}
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
                                    src={icon}
                                    alt={icon}
                                    width="50"
                                    height="50"
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
                                  const children = cumRap.lichChieuPhim
                                    ?.filter(
                                      (lich) =>
                                        dayjs(lich.ngayChieuGioChieu).format(
                                          "YYYY-MM-DD"
                                        ) === date
                                    )
                                    ?.slice(0, 12)
                                    .map((lich, index) => (
                                      <NavLink
                                        to={`/checkout/${lich.maLichChieu}`}
                                        key={index}
                                        className="border border-gray-300 p-2 text-center mt-2"
                                      >
                                        {moment(lich.ngayChieuGioChieu).format(
                                          "hh:mm A"
                                        )}
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
                      style={{ height: 350, borderRadius: "10px" }}
                      alt="123"
                    />
                    <div className="col-span-3 ml-5">
                      <p className="text-xl text-black">
                        Ngày khởi chiếu:{" "}
                        {moment(filmDetail.ngayKhoiChieu).format("DD.MM.YYYY")}
                      </p>
                      <hr
                        style={{ borderTop: "1px solid red", marginTop: "2px" }}
                      />

                      <p
                        className="text-4xl text-black "
                        style={{ lineHeight: "3.5rem" }}
                      >
                        {filmDetail.tenPhim}
                      </p>
                      <hr
                        style={{ borderTop: "1px solid red", marginTop: "2px" }}
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
  );
}

export default Detail;
