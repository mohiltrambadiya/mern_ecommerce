const express = require('express')
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetail, saveOrUpdateReview, getAllProductReviews, deleteReview } = require('../controllers/productController');
const { verifyToken, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

router.route('/products').get(getAllProducts);
router.route('/admin/product/create').post(verifyToken, authorizeRoles("admin"), createProduct);
router.route('/admin/product/:id').put(verifyToken, authorizeRoles("admin"), updateProduct).delete(verifyToken, authorizeRoles("admin"), deleteProduct).get(getProductDetail)
router.route('/product/:id').get(getProductDetail)
router.route('/product/review').put(verifyToken, saveOrUpdateReview);
router.route('/reviews').get(getAllProductReviews);
router.route('/review/delete').delete(verifyToken, deleteReview);

module.exports = router;