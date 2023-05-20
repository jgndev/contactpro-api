import express from 'express';
import cors from 'cors';
import {DataSource} from "typeorm";
import dotenv from 'dotenv';
import {User} from "./models/user";
import {Category} from "./models/category";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    logging: true,
    entities: [User, Category],
    subscribers: [],
    migrations: [],
})

AppDataSource.initialize()
    .then(() => {
       // Do something with the database
    })
    .catch((error) => console.log(error))

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

export default app;