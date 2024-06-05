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
        navigate("/home");
      }
    } catch (error) {
      if (error.response.status === 404) {
        alert("Tài khoản không tồn tại");
      }
      if (error.response.status === 400) {
        alert("Mật khẩu không chính xác");
      }
      console.log("error", error.response.data);
    }
  };
};

export const dangKyAction = (thongTinDangKy, navigate) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangKy(thongTinDangKy);
      if (result) {
        alert("Đăng ký thành công");
        navigate("/login");
      }
    } catch (error) {
      if (error.response.status === 402) {
        alert("Username already exists");
      }
      if (error.response.status === 400) {
        alert("Passwords do not match");
      } else {
        console.log("error", error.response.data);
      }
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
      if (error.response.status === 403) {
        alert("Vui lòng đăng nhập");
        localStorage.removeItem("USER_LOGIN");
        localStorage.removeItem("accessToken");
      }
      console.log("error", error.response.data);
    }
  };
};

export const layThongTinAllNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layThongTinAllNguoiDung();
      if (result.status === 200) {
        // console.log("success", result);
        dispatch({
          type: "THONG_TIN_ALL_NGUOI_DUNG",
          danhSachNguoiDung: result.data,
        });
      }
    } catch (error) {
      console.log("error", error.response.data);
    }
  };
};

export const timKiemNguoiDungAction = (value) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.timKiemNguoiDung(value);
      // console.log("result", result);
      dispatch({
        type: "THONG_TIN_ALL_NGUOI_DUNG",
        danhSachNguoiDung: result.data.user,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const chiTietNguoiDungAction = (value) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.timKiemNguoiDung(value);
      // console.log("result", result);
      dispatch({
        type: "CHI_TIET_NGUOI_DUNG",
        detailUser: result.data.user[0],
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const capNhatThongTinNguoiDungAction = (values, navigate) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(
        values
      );
      if (result) {
        alert("Cập nhật thông tin người dùng thành công");
        dispatch(layThongTinAllNguoiDungAction());
        navigate("/admin/users");
      }
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const xoaUserAction = (value) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.xoaNguoiDung(value);
      console.log("result", result);
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const setVipAction = (value) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.setVip(value);
      console.log("result", result);
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const resetPasswordAction = (values, navigate) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.resetPassword(values);
      if (result) {
        alert("Đặt lại mật khẩu thành công");
        navigate("/login");
      }
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};
