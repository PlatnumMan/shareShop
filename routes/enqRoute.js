const express = require('express');
const router = express.Router();

const {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getEnquiry,
  getEnquirys,
} = require('../controllers/enqCtrl');
const { isAdmin, authMiddlware } = require('../middlewares/authMiddlware');

router.post('/', createEnquiry);
router.put('/:id', authMiddlware, isAdmin, updateEnquiry);
router.delete('/:id', authMiddlware, isAdmin, deleteEnquiry);
router.get('/:id', getEnquiry);
router.get('/', getEnquirys);

module.exports = router;
