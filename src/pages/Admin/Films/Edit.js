import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  themPhimAction,
  layThongTinPhimAction,
  capNhatPhimAction,
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
      daoDien: thongTinPhim?.daoDien,
      dienVien: thongTinPhim?.dienVien,
      thoiLuong: thongTinPhim?.thoiLuong,
      dangChieu: thongTinPhim?.dangChieu,
      sapChieu: thongTinPhim?.sapChieu,
      hot: thongTinPhim?.hot,
      danhGia: thongTinPhim?.danhGia,
      theLoai: [thongTinPhim?.theLoai],
    },
    onSubmit: (values) => {
      dispatch(capNhatPhimAction(values, navigate));
      console.log(values);
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
            <Form.Item label="Tên phim">
              <Input
                name="tenPhim"
                onChange={formik.handleChange}
                value={formik.values.tenPhim}
              />
            </Form.Item>
            <Form.Item label="Trailer">
              <Input
                name="trailer"
                onChange={formik.handleChange}
                value={formik.values.trailer}
              />
            </Form.Item>
            <Form.Item label="Mô tả">
              <TextArea
                name="moTa"
                rows={4}
                onChange={formik.handleChange}
                value={formik.values.moTa}
              />
            </Form.Item>
            <Form.Item label="Hình ảnh">
              <Input
                name="hinhAnh"
                onChange={formik.handleChange}
                value={formik.values.hinhAnh}
              />
            </Form.Item>
            <Form.Item label="Đạo diễn">
              <Input
                name="daoDien"
                onChange={formik.handleChange}
                value={formik.values.daoDien}
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
            <Form.Item label="Thời lượng(phút)">
              <InputNumber
                min={1}
                max={360}
                onChange={(value) => {
                  formik.setFieldValue("thoiLuong", value);
                }}
                value={formik.values.thoiLuong}
              />
            </Form.Item>
            <Form.Item label="Ngày khởi chiếu">
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
            <Form.Item label="Đánh giá">
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
    </div>
  );
}

export default Edit;
