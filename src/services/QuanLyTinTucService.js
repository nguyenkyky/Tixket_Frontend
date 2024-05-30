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

  addNews = (values) => {
    return this.post(`api/news/addnews`, values);
  };

  deleteNews = (values) => {
    return this.delete(`api/news/delete?maTinTuc=${values}`);
  };
  editNews = (values) => {
    return this.post(`api/news/editnews`, values);
  };
}

export const quanLyTinTucService = new QuanLyTinTucService();
