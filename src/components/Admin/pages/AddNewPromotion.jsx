import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DashboardLayout from "../Dashboard/DashboardLayout";
import { DatePicker, Input, Select, Button } from "antd";
import { StoreContext } from "../../../context/StoreContext";
import { API_URL } from "../../../store/apiUrl";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "../../../stylesheets/Admin/CommonStyle.css";

const { Option } = Select;

const AddNewPromotion = () => {
  const navigate = useNavigate();

  const { token } = useContext(StoreContext);

  const initialFormData = {
    code: "",
    discountType: "percentage", // Default discount type
    discount: "",
    start_date: null,
    end_date: null,
    is_active: true,
    useTotal: 0, // Initial use total
    users: [], // Array of user IDs
    category: "public", // default category
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleDateChange = (date, name) => {
    setFormData({ ...formData, [name]: date });
  };

  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleNumberChange = (value, name) => {
    const numberValue = parseFloat(value);
    setFormData({
      ...formData,
      [name]: isNaN(numberValue) ? null : numberValue,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const today = moment();
    const startDate = formData.start_date;
    const endDate = formData.end_date;

    const isActive =
      startDate && endDate
        ? startDate.isBefore(today) || startDate.isSame(today)
        : false;

    const formattedData = {
      ...formData,
      start_date: startDate ? startDate.format("YYYY-MM-DDTHH:mm:ssZ") : null,
      end_date: endDate ? endDate.format("YYYY-MM-DDTHH:mm:ssZ") : null,
      is_active: isActive,
    };

    try {
      const response = await axios.post(
        `${API_URL}/api/promo/create`,
        formattedData,
        {
          headers: { token },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Promo code created successfully!");
        setFormData(initialFormData);
        navigate("/admin/promotions");
      } else {
        toast.error("Failed to create promo code.");
      }
    } catch (error) {
      toast.error("Error in create promo code.");
    }
  };

  return (
    <DashboardLayout>
      <div className="container common-style">
        <h3
          style={{
            color: "var(--textColor)",
            fontSize: "1.35rem",
            fontWeight: "bold",
          }}
        >
          Create Promo Code
        </h3>

        <hr />

        <form className="row form-row" onSubmit={onSubmit}>
          <div className="col-md-6 my-2">
            <Input
              type="text"
              placeholder="Promo Code"
              value={formData.code}
              onChange={(e) => handleChange(e.target.value, "code")}
              required
            />
          </div>

          <div className="col-md-6 my-2">
            <Select
              value={formData.discountType}
              onChange={(value) => handleChange(value, "discountType")}
              style={{ width: "100%" }}
            >
              <Option value="percentage">Percentage</Option>
              <Option value="fixed">Fixed</Option>
            </Select>
          </div>

          <div className="col-md-6 my-2">
            <Input
              placeholder="Discount"
              value={formData.discount}
              type="number"
              step="0.01"
              min="0"
              onChange={(e) => handleNumberChange(e.target.value, "discount")}
              required
            />
          </div>

          <div className="col-md-6 my-2">
            <Input
              placeholder="Use Total"
              value={formData.useTotal}
              type="number"
              onChange={(e) => handleNumberChange(e.target.value, "useTotal")}
              required
            />
          </div>

          <div className="col-md-6 my-2">
            <DatePicker
              placeholder="Start Date"
              value={formData.start_date}
              onChange={(date) => handleDateChange(date, "start_date")}
              format="DD-MM-YYYY"
              style={{ width: "100%" }}
              required
            />
          </div>

          <div className="col-md-6 my-2">
            <DatePicker
              placeholder="End Date"
              value={formData.end_date}
              onChange={(date) => handleDateChange(date, "end_date")}
              format="DD-MM-YYYY"
              className="text-input-field date-picker"
              style={{ width: "100%" }}
              required
            />
          </div>

          <div>
            <Button type="primary" htmlType="submit" className="my-3">
              {"Create"}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddNewPromotion;
