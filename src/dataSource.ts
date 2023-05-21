import {DataSource} from "typeorm";
import {User} from "./models/user";
import {Category} from "./models/category";
import {Contact} from "./models/contact";

// NOTE:
// Set 'synchronize: false' with data that should persist.
// Having 'synchronize: true' will re-initialize the database.
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  synchronize: true,
  logging: true,
  entities: [User, Category, Contact],
  subscribers: [],
  migrations: [],
})