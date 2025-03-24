import React, { useEffect, useState, useContext } from "react";
import "../../../stylesheets/Admin/CommonStyle.css";
import axios from "axios";
import { API_URL } from "../../../store/apiUrl";
import { toast } from "react-toastify";
import DashboardLayout from "../Dashboard/DashboardLayout";
import { StoreContext } from "../../../context/StoreContext";
import { assets } from "../../../assets/assets";
import { Table } from "antd";
import moment from "moment";

const AllUsers = () => {
  const allUsersUrl = `${API_URL}/api/user/all`;
  const { token } = useContext(StoreContext);

  const [list, setList] = useState([]);

  const fetchList = async () => {
    if (!token) {
      return;
    }

    try {
      const response = await axios.get(allUsersUrl, { headers: { token } });
      if (response.data.success) {
        // Sorting the data
        const sortedUsers = response.data.users.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setList(sortedUsers.filter((user) => user.role === "customer"));
      } else {
        toast.error("Failed to fetch users.");
      }
    } catch (error) {
      toast.error("Error fetching users.");
    }
  };

  useEffect(() => {
    fetchList();
  }, [token]);

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
      title: "Membership Status",
      dataIndex: "membershipStatus",
      key: "membershipStatus",
    },
    {
      title: "Total Points",
      dataIndex: "points",
      key: "points",
    },
    {
      title: "Joining Date",
      dataIndex: "membershipJoinDate",
      key: "membershipJoinDate",
      render: (text, record) =>
        moment(record.membershipJoinDate).format("DD-MM-YYYY"),
    },
    {
      title: "Last Login",
      dataIndex: "lastLoginDate",
      key: "lastLoginDate",
      render: (text, record) =>
        moment(record.lastLoginDate).format("DD-MM-YYYY (hh:mm A)"),
    },
  ];

  return (
    <DashboardLayout>
      <div className="common-style">
        <h3 style={{ marginBottom: "1rem" }}>All Users</h3>
        <div>
          <Table
            dataSource={list}
            columns={columns}
            rowKey="_id"
            pagination={true}
            scroll={{ x: 500 }}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AllUsers;
