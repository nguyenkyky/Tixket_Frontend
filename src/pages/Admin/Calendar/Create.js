import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Cascader,
  DatePicker,
  InputNumber,
  Select,
} from "antd";
import { useEffect } from "react";
import { quanLyRapService } from "../../../services/QuanLyRapService";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { quanLyPhimService } from "../../../services/QuanLyPhimService";

function Create(props) {
  const { id, tenPhim } = useParams();
  const [film, setFilm] = useState({});

  const formik = useFormik({
    initialValues: {
      tenHeThongRap: "",
      maPhim: id,
      tenPhim: "",
      hinhAnh: "",
      hot: true,
      dangChieu: true,
      sapChieu: true,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: 0,
      thoiLuong: 0,
      theLoai: [],
    },
    onSubmit: async (values) => {
      console.log("values", values);
      try {
        const result = await quanLyPhimService.taoLichChieuPhim(values);
        console.log("result", result);
        formik.resetForm();
        alert("Tạo lịch chiếu thành công");
        window.location.reload();
      } catch (e) {
        alert("Tạo lịch chiếu thất bại");
        console.log("ERROR 500:", e.message);
      }
    },
  });

  const onChaneHeThongRap = async (value) => {
    formik.setFieldValue("tenHeThongRap", value);
    const result = await quanLyRapService.layThongTinCumRap(value);

    if (result) {
      setState({
        ...state,
        cumRapChieu: result.data.cumRapChieu,
      });
    }
  };

  const onChaneCumRap = (value) => {
    console.log("value", value);
    formik.setFieldValue("maRap", value);
  };
  const onChangeDate = (value) => {
    formik.setFieldValue("ngayChieuGioChieu", value);
  };

  const onOk = (value) => {
    formik.setFieldValue("ngayChieuGioChieu", value);
  };

  const onChangeGiaVe = (value) => {
    formik.setFieldValue("giaVe", value);
  };

  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
  });

  useEffect(() => {
    async function fetchData() {
      const response = await quanLyRapService.layThongTinHeThongRap();
      const result = await quanLyPhimService.layThongTinPhim(id);
      formik.setFieldValue("tenPhim", result.data.tenPhim);
      formik.setFieldValue("hinhAnh", result.data.hinhAnh);
      formik.setFieldValue("hot", result.data.hot);
      formik.setFieldValue("dangChieu", result.data.dangChieu);
      formik.setFieldValue("sapChieu", result.data.sapChieu);
      formik.setFieldValue("thoiLuong", result.data.thoiLuong);
      formik.setFieldValue("theLoai", result.data.theLoai);

      setFilm(result.data);
      setState({ ...state, heThongRapChieu: response.data.data });
    }
    fetchData();
  }, []);
  return (
    <div className="container">
      <div className="flex items-center justify-center">
        <h3 className="text-2xl mb-10">Tạo lịch chiếu phim {tenPhim}</h3>
      </div>
      <div className="flex justify-around">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            width: "800px",
          }}
          initialValues={{
            remember: true,
          }}
          onSubmitCapture={formik.handleSubmit}
        >
          <Form.Item label="Hệ thống rạp">
            <Select
              options={state.heThongRapChieu?.map((htr, index) => {
                return { label: htr.tenHeThongRap, value: htr.tenHeThongRap };
              })}
              placeholder="Chọn hệ thống rạp"
              onChange={onChaneHeThongRap}
            />
          </Form.Item>
          <Form.Item label="Cụm rap">
            <Select
              options={state.cumRapChieu?.map((htr, index) => {
                return { label: htr.tenCumRap, value: htr.maCumRap };
              })}
              placeholder="Chọn cụm rạp"
              onChange={onChaneCumRap}
            />
          </Form.Item>
          <Form.Item label="Lịch chiếu">
            <DatePicker showWeek showTime onChange={onChangeDate} onOk={onOk} />
          </Form.Item>
          <Form.Item label="Giá vé">
            <InputNumber min={70000} max={200000} onChange={onChangeGiaVe} />
          </Form.Item>
          <Form.Item label="Hoàn thành">
            <Button htmlType="submit">Tạo lịch chiếu</Button>
          </Form.Item>
        </Form>
        <img
          src={film.hinhAnh}
          style={{ width: "500px", height: "400px" }}
        ></img>
      </div>
    </div>
  );
}

export default Create;
