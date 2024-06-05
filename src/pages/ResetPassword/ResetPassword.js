import React from "react";

import { useFormik } from "formik";

import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordAction } from "../../redux/actions/QuanLyNguoiDungAction";

function ResetPassword(props) {
  const { token } = useParams();
  console.log(token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      matKhau: "",
      xacNhanMatKhau: "",
    },
    onSubmit: (values) => {
      console.log(values);
      if (values.matKhau !== values.xacNhanMatKhau) {
        alert("Mật khẩu không khớp!");
        return;
      }
      const data = { token, matKhau: values.matKhau };
      const action = resetPasswordAction(data, navigate);
      dispatch(action);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="lg:w-1/2 xl:max-w-screen-sm"
    >
      <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-center lg:px-12">
        <div className="cursor-pointer flex items-center">
          <div>
            <img
              style={{ background: "transparent" }}
              src="https://i.ibb.co/cTfFTYP/Layer-2.png"
              viewBox="0 0 32 32"
              className="w-16 h-16 dark:text-violet-600  "
            />
          </div>
          <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">
            TIXKET
          </div>
        </div>
      </div>
      <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
        <h2
          className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
              xl:text-bold"
        >
          Đặt lại mật khẩu
        </h2>
        <div className="mt-12">
          <div>
            <div>
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                Mật khẩu
              </div>
              <input
                name="matKhau"
                onChange={formik.handleChange}
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="Nhập vào mật khẩu"
                type="password"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-700 tracking-wide mt-4">
                Xác nhận mật khẩu
              </div>
              <input
                name="xacNhanMatKhau"
                onChange={formik.handleChange}
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="Xác nhận mật khẩu"
                type="password"
              />
            </div>

            <div className="mt-10">
              <button
                className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ResetPassword;
