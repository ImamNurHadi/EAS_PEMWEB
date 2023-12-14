import express, { Application, Request, Response } from 'express';
import payload from 'payload';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app: Application = express();

// Middleware CORS
app.use(cors({ origin: 'http://localhost:5173' }));

// Redirect root to Admin panel
app.get('/', (_, res: Response) => {
  res.redirect('/admin');
});

// Endpoint untuk mendapatkan data pendaftaran berdasarkan ID
app.get('/api/pendaftaran/:id', async (req: Request, res: Response) => {
  try {
    // Mendapatkan ID dari parameter URL
    const registrationId = req.params.id;

    // Mengambil data pendaftaran berdasarkan ID
    // Gantilah dengan logika pengambilan data yang sesuai di sini
    const registrationData = await getRegistrationById(registrationId);

    // Mengirimkan data pendaftaran sebagai respons
    res.json(registrationData);
  } catch (error) {
    console.error('Error fetching registration by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const getRegistrationById = async (id: string) => {
  // Implementasikan logika untuk mengambil data pendaftaran berdasarkan ID di sini
  // Gantilah dengan logika sesuai dengan struktur dan sumber data yang Anda miliki
  return {
    id: id,
    nama: 'Nama Pendaftar',
    email: 'email@example.com',
    asal_sekolah: 'Sekolah Pendaftar',
    status: 'Waiting',
  };
};

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app as any, // Cast 'app' to 'any' to resolve the type error
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  // Add your own express routes here

  app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
  });
};

start();
