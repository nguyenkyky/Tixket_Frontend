import React from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import ColumnGroup from "antd/es/table/ColumnGroup";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dangNhapAction } from "../../redux/actions/QuanLyNguoiDungAction";
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDung";
import { ToastContainer, toast } from "react-toastify";

function RecoverPassword(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
    },
    onSubmit: async (values) => {
      try {
        // console.log("values", values.taiKhoan);
        const result = await quanLyNguoiDungService.recoverPassword(
          values.taiKhoan
        );
        if (result) {
          toast.success(
            "Link đặt lại mật khẩu đã được gửi tới email của bạn!",
            {
              position: "top-center",
            }
          );
        }
      } catch (e) {
        if (e.response.status === 404) {
          toast.error("Tài khoản không tồn tại", { position: "top-center" });
        }
        if (e.response.status === 403) {
          toast.error("Tài khoản chưa đăng ký email, không thể lấy lại", { position: "top-center" });
        }
      }
    },
  });

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
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <h2
            className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
              xl:text-bold"
          >
            Quên mật khẩu
          </h2>
          <div className="mt-12">
            <div>
              <div>
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Tài khoản
                </div>
                <input
                  name="taiKhoan"
                  onChange={formik.handleChange}
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  placeholder="Nhập vào tài khoản"
                  required
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
            <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
              Chưa có tài khoản ?{" "}
              <NavLink
                to="/register"
                className="cursor-pointer text-indigo-600 hover:text-indigo-800"
              >
                Đăng ký
              </NavLink>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default RecoverPassword;
