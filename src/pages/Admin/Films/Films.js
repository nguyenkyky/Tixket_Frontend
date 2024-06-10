import React, { Fragment, useEffect, useState } from "react";
import { Button, Table, Modal, Input } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import {
  layDanhSachPhimAction,
  xoaPhimAction,
  timKiemPhimAction,
} from "../../../redux/actions/QuanLyPhimAction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Films(props) {
  const navigate = useNavigate();
  const { Search } = Input;
  const { arrFilmDefault } = useSelector((state) => state.QuanLyPhimReducer);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  useEffect(() => {
    const action = layDanhSachPhimAction();
    dispatch(action);
  }, [dispatch]);

  useEffect(() => {
    if (arrFilmDefault) {
      const dataWithKey = arrFilmDefault.map((film) => ({
        ...film,
        key: film.maPhim,
      }));
      setData(dataWithKey);
    }
  }, [arrFilmDefault]);

  const onSearch = (value) => {
    dispatch(timKiemPhimAction(value));
  };

  const handleDelete = (film) => {
    Modal.confirm({
      title: `Bạn có chắc muốn xóa phim ${film.tenPhim}?`,
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          dispatch(xoaPhimAction(film.maPhim));
          toast.success(`Đã xóa phim ${film.tenPhim} thành công!`, {
            position: "top-center",
            onClose: () => {
              dispatch(layDanhSachPhimAction());
            },
          });
        } catch (errors) {
          console.log("errors", errors);
        }
      },
    });
  };

  const columns = [
    {
      title: "Mã Phim",
      dataIndex: "maPhim",
      sorter: (a, b) => a.maPhim - b.maPhim,
      defaultSortOrder: "descend",
      width: "10%",
    },
    {
      title: "Tên Phim",
      dataIndex: "tenPhim",
      width: "15%",
      filters: [
        {
          text: "Phim đang chiếu",
          value: "dangChieu",
        },
        {
          text: "Phim sắp chiếu",
          value: "sapChieu",
        },
      ],
      onFilter: (value, record) => {
        if (value === "dangChieu") {
          return record.dangChieu === true;
        }
        if (value === "sapChieu") {
          return record.sapChieu === true;
        }
        return true;
      },
      sorter: (a, b) => {
        let phimA = a.tenPhim.toLowerCase().trim();
        let phimB = b.tenPhim.toLowerCase().trim();
        return phimA.localeCompare(phimB);
      },
    },
    {
      title: "Diễn viên",
      dataIndex: "dienVien",
      width: "10%",
      render: (text, film) => {
        const dienVienStr = film.dienVien.join(", ");
        return (
          <Fragment>
            {dienVienStr.length > 50
              ? dienVienStr.substr(0, 50) + "..."
              : dienVienStr}
          </Fragment>
        );
      },
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      width: "40%",
      render: (text, film) => {
        return (
          <Fragment>
            {film.moTa.length > 50
              ? film.moTa.substr(0, 100) + "..."
              : film.moTa}
          </Fragment>
        );
      },
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      render: (text, film) => {
        return (
          <Fragment>
            <img src={film.hinhAnh} width={50} height={50} alt="..." />
          </Fragment>
        );
      },
      width: "10%",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, film) => {
        const isDisabled = film.sapChieu;
        return (
          <Fragment>
            <NavLink
              key="1"
              className="mr-2 text-2xl"
              to={`/admin/films/edit/${film.maPhim}/${film.tenPhim}`}
              onClick={() => {
                localStorage.setItem("film", JSON.stringify(film));
              }}
            >
              <EditOutlined style={{ color: "blue" }} />
            </NavLink>
            <DeleteOutlined
              key="2"
              className="text-2xl mr-2"
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => handleDelete(film)}
            />
            <NavLink
              key="3"
              className="text-2xl mr-2"
              to={`/admin/films/detail/${film.maPhim}/${film.tenPhim}`}
              onClick={() => {
                localStorage.setItem("film", JSON.stringify(film));
              }}
            >
              <EyeOutlined style={{ color: "blue", cursor: "pointer" }} />
            </NavLink>
            <NavLink
              key="4"
              className={`text-2xl ${isDisabled ? "disabled-link" : ""}`}
              to={isDisabled ? "#" : `/admin/calendar/create/${film.maPhim}`}
              onClick={(e) => {
                if (isDisabled) {
                  e.preventDefault();
                }
              }}
            >
              <CalendarOutlined
                style={{
                  color: isDisabled ? "gray" : "blue",
                  cursor: isDisabled ? "not-allowed" : "pointer",
                }}
              />
            </NavLink>
          </Fragment>
        );
      },
      width: "15%",
    },
  ];

  return (
    <div>
      <ToastContainer />
      <h3 className="text-3xl mb-5">Quản lý Phim</h3>
      <Button
        className="mb-5"
        onClick={() => {
          navigate("/admin/films/addnew");
        }}
      >
        Thêm phim
      </Button>
      <Search
        className="mb-5"
        placeholder="Tìm kiếm phim hoặc diễn viên"
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

export default Films;
