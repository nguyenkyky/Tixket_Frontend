import React, { useEffect, useState } from "react";
import "./styles.css";
import icon from "../../assets/image/images.png";
import "../../assets/styles/circle.css";
import { Tabs, Rate, Tag, Modal } from "antd";
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, NavLink, useNavigate } from "react-router-dom";
import { layThongTinChiTietPhim } from "../../redux/actions/QuanLyRapActions";
import moment from "moment";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { ratingAction } from "../../redux/actions/QuanLyPhimAction";
import { Flex, Progress } from "antd";

dayjs.extend(advancedFormat);

function Detail(props) {
  const navigate = useNavigate();
  const getNextSevenDays = () => {
    return new Array(7)
      .fill(null)
      .map((_, i) => dayjs().add(i, "day").format("YYYY-MM-DD"));
  };
  const nextSevenDays = getNextSevenDays(); // Mảng các ngày dưới dạng "YYYY-MM-DD"
  const filmDetail = useSelector((state) => state.QuanLyPhimReducer.filmDetail);
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const [activeTab, setActiveTab] = useState("1");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cumRap, setCumRap] = useState();
  const [ratingValue, setRatingValue] = useState(0);
  console.log(ratingValue);
  const showModal = (cumRap) => {
    setCumRap(cumRap);
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  let { id } = useParams();
  const dispatch = useDispatch();

  const getYoutubeEmbedUrl = (url) => {
    try {
      const urlObj = new URL(url);
      const urlParams = new URLSearchParams(urlObj.search);
      return `https://www.youtube.com/embed/${urlParams.get("v")}`;
    } catch (error) {
      return "";
    }
  };

  const handleChangeRating = (values) => {
    setRatingValue(values);
    const action = ratingAction(
      {
        taiKhoan: userLogin.taiKhoan,
        rating: values,
        maPhim: id,
      },
      navigate
    );
    dispatch(action);
    // console.log(values);
    // console.log(userLogin.taiKhoan);
  };

  // Hàm tính toán trung bình đánh giá và số lượt đánh giá
  const calculateRatingStats = (ratings) => {
    const totalRatings = ratings.length;
    const ratingSum = ratings.reduce((acc, rating) => acc + rating.rate, 0);
    const averageRating = ratingSum / totalRatings;

    const ratingCounts = [0, 0, 0, 0, 0];
    ratings.forEach((rating) => {
      ratingCounts[rating.rate - 1] += 1;
    });

    return { totalRatings, averageRating, ratingCounts };
  };

  const { totalRatings, averageRating, ratingCounts } = calculateRatingStats(
    filmDetail?.rating || []
  );
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#e8fe12",
    },
    "& .MuiRating-iconEmpty": {
      color: "rgb(239 239 239 / 26%)",
    },
  });

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
    return () => {
      clearInterval(interval);
    };
  }, [id]);

  useEffect(() => {
    if (filmDetail && userLogin) {
      const userRating = filmDetail.rating?.find(
        (rating) => rating.taiKhoan === userLogin.taiKhoan
      );
      if (userRating) {
        setRatingValue(userRating.rate);
      } else {
        setRatingValue(0);
      }
    }
  }, [filmDetail]);

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
                              <items
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
                                      ?.sort(
                                        (a, b) =>
                                          moment(a.ngayChieuGioChieu) -
                                          moment(b.ngayChieuGioChieu)
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
                              </items>
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
                  className={`text-2xl  ${
                    activeTab === "2" ? "text-red-600" : "text-white"
                  }`}
                >
                  Thông tin
                </span>
              }
              key="2"
            >
              <div
                className="mt-20 px-5 py-5 ml-72 w-2/3 tab-2"
                style={{ borderRadius: "10px" }}
              >
                <div className="grid grid-cols-12">
                  <div className="col-span-10 col-start-2">
                    <div className="grid grid-cols-5">
                      <img
                        className="col-span-2"
                        src={filmDetail.hinhAnh}
                        style={{
                          height: 500,
                          borderRadius: "10px",
                          width: "100%",
                        }}
                        alt="123"
                      />
                      <div className="col-span-3 ml-5">
                        <div className="flex items-center">
                          <CalendarOutlined />
                          <p className="text-xl text-black ml-4">
                            {moment(filmDetail.ngayKhoiChieu).format(
                              "DD.MM.YYYY"
                            )}
                          </p>
                        </div>
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
                        <div className="flex items-center">
                          <ClockCircleOutlined />
                          <p className="text-black text-base ml-2">
                            {filmDetail.thoiLuong} phút
                          </p>
                        </div>

                        <p className="text-black text-base mt-5">
                          {filmDetail.moTa}
                        </p>
                        <div className="flex justify-around mt-4">
                          <div className="flex flex-col justify-center items-center">
                            <p className="font-semibold text-xl">
                              {averageRating.toFixed(1)}/5
                            </p>
                            <StyledRating
                              name="disabled"
                              value={Math.round(averageRating)}
                              disabled
                            />
                            <p className="text-sm">{totalRatings} đánh giá</p>
                            <div
                              style={{
                                width: "100%",
                                height: "2px",
                                backgroundColor: "#ccc",
                              }}
                              className="line"
                            ></div>
                            <p className="text-lg">Đánh giá của bạn</p>
                            <StyledRating
                              name="simple-controlled"
                              value={ratingValue}
                              onChange={(event, newValue) =>
                                handleChangeRating(newValue)
                              }
                            />
                          </div>
                          <div>
                            <div
                              style={{
                                width: "1px",
                                height: "100%",
                                backgroundColor: "#ccc",
                              }}
                              className="line"
                            ></div>
                          </div>
                          <Stack spacing={1}>
                            {ratingCounts.map((count, index) => (
                              <div key={index} className="flex items-center">
                                <p style={{ marginTop: "2px" }}>{5 - index}</p>
                                <Rating
                                  name={`customized-${5 - index}`}
                                  defaultValue={1}
                                  max={1}
                                  readOnly
                                />
                                <Progress
                                  style={{ width: "200px" }}
                                  percent={
                                    (ratingCounts[4 - index] / totalRatings) *
                                    100
                                  }
                                  showInfo={false}
                                />
                                <p className="ml-2">
                                  {ratingCounts[4 - index]} đánh giá
                                </p>
                              </div>
                            ))}
                          </Stack>
                        </div>
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
