import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, InputNumber, Switch } from "antd";
import { quanLyRapService } from "../../../services/QuanLyRapService";
import { useFormik } from "formik";
import { capNhatThongTinHeThongRapAction } from "../../../redux/actions/QuanLyRapActions";
import moment from "moment";
import * as Yup from "yup";

function EditHeThongRap(props) {
  const navigate = useNavigate();
  const { maHeThongRap } = useParams();
  //   console.log(taiKhoan);
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    tenHeThongRap: Yup.string().required("Hệ thống rạp là bắt buộc"),
    maHeThongRap: Yup.string().required("Mã hệ thống rạp là bắt buộc"),
    logo: Yup.string().required("Hình ảnh là bắt buộc"),
  });

  const [heThongRap, setHeThongRap] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await quanLyRapService.layThongTinChiTietHeThongRap(
        maHeThongRap
      );
      setHeThongRap(result.data.data);
    };
    fetchData();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tenHeThongRap: heThongRap?.tenHeThongRap,
      maHeThongRap: heThongRap?.maHeThongRap,
      newMaHeThongRap: heThongRap?.maHeThongRap,
      logo: heThongRap?.logo,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      const action = capNhatThongTinHeThongRapAction(values, navigate);
      dispatch(action);
    },
  });
  return (
    <div>
      <h3 className="text-3xl mb-5">Sửa thông tin hệ thống rạp</h3>

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
            <Form.Item
              label="Tên hệ thống rạp *"
              validateStatus={
                formik.errors.tenHeThongRap && formik.touched.tenHeThongRap
                  ? "error"
                  : ""
              }
            >
              <Input
                name="tenHeThongRap"
                onChange={formik.handleChange}
                value={formik.values.tenHeThongRap}
              />
            </Form.Item>
            <Form.Item
              label="Mã hệ thống rạp *"
              validateStatus={
                formik.errors.maHeThongRap && formik.touched.maHeThongRap
                  ? "error"
                  : ""
              }
            >
              <Input
                name="newMaHeThongRap"
                onChange={formik.handleChange}
                value={formik.values.newMaHeThongRap}
              />
            </Form.Item>

            <Form.Item
              label="Hình ảnh *"
              validateStatus={
                formik.errors.logo && formik.touched.logo ? "error" : ""
              }
            >
              <Input
                name="logo"
                onChange={formik.handleChange}
                value={formik.values.logo}
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

export default EditHeThongRap;
