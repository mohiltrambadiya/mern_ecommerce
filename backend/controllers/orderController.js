const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncError = require('../middleware/catchAsyncError');

//create new order
exports.createOrder = catchAsyncError(async (req, res, next) => {
    const {
        shipping_info, 
        order_items, 
        payment_info, 
        items_price,
        tax_price,
        shipping_price,
        total_price
    } = req.body;
    const order = await Order.create({
        shipping_info, 
        order_items, 
        payment_info, 
        items_price,
        tax_price,
        shipping_price,
        total_price,
        paid_at: Date.now(),
        user_id: req.user._id
    });
    res.status(201).json({
        success: true,
        order
    });
})

//get single order
exports.getOrderDetail = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user_id", "name email");
    if(!order) {
        return next(ErrorHandler("Order not found", 404));
    }

    res.status(200).json({
        success: true,
        order
    });
});

//get login user order
exports.getLoginUserOrders = catchAsyncError(async (req, res, next) => {
    const order = await Order.find({user_id: req.user._id});
    if(!order) {
        return next(ErrorHandler("Order not found", 404));
    }

    res.status(200).json({
        success: true,
        order
    });
});

//get all orders - admin
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();
    if(!orders) {
        return next(ErrorHandler("Order not found", 404));
    }
    const [totalAmount] = await Order.aggregate([
        {
            $group: {
                _id: null,
                total: {$sum:  "$total_price"}
            }
        }
    ]);
    res.status(200).json({
        success: true,
        totalAmount: totalAmount.total,
        orders
    });
});

//update order status - admin
exports.updateOrderStatus = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if(!order) {
        return next(ErrorHandler("Order not found", 404));
    }
    if(order.order_status === "Delivered") {
        return next(new ErrorHandler("This order is already delivered.", 404));
    }
    order.order_status = req.body.status;
    console.log(order.order_items);
    order.order_items.forEach(async (item) => {
        await updateProductStock(item.product_id, item.quantity);
    });
    await order.save({validateBeforeSave: false});

    res.status(200).json({
        success: true,
        order
    })
})

async function updateProductStock (productId, qty) {
    const product = await Product.findById(productId);
    product.stock-=qty;
    await product.save({validateBeforeSave: false});
}

//delete order - admin
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if(!order) {
        return next(ErrorHandler("Order not found", 404));
    }
    await order.remove();
    res.status(200).json({
        success: true,
        message: "order deleted succesfully."
    })
});