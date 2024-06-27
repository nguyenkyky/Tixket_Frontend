import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  themPhimAction,
  layThongTinPhimAction,
  capNhatPhimAction,
  layDanhSachPhimAction,
} from "../../../redux/actions/QuanLyPhimAction";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Switch,
  Flex,
  Tag,
} from "antd";
import { useFormik } from "formik";
import moment from "moment";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";

function Edit(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { thongTinPhim } = useSelector((state) => state.QuanLyPhimReducer);
  const navigate = useNavigate();
  const { TextArea } = Input;
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
    quocGia: Yup.string().required("Quốc gia là bắt buộc"),

    poster: Yup.string().required("Poster là bắt buộc"),

    daoDien: Yup.string().required("Đạo diễn là bắt buộc"),
    thoiLuong: Yup.number()
      .min(1, "Thời lượng phải lớn hơn 0")
      .required("Thời lượng là bắt buộc"),
  });
  const [dienVienList, setDienVienList] = useState([]);

  const [selectedTags, setSelectedTags] = useState([]);

  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    setSelectedTags(nextSelectedTags);
    formik.setFieldValue("theLoai", nextSelectedTags);
  };

  useEffect(() => {
    async function fetchThongTinPhim() {
      dispatch(layThongTinPhimAction(id));
    }

    fetchThongTinPhim();
  }, [id, dispatch]);

  useEffect(() => {
    if (Array.isArray(thongTinPhim.dienVien)) {
      setDienVienList(thongTinPhim.dienVien.map((dv) => ({ name: dv })));
    }
    setSelectedTags(thongTinPhim?.theLoai);
  }, [thongTinPhim.dienVien]);

  const addDienVien = () => {
    setDienVienList([...dienVienList, { name: "" }]);
  };

  const removeDienVien = (index) => {
    const list = [...dienVienList];
    list.splice(index, 1);
    setDienVienList(list);
    formik.setFieldValue(
      "dienVien",
      list.map((dv) => dv.name)
    );
  };

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
      if (name === "dangChieu" && value === true) {
        formik.setFieldValue("sapChieu", false);
      }
    };
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: thongTinPhim?.maPhim,
      tenPhim: thongTinPhim?.tenPhim,
      trailer: thongTinPhim?.trailer,
      moTa: thongTinPhim?.moTa,
      ngayKhoiChieu: thongTinPhim?.ngayKhoiChieu
        ? moment(thongTinPhim.ngayKhoiChieu).format("DD/MM/YYYY")
        : "",
      danhGia: thongTinPhim?.danhGia,
      hinhAnh: thongTinPhim?.hinhAnh,
      poster: thongTinPhim?.poster,
      daoDien: thongTinPhim?.daoDien,
      dienVien: thongTinPhim?.dienVien,
      thoiLuong: thongTinPhim?.thoiLuong,
      dangChieu: thongTinPhim?.dangChieu,
      sapChieu: thongTinPhim?.sapChieu,
      hot: thongTinPhim?.hot,
      danhGia: thongTinPhim?.danhGia,
      theLoai: thongTinPhim?.theLoai,
      quocGia: thongTinPhim?.quocGia,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values);
        await dispatch(capNhatPhimAction(values, navigate));
        toast.success("Cập nhật phim thành công", {
          position: "top-center",
          onClose: () => {
            dispatch(layDanhSachPhimAction());
            navigate("/admin/films");
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleChangeDatePicker = (value) => {
    const ngayKhoiChieu = value.format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  return (
    <div>
      <h3 className="text-3xl mb-5">Sửa thông tin phim</h3>

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
              label="Tên phim"
              required
              validateStatus={formik.errors.tenPhim ? "error" : ""}
              help={formik.errors.tenPhim}
            >
              <Input
                name="tenPhim"
                onChange={formik.handleChange}
                value={formik.values.tenPhim}
              />
            </Form.Item>
            <Form.Item
              label="Trailer"
              required
              validateStatus={formik.errors.trailer ? "error" : ""}
              help={formik.errors.trailer}
            >
              <Input
                name="trailer"
                onChange={formik.handleChange}
                value={formik.values.trailer}
              />
            </Form.Item>
            <Form.Item
              label="Mô tả"
              required
              validateStatus={formik.errors.moTa ? "error" : ""}
              help={formik.errors.moTa}
            >
              <TextArea
                name="moTa"
                rows={4}
                onChange={formik.handleChange}
                value={formik.values.moTa}
              />
            </Form.Item>
            <Form.Item
              label="Hình ảnh"
              required
              validateStatus={formik.errors.hinhAnh ? "error" : ""}
              help={formik.errors.hinhAnh}
            >
              <Input
                name="hinhAnh"
                onChange={formik.handleChange}
                value={formik.values.hinhAnh}
              />
            </Form.Item>
            <Form.Item
              label="Poster"
              required
              validateStatus={formik.errors.poster ? "error" : ""}
              help={formik.errors.poster}
            >
              <Input
                name="poster"
                onChange={formik.handleChange}
                value={formik.values.poster}
              />
            </Form.Item>
            <Form.Item
              label="Đạo diễn"
              required
              validateStatus={formik.errors.daoDien ? "error" : ""}
              help={formik.errors.daoDien}
            >
              <Input
                name="daoDien"
                onChange={formik.handleChange}
                value={formik.values.daoDien}
              />
            </Form.Item>
            <Form.Item
              label="Quốc gia"
              required
              validateStatus={formik.errors.quocGia ? "error" : ""}
              help={formik.errors.quocGia}
            >
              <Input
                name="quocGia"
                onChange={formik.handleChange}
                value={formik.values.quocGia}
              />
            </Form.Item>
            {dienVienList.map((dienVien, index) => (
              <Form.Item label={`Diễn viên ${index + 1}`} key={index}>
                <Input
                  value={dienVien.name}
                  onChange={(e) => {
                    const list = [...dienVienList];
                    list[index].name = e.target.value;
                    setDienVienList(list);
                    formik.setFieldValue(
                      "dienVien",
                      list.map((dv) => dv.name)
                    );
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
                  checked={selectedTags?.includes(tag)}
                  onChange={(checked) => handleChange(tag, checked)}
                >
                  {tag}
                </Tag.CheckableTag>
              ))}
            </Flex>
            <Form.Item
              label="Thời lượng(phút)"
              required
              validateStatus={formik.errors.thoiLuong ? "error" : ""}
              help={formik.errors.thoiLuong}
            >
              <InputNumber
                min={1}
                max={360}
                onChange={(value) => {
                  formik.setFieldValue("thoiLuong", value);
                }}
                value={formik.values.thoiLuong}
              />
            </Form.Item>
            <Form.Item
              label="Ngày khởi chiếu"
              required
              validateStatus={formik.errors.ngayKhoiChieu ? "error" : ""}
              help={formik.errors.ngayKhoiChieu}
            >
              <DatePicker
                format={"DD/MM/YYYY"}
                onChange={handleChangeDatePicker}
              />
            </Form.Item>
            <Form.Item label="Đang chiếu" valuePropName="checked">
              <Switch
                onChange={handleChangeSwitch("dangChieu")}
                checked={formik.values.dangChieu}
              />
            </Form.Item>
            <Form.Item label="Phim Hot" valuePropName="checked">
              <Switch
                onChange={handleChangeSwitch("hot")}
                checked={formik.values.hot}
              />
            </Form.Item>
            <Form.Item
              label="Đánh giá"
              required
              validateStatus={formik.errors.danhGia ? "error" : ""}
              help={formik.errors.danhGia}
            >
              <InputNumber
                min={1}
                max={10}
                onChange={(value) => {
                  formik.setFieldValue("danhGia", value);
                }}
                value={formik.values.danhGia}
              />
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

export default Edit;
