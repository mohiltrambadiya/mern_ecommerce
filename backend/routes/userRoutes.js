const express = require('express');
const { registerUser, loginUser, logout, sendResetPasswordMail, resetPassword, getUserDetail, changePassword, updateUserProfile, getAllUser, getSingleUser, deleteUser } = require('../controllers/userController');
const { verifyToken, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

//authrntication route
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/reset').post(sendResetPasswordMail);
router.route('/password/reset/:token').put(resetPassword);
router.route('/logout').get(logout);

//user route
router.route('/user/profile').get(verifyToken, getUserDetail);
router.route('/user/password/change').put(verifyToken, changePassword);
router.route('/user/profile/update').put(verifyToken, updateUserProfile);
router.route('/admin/user').get(verifyToken, authorizeRoles("admin"), getAllUser);
router.route('/admin/user/:id').get(verifyToken, authorizeRoles("admin"), getSingleUser);
router.route('/admin/user/delete/:id').delete(verifyToken, authorizeRoles("admin"), deleteUser);



module.exports = router;