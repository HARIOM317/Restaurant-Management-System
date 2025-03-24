import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DashboardLayout from "../../Admin/Dashboard/DashboardLayout";
import { StoreContext } from "../../../context/StoreContext";
import { API_URL } from "../../../store/apiUrl";
import { Tabs, Table, Button, Switch, QRCode, Modal } from "antd";
import "../../../stylesheets/Admin/CommonStyle.css";

const { TabPane } = Tabs;

const StaffManageTablePage = () => {
  const [allTables, setAllTables] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const [selectedTableId, setSelectedTableId] = useState(null); // State to store selected table ID for QR code
  const { token } = useContext(StoreContext);

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

  const allTablesData = allTables.map((table) => ({
    ...table,
    key: table._id,
  }));
  const bookedTablesData = allTables.filter((table) => table.is_booked);
  const availableTablesData = allTables.filter((table) => !table.is_booked);

  return (
    <DashboardLayout>
      <div className="common-style">
        <h3 style={{ marginBottom: "1rem" }}>Table Page</h3>

        <Tabs defaultActiveKey="1">
          <TabPane tab="All" key="1">
            <Table
              dataSource={allTablesData}
              columns={commonColumns}
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
    </DashboardLayout>
  );
};

export default StaffManageTablePage;
