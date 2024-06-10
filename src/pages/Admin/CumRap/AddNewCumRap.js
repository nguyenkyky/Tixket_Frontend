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
import {
  addCumRapAction,
  layDanhSachHeThongRapAction,
} from "../../../redux/actions/QuanLyRapActions";
import moment from "moment";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";

function AddNewCumRap(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { maHeThongRap } = useParams();
  const tenHeThongRap = localStorage.getItem("tenHeThongRap");
  useEffect(() => {}, []);

  const validationSchema = Yup.object({
    khuVuc: Yup.string().required("Hệ thống rạp là bắt buộc"),
    tenCumRap: Yup.string().required("Mã hệ thống rạp là bắt buộc"),
    maCumRap: Yup.string().required("Mã cụm rạp là bắt buộc"),
    diaChi: Yup.string().required("Địa chỉ là bắt buộc"),
    map: Yup.string().required("Map là bắt buộc"),
    hotline: Yup.string().required("Hotline là bắt buộc"),
    hinhAnh: Yup.string().required("Hình ảnh là bắt buộc"),
  });

  const [bannerList, setBannerList] = useState([{ banner: "" }]);

  const addBanner = () => {
    setBannerList([...bannerList, { banner: "" }]);
  };

  const removeBanner = (index) => {
    const list = [...bannerList];
    list.splice(index, 1);
    setBannerList(list);
    const bannerLink = list.map((banner) => banner.name);
    formik.setFieldValue("banner", bannerLink);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maHeThongRap: maHeThongRap,
      khuVuc: "",
      tenCumRap: "",
      maCumRap: "",
      diaChi: "",
      hotline: "",
      hinhAnh: "",
      map: "",
      banner: [],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values);
        const action = addCumRapAction(values, navigate);
        await dispatch(action);
        toast.success("Thêm cụm rạp thành công", {
          position: "top-center",
          onClose: () => {
            navigate("/admin/cumrap");
          },
        });
        dispatch(layDanhSachHeThongRapAction());
      } catch (errors) {
        console.log("errors", errors);
      }
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
              <Form.Item
                label="Khu vực *"
                validateStatus={
                  formik.errors.khuVuc && formik.touched.khuVuc ? "error" : ""
                }
              >
                <Select
                  name="khuVuc"
                  onChange={(value) => formik.setFieldValue("khuVuc", value)}
                >
                  <Select.Option value="Hà Nội">Hà Nội</Select.Option>
                  <Select.Option value="TP.Hồ Chí Minh">
                    TP.Hồ Chí Minh
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Tên cụm rạp *"
                validateStatus={
                  formik.errors.tenCumRap && formik.touched.tenCumRap
                    ? "error"
                    : ""
                }
              >
                <Input name="tenCumRap" onChange={formik.handleChange} />
              </Form.Item>
              <Form.Item
                label="Mã cụm rạp *"
                validateStatus={
                  formik.errors.maCumRap && formik.touched.maCumRap
                    ? "error"
                    : ""
                }
              >
                <Input name="maCumRap" onChange={formik.handleChange} />
              </Form.Item>
              <Form.Item
                label="Địa chỉ *"
                validateStatus={
                  formik.errors.diaChi && formik.touched.diaChi ? "error" : ""
                }
              >
                <Input name="diaChi" onChange={formik.handleChange} />
              </Form.Item>
              <Form.Item
                label="Map *"
                validateStatus={
                  formik.errors.map && formik.touched.map ? "error" : ""
                }
              >
                <Input name="map" onChange={formik.handleChange} />
              </Form.Item>
              <Form.Item
                label="Hotline *"
                validateStatus={
                  formik.errors.hotline && formik.touched.hotline ? "error" : ""
                }
              >
                <Input name="hotline" onChange={formik.handleChange} />
              </Form.Item>
              <Form.Item
                label="Hình ảnh *"
                validateStatus={
                  formik.errors.hinhAnh && formik.touched.hinhAnh ? "error" : ""
                }
              >
                <Input name="hinhAnh" onChange={formik.handleChange} />
              </Form.Item>
              {bannerList.map((banner, index) => (
                <Form.Item label={`Banner ${index + 1}`} key={index}>
                  <Input
                    value={banner.name}
                    onChange={(e) => {
                      const list = [...bannerList];
                      list[index].name = e.target.value;
                      setBannerList(list);
                      const bannerLink = bannerList.map(
                        (banner) => banner.name
                      );
                      formik.setFieldValue("banner", bannerLink);
                    }}
                  />

                  {bannerList.length > 1 && (
                    <MinusCircleOutlined
                      onClick={() => removeBanner(index)}
                      style={{ color: "red", marginLeft: "10px" }}
                    />
                  )}
                </Form.Item>
              ))}
              <Form.Item style={{ marginLeft: "136px" }}>
                <Button
                  type="dashed"
                  onClick={addBanner}
                  style={{ width: "60%" }}
                >
                  <PlusOutlined /> Thêm Banner
                </Button>
              </Form.Item>
            </div>
          </div>
          <button type="submit" className="bg-blue-400 text-white p-2">
            Hoàn tất
          </button>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddNewCumRap;
