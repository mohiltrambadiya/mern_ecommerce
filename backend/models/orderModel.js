const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        shipping_info: {
            address: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true
            },
            pincode: {
                type: Number,
                required: true
            },
            phone_no: {
                type: Number,
                required: true
            }
        },
        order_items: [{
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            product: {
                type: mongoose.Schema.ObjectId,
                required: true,
                ref: 'Product'
            }
        }],
        user_id: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: 'User'
        },
        payment_info: {
            id: {
                type: String,
                required: true
            },
            status: {
                type: String,
                required: true
            }
        },
        paid_at: {
            type: Date,
            required: true
        },
        items_price: {
            type: Number,
            required: true,
            default: 0
        },
        tax_price: {
            type: Number,
            required: true,
            default: 0
        },
        shipping_price: {
            type: Number,
            required: true,
            default: 0
        },
        total_price: {
            type: Number,
            required: true,
            default: 0
        },
        order_status: {
            type: String,
            required: true,
            default: "Processing"
        },
        delivered_at: Date
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Order', orderSchema);