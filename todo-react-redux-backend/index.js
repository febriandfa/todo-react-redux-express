require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");

const todoRoutes = require("./src/routes/todo.route");

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/todo", todoRoutes);

app.get("/", (req, res) => {
  try {
    res.send("Hello World!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
