import { baseService } from "./baseService";
import axios from "axios";

export class QuanLyPhimService extends baseService {
  constructor() {
    super();
  }

  layDanhSachBanner = () => {
    return this.getBanner(`banner/all`);
  };
  saveDanhSachBanner = (data) => {
    return this.post(`banner/post`, data);
  };

  layDanhSachPhim = () => {
    return this.get(`api/phim/all`);
  };

  themPhim = (data) => {
    return this.post(`api/phim/addnew`, data);
  };

  layThongTinPhim = (maPhim) => {
    return this.get(`api/phim/get?MaPhim=${maPhim}`);
  };

  capNhatPhim = (data) => {
    return this.post(`api/phim/update`, data);
  };

  xoaPhim = (maPhim) => {
    return this.delete(`api/phim/delete?MaPhim=${maPhim}`);
  };
  timKiemPhim = (data) => {
    return this.get(`api/phim/find?data=${data}`);
  };

  taoLichChieuPhim = (thongTinLichChieu) => {
    return this.post(`api/lichchieuphim/post`, thongTinLichChieu);
  };
  xoaLichChieuPhim = (maLichChieu) => {
    return this.delete(`api/lichchieuphim/delete?maLichChieu=${maLichChieu}`);
  };

  getAllShowTimes = () => {
    return this.get(`api/lichchieuphim/allshowtimes`);
  };
}

export const quanLyPhimService = new QuanLyPhimService();
