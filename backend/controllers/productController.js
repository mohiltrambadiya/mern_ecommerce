const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

//create product-admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    return next(new ErrorHandler("Product must have one image.", 500));
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user_id = req.user._id;
  const product = await new Product(req.body).save();
  res.status(201).json({
    success: true,
    product,
  });
});

//get all product
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();
  let products = await apiFeature.query;
  let filteredProductsCount = products.length;
  apiFeature.pagination(resultPerPage);
  products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

//get all product(admin)
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

//update product-admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found.", 404));
  }
  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });
  res.status(201).json({
    success: true,
    product,
  });
});

//delete product-admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found.", 404));
  }
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }
  await product.remove();
  res.status(201).json({
    success: true,
    message: "Product deleted succesfully.",
  });
});

//get product detail
exports.getProductDetail = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found.", 404));
  }
  res.status(201).json({
    success: true,
    product,
  });
});

//save or update product review
exports.saveOrUpdateReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, product_id } = req.body;
  const product = await Product.findById(product_id);
  if (!product) {
    return next(new ErrorHandler("Product not found.", 404));
  }
  const review = {
    user_id: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const isReviewed = product.reviews.find(
    (rev) => rev.user_id.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user_id.toString() === req.user._id.toString()) {
        rev.rating = review.rating;
        rev.comment = review.comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.num_of_reviews = product.reviews.length;
  }
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.rateings = avg / product.reviews.length;
  await product.save({ validateBeforeSave: false });

  res.status(201).json({
    success: true,
    product,
  });
});

//get all review of product
exports.getAllProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.product_id);
  if (!product) {
    return next(new ErrorHandler("Product not found.", 404));
  }
  res.status(201).json({
    success: true,
    reviews: product.reviews,
  });
});

//delete product review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.product_id);
  if (!product) {
    return next(new ErrorHandler("Product not found.", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id
  );
  const num_of_reviews = reviews.length;
  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  const rateings = avg / reviews.length;
  const updatedProduct = await Product.findByIdAndUpdate(
    req.query.product_id,
    {
      reviews,
      rateings,
      num_of_reviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(201).json({
    success: true,
    message: "Review deleted succesfully.",
  });
});
