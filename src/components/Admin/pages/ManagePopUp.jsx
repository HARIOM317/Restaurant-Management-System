import React, { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DashboardLayout from "../Dashboard/DashboardLayout";
import { StoreContext } from "../../../context/StoreContext";
import { API_URL } from "../../../store/apiUrl";
import { Form, Input, Button, DatePicker, Switch } from "antd";
import moment from "moment";
import uploadImg from "../../../assets/adminAssets/upload.png";
import "../../../stylesheets/Admin/CommonStyle.css";

const { TextArea } = Input;

const ManagePopUp = () => {
  const { token } = useContext(StoreContext);
  const imgUrl = `${API_URL}/images/`;

  const initialFormData = {
    content: "",
    image_url: "",
    start_date: null,
    end_date: null,
    is_active: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [popupId, setPopupId] = useState(null);

  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date, dateString, name) => {
    setFormData({ ...formData, [name]: dateString });
  };

  const handleSwitchChange = (checked) => {
    setFormData({ ...formData, is_active: checked });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
      setFormData({ ...formData, image_url: file });
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("content", formData.content);
    formDataToSubmit.append("image_url", formData.image_url);
    formDataToSubmit.append("start_date", formData.start_date);
    formDataToSubmit.append("end_date", formData.end_date);
    formDataToSubmit.append("is_active", formData.is_active);

    try {
      let response;
      if (popupId) {
        response = await axios.put(
          `${API_URL}/api/popup/update/${popupId}`,
          formDataToSubmit,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              token,
            },
          }
        );
      } else {
        response = await axios.post(
          `${API_URL}/api/popup/create`,
          formDataToSubmit,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              token,
            },
          }
        );
      }

      if (response.status === 200 || response.status === 201) {
        toast.success(`Pop-up ${popupId ? "updated" : "added"} successfully!`);
      } else {
        toast.error(`Failed to ${popupId ? "update" : "add"} pop-up.`);
      }
    } catch (error) {
      toast.error(`Error in ${popupId ? "updating" : "adding"} pop-up.`);
    }
  };

  useEffect(() => {
    const fetchPopup = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/popup/all`, {
          headers: { token },
        });
        if (response.data.popups.length > 0) {
          const popup = response.data.popups[0];
          setFormData({
            content: popup.content,
            start_date: popup.start_date,
            image_url: popup.image_url,
            end_date: popup.end_date,
            is_active: popup.is_active,
          });
          setImagePreview(imgUrl + popup.image_url);
          setPopupId(popup._id);
        }
      } catch (error) {
        console.log("Failed to fetch popup data.");
      }
    };
    fetchPopup();
  }, [token]);

  return (
    <DashboardLayout>
      <div className="container common-style">
        <h3 style={{ marginBottom: "1rem" }}>
          {popupId ? "Update Pop-up" : "Add Pop-up"}
        </h3>

        <hr />

        <Form layout="vertical" onSubmit={onSubmit}>
          <Form.Item label="Content" required>
            <TextArea
              rows={4}
              placeholder="Enter content"
              value={formData.content}
              onChange={(e) => handleChange(e.target.value, "content")}
            />
          </Form.Item>

          <div className="row w-100">
            <div className="col-md-6">
              <Form.Item label="Start Date" required>
                <DatePicker
                  format="YYYY-MM-DD"
                  value={
                    formData.start_date ? moment(formData.start_date) : null
                  }
                  onChange={(date, dateString) =>
                    handleDateChange(date, dateString, "start_date")
                  }
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>

            <div className="col-md-6">
              <Form.Item label="End Date" required>
                <DatePicker
                  format="YYYY-MM-DD"
                  value={formData.end_date ? moment(formData.end_date) : null}
                  onChange={(date, dateString) =>
                    handleDateChange(date, dateString, "end_date")
                  }
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
          </div>

          {
            <div
              style={{
                marginBottom: "20px",
                border: "1.5px dashed var(--primaryColor)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
              }}
            >
              <img
                src={imagePreview ? imagePreview : uploadImg}
                alt="Preview"
                style={{
                  width: "100%",
                  maxWidth: "200px",
                  borderRadius: "8px",
                }}
              />
            </div>
          }

          <Form.Item required>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button type="primary" onClick={handleChooseFile}>
                Choose Image
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
          </Form.Item>

          <Form.Item label="Active">
            <Switch
              checked={formData.is_active}
              onChange={handleSwitchChange}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={onSubmit}>
              {popupId ? "Update Pop-up" : "Add Pop-up"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </DashboardLayout>
  );
};

export default ManagePopUp;
