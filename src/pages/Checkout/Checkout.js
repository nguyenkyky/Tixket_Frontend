import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { DAT_VE } from "../../redux/actions/types/QuanLyDatVeType";
import {
  layChiTietPhongVeAction,
  datVeAction,
  datGheAction,
  kiemTraDatVeAction,
  createPaymentLinkAction,
} from "../../redux/actions/QuanLyDatVeAction";
import {
  layThongTinDatVe,
  setVipAction,
} from "../../redux/actions/QuanLyNguoiDungAction";
import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { DatVe } from "../../models/DatVe.model";
import _ from "lodash";
import style from "./Checkout.module.css";
import "./Checkout.css";
import {
  UserOutlined,
  UsergroupAddOutlined,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { useTimer } from "react-timer-hook";
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

function RenderCheckout(props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const {
    chiTietPhongVe,
    danhSachGheDangDat,
    danhSachGheKhachDangDat,
    gheDaDuocNguoiKhacDat,
  } = useSelector((state) => state.QuanLyDatVeReducer);

  const [orderId, setOrderId] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id } = useParams();
  const [tongTien, setTongTien] = useState();
  const expiryTimestamp = new Date();
  expiryTimestamp.setMinutes(expiryTimestamp.getMinutes() + 5);
  const { seconds, minutes, isRunning, start, pause, resume, restart } =
    useTimer({
      expiryTimestamp,
      onExpire: () => {
        toast.error("Hết thời gian đặt vé!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            fontSize: "20px",
          },
          toastClassName: "toast-center-center",
          onClose: () => {
            dispatch({ type: "HOAN_TAT_DAT_VE" });
            navigate(-1);
          },
        });
      },
    });

  const handleDatGhe = (ghe, id) => {
    const action = datGheAction(ghe, id);
    const currentGheCount = danhSachGheDangDat.length;

    const isSelected = danhSachGheDangDat.some(
      (item) => item.maGhe === ghe.maGhe
    );
    if (isSelected || currentGheCount < 10) {
      dispatch(action);
    } else {
      toast.warning("Mỗi lần chỉ có thể đặt tối đa 10 vé!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          fontSize: "20px",
        },
        toastClassName: "toast-center-center",
      });
    }
  };

  useEffect(() => {
    const action = layChiTietPhongVeAction(id, navigate);
    dispatch(action);
    const fetchData = async () => {
      const orderIdRecord = await quanLyDatVeService.orderId();
      setOrderId(orderIdRecord.data);
    };
    fetchData();

    // Co client dat ve thanh cong se load lai danh sach phong ve
    connection.on("datVeThanhCong", (danhSachGheKhachVuaDat) => {
      dispatch({
        type: "LOAI_BO_GHE_KHONG_HOP_LE",
        gheKhongHopLe: danhSachGheKhachVuaDat,
      });
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
          let arrGhe = JSON.parse(item.danhSachGheDangDat).map((ghe) => ({
            ...ghe,
            maLoaiNguoiDung: item.maLoaiNguoiDung,
          }));
          return [...result, ...arrGhe];
        },
        []
      );
      console.log(arrGheKhachDangDat);

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

  console.log(thongTinPhim);
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
      let maLoaiNguoiDung =
        danhSachGheKhachDangDat[indexGheKhachDangDat]?.maLoaiNguoiDung;
      let gheKhachVip =
        maLoaiNguoiDung === "Vip" || maLoaiNguoiDung === "Admin"
          ? "gheKhachVip"
          : "";
      return (
        <Fragment key={index}>
          <button
            disabled={ghe.daDat || gheKhachVip}
            // onClick={() => {
            //   const action = datGheAction(ghe, id);
            //   dispatch(action);
            // }}
            onClick={() => handleDatGhe(ghe, id)}
            key={index}
            className={`ghe ${gheVip} ${gheDaDat} ${gheDangDat} ${gheMinhDat} ${gheKhachDangDat} ${gheKhachVip} text-center`}
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

  const renderTotalPrice = () => {
    const totalPrice = danhSachGheDangDat.reduce(
      (tongTienDatVe, gheDangDat) => {
        return (tongTienDatVe += gheDangDat.giaVe);
      },
      0
    );

    if (
      userLogin.maLoaiNguoiDung === "Vip" ||
      userLogin.maLoaiNguoiDung === "Admin"
    ) {
      const discountedPrice = totalPrice * 0.85;
      // setTongTien(discountedPrice);
      return (
        <div className="relative mt-12">
          <span className="text-green-400 text-center text-2xl mt-20">
            {discountedPrice.toLocaleString()} đ
          </span>
          <span className="absolute top-0 right-0 text-red-500 text-sm">
            -15%
          </span>
        </div>
      );
    } else {
      // setTongTien(totalPrice);
      return (
        <span className="text-green-400 text-center text-2xl mt-20">
          {totalPrice.toLocaleString()} đ
        </span>
      );
    }
  };

  return (
    <div className="min-h-full mt-5">
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
              <tbody
                className=" divide-y divide-gray-200 "
                style={{ backgroundColor: "#FDFCF0" }}
              >
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
          <div className="countdown-timer text-center text-3xl font-bold mt-2 flex justify-center">
            <div style={{ width: "50px" }}>
              <HourglassTopIcon
                style={{ fontSize: "40px", color: "green", marginRight: "4px" }}
              />
            </div>
            <div className="mt-1">
              0{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </div>
          </div>
          {/* <h3 className="text-green-400 text-center text-2xl mt-20">
            {danhSachGheDangDat
              .reduce((tongTienDatVe, gheDangDat, index) => {
                return (tongTienDatVe += gheDangDat.giaVe);
              }, 0)
              .toLocaleString()}{" "}
            đ
          </h3> */}
          {renderTotalPrice()}
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
              onClick={async () => {
                const ngayChieuGioChieu = `${thongTinPhim.ngayChieu} ${thongTinPhim.gioChieu}`;
                const ngayChieuGioChieuMoment = moment(
                  ngayChieuGioChieu,
                  "DD/MM/YYYY HH:mm"
                );
                const now = moment();
                if (now.isAfter(ngayChieuGioChieuMoment)) {
                  toast.error(
                    "Thời gian chiếu phim đã vượt quá thời gian hiện tại. Vui lòng chọn phim khác.",
                    {
                      position: "top-center",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      style: {
                        fontSize: "20px",
                      },
                      toastClassName: "toast-center-center",
                      onClose: () => navigate(-1),
                    }
                  );
                } else {
                  let tongTien = danhSachGheDangDat.reduce(
                    (tongTienDatVe, gheDangDat, index) => {
                      return (tongTienDatVe += gheDangDat.giaVe);
                    },
                    0
                  );
                  if (
                    userLogin.maLoaiNguoiDung === "Vip" ||
                    userLogin.maLoaiNguoiDung === "Admin"
                  ) {
                    tongTien = tongTien * 0.85;
                  }

                  console.log("tong tien", tongTien);
                  const thongTinDatVe = new DatVe();
                  thongTinDatVe.orderId = orderId;
                  thongTinDatVe.maLichChieu = id;
                  thongTinDatVe.danhSachVe = danhSachGheDangDat;
                  thongTinDatVe.diaChi = thongTinPhim?.diaChi;
                  thongTinDatVe.gioChieu = thongTinPhim?.gioChieu;
                  thongTinDatVe.ngayChieu = thongTinPhim?.ngayChieu;
                  thongTinDatVe.tenCumRap = thongTinPhim?.tenCumRap;
                  thongTinDatVe.tenPhim = thongTinPhim?.tenPhim;
                  thongTinDatVe.hinhAnh = thongTinPhim?.hinhAnh;
                  thongTinDatVe.tongTien = tongTien;
                  thongTinDatVe.map = thongTinPhim?.map;
                  console.log("thongTinDatVe", thongTinDatVe);
                  // dispatch(kiemTraDatVeAction(thongTinDatVe));
                  dispatch(
                    createPaymentLinkAction(
                      tongTien,
                      orderId,
                      id,
                      thongTinDatVe
                    )
                  );

                  // const response = await quanLyDatVeService.createPaymentLink(
                  //   tongTien,
                  //   orderId,
                  //   id,
                  //   thongTinDatVe
                  // );
                  // console.log("response", response);

                  // localStorage.setItem(
                  //   "THONG_TIN_DAT_VE",
                  //   JSON.stringify(thongTinDatVe)
                  // );
                  // window.location.href = response.data.checkoutUrl;
                  // dispatch(datVeAction(thongTinDatVe));
                  // console.log("da dispatch datve");
                  // if (userLogin.tongChiTieu + tongTien > 10000000) {
                  //   const taiKhoanSetVip = userLogin.taiKhoan;
                  //   dispatch(setVipAction({ taiKhoanSetVip }));

                  //   userLogin.maLoaiNguoiDung = "Vip";
                  // }
                  // userLogin.tongChiTieu = userLogin.tongChiTieu + tongTien;
                  // localStorage.setItem("USER_LOGIN", JSON.stringify(userLogin));
                }
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

// function KetQuaDatVe() {
//   const { tabActive } = useSelector((state) => state.QuanLyDatVeReducer);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { thongTinDatVe } = useSelector(
//     (state) => state.QuanLyNguoiDungReducer
//   );
//   const { thongTinVeVuaDat } = useSelector((state) => state.QuanLyDatVeReducer);
//   const [orderId, setOrderId] = useState();
//   useEffect(() => {
//     const action = layThongTinDatVe();
//     dispatch(action);
//     const fetchData = async () => {
//       const orderIdRecord = await quanLyDatVeService.orderId();
//       setOrderId(orderIdRecord.data);
//     };
//     fetchData();
//   }, []);

//   const tenGhe = thongTinVeVuaDat.danhSachVe?.map((ve) => ve.tenGhe).join(", ");

//   return (
//     <div className="payment-container w-1/2 px-5 py-12 mx-auto">
//       <div className="payment-header">
//         <CheckCircleTwoTone style={{ fontSize: "40px", color: "green" }} />
//         <h1 className="payment-title">Payment Successful !</h1>
//         <p className="payment-subtitle">
//           Thank you! Your payment of {thongTinVeVuaDat.tongTien} has been
//           received.
//         </p>
//         <p className="payment-order-id text-xl">Order ID: {orderId}</p>
//       </div>
//       <div className="payment-details flex flex-col space-y-4">
//         <div className="bg-white p-4 rounded-md shadow-md flex items-center justify-between mb-4 text-start">
//           <img
//             src={thongTinVeVuaDat.hinhAnh}
//             alt={thongTinVeVuaDat.tenPhim}
//             className="w-32 h-32 rounded-md"
//           />
//           <div className="flex-1 ml-4">
//             <h3 className="text-xl font-bold">{thongTinVeVuaDat.tenPhim}</h3>
//             <hr
//               style={{
//                 borderTop: "1px solid red",
//                 marginTop: "2px",
//                 width: "80%",
//               }}
//             />
//             <p className="text-gray-600">
//               Địa điểm: {thongTinVeVuaDat.tenCumRap}
//             </p>
//             <p className="text-gray-600">
//               Ngày đặt: {moment().format("HH:mm  - DD/MM/YYYY")}
//             </p>
//             <p className="text-gray-600">
//               Ngày chiếu: {thongTinVeVuaDat.gioChieu} -{" "}
//               {thongTinVeVuaDat.ngayChieu}
//             </p>
//             <p className="text-gray-600">Ghế: {tenGhe}</p>
//           </div>
//           <div className="text-right">
//             <p className="text-green-600 font-bold text-lg">
//               Giá vé: {thongTinVeVuaDat.tongTien}
//             </p>
//             <CheckCircleTwoTone
//               style={{
//                 fontSize: "30px",
//                 marginTop: "12px",
//                 marginRight: "56px",
//               }}
//             />
//           </div>
//         </div>
//       </div>
//       <button
//         className="ok-button"
//         onClick={() => {
//           navigate("/home");
//           dispatch({ type: "RELOAD_CHECKOUT" });
//         }}
//       >
//         Trang chủ
//       </button>
//     </div>
//   );
// }

function Checkout(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tabActive } = useSelector((state) => state.QuanLyDatVeReducer);
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false); // Thêm trạng thái quản lý thanh toán thành công

  useEffect(() => {
    // const queryParams = new URLSearchParams(window.location.search);
    // if (queryParams.get("payment") === "success") {
    //   const thongTinDatVe = JSON.parse(
    //     localStorage.getItem("THONG_TIN_DAT_VE")
    //   );
    //   if (thongTinDatVe) {
    //     dispatch(datVeAction(thongTinDatVe));
    //     setIsPaymentSuccess(true); // Cập nhật trạng thái thanh toán thành công
    //   }
    // }
    // return () => {
    //   dispatch({ type: "RELOAD_CHECKOUT" }); // Reset tabActive về 1 khi component unmount
    // };
  }, []);

  return (
    <div style={{ backgroundColor: "#FDFCF0" }}>
      <Header />
      <div className="p-5 mt-24 ">
        <Tabs defaultActiveKey="1" activeKey="1" onChange={onChange}>
          <TabPane tab="1. CHỌN GHẾ & THANH TOÁN" key="1">
            <RenderCheckout />
          </TabPane>

          <TabPane tab="2. KẾT QUẢ ĐẶT VÉ" key="2"></TabPane>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}

export default Checkout;
