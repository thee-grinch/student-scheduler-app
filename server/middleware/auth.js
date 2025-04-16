import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) throw new Error();
    
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Not authorized' });
  }
};

export default auth;