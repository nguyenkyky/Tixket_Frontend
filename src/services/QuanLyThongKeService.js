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
  thongKe7Ngay = () => {
    return this.get(`api/thongke/thongke7ngay`);
  };
}

export const quanLyThongKeService = new QuanLyThongKeService();
