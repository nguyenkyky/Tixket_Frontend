import { baseService } from "./baseService";
import axios from "axios";

export class QuanLyTinTucService extends baseService {
  constructor() {
    super();
  }
  getData = (id) => {
    return this.get(`api/news/getData?id=${id}`);
  };
  getAll = () => {
    return this.get(`api/news/getAll`);
  };
}

export const quanLyTinTucService = new QuanLyTinTucService();
