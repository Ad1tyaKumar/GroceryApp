import { Product } from '../model/productModel.js'
import ErrorHandler from '../utils/errorHandler.js';
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import ApiFeatures from '../utils/apiFeatures.js';
import cloudinary from 'cloudinary'
//Create Product


//Get All ProductS
export const getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 14;
    const productCount = await Product.countDocuments();
    
    const apiFeatures = new ApiFeatures(Product, req.query);
    apiFeatures.search().filter().pagination(resultPerPage);
    let products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        products,
        productCount,
    });
});

//Get Single Product

export const getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
        success: true,
        product,
    })
});


//Create or Update the review
export const createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body.reviewData;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );
    if (isReviewed) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating,
                    rev.comment = comment
            }
        })
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
    let avg = 0;
    product.reviews.forEach(rev => avg += rev.rating);
    product.ratings = avg / product.reviews.length;
    await product.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true
    })

})

//get ALL reviews of a product
export const getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    if (!product) {
        return next(new ErrorHandler(`Product doesnot exist with id:${req.query.id}`, 404));
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews,
    })
})

export const deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    if (!product) {
        return next(new ErrorHandler(`Product doesnot exist with id:${req.query.productId}`, 404));
    }
    const reviews = product.reviews.filter(rev => rev._id.toString() != req.query.reviewId.toString());

    let avg = 0;
    reviews.forEach(rev => avg += rev.rating);
    const ratings = avg / reviews.length;

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,
        {
            reviews, ratings, numOfReviews
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
    res.status(200).json({
        success: true,
        reviews: product.reviews,
    })
})