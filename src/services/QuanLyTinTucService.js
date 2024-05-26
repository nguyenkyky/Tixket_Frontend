import { baseService } from "./baseService";
import axios from "axios";

export class QuanLyTinTucService extends baseService {
  constructor() {
    super();
  }
  getData = (id) => {
    return this.get(`api/news/getData?id=${id}`);
  };
}

export const quanLyTinTucService = new QuanLyTinTucService();
