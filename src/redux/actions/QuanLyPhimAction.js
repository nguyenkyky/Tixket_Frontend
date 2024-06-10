import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { layThongTinChiTietPhim } from "./QuanLyRapActions";
import { SET_DANH_SACH_PHIM } from "./types/QuanLyPhimType";

export const layDanhSachPhimAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layDanhSachPhim();
      // console.log("danh sach phim", result);
      dispatch({
        type: SET_DANH_SACH_PHIM,
        arrFilm: result.data.data,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const themPhimAction = (data) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.themPhim(data);
    } catch (errors) {
      throw errors;
    }
  };
};

export const layThongTinPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layThongTinPhim(maPhim);
      dispatch({
        type: "SET_THONG_TIN_PHIM",
        thongTinPhim: result.data,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const capNhatPhimAction = (data, navigate) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.capNhatPhim(data);
    } catch (errors) {
      throw errors;
    }
  };
};

export const xoaPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.xoaPhim(maPhim);
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const timKiemPhimAction = (data) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.timKiemPhim(data);
      // console.log("danh sach phim", result);
      dispatch({
        type: SET_DANH_SACH_PHIM,
        arrFilm: result.data.phim,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const getAllShowTimesAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.getAllShowTimes();
      // console.log("danh sach lich chieu", result);
      dispatch({
        type: "SET_ALL_SHOWTIMES",
        arrShowTimes: result.data,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const deleteShowtimeAction = (maLichChieu) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.xoaLichChieuPhim(maLichChieu);
      dispatch({
        type: "DELETE_SHOWTIME",
        payload: maLichChieu,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const ratingAction = (value, navigate) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.rating(value);
      dispatch(layThongTinChiTietPhim(value.maPhim));
    } catch (errors) {
      throw errors;
    }
  };
};
