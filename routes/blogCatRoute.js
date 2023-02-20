const express = require('express');
const router = express.Router();

const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getCategories,
} = require('../controllers/blogCatCtrl');
const { isAdmin, authMiddlware } = require('../middlewares/authMiddlware');

router.post('/', authMiddlware, isAdmin, createCategory);
router.put('/:id', authMiddlware, isAdmin, updateCategory);
router.delete('/:id', authMiddlware, isAdmin, deleteCategory);
router.get('/:id', getCategory);
router.get('/', getCategories);

module.exports = router;
