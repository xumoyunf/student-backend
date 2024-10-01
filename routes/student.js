// routes/student.js
const express = require('express');
const router = express.Router();

// In-memory talabalar ro'yxati
let students = [];

// GET - Barcha talabalarni olish
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: students,
    });
});

// POST - Yangi talaba qo'shish
router.post('/', (req, res) => {
    const { firstName, lastName, email } = req.body;

    if (!firstName || !lastName || !email) {
        return res.status(400).json({
            success: false,
            message: 'Iltimos, barcha maydonlarni to\'ldiring',
        });
    }

    const newStudent = {
        id: students.length + 1,
        firstName,
        lastName,
        email,
    };

    students.push(newStudent);

    res.status(201).json({
        success: true,
        data: newStudent,
    });
});

// PUT - Talabani yangilash
router.put('/:id', (req, res) => {
    const { id } = req.params; // Talaba ID'sini olish
    const { firstName, lastName, email } = req.body;

    const studentIndex = students.findIndex((s) => s.id === parseInt(id));
    if (studentIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Talaba topilmadi',
        });
    }

    // Talabani yangilash
    students[studentIndex] = {
        id: parseInt(id),
        firstName: firstName || students[studentIndex].firstName,
        lastName: lastName || students[studentIndex].lastName,
        email: email || students[studentIndex].email,
    };

    res.status(200).json({
        success: true,
        data: students[studentIndex],
    });
});

// DELETE - Talabani o'chirish
router.delete('/:id', (req, res) => {
    const { id } = req.params; // Talaba ID'sini olish

    const studentIndex = students.findIndex((s) => s.id === parseInt(id));
    if (studentIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Talaba topilmadi',
        });
    }

    // Talabani o'chirish
    students.splice(studentIndex, 1);

    res.status(200).json({
        success: true,
        message: 'Talaba muvaffaqiyatli o\'chirildi',
    });
});

module.exports = router;
