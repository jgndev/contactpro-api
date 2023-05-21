import express from 'express';
import cors from 'cors';
import {AppDataSource} from "./dataSource";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: process.env.DB_HOST,
//   port: 5432,
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   synchronize: true,
//   logging: true,
//   entities: [User, Category, Contact],
//   subscribers: [],
//   migrations: [],
// })

AppDataSource.initialize()
  .then(() => {
    // Do something with the database
    console.log("Database initialized");
  })
  .catch((error) => console.log(error));

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

export default app;