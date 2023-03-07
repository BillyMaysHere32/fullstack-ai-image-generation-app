import express, { Router } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();
// app.use(cors());
app.use(
  cors({
    // client url
    origin: "https://bit-pic.netlify.app",

    // dev url
    origin: "http://localhost:5173",
  })
);

app.use(express.json({ limit: '50mb' }));

// create api endpoints to connect to frontend
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Welcome to AI Image App',
  });
});

mongoose.set('strictQuery', true);

const PORT = process.env.PORT|| 4000;

mongoose.connect(process.env.NEW_CONNECTION_URL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));