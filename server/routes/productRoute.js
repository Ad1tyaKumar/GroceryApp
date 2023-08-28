import express from 'express';
import {  createProductReview, deleteReview, getAllProducts, getProductDetails, getProductReviews } from '../controller/productController.js';
import { isAuthenticated } from '../middlewares/auth.js';
const router = express.Router();

router.route('/products').get(getAllProducts);
router
    .route('/product/:id')
    .get(getProductDetails);
router
    .route('/review')
    .put(isAuthenticated, createProductReview);
router
    .route('/reviews')
    .get(getProductReviews)
    .delete(isAuthenticated, deleteReview);

export default router; 