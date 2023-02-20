const express = require('express');
const router = express.Router();

const {
  createBlog,
  updateBlog,
  getBlog,
  getBlogs,
  deleteBlog,
  likeBlog,
  disLikeBlog,
  uploadImages,
} = require('../controllers/blogCtrl');
const { authMiddlware, isAdmin } = require('../middlewares/authMiddlware');
const { uploadPhoto, blogImgResize } = require('../middlewares/uploadImages');

router.post('/', authMiddlware, isAdmin, createBlog);
router.put(
  '/upload/:id',
  authMiddlware,
  isAdmin,
  uploadPhoto.array('images', 2),
  blogImgResize,
  uploadImages
);

router.put('/likes', authMiddlware, likeBlog);
router.put('/dislikes', authMiddlware, disLikeBlog);

router.put('/:id', authMiddlware, isAdmin, updateBlog);
router.delete('/:id', authMiddlware, isAdmin, deleteBlog);

router.get('/:id', getBlog);
router.get('/', getBlogs);

module.exports = router;
