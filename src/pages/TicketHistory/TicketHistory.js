import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { layThongTinDatVe } from "../../redux/actions/QuanLyNguoiDungAction";
import _ from "lodash";
import moment from "moment";

const TicketHistory = (props) => {
  const dispatch = useDispatch();
  const { thongTinDatVe } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  console.log("thongTinDatVe", thongTinDatVe);

  useEffect(() => {
    const action = layThongTinDatVe();
    dispatch(action);
  }, []);

  const renderTicketItems = () => {
    return thongTinDatVe.thongTinDatVe
      ?.sort((a, b) => new Date(b.ngayDat) - new Date(a.ngayDat))
      .map((ticket, index) => {
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

  return (
    <div className="p-5">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="text-2xl font-medium title-font mb-4 text-gray-900 text-purple-600 tracking-widest">
              LỊCH SỬ ĐẶT VÉ
            </h1>
          </div>
          <div className="flex flex-wrap -m-4">{renderTicketItems()}</div>
        </div>
      </section>
    </div>
  );
};

export default TicketHistory;
