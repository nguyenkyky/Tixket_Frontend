import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Form, Input, Modal } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDung";
import { toast, ToastContainer } from "react-toastify";
import { layThongTinDatVe } from "../../redux/actions/QuanLyNguoiDungAction";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";
import moment from "moment";
import { Pagination } from "antd";

export default function Profile() {
  let user = {};
  const navigate = useNavigate();
  if (localStorage.getItem("USER_LOGIN")) {
    user = JSON.parse(localStorage.getItem("USER_LOGIN"));
  } else {
    navigate("/login");
  }
  const location = useLocation();
  const initialTab = location.state?.tab?.toString() || "1";

  const [value, setValue] = React.useState(initialTab);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [passwords, setPasswords] = useState({
    taiKhoan: user?.taiKhoan,
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const itemsPerPage = 2;

  const dispatch = useDispatch();
  const { thongTinDatVe } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );

  useEffect(() => {
    const action = layThongTinDatVe();
    dispatch(action);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    console.log(passwords);
    const { currentPassword, newPassword, confirmNewPassword } = passwords;

    // Kiểm tra mật khẩu mới không được giống mật khẩu hiện tại
    if (currentPassword === newPassword) {
      toast.error("Mật khẩu mới không được giống mật khẩu hiện tại!");
      return;
    }

    // Kiểm tra xác nhận mật khẩu mới phải khớp với mật khẩu mới
    if (newPassword !== confirmNewPassword) {
      toast.error("Xác nhận mật khẩu mới không khớp!");
      return;
    }
    // Nếu các kiểm tra đều hợp lệ, tiến hành gọi API
    try {
      const result = await quanLyNguoiDungService.doiMatKhau(passwords);
      if (result) {
        toast.success("Đổi mật khẩu thành công!");
        setIsModalVisible(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Mật khẩu hiện tại không đúng!");
      } else {
        toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderTicketItems = () => {
    const sortedTickets = thongTinDatVe.thongTinDatVe?.sort(
      (a, b) => new Date(b.ngayDat) - new Date(a.ngayDat)
    );
    const offset = (currentPage - 1) * itemsPerPage;
    const currentPageData =
      sortedTickets?.slice(offset, offset + itemsPerPage) || [];

    return currentPageData.map((ticket, index) => {
      const seat = _.first(ticket.danhSachGhe);
      return (
        <div
          className="bg-white p-4 rounded-md shadow-md flex items-center justify-between mb-4"
          key={index}
        >
          <img
            src={ticket.hinhAnh}
            alt={ticket.tenPhim}
            className="w-32 h-32 rounded-md"
          />
          <div className="flex-1 ml-4">
            <h3 className="text-xl font-bold">{ticket.tenPhim}</h3>
            <hr
              style={{
                borderTop: "1px solid red",
                marginTop: "2px",
                width: "80%",
              }}
            />
            <p className="text-gray-600">
              Địa điểm: {seat.maHeThongRap} - {seat.tenRap}
            </p>
            <p className="text-gray-600">
              Ngày đặt: {moment(ticket.ngayDat).format("hh:mm A - DD-MM-YYYY")}
            </p>
            <p className="text-gray-600">
              Ngày chiếu: {ticket.gioChieu} - {ticket.ngayChieu}
            </p>
            <p className="text-gray-600">
              Ghế: {ticket.danhSachGhe.map((ghe) => ghe.tenGhe).join(", ")}
            </p>
          </div>
          <div className="text-right">
            <p className="text-green-600 font-bold text-lg">
              Giá vé: {ticket.giaVe.toLocaleString()}
            </p>
            <CheckCircleTwoTone
              style={{
                fontSize: "30px",
                marginTop: "12px",
                marginRight: "56px",
              }}
            />
          </div>
        </div>
      );
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      hoTen: user?.hoTen,
      soDT: user?.soDT,
      email: user?.email,
      avatar: user?.avatar,
      taiKhoan: user?.taiKhoan,
      newTaiKhoan: user?.taiKhoan,
      maLoaiNguoiDung: user?.maLoaiNguoiDung,
    },
    onSubmit: async (values) => {
      try {
        const result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(
          values
        );
        toast.success("Cập nhật thông tin người dùng thành công!");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          toast.error("Tên tài khoản đã tồn tại!");
        } else {
          toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
        }
      }
    },
  });

  const totalItems = thongTinDatVe.thongTinDatVe?.length || 0;

  return (
    <div style={{ backgroundColor: "#FDFCF0", marginTop: "96px" }}>
      <div className="pt-20">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Tài khoản của tôi" value="1" />
                <Tab label="Lịch sử đặt vé" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div
                className="p-5 border-2 border-gray-300 rounded-md shadow-md mx-auto"
                style={{ maxWidth: "70%" }}
              >
                <Form
                  onSubmitCapture={formik.handleSubmit}
                  labelCol={{
                    span: 12,
                  }}
                  wrapperCol={{
                    span: 14,
                  }}
                  layout="vertical"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <div className="flex flex-wrap justify-center">
                    <div className="flex w-7/12 mt-10">
                      <div className="w-full lg:w-1/2">
                        <Form.Item label="Username">
                          <Input
                            name="newTaiKhoan"
                            onChange={formik.handleChange}
                            value={formik.values.newTaiKhoan}
                          />
                        </Form.Item>
                        <Form.Item label="Họ tên">
                          <Input
                            name="hoTen"
                            onChange={formik.handleChange}
                            value={formik.values.hoTen}
                          />
                        </Form.Item>

                        <Form.Item label="Email">
                          <Input
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                          />
                        </Form.Item>
                      </div>
                      <div className="w-full lg:w-1/2">
                        <Form.Item label="Số điện thoại">
                          <Input
                            name="soDT"
                            onChange={formik.handleChange}
                            value={formik.values.soDT}
                          />
                        </Form.Item>
                        <Form.Item label="Avatar">
                          <Input
                            name="avatar"
                            onChange={formik.handleChange}
                            value={formik.values.avatar}
                          />
                        </Form.Item>
                        <Form.Item label="Loại Khách Hàng">
                          <Input
                            name="maLoaiNguoiDung"
                            onChange={formik.handleChange}
                            disabled
                            value={formik.values.maLoaiNguoiDung}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="bg-blue-400 text-white p-2 rounded-md mr-4"
                    >
                      Lưu thông tin
                    </button>
                    <button
                      type="button"
                      className="bg-blue-400 text-white p-2 rounded-md"
                      onClick={showModal}
                    >
                      Đổi mật khẩu
                    </button>
                  </div>
                </Form>
              </div>
            </TabPanel>

            <TabPanel value="2">
              <div className="container px-5 py-12 mx-auto">
                <div className="flex flex-col space-y-4">
                  {renderTicketItems()}
                </div>
                <div className="flex justify-end mt-4">
                  <Pagination
                    current={currentPage}
                    pageSize={itemsPerPage}
                    total={totalItems}
                    onChange={handlePageChange}
                  />
                </div>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>

      <Modal
        title="Đổi mật khẩu"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Xác nhận
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item
            label="Mật khẩu hiện tại"
            name="currentPassword"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu hiện tại!" },
            ]}
          >
            <Input.Password
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
            />
          </Form.Item>
          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
          >
            <Input.Password
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
            />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu mới"
            name="confirmNewPassword"
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
            ]}
          >
            <Input.Password
              name="confirmNewPassword"
              value={passwords.confirmNewPassword}
              onChange={handlePasswordChange}
            />
          </Form.Item>
        </Form>
      </Modal>
      <ToastContainer />
    </div>
  );
}
