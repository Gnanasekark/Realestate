const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const multer = require('multer');




exports.register = async (req, res) => {
  console.log("BODY RECEIVED:", req.body);
  const { username, email, password } = req.body;
  console.log("Incoming request body:", req.body);
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const user = new User({ username, email, password });
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    console.error("Error during registration:",err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
  console.log("Request Body:", req.body);
  
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).send('Server error');
  }
};
