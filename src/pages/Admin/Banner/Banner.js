import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { quanLyPhimService } from "../../../services/QuanLyPhimService";
import { saveDanhSachBannerAction } from "../../../redux/actions/CarouselActions";
import { useDispatch } from "react-redux";
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const Banner = () => {
  const [dataSource, setDataSource] = useState([]);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const getBanner = async () => {
      try {
        const result = await quanLyPhimService.layDanhSachBanner();
        setDataSource(
          result.data.data.map((item, index) => ({
            key: index,
            maBanner: item.maBanner,
            trailer: item.trailer,
            hinhAnh: item.hinhAnh,
          }))
        );
        setCount(result.data.data.length);
      } catch (errors) {
        console.log("errors", errors);
      }
    };
    getBanner();
  }, []);

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const handleAdd = () => {
    const newData = {
      key: count,
      maBanner: `${count + 1}`,
      trailer: "Nhập vào link trailer",
      hinhAnh: "Nhập vào link hình ảnh",
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const defaultColumns = [
    {
      title: "Mã Banner",
      dataIndex: "maBanner",
      width: "30%",
      editable: false,
    },
    {
      title: "Trailer",
      dataIndex: "trailer",
      editable: true,
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      editable: true,
      render: (text) => (
        <img src={text} alt="banner" style={{ width: "100px" }} />
      ),
    },
    {
      title: "Action",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource?.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <DeleteOutlined
              className="text-2xl mr-2"
              style={{ color: "red", cursor: "pointer" }}
            />
          </Popconfirm>
        ) : null,
    },
  ];

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const handleComplete = () => {
    console.log(dataSource);
    const action = saveDanhSachBannerAction(dataSource);
    dispatch(action);
    alert("Cập nhật thành công");
  };

  return (
    <div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Thêm mới Banner
      </Button>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
      <div className="flex justify-center">
        <Button className="bg-blue-500 text-white " onClick={handleComplete}>
          <p className="text-xl">Hoàn tất</p>
        </Button>
      </div>
    </div>
  );
};

export default Banner;
