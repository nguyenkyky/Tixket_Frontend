import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { datVeAction } from "../../redux/actions/QuanLyDatVeAction";
import _ from "lodash";
import "./Checkout.css";
import { Tabs } from "antd";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../templates/HomeTemplate/Layout/Header/Header";
import Footer from "../../templates/HomeTemplate/Layout/Footer/Footer";
import Checkout from "./Checkout";
import KetQuaDatVe from "./KetQuaDatVe";
const onChange = (key) => {
  console.log(key);
};

const { TabPane } = Tabs;

function CheckoutTab(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tabActive } = useSelector((state) => state.QuanLyDatVeReducer);
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false); // Thêm trạng thái quản lý thanh toán thành công

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get("payment") === "success") {
      const thongTinDatVe = JSON.parse(
        localStorage.getItem("THONG_TIN_DAT_VE")
      );
      if (thongTinDatVe) {
        dispatch(datVeAction(thongTinDatVe));
        setIsPaymentSuccess(true); // Cập nhật trạng thái thanh toán thành công
        localStorage.setItem("PAYMENT_SUCCESS", "true");
      }
    }

    return () => {
      dispatch({ type: "RELOAD_CHECKOUT" }); // Reset tabActive về 1 khi component unmount
    };
  }, []);

  return (
    <div style={{ backgroundColor: "#FDFCF0" }}>
      <Header />
      <div className="p-5 mt-24 ">
        <Tabs
          defaultActiveKey="1"
          activeKey={isPaymentSuccess ? "2" : tabActive.toString()} // Chuyển đổi giữa các tab dựa trên trạng thái thanh toán thành công
          onChange={onChange}
        >
          <TabPane tab="1. CHỌN GHẾ & THANH TOÁN" key="1">
            <Checkout />
          </TabPane>

          <TabPane tab="2. KẾT QUẢ ĐẶT VÉ" key="2"></TabPane>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}

export default CheckoutTab;
