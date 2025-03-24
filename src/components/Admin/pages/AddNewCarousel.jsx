import React, { useState, useContext } from "react";
import "../../../stylesheets/Admin/AddPage.css";
import { assets } from "../../../assets/adminAssets/assets";
import axios from "axios";
import { API_URL } from "../../../store/apiUrl";
import { toast } from "react-toastify";
import DashboardLayout from "../Dashboard/DashboardLayout";
import { StoreContext } from "../../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const AddNewCarousel = () => {
  const navigate = useNavigate();

  const { token } = useContext(StoreContext);

  const url = `${API_URL}/api/carousel/create`;
  const [image, setImage] = useState(false);

  const [data, setData] = useState({
    title: "",
    description: "",
    order: "",
    active: true,
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("order", Number(data.order));
    formData.append("active", data.active);
    formData.append("image", image);

    const response = await axios.post(url, formData, { headers: { token } });

    if (response.data.success) {
      setData({
        title: "",
        description: "",
        order: "",
      });
      setImage(false);
      toast.success("Successfully added banner");
      navigate("/admin/banners");
    } else {
      toast.error("Error in adding new carousel");
    }
  };

  return (
    <DashboardLayout>
      <div className="container add">
        <form className="flex-column" onSubmit={onSubmitHandler}>
          <div className="add-img-upload flex-column">
            <p>Upload Image</p>
            <label htmlFor="image">
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt=""
              />
            </label>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
              required
            />
          </div>

          <div className="row">
            <div className="add-product-name flex-column col-md-6">
              <label>Title</label>
              <input
                onChange={onChangeHandler}
                value={data.title}
                type="text"
                name="title"
                placeholder="Title"
                required
              />
            </div>

            <div className="add-price flex-column col-md-6">
              <label>Order</label>
              <input
                onChange={onChangeHandler}
                value={data.order}
                type="number"
                name="order"
                placeholder="Order"
                required
              />
            </div>
          </div>

          <div className="add-product-description flex-column">
            <label>Description</label>
            <textarea
              onChange={onChangeHandler}
              value={data.description}
              name="description"
              rows={6}
              placeholder="Write Description Here"
              required
            ></textarea>
          </div>

          <button type="submit" className="add-btn">
            Add
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddNewCarousel;
