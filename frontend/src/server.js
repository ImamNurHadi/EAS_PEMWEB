const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Simulasi penyimpanan data pendaftaran
const registrations = [];


// Endpoint untuk mendapatkan data pendaftaran
app.get('http://localhost:3000/api/pendaftaran', (req, res) => {
  res.json({ docs: registrations });
});

// Endpoint untuk menambahkan pendaftaran baru
app.post('http://localhost:3000/api/pendaftaran', validateTextMiddleware, (req, res) => {
  const newRegistration = req.body;
  registrations.push(newRegistration);
  res.status(201).json(newRegistration);
});

// Server mendengarkan di port yang telah ditentukan
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
