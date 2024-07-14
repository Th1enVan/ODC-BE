import express from "express";
import bodyParser from "body-parser";
import taskRoutes from "./routes/taskRoutes";

const app = express();
app.use(bodyParser.json());
app.use("/api", taskRoutes);

export default app;