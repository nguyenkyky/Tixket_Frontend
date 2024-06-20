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

  dangKy = (thongTinDangKy) => {
    return this.post("api/QuanLyNguoiDung/dangKy", thongTinDangKy);
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
  setVip = (values) => {
    return this.post(`api/QuanLyNguoiDung/setvip`, values);
  };
  recoverPassword = (values) => {
    return this.get(`api/QuanLyNguoiDung/recoverPassword?taiKhoan=${values}`);
  };
  resetPassword = (values) => {
    return this.post(`api/QuanLyNguoiDung/resetPassword`, values);
  };
  kiemTraDangNhap = () => {
    return this.post(`api/QuanLyNguoiDung/kiemTraDangNhap`);
  };
  kiemtraAdmin = () => {
    return this.post(`api/QuanLyNguoiDung/kiemTraAdmin`);
  };
  firebaseLogin = (token) => {
    return this.post(`api/QuanLyNguoiDung/firebaseLogin`, token);
  };
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
