import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProductDetail } from "../../actions/productAction"
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component"
import "./ProductDetail.css";
import ReviewCard from './ReviewCard.js'
import Loader from "../layout/Loader/Loader"
import { useAlert } from "react-alert"

const ProductDetail = () => {
  const dispach = useDispatch();
  const { id } = useParams();
  const { loading, error, productDetail } = useSelector(
    (state) => state.productDetail
  )
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: productDetail.rateings,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  }
  const alert = useAlert()

  useEffect(() => {
    if(error) {
      alert.error(error)
      dispach(clearErrors())
    }
    dispach(getProductDetail(id));
  }, [dispach, id, error, alert]);

  return (
    <Fragment>
      {loading ? (<Loader/>) : (
        <Fragment>
          <div className="ProductDetails">
            <div>
              <Carousel>
                {productDetail.images &&
                  productDetail.images.map((image, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={image.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            
            <div>
              <div className="detailsBlock-1">
                <h2>{productDetail.name}</h2>
                <p>Product # {productDetail._id}</p>
              </div>
    
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span>({productDetail.num_of_reviews} Reviews)</span>
              </div>
    
              <div className="detailsBlock-3">
                <h1>{`₹${productDetail.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button>-</button>
                    <input type="number" value="1" />
                    <button>+</button>
                  </div>
    
                  <button>Add to cart</button>
                </div>
                <p>
                  Status:{" "}
                  <b className={productDetail.stock < 1 ? "redColor" : "greenColor"}>
                    {productDetail.stock < 1 ? "OutofStock" : "InStock"}
                  </b>
                </p>
              </div>
    
              <div className="detailsBlock-4">
                Description: <p>{productDetail.description}</p>
              </div>
              <button className="submitReview">Submit Review</button>
            </div>        
          </div>
    
          <h3 className="reviewsHeading">REVIEWS</h3>
          {productDetail.reviews && productDetail.reviews[0] ? (
            <div className="reviews">
                {productDetail.reviews && productDetail.reviews.map((review, i) => (<ReviewCard review={review}/>))}
            </div>
          ): (
            <p className="noReviews">No Reviews Yet</p>
          )}
      </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetail;
