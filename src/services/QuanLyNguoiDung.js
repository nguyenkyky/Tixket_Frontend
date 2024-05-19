import { baseService } from "./baseService";
import axios from "axios";

export class QuanLyNguoiDungService extends baseService {
  constructor() {
    super();
  }

  dangNhap = (thongTinDangNhap) => {
    // console.log("dangNhap", thongTinDangNhap);
    return this.post("api/QuanLyNguoiDung/dangNhap", thongTinDangNhap);
  };

  layThongTinDatVe = () => {
    return this.get("api/QuanLyNguoiDung/thongTinDatVe");
  };
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
