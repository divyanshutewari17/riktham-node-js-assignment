const express = require('express');
const { sendMessage, likeMessage } = require('../controllers/messageController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/messages', authMiddleware, sendMessage);
router.put('/messages/:messageId/like', authMiddleware, likeMessage);

module.exports = router;
