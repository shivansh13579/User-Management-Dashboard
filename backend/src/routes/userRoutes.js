const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const { validateUserPayload } = require('../middleware/validate');

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', validateUserPayload, createUser);
router.put('/:id', validateUserPayload, updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
