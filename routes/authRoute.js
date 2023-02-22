const express = require('express');
const router = express.Router();

const {
  createUser,
  loginUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  blockUser,
  unBlockUser,
  handleRefreshToken,
  logoutUser,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCouponToUserCart,
  createOrder,
  getUserOrders,
  updateOrderStatus,
} = require('../controllers/userCtrl');
const { authMiddlware, isAdmin } = require('../middlewares/authMiddlware');

router.post('/register', createUser);
router.post('/forgot-password-token', forgotPasswordToken);
router.put('/reset-password/:token', resetPassword);

router.put('/update-password', authMiddlware, updatePassword);
router.post('/login', loginUser);
router.post('/admin-login', loginAdmin);
router.post('/cart', authMiddlware, userCart);
router.post('/cart/applycoupon', authMiddlware, applyCouponToUserCart);
router.post('/cart/cash-order', authMiddlware, createOrder);
router.get('/all-users', getAllUsers);
router.get('/refresh', handleRefreshToken);
router.get('/logout', logoutUser);
router.delete('/:id', authMiddlware, isAdmin, deleteUser);
router.get('/wishlist', authMiddlware, getWishlist);
router.get('/cart', authMiddlware, getUserCart);
router.get('/get-orders', authMiddlware, getUserOrders);

router.delete('/empty-cart', authMiddlware, emptyCart);

router.get('/:id', authMiddlware, isAdmin, getUser);
router.put('/edit-user', authMiddlware, updateUser);
router.put('/save-address', authMiddlware, saveAddress);
router.put('/block-user/:id', authMiddlware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddlware, isAdmin, unBlockUser);
router.put('/order/update-order/:id', authMiddlware, isAdmin, updateOrderStatus);

module.exports = router;
