import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Cascader,
  DatePicker,
  InputNumber,
  Select,
  Tabs,
} from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { quanLyRapService } from "../../../services/QuanLyRapService";
import { useDispatch } from "react-redux";
import { quanLyPhimService } from "../../../services/QuanLyPhimService";
import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";
import moment from "moment-timezone";

dayjs.extend(advancedFormat);

function Calendar(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
    selectedHeThongRap: "",
    selectedCumRap: "",
    lichChieu: [],
  });
  const onChaneHeThongRap = async (value) => {
    const result = await quanLyRapService.layThongTinCumRap(value);

    if (result) {
      setState({
        ...state,
        cumRapChieu: result.data.cumRapChieu,
        selectedHeThongRap: value,
      });
    }
  };

  const onChaneCumRap = (value) => {
    setState({
      ...state,
      selectedCumRap: value,
    });
  };

  const handleSearch = async () => {
    const { selectedHeThongRap, selectedCumRap } = state;
    console.log(selectedHeThongRap);
    console.log(selectedCumRap);

    if (selectedHeThongRap && selectedCumRap) {
      // Call API to get lich chieu based on selectedHeThongRap and selectedCumRap
      const result = await quanLyRapService.layLichChieuTheoRap(
        selectedHeThongRap,
        selectedCumRap
      );

      setState({
        ...state,
        lichChieu: result.data,
      });
    }
  };

  const getNextSevenDays = () => {
    return new Array(14)
      .fill(null)
      .map((_, i) => dayjs().add(i, "day").format("YYYY-MM-DD"));
  };
  const nextSevenDays = getNextSevenDays();

  const handleDelete = async (maLichChieu) => {
    await quanLyPhimService.xoaLichChieuPhim(maLichChieu);
    setState((prevState) => ({
      ...prevState,
      lichChieu: {
        ...prevState.lichChieu,
        danhSachPhim: prevState.lichChieu.danhSachPhim.map((phim) => ({
          ...phim,
          lstLichChieuTheoPhim: phim.lstLichChieuTheoPhim.filter(
            (lichChieu) => lichChieu.maLichChieu !== maLichChieu
          ),
        })),
      },
    }));
  };

  const handleAddLichChieu = (maPhim) => {
    navigate(`/admin/calendar/create/${maPhim}`);
  };

  const renderLichChieu = () => {
    const { lichChieu } = state;
    return (
      <Tabs
        type="card"
        items={nextSevenDays.map((date, i) => {
          const filteredMovies = lichChieu.danhSachPhim?.reduce(
            (acc, phim, index) => {
              const lichChieuPhuHop = phim.lstLichChieuTheoPhim.filter(
                (lichChieu) =>
                  dayjs(lichChieu.ngayChieuGioChieu).format("YYYY-MM-DD") ===
                  date
              );
              if (lichChieuPhuHop.length > 0) {
                const movieDetails = (
                  <div key={index} className="mt-5 ">
                    <div className="flex">
                      <img
                        src={phim.hinhAnh}
                        alt={phim.hinhAnh}
                        width="100"
                        height="100"
                        onError={(e) => {
                          e.target.onError = null;
                          e.target.src = "https://i.ibb.co/cTfFTYP/Layer-2.png";
                        }}
                      />
                      <div className="ml-2">
                        <h1 className="text-xl text-red-500">{phim.tenPhim}</h1>
                        <p>120 phút</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                      {lichChieuPhuHop?.map((lichChieu, idx) => (
                        <div
                          key={idx}
                          className="relative border border-gray-300 p-2 text-center mt-2 mr-2"
                        >
                          <span
                            className="absolute text-white bg-red-500 rounded-full px-2  cursor-pointer"
                            style={{ right: "-10px", top: "-10px" }}
                            onClick={() => handleDelete(lichChieu.maLichChieu)}
                          >
                            x
                          </span>
                          {moment(lichChieu.ngayChieuGioChieu)
                            .tz("Asia/Ho_Chi_Minh")
                            .format("hh:mm A")}
                        </div>
                      ))}
                      <div className="flex items-center justify-center mt-2">
                        <Button
                          className="bg-blue-500 text-white"
                          onClick={() => handleAddLichChieu(phim.maPhim)}
                        >
                          Thêm lịch chiếu phim
                        </Button>
                      </div>
                    </div>
                  </div>
                );
                acc.push(movieDetails);
              }
              return acc;
            },
            []
          );

          if (filteredMovies?.length === 0) {
            filteredMovies.push(
              <div key="no-shows" className="mt-5 text-red-500">
                Xin lỗi, không có suất chiếu vào ngày này, hãy chọn một ngày
                khác.
              </div>
            );
          }

          return {
            label: dayjs(date).format("ddd D-M"),
            key: `tab-${i + 1}`,
            children: filteredMovies,
          };
        })}
      />
    );
  };
  useEffect(() => {
    async function fetchData() {
      const response = await quanLyRapService.layThongTinHeThongRap();

      setState({ ...state, heThongRapChieu: response.data.data });
    }
    fetchData();
  }, []);
  return (
    <div className="container">
      <div className="flex items-center justify-center">
        <h3 className="text-2xl mb-10">Lịch chiếu phim</h3>
      </div>
      <div className="flex justify-center">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            width: "800px",
          }}
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item label="Hệ thống rạp">
            <Select
              options={state.heThongRapChieu?.map((htr, index) => {
                return { label: htr.tenHeThongRap, value: htr.tenHeThongRap };
              })}
              placeholder="Chọn hệ thống rạp"
              onChange={onChaneHeThongRap}
            />
          </Form.Item>
          <Form.Item label="Cụm rap">
            <Select
              options={state.cumRapChieu?.map((htr, index) => {
                return { label: htr.tenCumRap, value: htr.maCumRap };
              })}
              placeholder="Chọn cụm rạp"
              onChange={onChaneCumRap}
            />
          </Form.Item>
        </Form>
      </div>
      <div className="flex items-center justify-center">
        <Button onClick={handleSearch}>Tìm kiếm lịch chiếu</Button>
      </div>

      <div className="mt-10">{renderLichChieu()}</div>
    </div>
  );
}

export default Calendar;
