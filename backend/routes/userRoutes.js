const express = require('express');
const { getAllUser, registerUser, loginUser, logout } = require('../controllers/userController');
const router = express.Router();

router.route('/user').get(getAllUser);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);


module.exports = router;