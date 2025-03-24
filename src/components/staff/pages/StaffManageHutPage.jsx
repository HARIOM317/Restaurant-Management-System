import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DashboardLayout from "../../Admin/Dashboard/DashboardLayout";
import { StoreContext } from "../../../context/StoreContext";
import { API_URL } from "../../../store/apiUrl";
import { Tabs, Table, Switch } from "antd";
import "../../../stylesheets/Admin/CommonStyle.css";

const { TabPane } = Tabs;

const StaffManageHutPage = () => {
  const [allHuts, setAllHuts] = useState([]);
  const { token } = useContext(StoreContext);

  const fetchAllHuts = async () => {
    if (!token) return;

    try {
      const response = await axios.get(`${API_URL}/api/hut/allHuts`, {
        headers: { token },
      });
      if (response.data) {
        const huts = response.data;
        setAllHuts(huts);
      } else {
        toast.error("Failed to fetch huts.");
      }
    } catch (error) {
      toast.error("Failed to fetch huts.");
    }
  };

  useEffect(() => {
    fetchAllHuts();
  }, [token]);

  const handleStatusChange = async (record) => {
    try {
      const response = await axios.patch(
        `${API_URL}/api/hut/update/${record._id}`,
        { is_booked: !record.is_booked },
        {
          headers: { token },
        }
      );
      if (response.status === 200) {
        toast.success("Hut booking status updated successfully!");
        fetchAllHuts(); // Refresh the hut list
      } else {
        toast.error("Failed to update hut booking status.");
      }
    } catch (error) {
      toast.error("Error in updating hut booking status.");
    }
  };

  const commonColumns = [
    {
      title: "Hut Name",
      dataIndex: "hut_name",
      key: "hut_name",
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
  ];

  const allHutsData = allHuts.map((hut) => ({ ...hut, key: hut._id }));
  const bookedHutsData = allHuts.filter((hut) => hut.is_booked);
  const availableHutsData = allHuts.filter((hut) => !hut.is_booked);

  return (
    <DashboardLayout>
      <div className="common-style">
        <h3 style={{ marginBottom: "1rem" }}>Hut Page</h3>

        <Tabs defaultActiveKey="1">
          <TabPane tab="All" key="1">
            <Table
              dataSource={allHutsData}
              columns={commonColumns}
              scroll={{ x: 500 }}
            />
          </TabPane>
          <TabPane tab="Booked" key="2">
            <Table
              dataSource={bookedHutsData}
              columns={commonColumns}
              scroll={{ x: 500 }}
            />
          </TabPane>
          <TabPane tab="Available" key="3">
            <Table
              dataSource={availableHutsData}
              columns={commonColumns}
              scroll={{ x: 500 }}
            />
          </TabPane>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StaffManageHutPage;
