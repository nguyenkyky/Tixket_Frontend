import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, InputNumber, Switch } from "antd";
import { quanLyRapService } from "../../../services/QuanLyRapService";
import { useFormik } from "formik";
import { addCumRapAction } from "../../../redux/actions/QuanLyRapActions";
import moment from "moment";

function AddNewCumRap(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { maHeThongRap } = useParams();
  const tenHeThongRap = localStorage.getItem("tenHeThongRap");
  useEffect(() => {}, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maHeThongRap: maHeThongRap,
      tenCumRap: "",
      maCumRap: "",
      diaChi: "",
      hinhAnh: "",
    },
    onSubmit: (values) => {
      console.log(values);
      const action = addCumRapAction(values, navigate);
      dispatch(action);
    },
  });
  return (
    <div>
      <div className="flex justify-center mb-4">
        <h3 className="text-3xl mb-5">{`Thêm cụm rạp mới cho ${tenHeThongRap}`}</h3>
      </div>
      <div className="">
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
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-1/2">
              <Form.Item label="Tên hệ thống rạp">
                <Input
                  name="tenCumRap"
                  onChange={formik.handleChange}
                  value={tenHeThongRap}
                  disabled
                />
              </Form.Item>
              <Form.Item label="Tên cụm rạp">
                <Input name="tenCumRap" onChange={formik.handleChange} />
              </Form.Item>
              <Form.Item label="Mã cụm rạp">
                <Input name="maCumRap" onChange={formik.handleChange} />
              </Form.Item>
              <Form.Item label="Địa chỉ">
                <Input name="diaChi" onChange={formik.handleChange} />
              </Form.Item>
              <Form.Item label="Hình ảnh">
                <Input name="hinhAnh" onChange={formik.handleChange} />
              </Form.Item>
            </div>
          </div>
          <button type="submit" className="bg-blue-400 text-white p-2">
            Hoàn tất
          </button>
        </Form>
      </div>
    </div>
  );
}

export default AddNewCumRap;
