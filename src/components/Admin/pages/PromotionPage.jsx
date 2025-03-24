import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DashboardLayout from "../Dashboard/DashboardLayout";
import { StoreContext } from "../../../context/StoreContext";
import { API_URL } from "../../../store/apiUrl";
import { Tabs, Table, Button, Switch, Popconfirm } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "../../../stylesheets/Admin/CommonStyle.css";

const { TabPane } = Tabs;

const PromotionPage = () => {
  const navigate = useNavigate();

  const [publicPromotions, setPublicPromotions] = useState([]);
  const [userSpecificPromotions, setUserSpecificPromotions] = useState([]);
  const [expiredPromotions, setExpiredPromotions] = useState([]);
  const { token } = useContext(StoreContext);

  const fetchAllPromotions = async () => {
    if (!token) return;

    try {
      const response = await axios.get(`${API_URL}/api/promo/allPromos`, {
        headers: { token },
      });
      if (response.data) {
        const promotions = response.data;

        // Sorting the data
        const sortedPromotions = promotions.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        const today = moment();

        const publicPromos = [];
        const userSpecificPromos = [];
        const expired = [];

        sortedPromotions.forEach((promo) => {
          const endDate = moment(promo.end_date);
          if (endDate.isBefore(today)) {
            expired.push(promo);
          } else {
            if (promo.category === "public") {
              publicPromos.push(promo);
            } else if (promo.category === "userSpecific") {
              userSpecificPromos.push(promo);
            }
          }
        });

        setPublicPromotions(
          publicPromos.map((promo) => ({
            ...promo,
            key: promo._id,
            usage: `${promo.users.length} / ${promo.useTotal}`,
          }))
        );
        setUserSpecificPromotions(
          userSpecificPromos.map((promo) => ({
            ...promo,
            key: promo._id,
            usage: `${promo.users.length} / ${promo.useTotal}`,
          }))
        );
        setExpiredPromotions(
          expired.map((promo) => ({
            ...promo,
            key: promo._id,
            usage: `${promo.users.length} / ${promo.useTotal}`,
          }))
        );
      } else {
        toast.error("Failed to fetch promotions.");
      }
    } catch (error) {
      toast.error("Failed to fetch promotions.");
    }
  };

  const handleStatusChange = async (record) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/promo/update/${record._id}`,
        { is_active: !record.is_active },
        {
          headers: { token },
        }
      );
      if (response.status === 200) {
        toast.success("Promo code status updated successfully!");
        fetchAllPromotions();
      } else {
        toast.error("Failed to update promo code status.");
      }
    } catch (error) {
      toast.error("Error in updating promo code status.");
    }
  };

  const handleDelete = async (record) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/promo/delete/${record._id}`,
        {
          headers: { token },
        }
      );
      if (response.status === 200) {
        toast.success("Promo code deleted successfully!");
        fetchAllPromotions();
      } else {
        toast.error("Failed to delete promo code.");
      }
    } catch (error) {
      toast.error("Error in deleting promo code.");
    }
  };

  useEffect(() => {
    fetchAllPromotions();
  }, [token]);

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Discount Type",
      dataIndex: "discountType",
      key: "discountType",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
      render: (text) => moment(text).format("DD-MM-YYYY"),
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      render: (text) => moment(text).format("DD-MM-YYYY"),
    },
    {
      title: "Usage",
      dataIndex: "usage",
      key: "usage",
    },
    {
      title: "Active Status",
      key: "is_active",
      render: (text, record) => (
        <Switch
          checked={record.is_active}
          onChange={() => handleStatusChange(record)}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Popconfirm
          title="Are you sure to delete this promotion?"
          onConfirm={() => handleDelete(record)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="common-style">
        <h3 style={{ marginBottom: "1rem" }}>Promotion Page</h3>
        <div>
          <Button
            type="primary"
            onClick={() => navigate("/admin/promotion/new-promotion")}
          >
            Create New Promo
          </Button>
        </div>

        <hr />

        <Tabs defaultActiveKey="1">
          <TabPane tab="Public Promo" key="1">
            <Table
              dataSource={publicPromotions}
              columns={columns}
              scroll={{
                x: 500,
              }}
            />
          </TabPane>
          <TabPane tab="User Specific Promo" key="2">
            <Table
              dataSource={userSpecificPromotions}
              columns={columns}
              scroll={{
                x: 500,
              }}
            />
          </TabPane>
          <TabPane tab="Expired Promo" key="3">
            <Table
              dataSource={expiredPromotions}
              columns={columns}
              scroll={{
                x: 500,
              }}
            />
          </TabPane>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PromotionPage;
