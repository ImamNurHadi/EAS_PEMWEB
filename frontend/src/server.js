const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Simulasi penyimpanan data pendaftaran
const registrations = [];

// Middleware untuk validasi teks
const validateTextMiddleware = (req, res, next) => {
  const { text } = req.body;
  // Contoh validasi sederhana
  if (text.toLowerCase().includes('kata buruk')) {
    return res.status(403).send('Teks mengandung kata-kata buruk.');
  }
  next();
};

// Endpoint untuk mendapatkan data pendaftaran
app.get('/api/pendaftaran', (req, res) => {
  res.json({ docs: registrations });
});

// Endpoint untuk menambahkan pendaftaran baru
app.post('/api/pendaftaran', validateTextMiddleware, (req, res) => {
  const newRegistration = req.body;
  registrations.push(newRegistration);
  res.status(201).json(newRegistration);
});

// Server mendengarkan di port yang telah ditentukan
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
