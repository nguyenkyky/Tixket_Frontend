import React from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import ColumnGroup from "antd/es/table/ColumnGroup";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  dangNhapAction,
  dangKyAction,
} from "../../redux/actions/QuanLyNguoiDungAction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  // console.log("userlogin", userLogin);

  const formik = useFormik({
    initialValues: {
      hoTen: "",
      matKhau: "",
      xacNhanMatKhau: "",
      username: "",
    },
    onSubmit: async (values) => {
      try {
        await dispatch(dangKyAction(values, navigate));
        toast.success("Đăng ký thành công!", {
          position: "top-center",
          onClose: () => navigate("/login"),
        });
        // console.log("values", values);
      } catch (error) {
        if (error.response && error.response.status === 402) {
          toast.error("Username đã tồn tại", { position: "top-center" });
        }
        if (error.response.status === 400) {
          toast.error("Xác nhận mật khẩu không khớp", {
            position: "top-center",
          });
        } else {
          console.log("error", error.response.data);
        }
      }
    },
  });

  // console.log(formik);

  return (
    <div className="lg:w-1/2 xl:max-w-screen-sm">
      <form onSubmit={formik.handleSubmit}>
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
        <div className=" px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <h2
            className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
              xl:text-bold"
          >
            Đăng ký
          </h2>
          <div className="mt-8">
            <div>
              <div>
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Username
                </div>
                <input
                  name="username"
                  onChange={formik.handleChange}
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <div className="mt-8">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Họ tên
                </div>
                <input
                  name="hoTen"
                  onChange={formik.handleChange}
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Mật khẩu
                  </div>
                </div>
                <input
                  name="matKhau"
                  onChange={formik.handleChange}
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="password"
                  required
                />
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Xác nhận mật khẩu
                  </div>
                </div>
                <input
                  name="xacNhanMatKhau"
                  onChange={formik.handleChange}
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="password"
                  required
                />
              </div>
              <div className="mt-10">
                <button
                  className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg"
                >
                  Đăng ký
                </button>
              </div>
            </div>
            <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
              Đã có tài khoản ?{" "}
              <NavLink
                to="/login"
                className="cursor-pointer text-indigo-600 hover:text-indigo-800"
              >
                Đăng nhập
              </NavLink>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;
