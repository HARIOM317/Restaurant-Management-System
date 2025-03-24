import React, { useEffect, useState, useContext } from "react";
import "../../../stylesheets/Admin/CommonStyle.css";
import axios from "axios";
import { API_URL } from "../../../store/apiUrl";
import { toast } from "react-toastify";
import DashboardLayout from "../Dashboard/DashboardLayout";
import { StoreContext } from "../../../context/StoreContext";
import { assets } from "../../../assets/assets";
import { Table, Button, Form, Input } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";

const { confirm } = Modal;

const Staff = () => {
  const allUsersUrl = `${API_URL}/api/user/all`;
  const addStaffUrl = `${API_URL}/api/user/register`;
  const { token } = useContext(StoreContext);

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const fetchList = async () => {
    if (!token) {
      return;
    }

    try {
      const response = await axios.get(allUsersUrl, { headers: { token } });
      if (response.data.success) {
        setList(response.data.users.filter((user) => user.role === "staff"));
      } else {
        toast.error("Failed to fetch staff members.");
      }
    } catch (error) {
      toast.error("Error fetching staff members.");
    }
  };

  useEffect(() => {
    fetchList();
  }, [token]);

  const handleAddStaff = async (values) => {
    values.role = "staff";
    setLoading(true);
    try {
      const response = await axios.post(addStaffUrl, values, {
        headers: { token },
      });
      if (response.status === 200) {
        toast.success("Staff member added successfully.");
        fetchList();
        form.resetFields(); // Reset the form fields
      } else {
        toast.error("Failed to add staff member.");
      }
    } catch (error) {
      toast.error("Error adding staff member.");
    } finally {
      setLoading(false);
    }
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure delete this staff member?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      onOk() {
        return handleDelete(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/api/user/${id}`, {
        headers: { token },
      });
      if (response.status === 200) {
        toast.success("Staff member deleted successfully.");
        fetchList();
      } else {
        toast.error("Failed to delete staff member.");
      }
    } catch (error) {
      toast.error("Error deleting staff member.");
    }
  };

  const columns = [
    {
      title: "Profile",
      dataIndex: "profile",
      key: "profile",
      render: (text, record) => (
        <img
          src={assets.profile_icon}
          alt=""
          style={{ width: "30px", height: "30px" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <p onClick={() => showDeleteConfirm(record._id)} className="cursor">
          <i className="fa-regular fa-trash-can" style={{ color: "red" }}></i>
        </p>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="common-style">
        <h3>All Staff Members</h3>
        <Form
          form={form}
          layout="inline"
          onFinish={handleAddStaff}
          className="staff-form"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input placeholder="Name" className="input-field" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input placeholder="Email" className="input-field" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please enter password" },
              { type: "password", message: "Invalid password" },
            ]}
          >
            <Input placeholder="Password" className="input-field" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Add Staff Member
            </Button>
          </Form.Item>
        </Form>

        <hr />

        <div className="list-table">
          <Table
            dataSource={list}
            columns={columns}
            rowKey="_id"
            pagination={false}
            scroll={{
              x: 500,
            }}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Staff;
