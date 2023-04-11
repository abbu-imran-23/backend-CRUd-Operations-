const mongoose = require('mongoose');

const ProductModel = mongoose.Schema(
    {
        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        price: {
            type: Number,
            required: true
        }
    }
)

const Product = mongoose.model('Product',ProductModel);

module.exports = Product;