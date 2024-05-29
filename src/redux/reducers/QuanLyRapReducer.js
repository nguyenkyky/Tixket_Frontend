import { SET_HE_THONG_RAP_CHIEU } from "../actions/types/QuanLyRapType";

const stateDefault = {
  heThongRapChieu: [],
  cumRapTheoKhuVuc: [],
};

export const QuanLyRapReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SET_HE_THONG_RAP_CHIEU: {
      state.heThongRapChieu = action.heThongRapChieu;
      return { ...state };
    }

    case "SET_CUM_RAP_THEO_KHU_VUC": {
      state.cumRapTheoKhuVuc = action.payload;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
