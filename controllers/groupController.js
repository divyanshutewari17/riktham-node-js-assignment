const Group = require('../models/Group');
const User = require('../models/User');

exports.createGroup = async (req, res) => {
  const { name } = req.body;
  try {
    const group = new Group({ name });
    await group.save();
    res.status(201).json({ message: 'Group created successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteGroup = async (req, res) => {
  const { groupId } = req.params;
  try {
    await Group.findByIdAndDelete(groupId);
    res.json({ message: 'Group deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.addMember = async (req, res) => {
  const { groupId, userId } = req.params;
  try {
    const group = await Group.findById(groupId);
    const user = await User.findById(userId);
    if (!group || !user) {
      return res.status(404).json({ message: 'Group or user not found' });
    }
    if (!group.members.includes(userId)) {
      group.members.push(userId);
      await group.save();
    }
    res.json({ message: 'Member added successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.searchGroups = async (req, res) => {
  const { query } = req.query;
  try {
    const groups = await Group.find({ name: new RegExp(query, 'i') });
    res.json(groups);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
