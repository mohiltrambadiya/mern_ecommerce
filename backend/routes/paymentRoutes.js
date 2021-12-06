const express = require("express");
const { processPayment, stripeApiKey } = require("../controllers/paymentController");
const router = express.Router();
const { verifyToken, authorizeRoles } = require('../middleware/auth');

//payment route
router.route('/process/payment').post(verifyToken, processPayment)
router.route('/stripeapikey').get(verifyToken, stripeApiKey)

module.exports = router