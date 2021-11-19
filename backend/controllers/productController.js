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