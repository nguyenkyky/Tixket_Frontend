import { baseService } from "./baseService";
import axios from "axios";

export class QuanLyThongKeService extends baseService {
  constructor() {
    super();
  }
  layDuLieuThongKeMoi = () => {
    return this.get(`api/thongke/laydulieuthongkemoi`);
  };
  thongKeTheoThang = () => {
    return this.get(`api/thongke/thongketheothang`);
  };
  thongKeThangTruoc = () => {
    return this.get(`api/thongke/thongkethangtruoc`);
  };
}

export const quanLyThongKeService = new QuanLyThongKeService();
