const stateDefault = {
  thongKeTheoThang: {},
  thongKeThangTruoc: {},
  thongKe7Ngay: [],
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
    case "THONG_KE_7_NGAY": {
      state.thongKe7Ngay = action.payload;
      return { ...state };
    }

    default: {
      return { ...state };
    }
  }
};
