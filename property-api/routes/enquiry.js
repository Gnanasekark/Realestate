const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middlewares');
const {
  createEnquiry,
  getEnquiries,
  updateEnquiry,
  deleteEnquiry,
} = require('../controllers/enquiryController');

router.post('/', auth, createEnquiry);
router.get('/', auth, getEnquiries);
router.put('/:id', auth, updateEnquiry);
router.delete('/:id', auth, deleteEnquiry);

module.exports = router;
