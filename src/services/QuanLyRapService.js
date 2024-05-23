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
  layThongTinChiTietHeThongRap = (maHeThongRap) => {
    return this.get(
      `api/hethongrap/chitiethethongrap?maHeThongRap=${maHeThongRap}`
    );
  };
  capNhatThongTinHeThongRap = (values) => {
    return this.put(`api/hethongrap/update/hethongrap`, values);
  };
  layThongTinChiTietCumRap = (maHeThongRap, maCumRap) => {
    return this.get(
      `api/hethongrap/chitietcumrap?maHeThongRap=${maHeThongRap}&maCumRap=${maCumRap}`
    );
  };
  capNhatThongTinCumRap = (values) => {
    return this.put(`api/hethongrap/update/cumrap`, values);
  };
  addHeThongRap = (values) => {
    return this.post(`api/hethongrap/newhethongrap`, values);
  };
  addCumRap = (values) => {
    return this.post(`api/hethongrap/newcumrap`, values);
  };
  deleteHeThongRap = (maHeThongRap) => {
    return this.delete(
      `api/hethongrap/deletehethongrap?maHeThongRap=${maHeThongRap}`
    );
  };
  deleteCumRap = (maCumRap) => {
    return this.delete(`api/hethongrap/deletecumrap?maCumRap=${maCumRap}`);
  };
}

export const quanLyRapService = new QuanLyRapService();
