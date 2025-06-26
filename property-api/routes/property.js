const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middlewares/auth.middlewares');
const {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty
} = require('../controllers/propertyController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.post('/', auth, upload.single('image'), createProperty);
router.get('/', auth, getProperties);
router.get('/:id', auth, getPropertyById);
router.put('/:id', auth, upload.single('image'), updateProperty);
router.delete('/:id', auth, deleteProperty);

module.exports = router;
