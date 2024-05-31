import { DatVe } from "../models/DatVe.model";
import { baseService } from "./baseService";
import axios from "axios";

export class QuanLyDatVeService extends baseService {
  constructor() {
    super();
  }

  layChiTietPhongVe = (maLichChieu) => {
    return this.get(`api/phongve/get?MaLichChieu=${maLichChieu}`);
  };

  datVe = (thongTinDatVe = new DatVe()) => {
    return this.post(`api/phongve/datVe`, thongTinDatVe);
  };
  kiemTraDatVe = (thongTinDatVe = new DatVe()) => {
    return this.post(`api/phongve/kiemTraDatVe`, thongTinDatVe);
  };
  orderId = () => {
    return this.get(`api/phongve/orderid`);
  };
  createPaymentLink = (values) => {
    return this.post(`create-payment-link`, values);
  };
}

export const quanLyDatVeService = new QuanLyDatVeService();
