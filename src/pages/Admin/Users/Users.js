import React, { Fragment, useEffect, useState } from "react";
import { Button, Table, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  layThongTinAllNguoiDungAction,
  timKiemNguoiDungAction,
  xoaUserAction,
} from "../../../redux/actions/QuanLyNguoiDungAction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Users(props) {
  const navigate = useNavigate();
  const { Search } = Input;
  const { danhSachNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  useEffect(() => {
    const action = layThongTinAllNguoiDungAction();
    dispatch(action);
  }, [dispatch]);

  useEffect(() => {
    if (danhSachNguoiDung) {
      const dataWithKey = danhSachNguoiDung.map((user, index) => ({
        ...user,
        key: user.taiKhoan,
      }));
      setData(dataWithKey);
    }
  }, [danhSachNguoiDung]);

  const handleDelete = (user) => {
    if (user.taiKhoan === userLogin.taiKhoan) {
      toast.error("Không thể tự xóa chính mình!");
      return;
    }

    Modal.confirm({
      title: `Bạn có chắc muốn xóa người dùng này không: ${user.hoTen}?`,
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy",
      onOk: () => {
        dispatch(xoaUserAction(user.taiKhoan));
        toast.success(`Đã xóa người dùng ${user.hoTen} thành công!`);
      },
    });
  };

  const onSearch = async (value) => {
    const action = timKiemNguoiDungAction(value);
    dispatch(action);
  };

  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      defaultSortOrder: "descend",
      width: "10%",
    },
    {
      title: "Họ Tên",
      dataIndex: "hoTen",
      width: "10%",
      sorter: (a, b) => {
        let userA = a.hoTen.toLowerCase().trim();
        let userB = b.hoTen.toLowerCase().trim();
        if (userA > userB) {
          return 1;
        }
        return -1;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "15%",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDT",
      width: "10%",
    },
    {
      title: "Loại người dùng",
      dataIndex: "maLoaiNguoiDung",
      width: "7%",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      width: "5%",
      render(text, user) {
        return (
          <Fragment>
            <img src={user.avatar} alt={user.hoTen} style={{ width: "50px" }} />
          </Fragment>
        );
      },
    },
    {
      title: "Lịch sử đặt vé",
      dataIndex: "lichSuDatVe",
      render: (text, user) => {
        return (
          <Fragment>
            <NavLink to={`/admin/users/orders/history/${user.taiKhoan}`}>
              <Button className="bg-blue-300 text-white">Xem chi tiết</Button>
            </NavLink>
          </Fragment>
        );
      },
      width: "10%",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, user) => {
        return (
          <Fragment>
            <NavLink
              key="1"
              className="mr-2 text-2xl"
              to={`/admin/users/edit/${user.taiKhoan}`}
            >
              <EditOutlined style={{ color: "blue" }} />
            </NavLink>
            <DeleteOutlined
              key="2"
              className="text-2xl mr-2"
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => handleDelete(user)}
            />
          </Fragment>
        );
      },
      width: "8%",
    },
  ];

  return (
    <div>
      <ToastContainer />
      <h3 className="text-3xl mb-5">Danh sách người dùng</h3>

      <Search
        className="mb-5"
        placeholder="Tìm kiếm tên người dùng"
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
      <Table
        columns={columns}
        dataSource={data}
        showSorterTooltip={{
          target: "sorter-icon",
        }}
      />
    </div>
  );
}

export default Users;
