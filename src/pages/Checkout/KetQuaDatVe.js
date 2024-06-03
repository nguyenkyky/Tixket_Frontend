import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams, useNavigate } from "react-router-dom";

import {
  layThongTinDatVe,
  setVipAction,
} from "../../redux/actions/QuanLyNguoiDungAction";

import _ from "lodash";

import "./Checkout.css";
import { CheckCircleTwoTone } from "@ant-design/icons";

import { Tabs } from "antd";
import moment from "moment";

import "react-toastify/dist/ReactToastify.css";

const onChange = (key) => {
  console.log(key);
};

const { TabPane } = Tabs;

function KetQuaDatVe() {
  const { tabActive } = useSelector((state) => state.QuanLyDatVeReducer);
  console.log(tabActive);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { thongTinDatVe } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const { thongTinVeVuaDat } = useSelector((state) => state.QuanLyDatVeReducer);
  const { orderId } = useSelector((state) => state.QuanLyDatVeReducer);
  useEffect(() => {
    const action = layThongTinDatVe();
    dispatch(action);
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
        <p className="payment-subtitle">OrderId: {orderId}</p>
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
          dispatch({ type: "RELOAD_CHECKOUT" });
        }}
      >
        Trang chủ
      </button>
    </div>
  );
}

export default KetQuaDatVe;