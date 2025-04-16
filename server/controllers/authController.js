import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export const register = async (req, res) => {
  try {
    console.log('registering user');
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User exists' });

    const user = await User.create({ name, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.status(201).json({ user: { id: user._id, name, email }, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    console.log('login user')
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ user: { id: user._id, name: user.name, email }, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const requestPasswordReset = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const token = crypto.randomBytes(20).toString('hex');
      user.resetToken = token;
      user.resetExpires = Date.now() + 3600000; // 1 hour
      await user.save();
  
      await sendEmail({
        to: user.email,
        subject: 'Password Reset Request',
        text: `Use this link to reset your password: ${process.env.CLIENT_URL}/reset-password/${token}`
      });
  
      res.json({ message: 'Reset email sent' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  export const resetPassword = async (req, res) => {
    try {
      const user = await User.findOne({
        resetToken: req.params.token,
        resetExpires: { $gt: Date.now() }
      });
  
      if (!user) return res.status(400).json({ message: 'Invalid or expired token' });
  
      user.password = req.body.password;
      user.resetToken = undefined;
      user.resetExpires = undefined;
      await user.save();
  
      res.json({ message: 'Password updated successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclude the password field
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
