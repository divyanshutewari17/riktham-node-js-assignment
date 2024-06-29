const express = require('express');
const { createUser, editUser } = require('../controllers/userController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/users', authMiddleware, isAdmin, createUser);
router.put('/users/:userId', authMiddleware, isAdmin, editUser);

module.exports = router;
