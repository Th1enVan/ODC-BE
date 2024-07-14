import "reflect-metadata";
import { AppDataSource } from "./database";
import app from "./app";
import express from "express";

const PORT = 8000;

app.use(express.json());

// Using the right reference of the db
app.get("/backup", async (req, res) => {
  const timestamp = new Date().toLocaleTimeString('en-GB').replace(/:/g, ""); // replace all the ":" with ""

  try {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.query(`VACUUM INTO 'backup_${timestamp}.db'`);
    await queryRunner.release();
    res.status(200).send(`Database backed up to backup_${timestamp}.db`);

  } catch (error) {
    console.error(`Error during backup: ${error}`);
    res.status(500).send("Error during backup");
  }
});


AppDataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(() => {
  console.log("Database Connection Error!")
});