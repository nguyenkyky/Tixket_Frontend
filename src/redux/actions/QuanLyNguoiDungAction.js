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
      throw error;
    }
  };
};

export const dangXuatAction = (navigate) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "DANG_XUAT_ACTION",
      });
      navigate("/home");
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const dangKyAction = (thongTinDangKy, navigate) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangKy(thongTinDangKy);
      if (result) {
        return result;
      }
    } catch (errors) {
      throw errors;
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
      throw error;
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
    } catch (errors) {
      throw errors;
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
    } catch (errors) {
      throw errors;
    }
  };
};

export const capNhatThongTinAction = (values) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(
        values
      );
      if (result) {
        dispatch({
          type: "CAP_NHAT_THONG_TIN",
          payload: values,
        });
        return result;
      }
    } catch (errors) {
      console.log("errors", errors);
      throw errors;
    }
  };
};

export const kiemTraDangNhapAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.kiemTraDangNhap();
    } catch (error) {
      if (error.response.status === 403) {
        dispatch({
          type: "DANG_XUAT_ACTION",
        });
      }

      // console.log("error", error);
    }
  };
};

export const kiemTraAdminAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.kiemTraAdmin();
    } catch (error) {
      if (error.response.status === 403) {
        dispatch({
          type: "DANG_XUAT_ACTION",
        });
      }
      throw error;
    }
  };
};
