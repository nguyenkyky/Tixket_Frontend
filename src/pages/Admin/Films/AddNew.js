import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { themPhimAction } from "../../../redux/actions/QuanLyPhimAction";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
  Flex,
  Tag,
} from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";

import moment from "moment";

function AddNew(props) {
  const dispatch = useDispatch();
  const { RangePicker } = DatePicker;
  const { TextArea } = Input;
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const tagsData = [
    "Hành động",
    "Kinh dị",
    "Phim hài",
    "Hoạt hình",
    "Tâm lý, tình cảm",
  ];

  const validationSchema = Yup.object({
    tenPhim: Yup.string().required("Tên phim là bắt buộc"),
    trailer: Yup.string()
      .url("URL không hợp lệ")
      .required("Trailer là bắt buộc"),
    moTa: Yup.string().required("Mô tả là bắt buộc"),
    ngayKhoiChieu: Yup.string().required("Ngày khởi chiếu là bắt buộc"),
    danhGia: Yup.number()
      .min(1, "Đánh giá phải lớn hơn 0")
      .max(10, "Đánh giá phải nhỏ hơn 10")
      .required("Đánh giá là bắt buộc"),
    hinhAnh: Yup.string().required("Hình ảnh là bắt buộc"),
    daoDien: Yup.string().required("Đạo diễn là bắt buộc"),
    thoiLuong: Yup.number()
      .min(1, "Thời lượng phải lớn hơn 0")
      .required("Thời lượng là bắt buộc"),
  });
  const [selectedTags, setSelectedTags] = useState([]);
  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    // console.log("You are interested in: ", nextSelectedTags);
    setSelectedTags(nextSelectedTags);
    formik.setFieldValue("theLoai", nextSelectedTags);
  };

  const [dienVienList, setDienVienList] = useState([{ name: "" }]);

  const addDienVien = () => {
    setDienVienList([...dienVienList, { name: "" }]);
  };

  const removeDienVien = (index) => {
    const list = [...dienVienList];
    list.splice(index, 1);
    setDienVienList(list);
  };

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
      // Tắt switch kia dựa trên tên switch được kích hoạt
      if (name === "dangChieu" && value === true) {
        formik.setFieldValue("sapChieu", false);
      }
    };
  };
  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      danhGia: "",
      hinhAnh: "",
      daoDien: "",
      dienVien: [],
      thoiLuong: 0,
      dangChieu: false,
      sapChieu: true,
      hot: false,
      danhGia: 0,
      theLoai: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("values", values);
      dispatch(themPhimAction(values));
    },
  });

  const handleChangeDatePicker = (value) => {
    const ngayKhoiChieu = value.format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  return (
    <div>
      <h3 className="text-3xl mb-5">Tạo mới phim </h3>

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
              label="Tên phim *"
              validateStatus={
                formik.errors.tenPhim && formik.touched.tenPhim ? "error" : ""
              }
            >
              <Input name="tenPhim" onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item
              label="Trailer *"
              validateStatus={
                formik.errors.trailer && formik.touched.trailer ? "error" : ""
              }
            >
              <Input name="trailer" onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item
              label="Mô tả *"
              validateStatus={
                formik.errors.moTa && formik.touched.moTa ? "error" : ""
              }
            >
              <TextArea name="moTa" rows={4} onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item
              label="Hình ảnh *"
              validateStatus={
                formik.errors.hinhAnh && formik.touched.hinhAnh ? "error" : ""
              }
            >
              <Input name="hinhAnh" onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item
              label="Đạo diễn *"
              validateStatus={
                formik.errors.daoDien && formik.touched.daoDien ? "error" : ""
              }
            >
              <Input name="daoDien" onChange={formik.handleChange} />
            </Form.Item>
            {dienVienList.map((dienVien, index) => (
              <Form.Item label={`Diễn viên ${index + 1}`} key={index}>
                <Input
                  value={dienVien.name}
                  onChange={(e) => {
                    const list = [...dienVienList];
                    list[index].name = e.target.value;
                    setDienVienList(list);
                    const dienVienNames = dienVienList.map((dv) => dv.name);
                    formik.setFieldValue("dienVien", dienVienNames);
                  }}
                />

                {dienVienList.length > 1 && (
                  <MinusCircleOutlined
                    onClick={() => removeDienVien(index)}
                    style={{ color: "red", marginLeft: "10px" }}
                  />
                )}
              </Form.Item>
            ))}
            <Form.Item style={{ marginLeft: "136px" }}>
              <Button
                type="dashed"
                onClick={addDienVien}
                style={{ width: "60%" }}
              >
                <PlusOutlined /> Thêm diễn viên
              </Button>
            </Form.Item>
          </div>
          <div className="w-full lg:w-1/2">
            <Flex className="mb-4 ml-16" gap={4} wrap align="center">
              <span className="text-base">Thể loại:</span>
              {tagsData.map((tag) => (
                <Tag.CheckableTag
                  style={{
                    fontSize: "16px",
                    border: "1px solid red",
                    padding: "1px",
                    marginLeft: "8px",
                  }}
                  key={tag}
                  checked={selectedTags.includes(tag)}
                  onChange={(checked) => handleChange(tag, checked)}
                >
                  {tag}
                </Tag.CheckableTag>
              ))}
            </Flex>
            <Form.Item
              label="Thời lượng(phút) *"
              validateStatus={
                formik.errors.thoiLuong && formik.touched.thoiLuong
                  ? "error"
                  : ""
              }
            >
              <InputNumber
                min={1}
                max={360}
                onChange={(value) => {
                  formik.setFieldValue("thoiLuong", value);
                }}
              />
            </Form.Item>
            <Form.Item
              label="Ngày khởi chiếu *"
              validateStatus={
                formik.errors.ngayKhoiChieu && formik.touched.ngayKhoiChieu
                  ? "error"
                  : ""
              }
            >
              <DatePicker
                format={"DD/MM/YYYY"}
                onChange={handleChangeDatePicker}
              />
            </Form.Item>
            <Form.Item label="Đang chiếu" valuePropName="checked">
              <Switch onChange={handleChangeSwitch("dangChieu")} />
            </Form.Item>
            <Form.Item label="Phim Hot" valuePropName="checked">
              <Switch onChange={handleChangeSwitch("hot")} />
            </Form.Item>
            <Form.Item
              label="Đánh giá *"
              validateStatus={
                formik.errors.danhGia && formik.touched.danhGia ? "error" : ""
              }
            >
              <InputNumber
                min={1}
                max={10}
                onChange={(value) => {
                  formik.setFieldValue("danhGia", value);
                }}
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

export default AddNew;
