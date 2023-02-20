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
} = require('../controllers/userCtrl');
const { authMiddlware, isAdmin } = require('../middlewares/authMiddlware');

router.post('/register', createUser);
router.post('/forgot-password-token', forgotPasswordToken);
router.put('/reset-password/:token', resetPassword);

router.put('/update-password', authMiddlware, updatePassword);
router.post('/login', loginUser);
router.get('/all-users', getAllUsers);
router.get('/refresh', handleRefreshToken);
router.get('/logout', logoutUser);
router.delete('/:id', deleteUser);

router.get('/:id', authMiddlware, isAdmin, getUser);
router.put('/edit-user', authMiddlware, updateUser);
router.put('/block-user/:id', authMiddlware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddlware, isAdmin, unBlockUser);

module.exports = router;
