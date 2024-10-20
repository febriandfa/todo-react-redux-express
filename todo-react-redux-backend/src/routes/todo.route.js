const express = require("express");
const Todo = require("../models/todo.model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.status(200).json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const { title } = req.body;
    const newTodo = new Todo({
      title,
    });
    await newTodo.save();
    res.status(201).send("Todo created!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { title } = req.body;
    await Todo.findByIdAndUpdate(req.params.id, { title });
    res.status(200).send("Todo updated!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.patch("/:id/complete", async (req, res) => {
  try {
    await Todo.findByIdAndUpdate(req.params.id, { completed: true });
    res.status(200).send("Todo completed!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).send("Todo deleted!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
