// controllers/authController.js
const Student = require('../models/Student');
const jwt = require('jsonwebtoken');

// JWT token yaratish
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Ro'yxatdan o'tish
exports.registerStudent = async (req, res) => {
  const { firstName, lastName, birthDate, email, password } = req.body;

  try {
    const studentExists = await Student.findOne({ email });
    if (studentExists) {
      return res.status(400).json({ message: 'Foydalanuvchi mavjud' });
    }

    const student = await Student.create({
      firstName,
      lastName,
      birthDate,
      email,
      password,
    });

    return res.status(201).json({
      _id: student._id,
      email: student.email,
      token: generateToken(student._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Xatolik yuz berdi', error });
  }
};

// Login qilish
exports.loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });

    if (student && (await student.matchPassword(password))) {
      return res.json({
        _id: student._id,
        email: student.email,
        token: generateToken(student._id),
      });
    } else {
      return res.status(401).json({ message: "Noto'g'ri elektron pochta yoki parol" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Xatolik yuz berdi', error });
  }
};
