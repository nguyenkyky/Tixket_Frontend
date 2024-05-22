import { quanLyRapService } from "../../services/QuanLyRapService";
import { SET_HE_THONG_RAP_CHIEU } from "./types/QuanLyRapType";
import { SET_CHI_TIET_PHIM } from "./types/QuanLyRapType";

export const layDanhSachHeThongRapAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyRapService.layDanhSachHeThongRap();
      // console.log("heThongRapChieu", result);
      if (result.status === 200) {
        dispatch({
          type: SET_HE_THONG_RAP_CHIEU,
          heThongRapChieu: result.data.data,
        });
      }
    } catch (errros) {
      console.log("error", errros);
    }
  };
};

export const layThongTinChiTietPhim = (id) => {
  return async (dispatch) => {
    try {
      const result = await quanLyRapService.layThongTinLichChieuPhim(id);
      console.log("result", result);
      if (result.status === 200) {
        dispatch({
          type: SET_CHI_TIET_PHIM,
          filmDetail: result.data,
        });
      }
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};

export const layLichChieuTheoRapAction = (tenHeThongRap, maCumRap) => {
  return async (dispatch) => {
    try {
      const result = await quanLyRapService.layLichChieuTheoRap(
        tenHeThongRap,
        maCumRap
      );
      console.log("result", result);
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};
