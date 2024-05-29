import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Switch,
  Select,
} from "antd";
import { quanLyRapService } from "../../../services/QuanLyRapService";
import { useFormik } from "formik";
import { capNhatThongTinCumRapAction } from "../../../redux/actions/QuanLyRapActions";
import moment from "moment";

function EditCumRap(props) {
  const navigate = useNavigate();
  const { maHeThongRap, maCumRap } = useParams();
  //   console.log(taiKhoan);
  const dispatch = useDispatch();

  const [heThongRap, setHeThongRap] = useState();
  const [cumRap, setCumRap] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const heThongRap = await quanLyRapService.layThongTinChiTietHeThongRap(
        maHeThongRap
      );
      const cumRap = await quanLyRapService.layThongTinChiTietCumRap(
        maHeThongRap,
        maCumRap
      );
      setHeThongRap(heThongRap.data.data);
      setCumRap(cumRap.data.data);
    };
    fetchData();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tenHeThongRap: heThongRap?.tenHeThongRap,
      maHeThongRap: heThongRap?.maHeThongRap,
      logo: heThongRap?.logo,
      tenCumRap: cumRap?.tenCumRap,
      maCumRap: cumRap?.maCumRap,
      newMaCumRap: cumRap?.maCumRap,
      diaChi: cumRap?.diaChi,
      hotline: cumRap?.hotline,
      hinhAnh: cumRap?.hinhAnh,
      khuVuc: cumRap?.khuVuc,
    },
    onSubmit: (values) => {
      console.log(values);
      const action = capNhatThongTinCumRapAction(values, navigate);
      dispatch(action);
    },
  });
  return (
    <div>
      <h3 className="text-3xl mb-5">Sửa thông tin cụm rạp</h3>

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
            <Form.Item label="Tên hệ thống rạp">
              <Input
                name="tenHeThongRap"
                onChange={formik.handleChange}
                value={formik.values.tenHeThongRap}
                disabled
              />
            </Form.Item>
            <Form.Item label="Mã hệ thống rạp">
              <Input
                name="newMaHeThongRap"
                onChange={formik.handleChange}
                value={formik.values.maHeThongRap}
                disabled
              />
            </Form.Item>

            <Form.Item label="Hình ảnh">
              <Input
                name="logo"
                onChange={formik.handleChange}
                value={formik.values.logo}
                disabled
              />
            </Form.Item>
            <Form.Item label="Tên cụm rạp">
              <Input
                name="tenCumRap"
                onChange={formik.handleChange}
                value={formik.values.tenCumRap}
              />
            </Form.Item>
          </div>
          <div className="w-full lg:w-1/2">
            <Form.Item label="Mã cụm rạp">
              <Input
                name="newMaCumRap"
                onChange={formik.handleChange}
                value={formik.values.newMaCumRap}
              />
            </Form.Item>
            <Form.Item label="Địa chỉ">
              <Input
                name="diaChi"
                onChange={formik.handleChange}
                value={formik.values.diaChi}
              />
            </Form.Item>
            <Form.Item label="Hotline">
              <Input
                name="hotline"
                onChange={formik.handleChange}
                value={formik.values.hotline}
              />
            </Form.Item>
            <Form.Item label="Hình ảnh">
              <Input
                name="hinhanh"
                onChange={formik.handleChange}
                value={formik.values.hinhAnh}
              />
            </Form.Item>
            <Form.Item label="Khu vực">
              <Select
                value={formik.values.khuVuc}
                name="khuVuc"
                onChange={(value) => formik.setFieldValue("khuVuc", value)}
              >
                <Select.Option value="Hà Nội">Hà Nội</Select.Option>
                <Select.Option value="TP.Hồ Chí Minh">
                  TP.Hồ Chí Minh
                </Select.Option>
              </Select>
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

export default EditCumRap;
