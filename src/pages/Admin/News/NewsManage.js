import React, { Fragment, useEffect, useState } from "react";
import { Button, Table, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { quanLyTinTucService } from "../../../services/QuanLyTinTucService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NewsManage(props) {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await quanLyTinTucService.getAll();

      const dataWithKey = result.data.map((news, index) => ({
        ...news,
        key: news.maTinTuc,
      }));
      setData(dataWithKey);
    };
    fetchData();
  });

  const handleDelete = (maTinTuc) => {
    Modal.confirm({
      title: `Bạn có chắc muốn xóa bài viết này không: `,
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        const result = await quanLyTinTucService.deleteNews(maTinTuc);
        toast.success(`Đã xóa bài viết thành công!`);
      },
    });
  };

  const columns = [
    {
      title: "Mã tin tức",
      dataIndex: "maTinTuc",
      defaultSortOrder: "descend",
      width: "10%",
    },
    {
      title: "Title",
      dataIndex: "title",
      width: "20%",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      width: "20%",
      render(text, news) {
        return (
          <Fragment>
            <img
              src={news.hinhAnh}
              alt={news.hinhAnh}
              style={{ width: "200px" }}
            />
          </Fragment>
        );
      },
    },
    {
      title: "Render",
      dataIndex: "render",
      width: "40%",
      render: (text, news) => {
        return (
          <Fragment>
            {news.render.length > 50
              ? news.render.substr(0, 100) + "..."
              : news.render}
          </Fragment>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, news) => {
        return (
          <Fragment>
            <NavLink
              to={`/admin/news/edit/${news.maTinTuc}`}
              key="1"
              className="mr-2 text-2xl"
            >
              <EditOutlined style={{ color: "blue" }} />
            </NavLink>
            <DeleteOutlined
              key="2"
              className="text-2xl mr-2"
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => handleDelete(news.maTinTuc)}
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
      <h3 className="text-3xl mb-5">Danh sách tin tức</h3>

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

export default NewsManage;
