const express = require('express');
const router = express.Router();

const {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  uploadImages,
  deleteImages,
} = require('../controllers/productCtrl');
const { isAdmin, authMiddlware } = require('../middlewares/authMiddlware');
const {
  uploadPhoto,
  productImgResize,
} = require('../middlewares/uploadImages');

router.post('/', authMiddlware, isAdmin, createProduct);
router.put(
  '/upload',
  authMiddlware,
  isAdmin,
  uploadPhoto.array('images', 10),
  productImgResize,
  uploadImages
);
router.get('/:id', getProduct);
router.put('/wishlist', authMiddlware, addToWishlist);
router.put('/rating', authMiddlware, rating);

router.put('/:id', authMiddlware, isAdmin, updateProduct);
router.delete('/:id', authMiddlware, isAdmin, deleteProduct);
router.delete('/delete-img/:id', authMiddlware, isAdmin, deleteImages);
router.get('/', getProducts);

module.exports = router;
