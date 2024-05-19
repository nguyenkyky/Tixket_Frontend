import { quanLyPhimService } from "../../services/QuanLyPhimService";
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
      console.log("errors", errors);
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
      alert("capNhatPhimAction thành công");
      dispatch(layDanhSachPhimAction());
      navigate("/admin/films");
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const xoaPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.xoaPhim(maPhim);

      dispatch(layDanhSachPhimAction());
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const timKiemPhimAction = (data) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.timKiemPhim(data);
      console.log("danh sach phim", result);
      dispatch({
        type: SET_DANH_SACH_PHIM,
        arrFilm: result.data.phim,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};
