const stateDefault = {
  arrFilm: [],
  dangChieu: false,
  sapChieu: false,
  arrFilmDefault: [],
  filmDetail: {},
  thongTinPhim: {},
  arrShowTimes: [],
  theLoaiPhimHienTai: null,
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

    case "SET_PHIM_DEFAULT": {
      return {
        ...state,
        arrFilm: state.arrFilmDefault,
        dangChieu: false,
        sapChieu: false,
        theLoaiPhimHienTai: null,
      };
    }
    case "SET_THE_LOAI_PHIM": {
      if (state.theLoaiPhimHienTai === action.payload) {
        // Nếu thể loại hiện tại đã được chọn, đặt lại danh sách phim
        return {
          ...state,
          arrFilm: state.arrFilmDefault,
          theLoaiPhimHienTai: null, // Đặt lại thể loại hiện tại
        };
      } else {
        // Nếu thể loại mới được chọn, lọc danh sách phim theo thể loại
        const updatedArrFilm = state.arrFilmDefault.filter((film) =>
          film.theLoai.includes(action.payload)
        );
        return {
          ...state,
          arrFilm: updatedArrFilm,
          theLoaiPhimHienTai: action.payload, // Cập nhật thể loại hiện tại
        };
      }
    }
    case "SET_CHI_TIET_PHIM": {
      state.filmDetail = action.filmDetail;
      return { ...state };
    }

    case "SET_THONG_TIN_PHIM": {
      state.thongTinPhim = action.thongTinPhim;

      return { ...state };
    }

    case "SET_ALL_SHOWTIMES": {
      state.arrShowTimes = action.arrShowTimes;
      return { ...state };
    }

    case "DELETE_SHOWTIME": {
      return {
        ...state,
        arrShowTimes: state.arrShowTimes.filter(
          (showtime) => showtime.maLichChieu !== action.payload
        ),
      };
    }
    default:
      return { ...state };
  }
};
