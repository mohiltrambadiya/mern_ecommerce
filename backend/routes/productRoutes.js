const express = require('express')
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetail } = require('../controllers/productController');
const router = express.Router();

router.route('/products').get(getAllProducts);
router.route('/product/create').post(createProduct);
router.route('/product/:id').put(updateProduct).delete(deleteProduct).get(getProductDetail)

module.exports = router;