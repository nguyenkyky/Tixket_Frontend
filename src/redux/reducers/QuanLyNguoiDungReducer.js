import { USER_LOGIN, TOKEN } from "../../util/settings/config";
import {
  DANG_NHAP_ACTION,
  THONG_TIN_DAT_VE,
} from "../actions/types/QuanLyNguoiDungType";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
  userLogin: user,
  thongTinDatVe: {},
  danhSachNguoiDung: [],
  detailUser: {},
};

export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case DANG_NHAP_ACTION: {
      const { thongTinDangNhap } = action;
      localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
      localStorage.setItem(TOKEN, thongTinDangNhap.accessToken);
      // localStorage.removeItem("accessToken");
      setTimeout(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("USER_LOGIN");

        console.log("Token has been removed");
      }, 10800000);
      return { ...state, userLogin: thongTinDangNhap };
    }

    case "DANG_XUAT_ACTION": {
      localStorage.clear();
      return { ...state };
    }

    case THONG_TIN_DAT_VE: {
      state.thongTinDatVe = action.thongTinDatVe;
      return { ...state };
    }

    case "THONG_TIN_ALL_NGUOI_DUNG": {
      state.danhSachNguoiDung = action.danhSachNguoiDung;
      return { ...state };
    }

    case "CHI_TIET_NGUOI_DUNG": {
      state.detailUser = action.detailUser;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
