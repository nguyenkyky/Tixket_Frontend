import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import {
  layThongTinDatVe,
  setVipAction,
} from "../../redux/actions/QuanLyNguoiDungAction";
import { datVeAction } from "../../redux/actions/QuanLyDatVeAction";
import _ from "lodash";
import "./Checkout.css";
import { CheckCircleTwoTone } from "@ant-design/icons";
import Header from "../../templates/HomeTemplate/Layout/Header/Header";
import Footer from "../../templates/HomeTemplate/Layout/Footer/Footer";
import { Tabs } from "antd";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import moment from "moment";

import "react-toastify/dist/ReactToastify.css";

const onChange = (key) => {
  console.log(key);
};

const { TabPane } = Tabs;

function RenderKetQuaDatVe() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const { thongTinVeVuaDat } = useSelector((state) => state.QuanLyDatVeReducer);
  // console.log("thongtinvevuadat", thongTinVeVuaDat);

  // const { orderId } = useSelector((state) => state.QuanLyDatVeReducer);
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get("payment") === "success") {
      const thongTinDatVe = JSON.parse(
        localStorage.getItem("THONG_TIN_DAT_VE")
      );
      if (thongTinDatVe) {
        dispatch(datVeAction(thongTinDatVe));
        localStorage.removeItem("THONG_TIN_DAT_VE");
        if (
          userLogin.tongChiTieu + thongTinDatVe.tongTien > 10000000 &&
          userLogin.maLoaiNguoiDung === "KhachHang"
        ) {
          const taiKhoanSetVip = userLogin.taiKhoan;
          dispatch(setVipAction({ taiKhoanSetVip }));

          userLogin.maLoaiNguoiDung = "Vip";
        }
        userLogin.tongChiTieu = userLogin.tongChiTieu + thongTinDatVe.tongTien;
        // console.log(userLogin);
        localStorage.setItem("USER_LOGIN", JSON.stringify(userLogin));
      } else {
        navigate("/home");
      }
    }
  }, []);

  const tenGhe = thongTinVeVuaDat.danhSachVe?.map((ve) => ve.tenGhe).join(", ");

  return (
    <div>
      <div className="container mx-auto p-4">
        <div className="checkout grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="flex items-center mb-8">
              <div className="mr-2">
                <CheckCircleOutlineIcon style={{ fontSize: "60px" }} />
              </div>
              <div>
                <p className="text-xl">Mã vé: #{thongTinVeVuaDat.orderId}</p>
                <h1 className="text-3xl font-bold ">
                  Cảm ơn {userLogin.hoTen}!
                </h1>
              </div>
            </div>

            <div className="mb-4">
              <iframe
                src={thongTinVeVuaDat.map}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            </div>
            <div className="border p-4 rounded">
              <div className="mb-4 flex items-center">
                <p
                  style={{ marginRight: "72px" }}
                  className="text-xl font-semibold"
                >
                  Tên rạp
                </p>
                <p className="text-base">{thongTinVeVuaDat.tenCumRap}</p>
              </div>
              <div className="border-t pt-4 mb-4 flex items-center">
                <h3
                  style={{ marginRight: "76px" }}
                  className="text-xl font-semibold"
                >
                  Địa chỉ
                </h3>
                <div>
                  <p className="text-base">{thongTinVeVuaDat.diaChi}</p>
                </div>
              </div>
              <div className="border-t pt-4 items-center flex">
                <h3
                  style={{ marginRight: "44px" }}
                  className="text-xl font-semibold"
                >
                  Suất chiếu
                </h3>
                <p className="text-base">
                  {thongTinVeVuaDat.gioChieu} - {thongTinVeVuaDat.ngayChieu}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                navigate("/home");
              }}
              className="bg-black text-white px-4 py-2 rounded mt-4"
            >
              Trang chủ
            </button>
          </div>
          <div className="order-summary p-4 border rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Đơn hàng</h3>
            <div className="order-item flex mb-4">
              <img
                src={thongTinVeVuaDat.hinhAnh}
                alt="hinhAnh"
                className="w-full"
                style={{ borderRadius: "5px", maxHeight: "400px" }}
              />
            </div>
            <div className="order-infor border-t mt-8">
              <div className="flex items-center justify-between mt-4">
                <p className="text-base font-semibold ">Tên phim</p>
                <p className="text-base">{thongTinVeVuaDat.tenPhim}</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <p className="text-base font-semibold ">Ghế</p>
                <p className="text-base">{tenGhe}</p>
              </div>
            </div>
            <div className="order-infor border-t mt-8">
              <div className="flex items-center justify-between mt-4">
                <p className="text-base font-semibold ">Giá vé</p>
                <p className="text-base">
                  {thongTinVeVuaDat?.giaVe?.toLocaleString()} đ
                </p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <p className="text-base font-semibold ">Khuyến mãi</p>
                <p className="text-base">{thongTinVeVuaDat?.khuyenMai} %</p>
              </div>
            </div>
            <div className="order-infor border-t mt-8">
              <div className="flex items-center justify-between mt-4">
                <p className="text-base font-semibold ">Tổng cộng</p>
                <p className="text-base">
                  {thongTinVeVuaDat?.tongTien?.toLocaleString()} đ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KetQuaDatVe() {
  return (
    <div style={{ backgroundColor: "#FDFCF0" }}>
      <Header />
      <div className="p-5 mt-24 ">
        <Tabs defaultActiveKey="2" activeKey="2">
          <TabPane tab="1. CHỌN GHẾ & THANH TOÁN" key="1"></TabPane>

          <TabPane tab="2. KẾT QUẢ ĐẶT VÉ" key="2">
            <RenderKetQuaDatVe />
          </TabPane>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}

export default KetQuaDatVe;
