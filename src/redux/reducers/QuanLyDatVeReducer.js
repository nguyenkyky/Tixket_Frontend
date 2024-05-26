import {
  SET_CHI_TIET_PHONG_VE,
  SET_THONG_TIN_DAT_VE,
  CHUYEN_TRANG_KET_QUA_DAT_VE,
} from "../actions/types/QuanLyDatVeType";
import { DAT_VE } from "../actions/types/QuanLyDatVeType";

const stateDefault = {
  chiTietPhongVe: {},
  danhSachGheDangDat: [],
  thongTinVeVuaDat: {},
  tabActive: 1,
  danhSachGheKhachDangDat: [],
  gheDaDuocNguoiKhacDat: [],
};

export const QuanLyDatVeReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SET_CHI_TIET_PHONG_VE: {
      state.chiTietPhongVe = action.chiTietPhongVe;
      return { ...state };
    }

    case DAT_VE: {
      let danhSachGhe = [...state.danhSachGheDangDat];
      let id = danhSachGhe.findIndex(
        (ghe) => ghe.maGhe === action.gheDangChon.maGhe
      );

      if (id !== -1) {
        danhSachGhe.splice(id, 1);
      } else {
        danhSachGhe.push(action.gheDangChon);
      }
      return { ...state, danhSachGheDangDat: danhSachGhe };
    }

    case "HOAN_TAT_DAT_VE": {
      state.danhSachGheDangDat = [];
      return { ...state };
    }
    case SET_THONG_TIN_DAT_VE: {
      state.thongTinVeVuaDat = action.thongTinDatVe;
      return { ...state };
    }
    case CHUYEN_TRANG_KET_QUA_DAT_VE: {
      state.tabActive = 2;
      return { ...state };
    }
    case "RELOAD_CHECKOUT": {
      state.tabActive = 1;
      return { ...state };
    }

    case "DAT_GHE": {
      state.danhSachGheKhachDangDat = action.arrGheKhachDangDat;
      return { ...state };
    }

    case "GHE_DA_DUOC_NGUOI_KHAC_DAT": {
      state.gheDaDuocNguoiKhacDat = action.gheKhongHopLe;
      return { ...state };
    }

    case "LOAI_BO_GHE_KHONG_HOP_LE": {
      const gheKhongHopLe = action.gheKhongHopLe;
      const danhSachGheDangDat = state.danhSachGheDangDat.filter(
        (ghe) => !gheKhongHopLe.includes(ghe.maGhe)
      );
      return { ...state, danhSachGheDangDat };
    }

    default:
      return { ...state };
  }
};
