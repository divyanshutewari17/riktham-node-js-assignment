const Message = require('../models/Message');
const Group = require('../models/Group');
const User = require('../models/User');

exports.sendMessage = async (req, res) => {
  const { groupId, text } = req.body;
  const userId = req.user.id;
  try {
    const group = await Group.findById(groupId);
    const user = await User.findById(userId);
    if (!group || !user) {
      return res.status(404).json({ message: 'Group or user not found' });
    }
    const message = new Message({ group: groupId, user: userId, text });
    await message.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.likeMessage = async (req, res) => {
  const { messageId } = req.params;
  const userId = req.user.id;
  try {
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    if (!message.likes.includes(userId)) {
      message.likes.push(userId);
      await message.save();
    }
    res.json({ message: 'Message liked successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
