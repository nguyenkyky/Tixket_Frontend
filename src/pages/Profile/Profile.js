import React, { useEffect, useState, Fragment } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import TabPanel from "@mui/lab/TabPanel";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Form, Input, Modal, Table } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import {
  layThongTinDatVe,
  capNhatThongTinAction,
} from "../../redux/actions/QuanLyNguoiDungAction";
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDung";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import _ from "lodash";
import moment from "moment";
import { Pagination } from "antd";
import * as Yup from "yup";
import { uploadImageToCloudinary } from "../../services/uploadImage";

export default function Profile() {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false); // for showing loading state
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [data, setData] = useState([]);
  const location = useLocation();
  const initialTab = location.state?.tab?.toString() || "1";
  const [detailTicket, setDetailTicket] = useState();
  const [value, setValue] = React.useState(initialTab);
  const [isModalTicketVisible, setIsModalTicketVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [passwords, setPasswords] = useState({
    taiKhoan: userLogin?.taiKhoan,
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const dispatch = useDispatch();
  const { thongTinDatVe } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );

  const handleShowDetailTicket = (ticket) => {
    setDetailTicket(ticket);
    setIsModalTicketVisible(true);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewUrl(previewUrl);

      // Upload to Cloudinary
      setUploading(true);
      try {
        const response = await uploadImageToCloudinary(file);
        formik.setFieldValue("avatar", response.secure_url);
        toast.success("Upload ảnh thành công!");
      } catch (error) {
        toast.error("Có lỗi xảy ra khi upload ảnh. Vui lòng thử lại.");
      } finally {
        setUploading(false);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const action = layThongTinDatVe();
        await dispatch(action);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          // navigate("/login");
        }
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (thongTinDatVe) {
      const dataWithKey = thongTinDatVe.thongTinDatVe?.map((ticket, index) => ({
        ...ticket,
        key: ticket.orderId,
      }));
      setData(dataWithKey);
    }
  }, [thongTinDatVe]);

  const columns = [
    {
      dataIndex: "hinhAnh",
      render(text, ticket) {
        return (
          <Fragment>
            <img
              src={ticket.hinhAnh}
              alt={ticket.hinhAnh}
              style={{ width: "150px", height: "150px", borderRadius: "5px" }}
            />
          </Fragment>
        );
      },
      width: "10%",
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      width: "20%",
      sorter: (a, b) => {
        let userA = a.tenPhim.toLowerCase().trim();
        let userB = b.tenPhim.toLowerCase().trim();
        if (userA > userB) {
          return 1;
        }
        return -1;
      },
      render(text, ticket) {
        return (
          <Fragment>
            <p className="text-base font-semibold">{ticket.tenPhim}</p>
          </Fragment>
        );
      },
    },
    {
      title: "Cụm rạp",
      dataIndex: "tenCumRap",
      width: "15%",
      render(text, ticket) {
        return (
          <Fragment>
            <p className="text-base font-semibold">{ticket.tenCumRap}</p>
          </Fragment>
        );
      },
    },
    {
      title: "Ngày đặt",
      dataIndex: "ngayDat",
      width: "10%",
      sorter: (a, b) => moment(b.ngayDat).unix() - moment(a.ngayDat).unix(),
      defaultSortOrder: "ascend",
      render(text, ticket) {
        return (
          <Fragment>
            <p className="text-base ">
              {moment(ticket.ngayDat).format("DD/MM/YYYY HH:mm")}
            </p>
          </Fragment>
        );
      },
    },
    {
      title: "Chi tiết",
      width: "5%",
      render(text, ticket) {
        return (
          <Fragment>
            <div
              onClick={() => {
                handleShowDetailTicket(ticket);
              }}
            >
              <p className="text-base text-blue-500 cursor-pointer">
                Xem chi tiết
              </p>
            </div>
          </Fragment>
        );
      },
    },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const { currentPassword, newPassword, confirmNewPassword } = passwords;

    if (currentPassword === newPassword) {
      toast.error("Mật khẩu mới không được giống mật khẩu hiện tại!");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("Xác nhận mật khẩu mới không khớp!");
      return;
    }

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
    setIsModalTicketVisible(false);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validationSchema = Yup.object({
    newTaiKhoan: Yup.string().required("Tài khoản rạp là bắt buộc"),
    hoTen: Yup.string().required("Họ tên là bắt buộc"),
    avatar: Yup.string().required("Avatar là bắt buộc"),
    soDT: Yup.string().required("Số điện thoại là bắt buộc"),
    email: Yup.string()
      .required("Email là bắt buộc")
      .matches(
        /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
        "Email phải có đuôi @gmail.com"
      ),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      hoTen: userLogin?.hoTen,
      soDT: userLogin?.soDT,
      email: userLogin?.email,
      avatar: userLogin?.avatar,
      taiKhoan: userLogin?.taiKhoan,
      newTaiKhoan: userLogin?.taiKhoan,
      tongChiTieu: userLogin?.tongChiTieu,
      maLoaiNguoiDung:
        userLogin?.maLoaiNguoiDung === "KhachHang"
          ? "Khách Hàng"
          : userLogin?.maLoaiNguoiDung,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const result = await dispatch(capNhatThongTinAction(values));
        let userLogin = JSON.parse(localStorage.getItem("USER_LOGIN"));
        userLogin.taiKhoan = values.newTaiKhoan;
        userLogin.hoTen = values.hoTen;
        userLogin.email = values.email;
        userLogin.soDT = values.soDT;
        userLogin.avatar = values.avatar;
        localStorage.setItem("USER_LOGIN", JSON.stringify(userLogin));
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
                  labelCol={{ span: 12 }}
                  wrapperCol={{ span: 14 }}
                  layout="vertical"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <div className="flex flex-wrap justify-center">
                    <div
                      style={{ marginLeft: "100px" }}
                      className="flex w-7/12 mt-10"
                    >
                      <div className="w-full lg:w-1/2">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "16px",
                          }}
                        >
                          {formik.values.avatar && (
                            <img
                              src={formik.values.avatar}
                              alt="Current Avatar"
                              className="avatar-preview"
                            />
                          )}
                          <label
                            htmlFor="file-upload"
                            className="custom-file-upload"
                          >
                            Chọn tệp
                          </label>
                          <input
                            id="file-upload"
                            type="file"
                            className="file-input"
                            onChange={handleFileChange}
                          />
                        </div>
                        {uploading && <p>Uploading...</p>}
                        <Form.Item
                          label="Username *"
                          validateStatus={
                            formik.errors.newTaiKhoan &&
                            formik.touched.newTaiKhoan
                              ? "error"
                              : ""
                          }
                        >
                          <Input
                            name="newTaiKhoan"
                            onChange={formik.handleChange}
                            value={formik.values.newTaiKhoan}
                          />
                        </Form.Item>
                        <Form.Item
                          label="Họ tên *"
                          validateStatus={
                            formik.errors.hoTen && formik.touched.hoTen
                              ? "error"
                              : ""
                          }
                        >
                          <Input
                            name="hoTen"
                            onChange={formik.handleChange}
                            value={formik.values.hoTen}
                          />
                        </Form.Item>
                      </div>
                      <div className="w-full lg:w-1/2">
                        <Form.Item
                          label="Email *"
                          validateStatus={
                            formik.errors.email && formik.touched.email
                              ? "error"
                              : ""
                          }
                        >
                          <Input
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                          />
                        </Form.Item>
                        <Form.Item
                          label="Số điện thoại *"
                          validateStatus={
                            formik.errors.soDT && formik.touched.soDT
                              ? "error"
                              : ""
                          }
                        >
                          <Input
                            name="soDT"
                            onChange={formik.handleChange}
                            value={formik.values.soDT}
                          />
                        </Form.Item>

                        <Form.Item label="Tích lũy">
                          <Input
                            name="tongChiTieu"
                            onChange={formik.handleChange}
                            disabled
                            value={formik.values.tongChiTieu?.toLocaleString()}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ marginLeft: "314px" }}
                    className="flex justify-center"
                  >
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
                <Table
                  columns={columns}
                  dataSource={data}
                  showSorterTooltip={{ target: "sorter-icon" }}
                />
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
      <Modal
        className="modal-change-password"
        title="Đổi mật khẩu"
        open={isModalVisible}
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
        <div>
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
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu mới!" },
              ]}
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
        </div>
      </Modal>
      <Modal
        open={isModalTicketVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        closeIcon={<CloseOutlined style={{}} />}
      >
        <div className="modal-ticket-detail">
          <div
            style={{
              marginLeft: "20px",
              marginRight: "20px",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            <div>
              <div className="container mx-auto p-4">
                <div className="checkout grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <div className="flex items-center mb-8">
                      <div className="mr-2">
                        <CheckCircleOutlineIcon style={{ fontSize: "60px" }} />
                      </div>
                      <div>
                        <p className="text-xl">
                          Mã vé: #{detailTicket?.orderId}
                        </p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <iframe
                        src={detailTicket?.map}
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        aria-hidden="false"
                        tabIndex="0"
                      ></iframe>
                    </div>
                    <div className="border p-4 rounded">
                      <div className="mb-4 flex items-center">
                        <p
                          style={{ marginRight: "72px" }}
                          className="text-xl font-semibold"
                        >
                          Tên rạp
                        </p>
                        <p className="text-base">{detailTicket?.tenCumRap}</p>
                      </div>
                      <div className="border-t pt-4 mb-4 flex items-center">
                        <h3
                          style={{ marginRight: "76px" }}
                          className="text-xl font-semibold"
                        >
                          Địa chỉ
                        </h3>
                        <div>
                          <p className="text-base">{detailTicket?.diaChi}</p>
                        </div>
                      </div>
                      <div className="border-t pt-4 items-center flex">
                        <h3
                          style={{ marginRight: "44px" }}
                          className="text-xl font-semibold"
                        >
                          Suất chiếu
                        </h3>
                        <p className="text-base">
                          {detailTicket?.gioChieu} - {detailTicket?.ngayChieu}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="order-summary p-4 border rounded-lg">
                    <h3 className="text-2xl font-semibold mb-4">Đơn hàng</h3>
                    <div className="order-item flex mb-4">
                      <img
                        src={detailTicket?.hinhAnh}
                        alt="hinhAnh"
                        className="w-full h-full"
                        style={{ borderRadius: "5px" }}
                      />
                    </div>
                    <div className="order-infor border-t mt-8">
                      <div className="flex items-center justify-between mt-4">
                        <p className="text-base font-semibold ">Tên phim</p>
                        <p className="text-base">{detailTicket?.tenPhim}</p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <p className="text-base font-semibold ">Ghế</p>
                        <p className="text-base">
                          {detailTicket?.danhSachGhe
                            ?.map((ve) => ve.tenGhe)
                            .join(", ")}
                        </p>
                      </div>
                    </div>
                    <div className="order-infor border-t mt-8">
                      <div className="flex items-center justify-between mt-4">
                        <p className="text-base font-semibold ">Giá vé</p>
                        <p className="text-base">
                          {detailTicket?.giaVe?.toLocaleString()} đ
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <p className="text-base font-semibold ">Khuyến mãi</p>
                        <p className="text-base">
                          {detailTicket?.khuyenMai?.toLocaleString()} %
                        </p>
                      </div>
                    </div>
                    <div className="order-infor border-t mt-8">
                      <div className="flex items-center justify-between mt-4">
                        <p className="text-base font-semibold ">Tổng cộng</p>
                        <p className="text-base">
                          {detailTicket?.tongTien?.toLocaleString()} đ
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
}
