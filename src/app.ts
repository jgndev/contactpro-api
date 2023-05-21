import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

export const DEBUG = true;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

export default app;