import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DashboardLayout from "../Dashboard/DashboardLayout";
import { StoreContext } from "../../../context/StoreContext";
import { API_URL } from "../../../store/apiUrl";
import {
  Tabs,
  Table,
  Button,
  Switch,
  Popconfirm,
  QRCode,
  Modal,
  Form,
  Input,
} from "antd";
import "../../../stylesheets/Admin/CommonStyle.css";

const { TabPane } = Tabs;

const ManageTablePage = () => {
  const [allTables, setAllTables] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const [selectedTableId, setSelectedTableId] = useState(null); // State to store selected table ID for QR code
  const { token } = useContext(StoreContext);

  const initialFormData = {
    table_name: "",
    capacity: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleNumberChange = (value, name) => {
    const numberValue = parseInt(value, 10);
    setFormData({
      ...formData,
      [name]: isNaN(numberValue) ? null : numberValue,
    });
  };

  const onSubmit = async () => {
    const formattedData = {
      ...formData,
      is_booked: false,
    };

    try {
      const response = await axios.post(
        `${API_URL}/api/table/add`,
        formattedData,
        {
          headers: { token },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Table added successfully!");
        setFormData(initialFormData);
        fetchAllTables(); // Fetch Tables again to update the list
      } else {
        toast.error("Failed to add Table.");
      }
    } catch (error) {
      toast.error("Error in adding Table.");
    }
  };

  const fetchAllTables = async () => {
    if (!token) return;

    try {
      const response = await axios.get(`${API_URL}/api/table/allTables`, {
        headers: { token },
      });
      if (response.data) {
        const tables = response.data;
        setAllTables(tables);
      } else {
        toast.error("Failed to fetch Tables.");
      }
    } catch (error) {
      toast.error("Failed to fetch Tables.");
    }
  };

  useEffect(() => {
    fetchAllTables();
  }, [token]);

  const handleStatusChange = async (record) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/table/update/${record._id}`,
        { is_booked: !record.is_booked },
        {
          headers: { token },
        }
      );
      if (response.status === 200) {
        toast.success("Table booking status updated successfully!");
        fetchAllTables(); // Refresh the Table list
      } else {
        toast.error("Failed to update Table booking status.");
      }
    } catch (error) {
      toast.error("Error in updating Table booking status.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/api/table/delete/${id}`, {
        headers: { token },
      });
      if (response.status === 200) {
        toast.success("Table deleted successfully!");
        fetchAllTables(); // Refresh the Table list
      } else {
        toast.error("Failed to delete Table.");
      }
    } catch (error) {
      toast.error("Error in deleting Table.");
    }
  };

  const handleShowQR = (tableId) => {
    setSelectedTableId(tableId);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const commonColumns = [
    {
      title: "Table Name",
      dataIndex: "table_name",
      key: "table_name",
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
    },
    {
      title: "Booking Status",
      key: "is_booked",
      render: (text, record) => (
        <Switch
          checked={record.is_booked}
          onChange={() => handleStatusChange(record)}
        />
      ),
    },
    {
      title: "Table QR",
      key: "actions",
      render: (text, record) => (
        <Button type="primary" onClick={() => handleShowQR(record._id)}>
          Get QR
        </Button>
      ),
    },
  ];

  const allTablesColumns = [
    ...commonColumns,
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Popconfirm
          title="Are you sure to delete this Table?"
          onConfirm={() => handleDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const allTablesData = allTables.map((table) => ({
    ...table,
    key: table._id,
  }));
  const bookedTablesData = allTables.filter((table) => table.is_booked);
  const availableTablesData = allTables.filter((table) => !table.is_booked);

  const userRole = localStorage.getItem("userRole");

  return (
    <DashboardLayout>
      <div className="common-style">
        <h3 style={{ marginBottom: "1rem" }}>Table Page</h3>

        {userRole === "admin" && (
          <div>
            <Form className="row form-row" onFinish={onSubmit}>
              <div className="col-md-6">
                <Form.Item
                  name="table_name"
                  rules={[
                    { required: true, message: "Please input the table name!" },
                  ]}
                >
                  <Input
                    placeholder="Table Name"
                    value={formData.table_name}
                    onChange={(e) => handleChange(e.target.value, "table_name")}
                  />
                </Form.Item>
              </div>

              <div className="col-md-6">
                <Form.Item
                  name="capacity"
                  rules={[
                    { required: true, message: "Please input the capacity!" },
                  ]}
                >
                  <Input
                    placeholder="Capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) =>
                      handleNumberChange(e.target.value, "capacity")
                    }
                  />
                </Form.Item>
              </div>

              <div>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Add Table
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        )}

        <hr />

        <div className="promotions">
          <Tabs defaultActiveKey="1">
            <TabPane tab="All" key="1">
              <Table
                dataSource={allTablesData}
                columns={
                  userRole === "admin" ? allTablesColumns : commonColumns
                }
                scroll={{ x: 500 }}
              />
            </TabPane>
            <TabPane tab="Booked" key="2">
              <Table
                dataSource={bookedTablesData}
                columns={commonColumns}
                scroll={{ x: 500 }}
              />
            </TabPane>
            <TabPane tab="Available" key="3">
              <Table
                dataSource={availableTablesData}
                columns={commonColumns}
                scroll={{ x: 500 }}
              />
            </TabPane>
          </Tabs>
        </div>

        {/* Modal to display QR Code */}
        <Modal
          visible={modalVisible}
          title="QR Code"
          onCancel={handleModalClose}
          footer={[
            <Button key="close" onClick={handleModalClose}>
              Close
            </Button>,
            <Button
              key="download"
              type="primary"
              href={`https://skyhutcafe.com/offline-menu?table_id=${selectedTableId}&mode=offline`}
            >
              Download QR
            </Button>,
          ]}
        >
          <QRCode
            value={`https://skyhutcafe.com/offline-menu?table_id=${selectedTableId}&mode=offline`}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default ManageTablePage;
