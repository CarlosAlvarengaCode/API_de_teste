import express from "express";
import { pool } from "./database.js";

const app = express();
app.use(express.json());

app.post("/usuario", async (req, res) => {
  const { name, email } = req.body;

  await pool.query("INSERT INTO user (name, email) VALUES (?, ?)", [
    name,
    email,
  ]);

  res.status(201).send("Salvo no MySQL");
});

app.get("/usuario", async (req, res) => {
  const result = await pool.query("SELECT * FROM usuarios");
  res.status(200).json(result.rows);
});

app.listen(3004, () => {
  console.log("Servidor rodando na porta 3004");
});
