const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const FILE = "./task.json";

// Get all tasks
app.get("/tasks", (req, res) => {
  const tasks = JSON.parse(
    fs.readFileSync(FILE, "utf8")
  );

  res.json(tasks);
});

// Add task
app.post("/tasks", (req, res) => {
  const tasks = JSON.parse(
    fs.readFileSync(FILE, "utf8")
  );

  const newTask = {
    id: Date.now(),
    title: req.body.title,
    description:
      req.body.description || "",
    dueDate:
      req.body.dueDate || "",
    completed: false,
    createdAt: new Date(),
  };

  tasks.unshift(newTask);

  fs.writeFileSync(
    FILE,
    JSON.stringify(tasks, null, 2)
  );

  res.status(201).json(newTask);
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  let tasks = JSON.parse(
    fs.readFileSync(FILE, "utf8")
  );

  tasks = tasks.filter(
    (task) =>
      task.id != req.params.id
  );

  fs.writeFileSync(
    FILE,
    JSON.stringify(tasks, null, 2)
  );

  res.json({
    message: "Task Deleted",
  });
});

// Toggle task complete
app.patch(
  "/tasks/:id/toggle",
  (req, res) => {
    let tasks = JSON.parse(
      fs.readFileSync(FILE, "utf8")
    );

    tasks = tasks.map((task) =>
      task.id == req.params.id
        ? {
            ...task,
            completed:
              !task.completed,
          }
        : task
    );

    fs.writeFileSync(
      FILE,
      JSON.stringify(
        tasks,
        null,
        2
      )
    );

    res.json({
      message: "Task Updated",
    });
  }
);

// Edit task
app.put("/tasks/:id", (req, res) => {
  let tasks = JSON.parse(
    fs.readFileSync(FILE, "utf8")
  );

  tasks = tasks.map((task) =>
    task.id == req.params.id
      ? {
          ...task,
          title:
            req.body.title ||
            task.title,

          description:
            req.body.description ||
            task.description,

          dueDate:
            req.body.dueDate ||
            task.dueDate,
        }
      : task
  );

  fs.writeFileSync(
    FILE,
    JSON.stringify(tasks, null, 2)
  );

  res.json({
    message: "Task Updated",
  });
});

app.listen(5000, () => {
  console.log(
    "Server running on port 5000"
  );
});