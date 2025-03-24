import React, { useState, useContext } from "react";
import "../../../stylesheets/Admin/AddPage.css";
import axios from "axios";
import { API_URL } from "../../../store/apiUrl";
import { toast } from "react-toastify";
import DashboardLayout from "../Dashboard/DashboardLayout";
import { StoreContext } from "../../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import uploadImg from "../../../assets/adminAssets/upload.png";

const AddPage = () => {
  const { token } = useContext(StoreContext);
  const navigate = useNavigate();

  const url = `${API_URL}/api/food/add`;
  const [image, setImage] = useState(false);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Tea",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const onSelectChange = (event) => {
    setData((data) => ({ ...data, category: event.target.value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    const response = await axios.post(url, formData, { headers: { token } });

    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Tea",
      });
      setImage(false);
      toast.success(response.data.message);
      navigate("/admin/items-list");
    } else {
      toast.error(response.data.message);
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
                src={image ? URL.createObjectURL(image) : uploadImg}
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

          <div className="row g-3">
            <div className="add-product-name col-md-6 flex-column">
              <label>Product Name</label>
              <input
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                name="name"
                placeholder="Type here"
                required
              />
            </div>

            <div className="add-price col-md-6 flex-column">
              <label>Product Price</label>
              <input
                onChange={onChangeHandler}
                value={data.price}
                type="number"
                name="price"
                placeholder="Price"
                required
              />
            </div>
          </div>

          <div className="add-product-description flex-column">
            <label>Product Description</label>
            <textarea
              onChange={onChangeHandler}
              value={data.description}
              name="description"
              rows={6}
              placeholder="Write Description Here"
              required
            ></textarea>
          </div>

          <div className="add-category-price">
            <div className="add-category flex-column">
              <label>Product Category</label>
              <select
                onChange={onSelectChange}
                value={data.category}
                name="category"
                style={{ width: "100%" }}
              >
                <option value="Tea">Tea</option>
                <option value="Mocktails">Mocktails</option>
                <option value="Coffee">Coffee</option>
                <option value="Drink">Drink</option>
                <option value="Shake">Shake</option>
                <option value="Soups">Soups</option>
                <option value="Salad">Salad</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Appetizers">Appetizers</option>
                <option value="Fries">Fries</option>
                <option value="Burger">Burger</option>
                <option value="Raita">Raita</option>
                <option value="Pizza">Pizza</option>
                <option value="Tandoor & Snacks">Tandoor & Snacks</option>
                <option value="Momos">Momos</option>
                <option value="Maggi">Maggi</option>
                <option value="Pasta">Pasta</option>
                <option value="Paratha with Curd">Paratha with Curd</option>
                <option value="Chinese">Chinese</option>
                <option value="Sizzlers">Sizzlers</option>
                <option value="Indian Bread Tawa and Tandoori">
                  Indian Bread Tawa and Tandoori
                </option>
                <option value="Combo">Combo</option>
                <option value="Thali & Bafla">Thali & Bafla</option>
                <option value="Basmati ka Khazana">Basmati ka Khazana</option>
                <option value="Dessert">Dessert</option>
              </select>
            </div>
          </div>

          <button type="submit" className="add-btn">
            Add
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddPage;
