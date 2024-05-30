import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { Button, DatePicker, Form, Input, InputNumber, Switch } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";
import { quanLyTinTucService } from "../../../services/QuanLyTinTucService";

function EditNews(props) {
  const { maTinTuc } = useParams();

  const [tinTuc, setTinTuc] = useState();
  console.log(tinTuc);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await quanLyTinTucService.getData(maTinTuc);

        setTinTuc(result.data);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchData();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maTinTuc: maTinTuc,
      title: tinTuc?.title,
      hinhAnh: tinTuc?.hinhAnh,
      render: tinTuc?.render,
    },
    onSubmit: async (values) => {
      console.log(values);
      const result = await quanLyTinTucService.editNews(values);
    },
  });
  return (
    <div>
      <div className="flex justify-center mb-4">
        <h3 className="text-3xl mb-5">Thêm tin tức mới</h3>
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
          layout="vertical"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-1/2">
              <Form.Item label="Title">
                <Input
                  name="title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                />
              </Form.Item>
              <Form.Item label="Hình ảnh">
                <Input
                  name="hinhAnh"
                  onChange={formik.handleChange}
                  value={formik.values.hinhAnh}
                />
              </Form.Item>

              <Form.Item label="Render">
                <TextArea
                  name="render"
                  onChange={formik.handleChange}
                  value={formik.values.render}
                />
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

export default EditNews;
