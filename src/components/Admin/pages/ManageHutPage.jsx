import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DashboardLayout from "../Dashboard/DashboardLayout";
import { StoreContext } from "../../../context/StoreContext";
import { API_URL } from "../../../store/apiUrl";
import { Tabs, Table, Button, Switch, Popconfirm, Form, Input } from "antd";
import "../../../stylesheets/Admin/CommonStyle.css";

const { TabPane } = Tabs;

const ManageHutPage = () => {
  const [allHuts, setAllHuts] = useState([]);
  const { token } = useContext(StoreContext);

  const [form] = Form.useForm();

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

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/api/hut/delete/${id}`, {
        headers: { token },
      });
      if (response.status === 200) {
        toast.success("Hut deleted successfully!");
        fetchAllHuts(); // Refresh the hut list
      } else {
        toast.error("Failed to delete hut.");
      }
    } catch (error) {
      toast.error("Error in deleting hut.");
    }
  };

  const onFinish = async (values) => {
    const formattedData = {
      ...values,
      is_booked: false,
    };

    try {
      const response = await axios.post(
        `${API_URL}/api/hut/add`,
        formattedData,
        {
          headers: { token },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Hut added successfully!");
        form.resetFields();
        fetchAllHuts(); // Fetch huts again to update the list
      } else {
        toast.error("Failed to add hut.");
      }
    } catch (error) {
      toast.error("Error in adding hut.");
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

  const allHutsColumns = [
    ...commonColumns,
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Popconfirm
          title="Are you sure to delete this hut?"
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

  const allHutsData = allHuts.map((hut) => ({ ...hut, key: hut._id }));
  const bookedHutsData = allHuts.filter((hut) => hut.is_booked);
  const availableHutsData = allHuts.filter((hut) => !hut.is_booked);

  // Get user role from local storage
  const userRole = localStorage.getItem("userRole");

  return (
    <DashboardLayout>
      <div className="common-style">
        <h3 style={{ marginBottom: "1rem" }}>Hut Page</h3>

        {userRole === "admin" && (
          <div>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              className="row form-row"
            >
              <div className="col-md-6">
                <Form.Item
                  name="hut_name"
                  label="Hut Name"
                  rules={[
                    { required: true, message: "Please input the hut name!" },
                  ]}
                >
                  <Input placeholder="Hut Name" />
                </Form.Item>
              </div>

              <div className="col-md-6">
                <Form.Item
                  name="capacity"
                  label="Capacity"
                  rules={[
                    { required: true, message: "Please input the capacity!" },
                  ]}
                >
                  <Input placeholder="Capacity" />
                </Form.Item>
              </div>

              <div>
                <Button type="primary" htmlType="submit">
                  Add Hut
                </Button>
              </div>
            </Form>
          </div>
        )}

        <hr />

        <div className="promotions">
          <Tabs defaultActiveKey="1">
            <TabPane tab="All" key="1">
              <Table
                dataSource={allHutsData}
                columns={allHutsColumns}
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
      </div>
    </DashboardLayout>
  );
};

export default ManageHutPage;
