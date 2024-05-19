import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDung";
import {
  DANG_NHAP_ACTION,
  THONG_TIN_DAT_VE,
} from "./types/QuanLyNguoiDungType";

export const dangNhapAction = (thongTinDangNhap, navigate) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
      if (result.status === 200) {
        dispatch({
          type: DANG_NHAP_ACTION,
          thongTinDangNhap: result.data,
        });
        navigate(-1);
      }
    } catch (error) {
      console.log("error", error.response.data);
    }
  };
};

export const layThongTinDatVe = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layThongTinDatVe();
      if (result.status === 200) {
        // console.log("success", result);
        dispatch({
          type: THONG_TIN_DAT_VE,
          thongTinDatVe: result.data,
        });
      }
    } catch (error) {
      console.log("error", error.response.data);
    }
  };
};
