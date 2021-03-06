const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter product name.'],
            trim: true
        },
        description: {
            type: String,
            required: [true, 'Please enter product description.'],
            trim: true
        },
        price: {
            type: Number,
            required: [true, 'Please enter product price.'],
            maxLength: [8, "Price can not exceed 8 characters."]    
        },
        rateings: {
            type: Number,
            default: 0
        },
        images: [
            {
                public_id: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                }
            }
        ],
        category: {
            type: String,
            required: [true, 'Please enter product category.']
        },
        stock: {
            type: Number,
            required: [true, 'Please enter product stock.'],
            maxLength: [, "Price can not exceed  characters."],
            default: 1
        },
        num_of_reviews: {
            type: Number,
            default: 0
        },
        reviews: [
            {
                user_id: {
                    type: mongoose.Schema.ObjectId,
                    required: true,
                    ref: 'User'
                },
                name: {
                    type: String,
                    required: true
                },
                rating: {
                    type: Number,
                    required: true
                },
                comment: {
                    type: String,
                    required: true
                }
            }
        ],
        user_id: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    {
        timestamps: true
    } 
);

module.exports = mongoose.model('Product', productSchema);