import React, { useEffect, useState, useContext } from "react";
import "../../../stylesheets/Admin/ItemListPage.css";
import axios from "axios";
import { API_URL } from "../../../store/apiUrl";
import { toast } from "react-toastify";
import DashboardLayout from "../../Admin/Dashboard/DashboardLayout";
import { StoreContext } from "../../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Switch, Image, Table } from "antd";

const StaffFoodListPage = () => {
  const navigate = useNavigate();
  const { token } = useContext(StoreContext);
  const userRole = localStorage.getItem("userRole");

  const allFoodItemUrl = `${API_URL}/api/food/list`;
  const foodImgUrl = `${API_URL}/images/`;
  const removeItemUrl = `${API_URL}/api/food/remove`;
  const updateAvailabilityUrl = `${API_URL}/api/food/update-availability`;

  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(allFoodItemUrl);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to fetch food items");
      }
    } catch (error) {
      console.error("Error fetching food items:", error);
      toast.error("Something went wrong!");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(
        removeItemUrl,
        { id: foodId },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error("Failed to delete food item");
      }
    } catch (error) {
      console.error("Error deleting food item:", error);
      toast.error("Something went wrong!");
    }
  };

  const updateAvailability = async (foodId, available) => {
    console.log(foodId);
    console.log(available);
    try {
      const response = await axios.patch(
        updateAvailabilityUrl,
        { id: foodId, available },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Availability updated successfully");
        await fetchList();
      } else {
        toast.error("Failed to update availability");
      }
    } catch (error) {
      console.error("Error updating availability:", error);
      toast.error("Something went wrong!");
    }
  };

  const showDeleteConfirm = (foodId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this food item?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        removeFood(foodId);
      },
    });
  };

  useEffect(() => {
    fetchList();
  }, []);

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <Image src={`${foodImgUrl}${text}`} alt="" className="food-img" />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Available",
      dataIndex: "available",
      key: "available",
      render: (text, record) => (
        <Switch
          checked={record.available}
          onChange={(checked) => updateAvailability(record._id, checked)}
        />
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="list-table-format">
        <div>
          <Button type="primary" onClick={() => navigate("/staff/food/add")}>
            Add Food Item
          </Button>
        </div>

        <div className="list">
          <p>All Foods List</p>
          <div className="list-table">
            <Table
              dataSource={list}
              columns={columns}
              rowKey={(record) => record._id}
              pagination={true}
              scroll={{
                x: 500,
              }}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StaffFoodListPage;
