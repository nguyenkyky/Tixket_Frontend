const stateDefault = {
  thongKeTheoThang: {},
  thongKeThangTruoc: {},
};

export const ThongKeReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "THONG_KE_THEO_THANG": {
      state.thongKeTheoThang = action.thongKeTheoThang;
      return { ...state };
    }
    case "THONG_KE_THANG_TRUOC": {
      state.thongKeThangTruoc = action.thongKeThangTruoc;
      return { ...state };
    }

    default: {
      return { ...state };
    }
  }
};
