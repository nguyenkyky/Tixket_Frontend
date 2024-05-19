import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { DAT_VE } from "../../redux/actions/types/QuanLyDatVeType";
import {
  layChiTietPhongVeAction,
  datVeAction,
  datGheAction,
  kiemTraDatVeAction,
} from "../../redux/actions/QuanLyDatVeAction";
import { layThongTinDatVe } from "../../redux/actions/QuanLyNguoiDungAction";
import { DatVe } from "../../models/DatVe.model";
import _ from "lodash";
import style from "./Checkout.module.css";
import "./Checkout.css";
import { UserOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import moment from "moment";
import { connection } from "../../index";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../templates/HomeTemplate/Layout/Header/Header";
import Footer from "../../templates/HomeTemplate/Layout/Footer/Footer";

const onChange = (key) => {
  console.log(key);
};

const { TabPane } = Tabs;

function Checkout(props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const {
    chiTietPhongVe,
    danhSachGheDangDat,
    danhSachGheKhachDangDat,
    gheDaDuocNguoiKhacDat,
  } = useSelector((state) => state.QuanLyDatVeReducer);
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    const action = layChiTietPhongVeAction(id);
    dispatch(action);

    // Co client dat ve thanh cong se load lai danh sach phong ve
    connection.on("datVeThanhCong", () => {
      dispatch(action);
    });
    connection.invoke("layDanhSachGheDangDat");
    connection.on("dsGheDangDat", (danhSachGheKhachDangDat) => {
      // Loaij minh ra khoi danh sach
      danhSachGheKhachDangDat = danhSachGheKhachDangDat.filter(
        (item) => item.taiKhoan !== userLogin.taiKhoan
      );

      //Gop danh sach ghe khach dat o tat ca user
      let arrGheKhachDangDat = danhSachGheKhachDangDat.reduce(
        (result, item, index) => {
          let arrGhe = JSON.parse(item.danhSachGheDangDat);

          return [...result, ...arrGhe];
        },
        []
      );

      dispatch({
        type: "DAT_GHE",
        arrGheKhachDangDat,
      });
    });

    window.addEventListener("beforeunload", clearGhe);
    return () => {
      clearGhe();
      window.removeEventListener("beforeunload", clearGhe);
    };
  }, []);

  const clearGhe = function (event) {
    connection.invoke("huyDat", userLogin.taiKhoan);
  };

  const { thongTinPhim, danhSachGhe } = chiTietPhongVe;

  const renderGhe = () => {
    return danhSachGhe?.map((ghe, index) => {
      let gheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let gheDaDat = ghe.daDat === true ? "gheDaDat" : "";
      let gheDangDat = "";
      let gheMinhDat = "";
      let gheKhachDangDat = "";
      let indexGheKhachDangDat = danhSachGheKhachDangDat?.findIndex(
        (gheKhachDangDat) => gheKhachDangDat.maGhe === ghe.maGhe
      );
      if (indexGheKhachDangDat !== -1) {
        gheKhachDangDat = "gheKhachDangDat";
      }

      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        gheMinhDat = "gheMinhDat";
      }
      let indexGheDangDat = danhSachGheDangDat.findIndex(
        (gheDangDat) => gheDangDat.maGhe === ghe.maGhe
      );
      if (indexGheDangDat !== -1) {
        gheDangDat = "gheDangDat";
      }
      return (
        <Fragment key={index}>
          <button
            disabled={ghe.daDat}
            onClick={() => {
              const action = datGheAction(ghe, id);
              dispatch(action);
            }}
            key={index}
            className={`ghe ${gheVip} ${gheDaDat} ${gheDangDat} ${gheMinhDat} ${gheKhachDangDat} text-center`}
          >
            {ghe.daDat ? (
              gheMinhDat != "" ? (
                <UserOutlined />
              ) : (
                "X"
              )
            ) : gheKhachDangDat !== "" ? (
              <UsergroupAddOutlined />
            ) : (
              ghe.stt
            )}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };

  return (
    <div className="min-h-screen mt-5">
      <div className="grid grid-cols-12">
        <div className="col-span-9">
          <div className="flex flex-col items-center mt-5">
            <div
              className="bg-black"
              style={{ width: "80%", height: 15 }}
            ></div>
            <div className={`${style["trapezoid"]} text-center`}>
              <h3 className="mt-3 text-black">Màn hình</h3>
            </div>
            <div>{renderGhe()}</div>
          </div>

          <div className="mt-5 flex justify-center">
            <table className="divide-y divide-gray-200 w-3/4">
              <thead className="bg-gray-50 p-10">
                <tr>
                  <th className="w-1/6">Ghế chưa đặt</th>
                  <th className="w-1/6">Ghế đang đặt</th>
                  <th className="w-1/6">Ghế vip</th>
                  <th className="w-1/6">Ghế đã đặt</th>
                  <th className="w-1/6">Ghế mình đặt</th>
                  <th className="w-1/6">Ghế khách đang đặt</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 ">
                <tr>
                  <td className="">
                    <button className="ghe text-center ml-20">00</button>
                  </td>
                  <td className="">
                    <button className="ghe gheDangDat ml-20 text-center">
                      00
                    </button>
                  </td>
                  <td>
                    <button className="ghe gheVip ml-20 text-center">00</button>
                  </td>
                  <td>
                    <button className="ghe gheDaDat ml-20 text-center">
                      00
                    </button>
                  </td>
                  <td>
                    <button className="ghe gheMinhDat ml-20 text-center">
                      <UserOutlined />
                    </button>
                  </td>
                  <td>
                    <button className="ghe gheKhachDangDat ml-20 text-center">
                      <UsergroupAddOutlined />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-span-3">
          <h3 className="text-green-400 text-center text-2xl">
            {danhSachGheDangDat
              .reduce((tongTienDatVe, gheDangDat, index) => {
                return (tongTienDatVe += gheDangDat.giaVe);
              }, 0)
              .toLocaleString()}{" "}
            đ
          </h3>
          <hr />
          <h3 className="text-xl mt-2">{thongTinPhim?.tenPhim}</h3>
          <p>Địa điểm: {thongTinPhim?.tenCumRap}</p>
          <p>
            Ngày chiếu: {thongTinPhim?.ngayChieu} - {thongTinPhim?.gioChieu}
          </p>
          <hr />
          <div className="flex flex-row my-5">
            <div className="w-4/5">
              <span className="text-red-400 text-lg">Ghế </span>
              {_.sortBy(danhSachGheDangDat, ["stt"]).map(
                (gheDangDat, index) => {
                  return (
                    <span key={index} className="text-yellow-500 text-xl">
                      {gheDangDat.stt}{" "}
                    </span>
                  );
                }
              )}
            </div>
            <div className="text-right col-span-1">
              <span className="text-green-800 text-lg">
                {danhSachGheDangDat
                  .reduce((tongTienDatVe, gheDangDat, index) => {
                    return (tongTienDatVe += gheDangDat.giaVe);
                  }, 0)
                  .toLocaleString()}{" "}
                đ
              </span>
            </div>
          </div>
          <hr />
          <div className="my-5">
            <i>Email</i> <br />
            {userLogin.email}
          </div>
          <hr />
          <div className="my-5">
            <i>Phone</i> <br />
            {userLogin.soDT}
          </div>
          <hr />
          <div className="mb-0 h-full flex flex-col items-center">
            <div
              onClick={() => {
                const tongTien = `${danhSachGheDangDat
                  .reduce((tongTienDatVe, gheDangDat, index) => {
                    return (tongTienDatVe += gheDangDat.giaVe);
                  }, 0)
                  .toLocaleString()} đ`;
                const thongTinDatVe = new DatVe();
                thongTinDatVe.maLichChieu = id;
                thongTinDatVe.danhSachVe = danhSachGheDangDat;
                thongTinDatVe.diaChi = thongTinPhim?.diaChi;
                thongTinDatVe.gioChieu = thongTinPhim?.gioChieu;
                thongTinDatVe.ngayChieu = thongTinPhim?.ngayChieu;
                thongTinDatVe.tenCumRap = thongTinPhim?.tenCumRap;
                thongTinDatVe.tenPhim = thongTinPhim?.tenPhim;
                thongTinDatVe.hinhAnh = thongTinPhim?.hinhAnh;
                thongTinDatVe.tongTien = tongTien;
                console.log("thongTinDatVe", thongTinDatVe);
                dispatch(kiemTraDatVeAction(thongTinDatVe))
                  .then(() => {
                    // Chỉ thực hiện datVeAction nếu kiemTraDatVeAction thành công
                    dispatch(datVeAction(thongTinDatVe));
                  })
                  .catch((error) => {
                    // Xử lý lỗi hoặc thông báo tại đây nếu kiemTraDatVeAction thất bại
                    toast.error(error.message, {
                      position: "top-center",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      onClose: () => window.location.reload(), // Tải lại trang sau khi toast đóng
                      style: {
                        fontSize: "20px",
                      },
                      toastClassName: "toast-center-center", // Áp dụng class CSS cho toast
                    });
                  });
              }}
              className="bg-green-500 text-white w-full text-center py-3 font-bold text-2xl cursor-pointer"
            >
              ĐẶT VÉ
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

function KetQuaDatVe() {
  const dispatch = useDispatch();
  const { thongTinDatVe } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const { thongTinVeVuaDat } = useSelector((state) => state.QuanLyDatVeReducer);
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  // console.log("thongTinDatVe", thongTinDatVe);
  // console.log("thongTinVeVuaDat", thongTinVeVuaDat);

  useEffect(() => {
    const action = layThongTinDatVe();
    dispatch(action);
  }, []);

  const tenGhe = thongTinVeVuaDat.danhSachVe?.map((ve) => ve.tenGhe).join(", ");

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-5/6 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="flex-shrink-0 rounded-lg w-80 h-80 object-cover object-center sm:mb-0 mb-4"
            src={thongTinVeVuaDat.hinhAnh}
          />
          <div className="lg:w-2/3 w-full lg:pl-10 mt-6 lg:mt-0">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
              {thongTinVeVuaDat.tenPhim}
            </h1>
            <p className="mb-4 text-xl">
              Ngày chiếu:{" "}
              {moment(thongTinVeVuaDat.ngayChieu).format(
                "hh:mm A - DD-MM-YYYY"
              )}
            </p>
            <p className="mb-4 text-xl">
              Tên rạp: {thongTinVeVuaDat.tenCumRap} - {thongTinVeVuaDat.tenRap}
            </p>
            <p className="mb-4 text-xl">Địa điểm: {thongTinVeVuaDat.diaChi}</p>
            <p className="mb-4 text-xl">Ghế: {tenGhe} </p>
            <div className="flex">
              <span className="title-font font-medium text-xl text-gray-900">
                Tổng giá tiền: {thongTinVeVuaDat.tongTien}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckoutTab(props) {
  const { tabActive } = useSelector((state) => state.QuanLyDatVeReducer);
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const operations = <button>Extra option</button>;
  return (
    <div>
      <Header />
      <div className="p-5 mt-24 ">
        <Tabs
          tabBarExtraContent={operations}
          defaultActiveKey="1"
          activeKey={tabActive.toString()}
          onChange={onChange}
        >
          <TabPane tab="1. CHỌN GHẾ & THANH TOÁN" key="1">
            <Checkout />
          </TabPane>
          <TabPane tab="2. KẾT QUẢ ĐẶT VÉ" key="2">
            <KetQuaDatVe />
          </TabPane>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}

export default CheckoutTab;
