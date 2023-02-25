import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));


app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Welcome to AI Image App',
  });
});

mongoose.set('strictQuery', true);

const PORT = process.env.PORT|| 4000;

mongoose.connect(process.env.CONNECTION_URL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

//app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`))