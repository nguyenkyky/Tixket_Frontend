import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  chiTietNguoiDungAction,
  capNhatThongTinNguoiDungAction,
} from "../../../redux/actions/QuanLyNguoiDungAction";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, InputNumber, Switch } from "antd";
import { useFormik } from "formik";
import moment from "moment";

function EditUser(props) {
  const { detailUser } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const navigate = useNavigate();
  const { taiKhoan } = useParams();
  //   console.log(taiKhoan);
  const dispatch = useDispatch();
  useEffect(() => {
    const action = chiTietNguoiDungAction(taiKhoan);
    dispatch(action);
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      newTaiKhoan: detailUser.taiKhoan,
      taiKhoan: detailUser.taiKhoan,
      email: detailUser.email,
      soDT: detailUser.soDT,
      avatar: detailUser.avatar,
      maLoaiNguoiDung: detailUser.maLoaiNguoiDung,
      hoTen: detailUser.hoTen,
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(capNhatThongTinNguoiDungAction(values, navigate));
    },
  });
  return (
    <div>
      <h3 className="text-3xl mb-5">Sửa thông tin người dùng</h3>

      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/2">
            <Form.Item label="Username">
              <Input
                name="newTaiKhoan"
                onChange={formik.handleChange}
                value={formik.values.newTaiKhoan}
                disabled
              />
            </Form.Item>
            <Form.Item label="Họ tên">
              <Input
                name="hoTen"
                onChange={formik.handleChange}
                value={formik.values.hoTen}
              />
            </Form.Item>

            <Form.Item label="email">
              <Input
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </Form.Item>
            <Form.Item label="Lịch sử đặt vé">
              <NavLink to={`/admin/users/orders/history/${taiKhoan}`}>
                <Button className="bg-blue-300 text-white">Xem chi tiết</Button>
              </NavLink>
            </Form.Item>
          </div>
          <div className="w-full lg:w-1/2">
            <Form.Item label="Số điện thoại">
              <Input
                name="soDT"
                onChange={formik.handleChange}
                value={formik.values.soDT}
              />
            </Form.Item>
            <Form.Item label="avatar">
              <Input
                name="avatar"
                onChange={formik.handleChange}
                value={formik.values.avatar}
              />
            </Form.Item>
            <Form.Item label="Loại Khách Hàng">
              <Input
                name="maLoaiNguoiDung"
                onChange={formik.handleChange}
                value={formik.values.maLoaiNguoiDung}
                disabled
              />
            </Form.Item>
          </div>
        </div>

        <button type="submit" className="bg-blue-400 text-white p-2">
          Hoàn tất
        </button>
      </Form>
    </div>
  );
}

export default EditUser;
