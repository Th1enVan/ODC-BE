import { DataSource } from "typeorm";
import { Task } from "./entities/Tasks";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: ":memory:",
    synchronize: true,
    entities: [Task],
});