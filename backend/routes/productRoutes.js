const express = require('express')
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetail } = require('../controllers/productController');
const { verifyToken, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

router.route('/products').get(getAllProducts);
router.route('/product/create').post(verifyToken, authorizeRoles("admin"), createProduct);
router.route('/product/:id').put(verifyToken, authorizeRoles("admin"), updateProduct).delete(verifyToken, authorizeRoles("admin"), deleteProduct).get(getProductDetail)

module.exports = router;