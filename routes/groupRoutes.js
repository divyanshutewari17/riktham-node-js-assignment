const express = require('express');
const { createGroup, deleteGroup, addMember, searchGroups } = require('../controllers/groupController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/groups', authMiddleware, createGroup);
router.delete('/groups/:groupId', authMiddleware, deleteGroup);
router.put('/groups/:groupId/members/:userId', authMiddleware, addMember);
router.get('/groups', authMiddleware, searchGroups);

module.exports = router;
