const express = require('express');
const { createOrder, getOrderDetail, getLoginUserOrders, getAllOrders, updateOrderStatus, deleteOrder } = require('../controllers/orderController');
const { verifyToken, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

router.route('/order/create').post(verifyToken, createOrder);
router.route('/order/:id').get(verifyToken, getOrderDetail);
router.route('/orders/me').get(verifyToken, getLoginUserOrders);
router.route('/admin/orders').get(verifyToken, authorizeRoles('admin'), getAllOrders);
router.route('/admin/order/:id').put(verifyToken, authorizeRoles('admin'), updateOrderStatus).delete(verifyToken, authorizeRoles('admin'), deleteOrder);

module.exports = router;