import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  PieChartOutlined,
  ScheduleOutlined,
  UserOutlined,
  FundProjectionScreenOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.css";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children, onClick) {
  return {
    key,
    icon,
    children,
    label,
    onClick,
  };
}

const AdminTemplate = ({ childComponent }) => {
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const userInfo = JSON.parse(localStorage.getItem("USER_LOGIN"));

  // Hàm để đóng menu khi click ra bên ngoài
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    // Thêm event listener để đóng menu khi click ra bên ngoài
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Loại bỏ event listener khi component bị unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const items = [
    getItem("Film", "sub1", <PieChartOutlined />, [
      getItem(
        <NavLink className="ml-10" to="/admin/films">
          Danh sách phim
        </NavLink>,
        "/admin/films",
        null
      ),
      getItem(
        <NavLink className="ml-10" to="/admin/films/addnew">
          Tạo phim mới
        </NavLink>,
        "/admin/films/addnew",
        null
      ),
    ]),
    getItem(
      <NavLink to="/admin/calendar">Lịch chiếu</NavLink>,
      "/admin/calendar",
      <ScheduleOutlined />
    ),
    getItem(
      <NavLink to="/admin/users">Users</NavLink>,
      "/admin/users",
      <UserOutlined />
    ),
    getItem("Cụm rạp", "sub3", <FundProjectionScreenOutlined />, [
      getItem(
        <NavLink className="ml-10" to="/admin/cumrap">
          Danh sách rạp
        </NavLink>,
        "/admin/cumrap",
        null
      ),
      getItem(
        <NavLink className="ml-10" to="/admin/cumrap/create">
          Tạo rạp mới
        </NavLink>,
        "/admin/cumrap/create",
        null
      ),
    ]),
    getItem(
      <NavLink to="/admin/banner">Banner</NavLink>,
      "/admin/banner",
      <FileOutlined />
    ),
  ];

  useEffect(() => {
    if (!localStorage.getItem("USER_LOGIN")) {
      alert("Bạn không có quyền truy cập vào trang này");
      navigate("/home");
    } else if (userLogin.maLoaiNguoiDung !== "Admin") {
      alert("Bạn không có quyền truy cập vào trang này");
      navigate("/home");
    }
  }, [navigate, userLogin]);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const findSelectedKey = (items, path) => {
    for (let item of items) {
      if (item.key === path) {
        return item.key;
      }
      if (item.children) {
        const found = findSelectedKey(item.children, path);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  const selectedKey = findSelectedKey(items, location.pathname);

  return (
    <div>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="fixed" style={{ width: "200px" }}>
            <div className="logo p-5 flex justify-center">
              <NavLink
                rel="noopener noreferrer"
                to={"/home"}
                aria-label="Back to homepage"
                className="flex items-center p-2"
              >
                <img
                  style={{ background: "transparent" }}
                  src="https://i.ibb.co/cTfFTYP/Layer-2.png"
                  viewBox="0 0 32 32"
                  className="w-16 h-16 dark:text-violet-600"
                />
              </NavLink>
            </div>
            <Menu
              theme="dark"
              mode="inline"
              items={items}
              defaultSelectedKeys={[selectedKey]}
              selectedKeys={[selectedKey]}
            />
          </div>
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
            className="dark:bg-gray-600 dark:text-gray-800 bg-opacity-80 text-black w-full z-10  text-xl"
          >
            <div className="items-center flex-shrink-0 hidden lg:flex justify-end mt-3">
              {userInfo ? (
                <div ref={dropdownRef} className="user-infor mr-16">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu
                    id="dropdownAvatarNameButton"
                    data-dropdown-toggle="dropdownAvatarName"
                    className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:me-0 focus:ring-0 focus:ring-gray-100 dark:focus:ring-0 dark:text-white"
                    type="button"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-10 h-10 me-2 rounded-full"
                      src={userInfo.avatar}
                      alt="user photo"
                    />
                    <p className="text-black text-xl">{userInfo.hoTen}</p>
                  </button>
                  {isMenuOpen && (
                    <div
                      id="dropdownAvatarName"
                      style={{ position: "absolute" }}
                      className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                    >
                      <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        <div className="truncate">Xin chào</div>
                        <div className="text-xl">{userInfo.hoTen}</div>
                      </div>
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
                      >
                        <li>
                          <a
                            href="/profile"
                            className="block px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Thông tin cá nhân
                          </a>
                        </li>
                        <li>
                          <button
                            onClick={() =>
                              navigate("/profile", { state: { tab: 2 } })
                            }
                            className="block px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                          >
                            Lịch sử giao dịch
                          </button>
                        </li>
                      </ul>
                      <div className="">
                        <button
                          className="w-full "
                          style={{
                            borderBottomLeftRadius: "0.5rem",
                            borderBottomRightRadius: "0.5rem",
                          }}
                          onClick={() => {
                            dispatch({
                              type: "DANG_XUAT_ACTION",
                            });
                            window.location.reload();
                          }}
                        >
                          <a
                            href="#"
                            className="sign-out-button block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Sign out
                          </a>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Nếu người dùng chưa đăng nhập, hiển thị nút đăng nhập và đăng ký
                <>
                  <button
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="self-center px-8 py-3 rounded"
                  >
                    Đăng nhập
                  </button>
                  <button
                    onClick={() => {
                      navigate("/register");
                    }}
                    className="self-center px-8 py-3  rounded dark:bg-violet-600 dark:text-gray-50"
                  >
                    Đăng ký
                  </button>
                </>
              )}
            </div>
          </Header>
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <Breadcrumb
              style={{
                margin: "16px 0",
              }}
            >
              {/* <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
            </Breadcrumb>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {childComponent}
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Tixket ©{new Date().getFullYear()} Created by Cao Ky Nguyen
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default AdminTemplate;
