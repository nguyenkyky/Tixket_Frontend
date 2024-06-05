import { quanLyThongKeService } from "../../services/QuanLyThongKeService";

export const thongKeTheoThangAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyThongKeService.thongKeTheoThang();
      if (result) {
        dispatch({
          type: "THONG_KE_THEO_THANG",
          thongKeTheoThang: result.data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const thongKeThangTruocAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyThongKeService.thongKeThangTruoc();
      if (result) {
        dispatch({
          type: "THONG_KE_THANG_TRUOC",
          thongKeThangTruoc: result.data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const syncDataAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "DISPLAY_LOADING" });
      const result = await quanLyThongKeService.layDuLieuThongKeMoi();
      if (result) {
        dispatch({
          type: "THONG_KE_THEO_THANG",
          thongKeTheoThang: result.data,
        });
      }
      dispatch({ type: "HIDE_LOADING" });
    } catch (err) {
      dispatch({ type: "HIDE_LOADING" });
      console.log(err);
    }
  };
};

export const thongKe7NgayAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "DISPLAY_LOADING" });
      const result = await quanLyThongKeService.thongKe7Ngay();
      if (result) {
        // console.log(result.data);
        dispatch({
          type: "THONG_KE_7_NGAY",
          payload: result.data,
        });
      }
      dispatch({ type: "HIDE_LOADING" });
    } catch (err) {
      dispatch({ type: "HIDE_LOADING" });
      console.log(err);
    }
  };
};
