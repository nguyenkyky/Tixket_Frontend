import { baseService } from "./baseService";
import axios from "axios";

export class QuanLyRapService extends baseService {
  constructor() {
    super();
  }

  layDanhSachHeThongRap = () => {
    return this.get(`api/lichchieuphim/all`);
  };

  layThongTinLichChieuPhim = (maPhim) => {
    return this.get(`api/details/get?MaPhim=${maPhim}`);
  };
  layThongTinHeThongRap = () => {
    return this.get(`api/lichchieuphim/allhethongRap`);
  };
  layThongTinCumRap = (tenHeThongRap) => {
    return this.get(`api/lichchieuphim/cumrap?tenHeThongRap=${tenHeThongRap}`);
  };
  layLichChieuTheoRap = (tenHeThongRap, maCumRap) => {
    return this.get(
      `api/lichchieuphim/lichchieu?tenHeThongRap=${tenHeThongRap}&maCumRap=${maCumRap}`
    );
  };
}

export const quanLyRapService = new QuanLyRapService();
