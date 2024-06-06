import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { Button, DatePicker, Form, Input, InputNumber, Switch } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";
import { quanLyTinTucService } from "../../../services/QuanLyTinTucService";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function AddNews(props) {
  const [editorData, setEditorData] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {}, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      hinhAnh: "",
      render: "",
    },
    onSubmit: async (values) => {
      const result = await quanLyTinTucService.addNews(values);
      console.log(values);
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
                <Input name="title" onChange={formik.handleChange} />
              </Form.Item>
              <Form.Item label="Hình ảnh">
                <Input name="hinhAnh" onChange={formik.handleChange} />
              </Form.Item>

              <Form.Item label="Render">
                <TextArea name="render" onChange={formik.handleChange} />
              </Form.Item>
            </div>
            <div>
              <h2>CKEditor 5 in React</h2>
              <CKEditor
                editor={ClassicEditor}
                data="<p>Type your content here...</p>"
                onReady={(editor) => {
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  console.log({ event, editor, data });
                  setEditorData(data);
                }}
                onBlur={(event, editor) => {
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log("Focus.", editor);
                }}
              />
              <div>
                <h3>Editor Data (HTML):</h3>
                <div>{editorData}</div>
              </div>
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

export default AddNews;
