const User = require('../models/User');

exports.createUser = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const user = new User({ username, password, role });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.editUser = async (req, res) => {
  const { userId } = req.params;
  const { username, role } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.username = username || user.username;
    user.role = role || user.role;
    await user.save();
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
