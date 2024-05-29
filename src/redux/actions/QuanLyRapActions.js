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

export const capNhatThongTinHeThongRapAction = (values, navigate) => {
  return async (dispatch) => {
    try {
      const result = await quanLyRapService.capNhatThongTinHeThongRap(values);
      alert("Cập nhật thông tin hệ thống rạp thành công");
      dispatch(layDanhSachHeThongRapAction());
      navigate("/admin/cumrap");
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const capNhatThongTinCumRapAction = (values, navigate) => {
  return async (dispatch) => {
    try {
      const result = await quanLyRapService.capNhatThongTinCumRap(values);
      if (result) {
        alert("Cập nhật thông tin cụm rạp thành công");
        dispatch(layDanhSachHeThongRapAction());
        navigate("/admin/cumrap");
      }
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const addHeThongRapAction = (values, navigate) => {
  return async (dispatch) => {
    try {
      const result = await quanLyRapService.addHeThongRap(values);
      if (result) {
        alert("Thêm mới hệ thống rạp thành công");
        dispatch(layDanhSachHeThongRapAction());
        navigate("/admin/cumrap");
      }
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const addCumRapAction = (values, navigate) => {
  return async (dispatch) => {
    try {
      const result = await quanLyRapService.addCumRap(values);
      if (result) {
        alert("Thêm mới cụm rạp thành công");
        dispatch(layDanhSachHeThongRapAction());
        navigate("/admin/cumrap");
      }
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const deleteHeThongRapAction = (maHeThongRap) => {
  return async (dispatch) => {
    try {
      const result = await quanLyRapService.deleteHeThongRap(maHeThongRap);
      if (result) {
        dispatch(layDanhSachHeThongRapAction());
      }
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const deleteCumRapAction = (maCumRap) => {
  return async (dispatch) => {
    try {
      const result = await quanLyRapService.deleteCumRap(maCumRap);
      if (result) {
        dispatch(layDanhSachHeThongRapAction());
      }
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const cumRapTheoKhuVucAction = (location, theater) => {
  return async (dispatch) => {
    try {
      const result = await quanLyRapService.layCumRapTheoKhuVuc(
        location,
        theater
      );

      if (result) {
        dispatch({
          type: "SET_CUM_RAP_THEO_KHU_VUC",
          payload: result.data.data,
        });
      }
    } catch (errors) {
      dispatch({
        type: "SET_CUM_RAP_THEO_KHU_VUC",
        payload: [],
      });
      console.log("errors", errors);
    }
  };
};
