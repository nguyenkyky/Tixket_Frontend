import React from "react";
import { NavLink } from "react-router-dom";
import { logo } from "../../../../assets/image/images.png";
// import { history } from "../../../../App";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { HashLink } from "react-router-hash-link";
export default function Header(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("USER_LOGIN"));
  console.log("isMenuOpen", isMenuOpen);

  return (
    <header
      style={{ backgroundColor: "#FDFCF0", opacity: "0.9" }}
      className="p-4 dark:bg-gray-600 dark:text-gray-800 bg-opacity-80 text-black fixed w-full z-10 top-0 text-xl"
    >
      <div className="container flex justify-between h-16 mx-auto">
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
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <HashLink
              smooth
              to="/home#home"
              className="flex items-center px-4 -mb-1  dark:border- dark:text-violet-600 dark:border-violet-600"
              // activeClassName="border-b-2 border-white"
            >
              Trang chủ
            </HashLink>
          </li>
          <li className="flex">
            <HashLink
              smooth
              to="/home#danh-sach-phim"
              className="flex items-center px-4 -mb-1  dark:border- dark:text-violet-600 dark:border-violet-600"
            >
              Danh sách phim
            </HashLink>
          </li>
          <li className="flex">
            <HashLink
              smooth
              to="/home#lich-chieu"
              className="flex items-center px-4 -mb-1  dark:border- dark:text-violet-600 dark:border-violet-600"
            >
              Lịch chiếu
            </HashLink>
          </li>
          <li className="flex">
            <NavLink
              to="/order/history"
              className="flex items-center px-4 -mb-1  dark:border- dark:text-violet-600 dark:border-violet-600"
              // activeClassName="border-b-2 border-white"
            >
              Tin tức
            </NavLink>
          </li>
        </ul>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          {userInfo ? (
            <div>
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
        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-gray-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
