const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


const students = [
    { id: 1, name: 'Ali', email: 'ali@mail.com', password: '1234' },
    { id: 2, name: 'Sara', email: 'sara@mail.com', password: 'abcd' }
];


app.post('/api/students', (req, res) => {
    const { name, email, password } = req.body;

    if (!name?.trim() || !email ?.trim() ||!password?.trim()) {
        return res.status(400).json({
            message: 'Missing or invalid data'
        });
    }

    const exists = students.find(student => student.email === email);
    if (exists) {
        return res.status(409).json({
            message: 'Email is already in use'
        });
    }

    const newStudent = {
        id: students.length + 1,
        name,
        email,
        password
    };
    students.push(newStudent);

    res.status(201).json({
        message: 'Student registered successfully',
        student: newStudent
    });
});

// تشغيل السيرفر
app.listen(3000, () => {
    console.log('✅ Server running on http://localhost:3000');
});