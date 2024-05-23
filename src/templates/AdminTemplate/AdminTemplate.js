import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  ScheduleOutlined,
  UserOutlined,
  FundProjectionScreenOutlined,
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
  const navigate = useNavigate();
  const location = useLocation();
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const userInfo = JSON.parse(localStorage.getItem("USER_LOGIN"));

  const items = [
    getItem("Film", "sub1", <PieChartOutlined />, [
      getItem(
        "Danh sách phim",
        "/admin/films",
        <NavLink to="/admin/films"></NavLink>
      ),
      getItem(
        "Tạo phim mới",
        "/admin/films/addnew",
        <NavLink to="/admin/films/addnew"></NavLink>
      ),
    ]),
    getItem("Lịch chiếu", "5", <ScheduleOutlined />, null, () =>
      navigate("/admin/calendar")
    ),
    getItem("Users", "6", <UserOutlined />, null, () =>
      navigate("/admin/users")
    ),
    getItem("Cụm rạp", "sub3", <FundProjectionScreenOutlined />, [
      getItem(
        "Danh sách cụm rạp",
        "/admin/cumrap",
        <NavLink to="/admin/cumrap"></NavLink>
      ),
      getItem(
        "Tạo cụm rạp mới",
        "/admin/cumrap/addnew",
        <NavLink to="/admin/cumrap/addnew"></NavLink>
      ),
    ]),
    getItem("Banner", "11", <FileOutlined />),
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
          <div className="fixed " style={{ width: "200px" }}>
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
          >
            <div className="items-center flex-shrink-0 hidden lg:flex h-full justify-end">
              {userInfo ? (
                <div className="user-infor mr-16">
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
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Thông tin chung
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Thay đổi thông tin
                          </a>
                        </li>
                        <li>
                          <a
                            href="/order/history"
                            className="block px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Lịch sử giao dịch
                          </a>
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
