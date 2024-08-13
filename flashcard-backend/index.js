const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const urlDB = process.env.DB_URL; // Use environment variable for database URL
const db = mysql.createConnection(urlDB);

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to database.");
});

// Get All FlashCards
app.get("/api/flashcards", (req, res) => {
  db.query("SELECT * FROM flashcards", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

// Get FlashCards by Category
app.get("/api/flashcards/:category", (req, res) => {
  const category = req.params.category;
  db.query(
    "SELECT * FROM flashcards WHERE category = ?",
    [category],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json(results);
    }
  );
});

// Endpoint to get all categories
app.get("/api/categories", async (req, res) => {
  try {
    const [rows] = await db
      .promise()
      .query("SELECT DISTINCT category FROM flashcards");
    res.json(rows.map((row) => row.category));
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send("Server Error");
  }
});

// Add a new FlashCard
app.post("/api/flashcards", (req, res) => {
  const { question, answer, category } = req.body;
  db.query(
    "INSERT INTO flashcards (question, answer, category) VALUES (?, ?, ?)",
    [question, answer, category],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json({ id: results.insertId, question, answer, category });
    }
  );
});

// Edit Flashcard
app.put("/api/flashcards/:id", (req, res) => {
  const { id } = req.params;
  const { question, answer, category } = req.body;
  db.query(
    "UPDATE flashcards SET question = ?, answer = ?, category = ? WHERE id = ?",
    [question, answer, category, id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Flashcard not found" });
      }
      res.json({ message: "Flashcard updated successfully" });
    }
  );
});

// Delete Flashcard
app.delete("/api/flashcards/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM flashcards WHERE id = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Flashcard not found" });
    }
    res.json({ message: "Flashcard deleted successfully" });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
