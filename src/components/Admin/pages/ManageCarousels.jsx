import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Table, Switch, Image, Button, Space, Modal } from "antd";
import { API_URL } from "../../../store/apiUrl";
import { toast } from "react-toastify";
import DashboardLayout from "../Dashboard/DashboardLayout";
import { StoreContext } from "../../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import "../../../stylesheets/Admin/CommonStyle.css";

const ManageCarousels = () => {
  const navigate = useNavigate();

  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const imgUrl = `${API_URL}/images/`;

  const { token } = useContext(StoreContext);

  useEffect(() => {
    const fetchCarouselItems = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/carousel/getAll`);
        if (response.data.success) {
          setCarouselItems(response.data.carouselItems);
        } else {
          toast.error("Failed to fetch carousel items.");
        }
      } catch (error) {
        toast.error("An error occurred while fetching carousel items.");
      } finally {
        setLoading(false);
      }
    };

    fetchCarouselItems();
  }, []);

  const handleSwitchChange = async (checked, record) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/carousel/update/${record._id}`,
        {
          active: checked,
        },
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        toast.success("Carousel item updated successfully.");
        setCarouselItems((prevItems) =>
          prevItems.map((item) =>
            item._id === record._id ? { ...item, active: checked } : item
          )
        );
      } else {
        toast.error("Failed to update carousel item.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the carousel item.");
    }
  };

  const confirmDelete = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this carousel item?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(record),
    });
  };

  const handleDelete = async (record) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/carousel/delete/${record._id}`,
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        toast.success("Carousel item deleted successfully.");
        setCarouselItems((prevItems) =>
          prevItems.filter((item) => item._id !== record._id)
        );
      } else {
        toast.error("Failed to delete carousel item.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the carousel item.");
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Image width={100} src={`${imgUrl}/${image}`} alt="carousel image" />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (text, record) => (
        <Switch
          checked={record.active}
          onChange={(checked) => handleSwitchChange(checked, record)}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => navigate(`/admin/carousel/edit/${record._id}`)}
          >
            Update
          </Button>
          <Button type="primary" onClick={() => confirmDelete(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="common-style">
        <h2 style={{ marginBottom: "1rem" }}>Banner Items</h2>
        <Button
          type="primary"
          style={{ marginBottom: 16 }}
          onClick={() => navigate("/admin/carousel/new")}
        >
          Add New Banner
        </Button>

        <hr />

        <Table
          columns={columns}
          dataSource={carouselItems}
          rowKey={(record) => record._id}
          loading={loading}
          scroll={{ x: 500 }}
        />
      </div>
    </DashboardLayout>
  );
};

export default ManageCarousels;
