import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllShowTimesAction,
  deleteShowtimeAction,
} from "../../redux/actions/QuanLyPhimAction";
import moment from "moment";

const AutoDeleteShowtimes = () => {
  const dispatch = useDispatch();
  const arrShowTimes = useSelector(
    (state) => state.QuanLyPhimReducer.arrShowTimes
  );
  const [localShowTimes, setLocalShowTimes] = useState([]);

  useEffect(() => {
    // Hàm để lấy danh sách lịch chiếu
    const fetchShowtimes = async () => {
      await dispatch(getAllShowTimesAction());
    };

    // Gọi hàm lần đầu tiên khi component mount
    fetchShowtimes();

    // Đặt interval để gọi hàm mỗi phút
    const interval = setInterval(() => {
      fetchShowtimes();
    }, 60000); // Kiểm tra mỗi phút

    // Hàm dọn dẹp interval khi component bị unmount
    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    if (arrShowTimes?.data) {
      setLocalShowTimes(arrShowTimes.data);
    }
  }, [arrShowTimes]);

  useEffect(() => {
    const currentTime = moment();

    localShowTimes?.forEach((showtime) => {
      const showtimeMoment = moment(showtime.ngayChieuGioChieu);
      if (currentTime.isSameOrAfter(showtimeMoment)) {
        dispatch(deleteShowtimeAction(showtime.maLichChieu));
      }
    });
  }, [localShowTimes, dispatch]);

  return null; // Component này không cần render gì cả
};

export default AutoDeleteShowtimes;
