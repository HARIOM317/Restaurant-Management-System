import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import DashboardLayout from "../Dashboard/DashboardLayout";
import { StoreContext } from "../../../context/StoreContext";
import { API_URL } from "../../../store/apiUrl";
import { Button, Switch, Input } from "antd";

const EditCarousel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(StoreContext);

  const imgUrl = `${API_URL}/images/`;

  const initialFormData = {
    title: "",
    description: "",
    order: "",
    active: true,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [image, setImage] = useState(null);

  const fetchCarouselDetails = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/carousel/getById/${id}`,
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        const { title, description, order, active, image } =
          response.data.carouselItem;
        setFormData({ title, description, order, active });
        setImage(image);
      } else {
        toast.error("Failed to fetch carousel details.");
      }
    } catch (error) {
      toast.error("Failed to fetch carousel details.");
    }
  };

  useEffect(() => {
    fetchCarouselDetails();
  }, [id]);

  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("title", formData.title);
    formDataToSubmit.append("description", formData.description);
    formDataToSubmit.append("order", formData.order);
    formDataToSubmit.append("active", formData.active);
    if (image) {
      formDataToSubmit.append("image", image);
    }

    try {
      const response = await axios.put(
        `${API_URL}/api/carousel/update/${id}`,
        formDataToSubmit,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        toast.success("Banner updated successfully!");
        navigate("/admin/banners");
      } else {
        toast.error("Failed to update carousel.");
      }
    } catch (error) {
      toast.error("Failed to update carousel.");
    }
  };

  return (
    <DashboardLayout>
      <div className="container add">
        <form className="flex-column" onSubmit={onSubmit}>
          <div className="col-md-12">
            <div
              className="d-flex align-items-center justify-content-center w-100 flex-column g-5"
              style={{
                border: "1.5px dashed var(--primaryColor)",
                borderRadius: "8px",
                padding: "1rem",
              }}
            >
              <Button
                type="default"
                onClick={() => document.getElementById("image-upload").click()}
              >
                Upload Image
              </Button>
              <input
                type="file"
                id="image-upload"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              {image && (
                <div>
                  <img
                    src={
                      typeof image === "string"
                        ? `${imgUrl}/${image}`
                        : URL.createObjectURL(image)
                    }
                    alt="carousel"
                    width="200"
                    style={{ borderRadius: "8px" }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="add-product-name flex-column col-md-6">
              <label>Title</label>
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => handleChange(e.target.value, "title")}
              />
            </div>

            <div className="add-price flex-column col-md-6">
              <label>Order</label>
              <input
                type="number"
                placeholder="Order"
                value={formData.order}
                onChange={(e) => handleChange(e.target.value, "order")}
              />
            </div>
          </div>

          <div className="add-product-description flex-column">
            <label>Description</label>
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => handleChange(e.target.value, "description")}
              rows={6}
            ></textarea>
          </div>

          <div className="col-md-6">
            <div className="form-group mb-2 card-label">
              <label className="label-style">
                Active <span className="text-danger">*</span>
              </label>
              <Switch
                checked={formData.active}
                onChange={(checked) => handleChange(checked, "active")}
              />
            </div>
          </div>

          <div className="col-md-12">
            <Button type="primary" htmlType="submit" className="my-3">
              Update
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default EditCarousel;
