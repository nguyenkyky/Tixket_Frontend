import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { chiTietNguoiDungAction } from "../../../redux/actions/QuanLyNguoiDungAction";
import _ from "lodash";
import moment from "moment";
import { Pagination } from "antd";

function OrderHistory(props) {
  const { detailUser } = useSelector((state) => state.QuanLyNguoiDungReducer);
  console.log(detailUser);
  const navigate = useNavigate();
  const { taiKhoan } = useParams();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const action = chiTietNguoiDungAction(taiKhoan);
    dispatch(action);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderTicketItems = () => {
    const sortedTickets = detailUser.thongTinDatVe?.sort(
      (a, b) => new Date(b.ngayDat) - new Date(a.ngayDat)
    );
    const offset = (currentPage - 1) * itemsPerPage;
    const currentPageData =
      sortedTickets?.slice(offset, offset + itemsPerPage) || [];

    return currentPageData.map((ticket, index) => {
      const seat = _.first(ticket.danhSachGhe);
      return (
        <div className="p-4 lg:w-1/2" key={index}>
          <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
            <img
              alt="team"
              className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
              src={ticket.hinhAnh}
            />
            <div className="flex-grow sm:pl-8">
              <h2 className="title-font font-medium text-lg text-gray-900">
                {ticket.tenPhim}
              </h2>
              <p>
                Địa điểm: {seat.maHeThongRap} - {seat.tenRap}
              </p>

              <p>Địa chỉ: {ticket.diaChi}</p>

              <p className="">
                Ngày đặt:{" "}
                {moment(ticket.ngayDat).format("hh:mm A - DD-MM-YYYY")}
              </p>
              <p>
                Ngày chiếu:{ticket.gioChieu} - {ticket.ngayChieu}
              </p>
              <p>Ghế: {seat.tenGhe.join(", ")}</p>
              <p>Giá vé: {ticket.giaVe}</p>
            </div>
          </div>
        </div>
      );
    });
  };

  const totalItems = detailUser.thongTinDatVe?.length || 0;

  return (
    <div className="p-5">
      <section className="text-gray-600 body-font">
        <div className="container px-5 mx-auto">
          <div className="flex flex-wrap -m-4">{renderTicketItems()}</div>
          <div className="flex justify-end mt-6">
            <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={totalItems}
              onChange={handlePageChange}
              className="mt-4"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default OrderHistory;
