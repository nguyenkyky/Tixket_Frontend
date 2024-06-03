import {
  SET_CHI_TIET_PHONG_VE,
  SET_THONG_TIN_DAT_VE,
  CHUYEN_TRANG_KET_QUA_DAT_VE,
  DAT_VE,
} from "./types/QuanLyDatVeType";
import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { DatVe } from "../../models/DatVe.model";
import { connection } from "../../index";
export const layChiTietPhongVeAction = (maLichChieu, navigate) => {
  return async (dispatch) => {
    try {
      const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);

      if (result.status === 200) {
        // console.log("phongve", result);
        dispatch({
          type: SET_CHI_TIET_PHONG_VE,
          chiTietPhongVe: result.data.data,
        });
      }
    } catch (errors) {
      if (errors.response.status === 403) {
        alert("Vui lòng đăng nhập");
        localStorage.removeItem("USER_LOGIN");
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
      console.log("errors", errors.response?.data);
    }
  };
};

export const kiemTraDatVeAction = (thongTinDatVe = new DatVe()) => {
  return async (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await quanLyDatVeService.kiemTraDatVe(thongTinDatVe);
        if (result.status === 200) {
          console.log("result", result);
          resolve(result);
        }
      } catch (errors) {
        dispatch({
          type: "GHE_DA_DUOC_NGUOI_KHAC_DAT",
          gheKhongHopLe: errors.response?.data.gheKhongHopLe,
        });
        reject(errors.response?.data);
      }
    });
  };
};

export const datVeAction = (thongTinDatVe = new DatVe()) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "DISPLAY_LOADING" });
      const result = await quanLyDatVeService.datVe(thongTinDatVe);
      if (result.status === 200) {
        dispatch({
          type: SET_THONG_TIN_DAT_VE,
          thongTinDatVe: thongTinDatVe,
        });
        let danhSachGheVuaDat = thongTinDatVe.danhSachVe;
        danhSachGheVuaDat = JSON.stringify(danhSachGheVuaDat);

        await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu));
        await dispatch({ type: "HOAN_TAT_DAT_VE" });
        await dispatch({ type: "HIDE_LOADING" });

        let userLogin = getState().QuanLyNguoiDungReducer.userLogin;

        connection.invoke(
          "datVeThanhCong",
          userLogin.taiKhoan,
          danhSachGheVuaDat
        );
        dispatch({ type: CHUYEN_TRANG_KET_QUA_DAT_VE });
      }
    } catch (errors) {
      dispatch({ type: "HIDE_LOADING" });
      console.log("errors", errors.response?.data);
    }
  };
};

export const datGheAction = (ghe, maLichChieu) => {
  return async (dispatch, getState) => {
    dispatch({
      type: DAT_VE,
      gheDangChon: ghe,
    });
    let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;

    let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;
    let maLoaiNguoiDung =
      getState().QuanLyNguoiDungReducer.userLogin.maLoaiNguoiDung;
    danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);

    connection.invoke("datGhe", taiKhoan, maLoaiNguoiDung, danhSachGheDangDat);
  };
};

export const createPaymentLinkAction = (
  tongTien,
  orderId,
  id,
  thongTinDatVe
) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "DISPLAY_LOADING" });
      const response = await quanLyDatVeService.createPaymentLink({
        tongTien,
        orderId,
        id,
        thongTinDatVe,
      });
      localStorage.setItem("THONG_TIN_DAT_VE", JSON.stringify(thongTinDatVe));
      window.location.href = response.data.checkoutUrl;
      dispatch({ type: "HIDE_LOADING" });
    } catch (e) {
      dispatch({ type: "HIDE_LOADING" });
      console.log(e);
    }
  };
};

export const orderIdAction = () => {
  return async (dispatch) => {
    try {
      const response = await quanLyDatVeService.orderId();

      dispatch({ type: "ORDER_ID", orderId: response.data });
    } catch (e) {
      console.log(e);
    }
  };
};
