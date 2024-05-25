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

  layThongTinAllNguoiDung = () => {
    return this.get("api/QuanLyNguoiDung/all");
  };

  timKiemNguoiDung = (taiKhoan) => {
    return this.get(`api/QuanLyNguoiDung/find?taiKhoan=${taiKhoan}`);
  };

  xoaNguoiDung = (taiKhoan) => {
    return this.delete(`api/QuanLyNguoiDung/delete?taiKhoan=${taiKhoan}`);
  };
  capNhatThongTinNguoiDung = (values) => {
    return this.post(`api/QuanLyNguoiDung/update`, values);
  };
  doiMatKhau = (values) => {
    return this.post(`api/QuanLyNguoiDung/doiMatKhau`, values);
  };
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
