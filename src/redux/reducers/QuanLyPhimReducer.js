const stateDefault = {
  arrFilm: [],
  dangChieu: false,
  sapChieu: false,
  arrFilmDefault: [],
  filmDetail: {},
  thongTinPhim: {},
};

export const QuanLyPhimReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "SET_DANH_SACH_PHIM": {
      state.arrFilm = action.arrFilm;
      state.arrFilmDefault = state.arrFilm;
      return { ...state };
    }

    case "SET_PHIM_DANG_CHIEU": {
      const updatedArrFilm = state.arrFilmDefault.filter(
        (film) => film.dangChieu
      );
      return {
        ...state,
        arrFilm: updatedArrFilm,
        dangChieu: true,
        sapChieu: false, // Cập nhật trạng thái để chỉ hiển thị phim đang chiếu
      };
    }

    case "SET_PHIM_SAP_CHIEU": {
      const updatedArrFilm = state.arrFilmDefault.filter(
        (film) => film.sapChieu
      );
      return {
        ...state,
        arrFilm: updatedArrFilm,
        dangChieu: false,
        sapChieu: true, // Cập nhật trạng thái để chỉ hiển thị phim sắp chiếu
      };
    }

    case "SET_CHI_TIET_PHIM": {
      state.filmDetail = action.filmDetail;
      return { ...state };
    }

    case "SET_THONG_TIN_PHIM": {
      state.thongTinPhim = action.thongTinPhim;

      return { ...state };
    }
    default:
      return { ...state };
  }
};
