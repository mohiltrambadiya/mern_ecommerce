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
import {
  clearErrors,
  updateProduct,
  getProductDetail,
} from "../../actions/productAction";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { Button } from "@material-ui/core";
import {
  UPDATE_PRODUCT_RESET,
  PRODUCT_DETAIL_RESET,
} from "../../constants/productConstants";
import { useNavigate, useParams } from "react-router";
const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhone",
];

function UpdateProduct() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const {
    loading,
    error: updateError,
    success,
  } = useSelector((state) => state.productaction);
  const {
    loading: detailLoading,
    error,
    productDetail,
  } = useSelector((state) => state.productDetail);
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const { productId } = useParams();
  const updateProductHandler = () => {
    const productForm = new FormData();
    productForm.set("name", name);
    productForm.set("price", price);
    productForm.set("stock", stock);
    productForm.set("category", category);
    productForm.set("description", description);
    images.forEach((image) => {
      productForm.append("images", image);
    });
    dispatch(updateProduct(productForm, productId));
  };

  useEffect(() => {
    if (productDetail && productDetail._id !== productId) {
      dispatch(getProductDetail(productId));
    } else {
      setName(productDetail.name);
      setDescription(productDetail.description);
      setStock(productDetail.stock);
      setPrice(productDetail.price);
      setCategory(productDetail.category);
      setOldImages(productDetail.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Product updated succesfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
      dispatch({ type: PRODUCT_DETAIL_RESET });
    }
  }, [
    dispatch,
    error,
    success,
    alert,
    navigate,
    updateError,
    productDetail,
    productId,
  ]);
  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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
      {loading || detailLoading ? (
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
                onSubmit={updateProductHandler}
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
                    <option value="">-- select --</option>
                    {categories &&
                      categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
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
                    onChange={updateProductImagesChange}
                  />
                </div>
                <div id="createProductFormImage">
                  {oldImages &&
                    oldImages.map((image, index) => (
                      <img src={image.url} alt="product" key={index} />
                    ))}
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
                  Update
                </Button>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default UpdateProduct;
