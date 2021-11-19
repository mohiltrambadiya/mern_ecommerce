const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncError = require('../middleware/catchAsyncError');

//create product-admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
    const product = await new Product(req.body).save();
    res.status(201).json({
        success: true,
        product
    });
});

//get all product
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
    const product = await Product.find();
    res.status(201).json({
        success: true,
        product
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