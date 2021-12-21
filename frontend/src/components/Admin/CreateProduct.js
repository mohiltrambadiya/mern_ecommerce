import React, { Fragment, useEffect, useState } from "react";
import {
  AccountTree,
  Description,
  Storage,
  Spellcheck,
  AttachMoney,
} from "@material-ui/icons";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, createProduct } from "../../actions/productAction";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { Button } from "@material-ui/core";
import { CREATE_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router";
const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhone",
];

function CreateProduct() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector(
    (state) => state.newproduct
  );
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const createProductHandler = () => {
    const productForm = new FormData();
    productForm.set("name", name);
    productForm.set("price", price);
    productForm.set("stock", stock);
    productForm.set("category", category);
    productForm.set("description", description);
    images.forEach((image) => {
      productForm.append("images", image);
    });
    dispatch(createProduct(productForm));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Product created succesfully");
      dispatch({ type: CREATE_PRODUCT_RESET });
      navigate("/admin/products");
    }
  }, [dispatch, error, success, alert, navigate]);
  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Create Product" />
          <div className="dashboard">
            <Sidebar />
            <div className="newProductContainer">
              <form
                className="createProductForm"
                encType="multipart/form-data"
                onSubmit={createProductHandler}
              >
                <div>
                  <Spellcheck />
                  <input
                    type="text"
                    required
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <Description />
                  <textarea
                    type="text"
                    rows="5"
                    cols="10"
                    required
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <AttachMoney />
                  <input
                    type="number"
                    required
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div>
                  <AccountTree />
                  <select
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value=''>-- select --</option>
                    {categories &&
                      categories.map((cat) => (
                        <option value={cat}>{cat}</option>
                      ))}
                  </select>
                </div>
                <div>
                  <Storage />
                  <input
                    type="number"
                    required
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
                <div id="createProductFormFile">
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    multiple
                    onChange={createProductImagesChange}
                  />
                </div>
                <div id="createProductFormImage">
                  {imagesPreview.map((image, index) => (
                    <img src={image} alt="product" key={index} />
                  ))}
                </div>
                <Button
                  id="createProductBtn"
                  type="submit"
                  disabled={loading ? true : false}
                >
                  Create
                </Button>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default CreateProduct;
