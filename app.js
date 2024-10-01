const express = require('express');
const connectDB = require('./config/config');
const dotenv = require('dotenv');
const studentRoutes = require('./routes/student'); // student route fayli

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // JSON ma'lumotlarni to'g'ri o'qish uchun

// Talabalar API marshrutlarini ishlatish
app.use('/api/students', studentRoutes); // /api/students ga ulangan marshrutlar

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server ${PORT}-portda ishlamoqda`));
