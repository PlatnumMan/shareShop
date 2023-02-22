const express = require('express');
const router = express.Router();

const {
  createColor,
  updateColor,
  deleteColor,
  getColor,
  getColors,
} = require('../controllers/colorCtrl');
const { isAdmin, authMiddlware } = require('../middlewares/authMiddlware');

router.post('/', authMiddlware, isAdmin, createColor);
router.put('/:id', authMiddlware, isAdmin, updateColor);
router.delete('/:id', authMiddlware, isAdmin, deleteColor);
router.get('/:id', getColor);
router.get('/', getColors);

module.exports = router;
