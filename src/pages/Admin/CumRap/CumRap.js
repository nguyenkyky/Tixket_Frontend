import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, Fragment } from "react";
import {
  layDanhSachHeThongRapAction,
  deleteHeThongRapAction,
  deleteCumRapAction,
} from "../../../redux/actions/QuanLyRapActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Button, Modal } from "antd";
import { toast, ToastContainer } from "react-toastify";

function CumRap() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);

  useEffect(() => {
    const action = layDanhSachHeThongRapAction();
    dispatch(action);
  }, [dispatch]);

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    const handleDeleteHeThongRap = (maHeThongRap) => {
      Modal.confirm({
        title: `Bạn có chắc muốn xóa hệ thống rạp này không: ${row.tenHeThongRap}?`,
        okText: "Đồng ý",
        okType: "danger",
        cancelText: "Hủy",
        onOk: async () => {
          try {
            await dispatch(deleteHeThongRapAction(maHeThongRap));
            toast.success("Đã xóa hệ thống rạp thành công!", {
              position: "top-center",
              onClose: () => {
                dispatch(layDanhSachHeThongRapAction());
              },
            });
          } catch (error) {
            console.log("errors", error);
          }
        },
      });
    };

    const handleDeleteCumRap = (maCumRap, tenCumRap) => {
      Modal.confirm({
        title: `Bạn có chắc muốn xóa cụm rạp này không: ${tenCumRap}?`,
        okText: "Đồng ý",
        okType: "danger",
        cancelText: "Hủy",
        onOk: async () => {
          try {
            await dispatch(deleteCumRapAction(maCumRap));
            toast.success("Đã xóa cụm rạp thành công!", {
              position: "top-center",
              onClose: () => {
                dispatch(layDanhSachHeThongRapAction());
              },
            });
          } catch (error) {
            console.log("errors", error);
          }
        },
      });
    };

    const handleThemCumRap = (maHeThongRap, tenHeThongRap) => {
      navigate(`/admin/cumrap/create/${maHeThongRap}`);
      localStorage.setItem("tenHeThongRap", tenHeThongRap);
    };

    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.tenHeThongRap}
          </TableCell>
          <TableCell>{row.maHeThongRap}</TableCell>
          <TableCell>
            <img
              src={row.logo}
              alt={row.tenHeThongRap}
              width={50}
              height={50}
            />
          </TableCell>
          <TableCell>{row.cumRapChieu.length}</TableCell>
          <TableCell>
            <Fragment>
              <NavLink
                key="1"
                className="mr-2 text-2xl"
                to={`/admin/cumrap/edit/${row.maHeThongRap}`}
              >
                <EditOutlined style={{ color: "blue" }} />
              </NavLink>
              <DeleteOutlined
                key="2"
                className="text-2xl mr-2"
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => handleDeleteHeThongRap(row.maHeThongRap)}
              />
            </Fragment>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <div className="flex items-start mt-8 mb-8">
                  <Typography variant="h6" gutterBottom component="div">
                    Cụm Rạp Chiếu
                  </Typography>
                  <Button
                    className="bg-blue-500  text-white ml-8"
                    onClick={() =>
                      handleThemCumRap(row.maHeThongRap, row.tenHeThongRap)
                    }
                  >
                    Thêm Cụm Rạp +
                  </Button>
                </div>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Tên cụm rạp</TableCell>
                      <TableCell>Mã cụm rạp</TableCell>
                      <TableCell>Hình ảnh</TableCell>
                      <TableCell>Địa chỉ</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.cumRapChieu.map((cumRap) => (
                      <TableRow key={cumRap.maCumRap}>
                        <TableCell>{cumRap.tenCumRap}</TableCell>
                        <TableCell component="th" scope="row">
                          {cumRap.maCumRap}
                        </TableCell>
                        <TableCell>
                          <img
                            src={cumRap.hinhAnh}
                            alt={cumRap.maCumRap}
                            width={50}
                            height={50}
                          />
                        </TableCell>

                        <TableCell>{cumRap.diaChi}</TableCell>
                        <TableCell>
                          <Fragment>
                            <NavLink
                              key="1"
                              className="mr-2 text-2xl"
                              to={`/admin/cumrap/edit/${row.maHeThongRap}/${cumRap.maCumRap}`}
                            >
                              <EditOutlined style={{ color: "blue" }} />
                            </NavLink>
                            <DeleteOutlined
                              key="2"
                              className="text-2xl mr-2"
                              style={{ color: "red", cursor: "pointer" }}
                              onClick={() =>
                                handleDeleteCumRap(
                                  cumRap.maCumRap,
                                  cumRap.tenCumRap
                                )
                              }
                            />
                          </Fragment>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  Row.propTypes = {
    row: PropTypes.shape({
      tenHeThongRap: PropTypes.string.isRequired,
      maHeThongRap: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
      cumRapChieu: PropTypes.arrayOf(
        PropTypes.shape({
          maCumRap: PropTypes.string.isRequired,
          tenCumRap: PropTypes.string.isRequired,
          diaChi: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
  };

  return (
    <div>
      <ToastContainer />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Hệ thống rạp</TableCell>
              <TableCell>Mã hệ thống rạp</TableCell>
              <TableCell>Hình ảnh</TableCell>
              <TableCell>Số cụm rạp</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {heThongRapChieu.map((heThongRap) => (
              <Row key={heThongRap.maHeThongRap} row={heThongRap} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CumRap;
