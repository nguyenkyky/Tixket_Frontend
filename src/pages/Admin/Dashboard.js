import React, { useEffect, useState, useRef } from "react";
import {
  DiffFilled,
  EuroCircleFilled,
  FunnelPlotFilled,
  SyncOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { layDanhSachPhimAction } from "../../redux/actions/QuanLyPhimAction";
import { useDispatch } from "react-redux";
import { quanLyThongKeService } from "../../services/QuanLyThongKeService";
import { Select, Popover } from "antd";
import {
  syncDataAction,
  thongKeTheoThangAction,
  thongKeThangTruocAction,
  thongKe7NgayAction,
} from "../../redux/actions/ThongKeAction";

import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import moment from "moment";

const { Option } = Select;

const calculatePercentChange = (current, previous) => {
  if (previous === 0) {
    return current === 0 ? 0 : 100;
  }
  return ((current - previous) / previous) * 100;
};

function Dashboard(props) {
  const chartRef = useRef(null);
  const [visibleRap, setVisibleRap] = useState(false);
  const [visiblePhim, setVisiblePhim] = useState(false);

  const [selectedRapAmount, setSelectedRapAmount] = useState(0);
  const [selectedRapTickets, setSelectedRapTickets] = useState(0);
  const [selectedRapAmountTruoc, setSelectedRapAmountTruoc] = useState(0);
  const [selectedRapTicketsTruoc, setSelectedRapTicketsTruoc] = useState(0);

  const [selectedPhimAmount, setSelectedPhimAmount] = useState(0);
  const [selectedPhimTickets, setSelectedPhimTickets] = useState(0);
  const [selectedPhimAmountTruoc, setSelectedPhimAmountTruoc] = useState(0);
  const [selectedPhimTicketsTruoc, setSelectedPhimTicketsTruoc] = useState(0);

  const { thongKeTheoThang } = useSelector((state) => state.ThongKeReducer);
  const { thongKeThangTruoc } = useSelector((state) => state.ThongKeReducer);
  const { thongKe7Ngay } = useSelector((state) => state.ThongKeReducer);

  // console.log(thongKeTheoThang);
  const { arrFilmDefault } = useSelector((state) => state.QuanLyPhimReducer);

  const danhSachRap = [
    "BHD Star Cineplex",
    "CGV",
    "Galaxy Cinema",
    "Lotte Cinema",
  ];

  const xLabels = [];
  for (let i = 6; i >= 0; i--) {
    xLabels.push(moment().subtract(i, "days").format("YYYY-MM-DD"));
  }

  const xLabelRender = [];
  for (let i = 6; i >= 0; i--) {
    xLabelRender.push(moment().subtract(i, "days").format("DD-MM"));
  }

  const revenueDataAmount = {
    "BHD Star Cineplex": new Array(7).fill(0),
    CGV: new Array(7).fill(0),
    "Galaxy Cinema": new Array(7).fill(0),
    "Lotte Cinema": new Array(7).fill(0),
  };

  const revenueDataTickets = {
    "BHD Star Cineplex": new Array(7).fill(0),
    CGV: new Array(7).fill(0),
    "Galaxy Cinema": new Array(7).fill(0),
    "Lotte Cinema": new Array(7).fill(0),
  };

  thongKe7Ngay?.forEach((entry) => {
    const index = xLabels.indexOf(entry.ngayDat);
    if (index !== -1) {
      revenueDataAmount[entry.tenHeThongRap][index] = entry.totalAmount;
      revenueDataTickets[entry.tenHeThongRap][index] = entry.totalTickets;
    }
  });

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const sizing = {
    margin: { right: 5 },
    width: 300,
    height: 300,
    legend: { hidden: true },
  };

  const topMovies = [];
  thongKeTheoThang?.detailedReport?.forEach((heThongRap) => {
    heThongRap.cumRapDetails?.forEach((cumRap) => {
      cumRap.phimDetails?.forEach((phim) => {
        const existingMovie = topMovies.find((m) => m.maPhim === phim.maPhim);
        if (existingMovie) {
          existingMovie.totalAmount += phim.totalAmount;
        } else {
          topMovies.push({
            maPhim: phim.maPhim,
            tenPhim: phim.tenPhim,
            totalAmount: phim.totalAmount,
            color: colors[topMovies.length % colors.length],
          });
        }
      });
    });
  });

  topMovies.sort((a, b) => b.totalAmount - a.totalAmount);
  const top4Movies = topMovies.slice(0, 4);

  const pieData = top4Movies.map((movie) => ({
    label: movie.tenPhim,
    value: movie.totalAmount,
    color: movie.color,
  }));

  const TOTAL = pieData.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  // console.log(revenueDataAmount);
  const dispatch = useDispatch();

  const handleChangeRap = (value) => {
    const selectedRap = thongKeTheoThang?.detailedReport.find(
      (heThongRap) => heThongRap.tenHeThongRap === value
    );
    const selectedRapTruoc = thongKeThangTruoc?.detailedReport.find(
      (heThongRap) => heThongRap.tenHeThongRap === value
    );
    if (selectedRap) {
      setSelectedRapTickets(selectedRap.totalTickets);
      setSelectedRapAmount(selectedRap.totalAmount);
      setSelectedRapTicketsTruoc(
        selectedRapTruoc ? selectedRapTruoc.totalTickets : 0
      );
      setSelectedRapAmountTruoc(
        selectedRapTruoc ? selectedRapTruoc.totalAmount : 0
      );
    } else {
      setSelectedRapAmount(0);
      setSelectedRapAmountTruoc(0);
    }
  };

  const handleChangePhim = (value) => {
    let totalAmount = 0;
    let totalTickets = 0;
    let totalAmountTruoc = 0;
    let totalTicketsTruoc = 0;
    thongKeTheoThang?.detailedReport.forEach((heThongRap) => {
      heThongRap.cumRapDetails.forEach((cumRap) => {
        cumRap.phimDetails.forEach((phim) => {
          if (phim.maPhim === value) {
            totalAmount += phim.totalAmount;
            totalTickets += phim.totalTickets;
          }
        });
      });
    });
    thongKeThangTruoc?.detailedReport.forEach((heThongRap) => {
      heThongRap.cumRapDetails.forEach((cumRap) => {
        cumRap.phimDetails.forEach((phim) => {
          if (phim.maPhim === value) {
            totalAmountTruoc += phim.totalAmount;
            totalTicketsTruoc += phim.totalTickets;
          }
        });
      });
    });
    setSelectedPhimTickets(totalTickets);
    setSelectedPhimAmount(totalAmount);
    setSelectedPhimTicketsTruoc(totalTicketsTruoc);
    setSelectedPhimAmountTruoc(totalAmountTruoc);
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(thongKeTheoThangAction());
      dispatch(thongKeThangTruocAction());
      dispatch(thongKe7NgayAction());
      dispatch(layDanhSachPhimAction());
    };

    const svgElement = chartRef.current.querySelector("svg");
    if (svgElement) {
      svgElement.setAttribute("viewBox", "-30 0 600 600");
    }

    fetchData();
  }, []);

  const handleVisibleChangeRap = (visible) => {
    setVisibleRap(visible);
  };
  const handleVisibleChangePhim = (visible) => {
    setVisiblePhim(visible);
  };

  const contentRap = (
    <Select
      onChange={handleChangeRap}
      style={{ width: "200px" }}
      placeholder="Chọn rạp"
    >
      {danhSachRap.map((heThongRap, index) => (
        <Option key={index} value={heThongRap}>
          {heThongRap}
        </Option>
      ))}
    </Select>
  );

  const contentPhim = (
    <Select
      onChange={handleChangePhim}
      style={{ width: "200px" }}
      placeholder="Chọn phim"
    >
      {arrFilmDefault.map((phim) => (
        <Option key={phim.maPhim} value={phim.maPhim}>
          {phim.tenPhim}
        </Option>
      ))}
    </Select>
  );

  const percentChangeVe = calculatePercentChange(
    thongKeTheoThang.totalTickets,
    thongKeThangTruoc.totalTickets
  );
  const percentChangeDoanhThu = calculatePercentChange(
    thongKeTheoThang.totalAmount,
    thongKeThangTruoc.totalAmount
  );
  const percentChangeRap = calculatePercentChange(
    selectedRapAmount,
    selectedRapAmountTruoc
  );
  const percentChangePhim = calculatePercentChange(
    selectedPhimAmount,
    selectedPhimAmountTruoc
  );

  const handleSync = () => {
    const action = syncDataAction();
    dispatch(action);
  };

  return (
    <div>
      <div className="doanh-thu ">
        <div className="grid grid-cols-12 flex justify-between gap-4">
          <div
            style={{
              backgroundColor: "#FDFCF0",
              borderRadius: "16px",
              width: "90%",
              padding: "20px",
            }}
            className="col-span-3 flex justify-between "
          >
            <div className="w-full">
              <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                Số lượng vé
              </div>
              <div style={{ fontSize: "30px", fontWeight: "bold" }}>
                {thongKeTheoThang?.totalTickets}
              </div>
              <div className="flex justify-between">
                <div style={{ color: "red" }}>
                  {percentChangeVe > 0 ? (
                    <span style={{ color: "green" }}>
                      ↑ {percentChangeVe.toFixed(2)}% So với tháng trước
                    </span>
                  ) : (
                    <span style={{ color: "red" }}>
                      ↓ {Math.abs(percentChangeVe).toFixed(2)}% So với tháng
                      trước
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div>
              <DiffFilled style={{ fontSize: "40px" }} />
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#FDFCF0",
              borderRadius: "16px",
              width: "90%",
              padding: "20px",
            }}
            className="col-span-3 flex justify-between "
          >
            <div>
              <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                Doanh thu
              </div>
              <div style={{ fontSize: "30px", fontWeight: "bold" }}>
                {thongKeTheoThang?.totalAmount?.toLocaleString()} đ
              </div>
              <div style={{ color: "red" }}>
                {percentChangeDoanhThu > 0 ? (
                  <span style={{ color: "green" }}>
                    ↑ {percentChangeDoanhThu.toFixed(2)}% So với tháng trước
                  </span>
                ) : (
                  <span style={{ color: "red" }}>
                    ↓ {Math.abs(percentChangeDoanhThu).toFixed(2)}% So với tháng
                    trước
                  </span>
                )}
              </div>
            </div>
            <div>
              <EuroCircleFilled style={{ fontSize: "40px" }} />
            </div>
          </div>{" "}
          <div
            style={{
              backgroundColor: "#FDFCF0",
              borderRadius: "16px",
              width: "90%",
              padding: "20px",
            }}
            className="col-span-3 flex justify-between "
          >
            <div className="col-span-2 w-full">
              <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                Thống kê theo rạp
              </div>
              <div className="flex items-end justify-between">
                <div style={{ fontSize: "30px", fontWeight: "bold" }}>
                  {selectedRapAmount?.toLocaleString()}
                </div>
                <div style={{ fontSize: "14px", marginBottom: "6px" }}>
                  {selectedRapTickets} vé đã bán
                </div>
              </div>
              <div style={{ color: "red" }}>
                {percentChangeRap > 0 ? (
                  <span style={{ color: "green" }}>
                    ↑ {percentChangeRap.toFixed(2)}% So với tháng trước
                  </span>
                ) : (
                  <span style={{ color: "red" }}>
                    ↓ {Math.abs(percentChangeRap).toFixed(2)}% So với tháng
                    trước
                  </span>
                )}
              </div>
            </div>
            <div className="col-span-1">
              <Popover
                content={contentRap}
                trigger="click"
                open={visibleRap}
                onOpenChange={handleVisibleChangeRap}
              >
                <FunnelPlotFilled
                  style={{ fontSize: "40px", cursor: "pointer" }}
                />
              </Popover>
            </div>
          </div>{" "}
          <div
            style={{
              backgroundColor: "#FDFCF0",
              borderRadius: "16px",
              width: "90%",
              padding: "20px",
            }}
            className="col-span-3 flex justify-between "
          >
            <div className="col-span-2 w-full">
              <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                Thống kê theo phim
              </div>
              <div className="flex items-end justify-between">
                <div style={{ fontSize: "30px", fontWeight: "bold" }}>
                  {selectedPhimAmount?.toLocaleString()}
                </div>
                <div style={{ fontSize: "14px", marginBottom: "6px" }}>
                  {selectedPhimTickets} vé đã bán
                </div>
              </div>
              <div style={{ color: "red" }}>
                {percentChangePhim > 0 ? (
                  <span style={{ color: "green" }}>
                    ↑ {percentChangePhim.toFixed(2)}% So với tháng trước
                  </span>
                ) : (
                  <span style={{ color: "red" }}>
                    ↓ {Math.abs(percentChangePhim).toFixed(2)}% So với tháng
                    trước
                  </span>
                )}
              </div>
            </div>
            <div className="col-span-1">
              <Popover
                content={contentPhim}
                trigger="click"
                open={visiblePhim}
                onOpenChange={handleVisibleChangePhim}
              >
                <FunnelPlotFilled
                  style={{ fontSize: "40px", cursor: "pointer" }}
                />
              </Popover>
            </div>
          </div>{" "}
        </div>
      </div>

      <div className="flex justify-center mt-4 mr-10" onClick={handleSync}>
        <SyncOutlined style={{ fontSize: "24px", cursor: "pointer" }} />
      </div>
      <div ref={chartRef} className="mt-4 flex justify-between">
        <div className="flex justify-center flex-col items-center">
          <LineChart
            width={600}
            height={600}
            series={[
              {
                data: revenueDataAmount["BHD Star Cineplex"],
                label: "BHD Star Cineplex",
              },
              { data: revenueDataAmount["CGV"], label: "CGV" },
              {
                data: revenueDataAmount["Galaxy Cinema"],
                label: "Galaxy Cinema",
              },
              {
                data: revenueDataAmount["Lotte Cinema"],
                label: "Lotte Cinema",
              },
            ]}
            xAxis={[{ scaleType: "point", data: xLabelRender }]}
          />
          <h3 className="text-l font-semibold">Doanh thu 7 ngày gần nhất</h3>
        </div>
        <div className="flex items-center flex-col">
          <PieChart
            series={[
              {
                outerRadius: 100,
                data: pieData,
                arcLabel: getArcLabel,
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: "white",
                fontSize: 14,
              },
            }}
            {...sizing}
          />
          <h3 className="text-l font-semibold">Doanh thu theo phim</h3>
        </div>
        <div className="flex justify-center flex-col items-center">
          <LineChart
            width={600}
            height={600}
            series={[
              {
                data: revenueDataTickets["BHD Star Cineplex"],
                label: "BHD Star Cineplex",
              },
              { data: revenueDataTickets["CGV"], label: "CGV" },
              {
                data: revenueDataTickets["Galaxy Cinema"],
                label: "Galaxy Cinema",
              },
              {
                data: revenueDataTickets["Lotte Cinema"],
                label: "Lotte Cinema",
              },
            ]}
            xAxis={[{ scaleType: "point", data: xLabelRender }]}
          />
          <h3 className="text-l font-semibold">Số lượng vé 7 ngày gần nhất</h3>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
