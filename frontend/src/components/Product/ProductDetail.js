import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProductDetail,
  submitProductReview,
} from "../../actions/productAction";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemToCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { SUBMIT_REVIEW_RESET } from "../../constants/productConstants";

const ProductDetail = () => {
  const dispach = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const { loading, error, productDetail } = useSelector(
    (state) => state.productDetail
  );
  const options = {
    value: productDetail.rateings,
    readOnly: true,
    precision: 0.5,
    size: 'large',
  };
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState();
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const {loading:reviewLoading, error: reviewError, success } = useSelector(
    (state) => state.submitreview
  );

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const increaseQuantity = () => {
    if (productDetail.stock <= quantity) return;
    setQuantity(quantity + 1);
  };

  const addToCart = () => {
    dispach(addItemToCart(id, quantity));
    alert.success("Item added to cart succesfully.");
  };

  const submitProductReviewData = () => {
    const reviewForm = new FormData();
    reviewForm.set("comment", comment);
    reviewForm.set("rating", rating);
    reviewForm.set("product_id", id);
    dispach(submitProductReview(reviewForm));
    setOpen(false);
  };

  useEffect(() => {
    console.log(success)
    if (error) {
      alert.error(error);
      dispach(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispach(clearErrors());
    }
    if (success) {
      alert.success("Review submitted succesfully.");
      dispach({ type: SUBMIT_REVIEW_RESET });
    }
    dispach(getProductDetail(id));
  }, [dispach, id, error, reviewError, success, alert]);

  return (
    <Fragment>
      {loading || reviewLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`PRODUCTDETAIL - ${productDetail.name}`} />
          <div className="ProductDetails">
            <div>
                <img
                  className="CarouselImage"
                  src={productDetail.images[0].url}
                  alt='product'
                />
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{productDetail.name}</h2>
                <p>Product # {productDetail._id}</p>
              </div>

              <div className="detailsBlock-2">
                <Rating {...options} />
                <span>({productDetail.num_of_reviews} Reviews)</span>
              </div>

              <div className="detailsBlock-3">
                <h1>{`₹${productDetail.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>

                  <button
                    disabled={productDetail.stock < 1 ? true : false}
                    onClick={addToCart}
                  >
                    Add to cart
                  </button>
                </div>
                <p>
                  Status:
                  <b
                    className={
                      productDetail.stock < 1 ? "redColor" : "greenColor"
                    }
                  >
                    {productDetail.stock < 1 ? "OutofStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description: <p>{productDetail.description}</p>
              </div>
              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              ></textarea>
              <DialogActions>
                <Button>Cancel</Button>
                <Button onClick={submitProductReviewData}>Submit</Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
          {productDetail.reviews && productDetail.reviews[0] ? (
            <div className="reviews">
              {productDetail.reviews &&
                productDetail.reviews.map((review, i) => (
                  <ReviewCard review={review} key={i} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetail;
