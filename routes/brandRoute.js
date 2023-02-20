const express = require('express');
const router = express.Router();

const {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getBrands,
} = require('../controllers/brandCtrl');
const { isAdmin, authMiddlware } = require('../middlewares/authMiddlware');

router.post('/', authMiddlware, isAdmin, createBrand);
router.put('/:id', authMiddlware, isAdmin, updateBrand);
router.delete('/:id', authMiddlware, isAdmin, deleteBrand);
router.get('/:id', getBrand);
router.get('/', getBrands);

module.exports = router;
