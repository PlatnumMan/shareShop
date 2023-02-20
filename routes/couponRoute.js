const express = require('express');
const router = express.Router();

const {
  createCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
} = require('../controllers/couponCtrl');
const { isAdmin, authMiddlware } = require('../middlewares/authMiddlware');

router.post('/', authMiddlware, isAdmin, createCoupon);
router.get('/', authMiddlware, isAdmin, getAllCoupons);
router.put('/:id', authMiddlware, isAdmin, updateCoupon);
router.delete('/:id', authMiddlware, isAdmin, deleteCoupon);

module.exports = router;
