import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name."]
    },
    description: {
        type: String,
        required: [true, "Please enter product description."]
    },
    price: {
        type: Number,
        required: [true, "Please enter product Price."],
        maxLength: [8, "Price cannot exceed 8 characters"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [{
        public_id: {
            type: String,
            requried: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    category: {
        type: String,
        requried: [true, "Please enter product catergory"],
    },
    subCategory: {
        type: String,
        requried: [true, "Please enter product subCatergory"],
    },
    brand: {
        type: String,
        requried: [true, "Please enter product Brand"],
    },
    Stock: {
        type: Number,
        requried: [true, "Please enter product stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                requried: true
            },
            rating: {
                type: Number,
                requried: true
            },
            comment: {
                type: String,
                requried: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const Product = mongoose.model("Product", productSchema);
