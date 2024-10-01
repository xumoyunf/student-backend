// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.student = await Student.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Ruxsat etilmagan, noto‘g‘ri token' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Ruxsat etilmagan, token mavjud emas' });
  }
};

module.exports = { protect };
