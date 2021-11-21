const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const ApiFeatures = require('../utils/apifeatures');

//create product-admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
    req.body.user_id = req.user._id;
    const product = await new Product(req.body).save();
    res.status(201).json({
        success: true,
        product
    });
});

//get all product
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const product = await apiFeature.query;
    res.status(201).json({
        success: true,
        productCount,
        product,
    });
});

//update product-admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if(!product) {
        return next(new ErrorHandler('Product not found.', 404));
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
    res.status(201).json({
        success: true,
        product
    });
});

//delete product-admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if(!product) {
        return next(new ErrorHandler('Product not found.', 404));
    }
    await product.remove();
    res.status(201).json({
        success: true,
        message: "Product deleted succesfully."
    });
});

//get product detail
exports.getProductDetail = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if(!product) {
        return next(new ErrorHandler('Product not found.', 404));
    }
    res.status(201).json({
        success: true,
        product
    });
});

//save or update product review
exports.saveOrUpdateReview = catchAsyncError(async (req, res, next) => {
    const {rating, comment, product_id} = req.body;
    const product = await Product.findById(product_id);
    if(!product) {
        return next(new ErrorHandler('Product not found.', 404));
    }
    const review = {
        user_id: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    };
    const isReviewed = product.reviews.find((rev) => rev.user_id.toString() === req.user._id.toString());
    if(isReviewed) {
        product.reviews.forEach(rev => {
            if(rev.user_id.toString() === req.user._id.toString()) {
                rev.rating = review.rating;
                rev.comment = review.comment;
            }
        });
    } else {
        product.reviews.push(review);
        product.num_of_reviews = product.reviews.length;
    }
    let avg = 0;
    product.reviews.forEach(rev => {
        avg += rev.rating;
    });

    product.rateings = avg/product.reviews.length;
    await product.save({validateBeforeSave: false});

    res.status(201).json({
        success: true,
        product
    });
});

//get all review of product
exports.getAllProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.product_id);
    if(!product) {
        return next(new ErrorHandler('Product not found.', 404));
    }
    res.status(201).json({
        success: true,
        reviews: product.reviews
    });
});

//delete product review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.product_id);
    if(!product) {
        return next(new ErrorHandler('Product not found.', 404));
    }

    const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id);
    const num_of_reviews = reviews.length;
    let avg = 0;
    reviews.forEach(rev => {
        avg += rev.rating;
    });
    console.log(reviews);
    const rateings = avg/reviews.length;
    const updatedProduct = await Product.findByIdAndUpdate(
        req.query.product_id, 
        {   
            reviews, 
            rateings, 
            num_of_reviews
        }, 
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        }
    );

    res.status(201).json({
        success: true,
        message: "Review deleted succesfully."
    });
});