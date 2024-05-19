import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { layThongTinPhimAction } from "../../../redux/actions/QuanLyPhimAction";
import moment from "moment";
import { Card, Row, Col, Tag, Image, Button } from "antd";
import "./style.css";

function Detail(props) {
  const { id, tenPhim } = useParams();
  const dispatch = useDispatch();
  const { thongTinPhim } = useSelector((state) => state.QuanLyPhimReducer);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(layThongTinPhimAction(id));
  }, [id, dispatch]);

  const handleEditMovie = () => {
    navigate(`/admin/films/edit/${id}/${tenPhim}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div className="flex justify-between ">
        <h3 className="text-3xl mb-5">Chi tiết phim</h3>
        <div className="">
          <Button type="primary" onClick={handleEditMovie}>
            Chỉnh sửa phim
          </Button>
        </div>
      </div>
      {thongTinPhim && (
        <Card>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12}>
              <Image
                src={thongTinPhim.hinhAnh}
                alt={thongTinPhim.tenPhim}
                style={{ width: "800px", height: "500px" }}
              />
            </Col>
            <Col xs={24} sm={24} md={12}>
              <h2 className="text-4xl mb-2 font-bold text-gray-600">
                {thongTinPhim.tenPhim}
              </h2>
              <p className="text-xl mb-2">
                <strong className="text-xl">Trailer:</strong>{" "}
                <a
                  className="text-xl text-blue-500"
                  href={thongTinPhim.trailer}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Xem trailer
                </a>
              </p>
              <p className="text-xl mb-2">
                <strong className="">Mô tả:</strong> {thongTinPhim.moTa}
              </p>
              <p className="text-xl mb-2">
                <strong>Đạo diễn:</strong> {thongTinPhim.daoDien}
              </p>
              <p className="text-xl mb-2">
                <strong>Diễn viên:</strong>{" "}
                {thongTinPhim.dienVien && thongTinPhim.dienVien.join(", ")}
              </p>
              <p className="text-xl mb-2">
                <strong>Thời lượng:</strong> {thongTinPhim.thoiLuong} phút
              </p>
              <p className="text-xl mb-2">
                <strong>Ngày khởi chiếu:</strong>{" "}
                {thongTinPhim.ngayKhoiChieu
                  ? moment(thongTinPhim.ngayKhoiChieu).format("DD/MM/YYYY")
                  : ""}
              </p>
              <p className="text-xl mb-2">
                <strong>Đang chiếu:</strong>{" "}
                {thongTinPhim.dangChieu ? (
                  <Tag color="blue" className="custom-tag">
                    Có
                  </Tag>
                ) : (
                  <Tag color="red" className="custom-tag">
                    Không
                  </Tag>
                )}
              </p>
              <p className="text-xl mb-2">
                <strong>Sắp chiếu:</strong>{" "}
                {thongTinPhim.sapChieu ? (
                  <Tag color="blue" className="custom-tag">
                    Có
                  </Tag>
                ) : (
                  <Tag color="red" className="custom-tag">
                    Không
                  </Tag>
                )}
              </p>
              <p className="text-xl mb-2">
                <strong>Phim Hot:</strong>{" "}
                {thongTinPhim.hot ? (
                  <Tag color="blue" className="custom-tag">
                    Có
                  </Tag>
                ) : (
                  <Tag color="red" className="custom-tag">
                    Không
                  </Tag>
                )}
              </p>
              <p className="text-xl mb-2">
                <strong>Đánh giá:</strong> {thongTinPhim.danhGia}/10
              </p>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  );
}

export default Detail;
