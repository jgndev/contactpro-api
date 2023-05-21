import express from 'express';
import cors from 'cors';
import {AppDataSource} from "./dataSource";
import dotenv from 'dotenv';

export const DEBUG = true;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    // Do something with the database
    console.log("Database initialized");
  })
  .catch((error) => console.log(error));

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

export default app;