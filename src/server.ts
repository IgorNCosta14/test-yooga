import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import { router } from './routes';
import './containers';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
