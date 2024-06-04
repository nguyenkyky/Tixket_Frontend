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
        if (userLogin.tongChiTieu + thongTinDatVe.tongTien > 10000000) {
                    const taiKhoanSetVip = userLogin.taiKhoan;
                    dispatch(setVipAction({ taiKhoanSetVip }));

                    userLogin.maLoaiNguoiDung = "Vip";
                  } 
                  userLogin.tongChiTieu = userLogin.tongChiTieu + thongTinDatVe.tongTien;
                  localStorage.setItem("USER_LOGIN", JSON.stringify(userLogin));
      } else {
        navigate("/home");
      }
    }
  }, []);

  const tenGhe = thongTinVeVuaDat.danhSachVe?.map((ve) => ve.tenGhe).join(", ");

  return (
    <div className="payment-container w-1/2 px-5 py-12 mx-auto">
      <div className="payment-header">
        <CheckCircleTwoTone style={{ fontSize: "40px", color: "green" }} />
        <h1 className="payment-title">Payment Successful !</h1>

        <p className="payment-subtitle">
          Thank you! Your payment of {thongTinVeVuaDat.tongTien} has been
          received.
        </p>
        <p className="payment-subtitle">OrderId: {thongTinVeVuaDat.orderId}</p>
      </div>
      <div className="payment-details flex flex-col space-y-4">
        <div className="bg-white p-4 rounded-md shadow-md flex items-center justify-between mb-4 text-start">
          <img
            src={thongTinVeVuaDat.hinhAnh}
            alt={thongTinVeVuaDat.tenPhim}
            className="w-32 h-32 rounded-md"
          />
          <div className="flex-1 ml-4">
            <h3 className="text-xl font-bold">{thongTinVeVuaDat.tenPhim}</h3>
            <hr
              style={{
                borderTop: "1px solid red",
                marginTop: "2px",
                width: "80%",
              }}
            />
            <p className="text-gray-600">
              Địa điểm: {thongTinVeVuaDat.tenCumRap}
            </p>
            <p className="text-gray-600">
              Ngày đặt: {moment().format("HH:mm  - DD/MM/YYYY")}
            </p>
            <p className="text-gray-600">
              Ngày chiếu: {thongTinVeVuaDat.gioChieu} -{" "}
              {thongTinVeVuaDat.ngayChieu}
            </p>
            <p className="text-gray-600">Ghế: {tenGhe}</p>
          </div>
          <div className="text-right">
            <p className="text-green-600 font-bold text-lg">
              Giá vé: {thongTinVeVuaDat.tongTien}
            </p>
            <CheckCircleTwoTone
              style={{
                fontSize: "30px",
                marginTop: "12px",
                marginRight: "56px",
              }}
            />
          </div>
        </div>
      </div>
      <button
        className="ok-button"
        onClick={() => {
          navigate("/home");
        }}
      >
        Trang chủ
      </button>
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
