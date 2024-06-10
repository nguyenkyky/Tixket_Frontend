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
  capNhatThongTinCumRapAction,
  layDanhSachHeThongRapAction,
} from "../../../redux/actions/QuanLyRapActions";
import moment from "moment";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";

function EditCumRap(props) {
  const navigate = useNavigate();
  const { maHeThongRap, maCumRap } = useParams();
  //   console.log(taiKhoan);
  const dispatch = useDispatch();

  const [heThongRap, setHeThongRap] = useState();
  const [cumRap, setCumRap] = useState();

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

  useEffect(() => {
    if (Array.isArray(cumRap?.banner)) {
      setBannerList(cumRap.banner.map((banner) => ({ name: banner })));
    }
  }, [cumRap]);

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
      map: cumRap?.map,
      banner: cumRap?.banner,
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      try {
        console.log(values);
        const action = capNhatThongTinCumRapAction(values, navigate);
        await dispatch(action);
        toast.success("Cập nhật thông tin cụm rạp thành công", {
          position: "top-center",
          onClose: () => {
            dispatch(layDanhSachHeThongRapAction());
            navigate("/admin/cumrap");
          },
        });
      } catch (error) {
        console.log(error);
      }
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
            <Form.Item
              label="Tên cụm rạp *"
              validateStatus={
                formik.errors.tenCumRap && formik.touched.tenCumRap
                  ? "error"
                  : ""
              }
            >
              <Input
                name="tenCumRap"
                onChange={formik.handleChange}
                value={formik.values.tenCumRap}
              />
            </Form.Item>
          </div>
          <div className="w-full lg:w-1/2">
            <Form.Item
              label="Mã cụm rạp *"
              validateStatus={
                formik.errors.maCumRap && formik.touched.maCumRap ? "error" : ""
              }
            >
              <Input
                name="newMaCumRap"
                onChange={formik.handleChange}
                value={formik.values.newMaCumRap}
              />
            </Form.Item>
            <Form.Item
              label="Địa chỉ *"
              validateStatus={
                formik.errors.diaChi && formik.touched.diaChi ? "error" : ""
              }
            >
              <Input
                name="diaChi"
                onChange={formik.handleChange}
                value={formik.values.diaChi}
              />
            </Form.Item>
            <Form.Item
              label="Map *"
              validateStatus={
                formik.errors.map && formik.touched.map ? "error" : ""
              }
            >
              <Input
                name="map"
                onChange={formik.handleChange}
                value={formik.values.map}
              />
            </Form.Item>
            <Form.Item
              label="Hotline *"
              validateStatus={
                formik.errors.hotline && formik.touched.hotline ? "error" : ""
              }
            >
              <Input
                name="hotline"
                onChange={formik.handleChange}
                value={formik.values.hotline}
              />
            </Form.Item>
            <Form.Item
              label="Hình ảnh *"
              validateStatus={
                formik.errors.hinhAnh && formik.touched.hinhAnh ? "error" : ""
              }
            >
              <Input
                name="hinhAnh"
                onChange={formik.handleChange}
                value={formik.values.hinhAnh}
              />
            </Form.Item>
            {bannerList.map((banner, index) => (
              <Form.Item label={`Banner ${index + 1}`} key={index}>
                <Input
                  value={banner.name}
                  onChange={(e) => {
                    const list = [...bannerList];
                    list[index].name = e.target.value;
                    setBannerList(list);
                    const bannerLink = bannerList.map((banner) => banner.name);
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
            <Form.Item
              label="Khu vực *"
              validateStatus={
                formik.errors.khuVuc && formik.touched.khuVuc ? "error" : ""
              }
            >
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
      <ToastContainer />
    </div>
  );
}

export default EditCumRap;
