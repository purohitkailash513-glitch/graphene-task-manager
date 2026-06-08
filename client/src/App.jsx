import "./App.css";
import { useEffect, useState } from "react";
import api from "./api";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const loadTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async (task) => {
    await api.post("/tasks", task);
    loadTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    loadTasks();
  };

  const toggleTask = async (id) => {
    await api.patch(`/tasks/${id}/toggle`);
    loadTasks();
  };

  const editTask = async (
    id,
    title,
    description
  ) => {
    await api.put(`/tasks/${id}`, {
      title,
      description,
    });

    loadTasks();
  };

  const activeCount = tasks.filter(
    (task) => !task.completed
  ).length;

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all"
        ? true
        : filter === "active"
        ? !task.completed
        : task.completed;

    return matchesSearch && matchesFilter;
  });

  return (
    <>
      {/* NAVBAR */}

      <div
        style={{
          background: "#2563eb",
          color: "white",
          padding: "15px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
          borderRadius: "0 0 15px 15px",
        }}
      >
        <h2
          style={{
            color: "white",
            margin: 0,
          }}
        >
          Studio Graphene
        </h2>

        <div
          style={{
            fontWeight: "600",
          }}
        >
          Task Dashboard
        </div>
      </div>

      <div className="container">

        {/* HEADER */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          <h1
            style={{
              color: "#2563eb",
              marginBottom: "10px",
              fontSize: "2.6rem",
            }}
          >
            🚀 Graphene Task Hub
          </h1>

          <p
            style={{
              color: "#666",
              fontSize: "16px",
            }}
          >
            Welcome to your productivity dashboard.
            Create, manage and track tasks with
            real-time status updates.
          </p>
        </div>

        {/* TASK FORM */}

        <TaskForm addTask={addTask} />

        {/* SEARCH + FILTERS */}

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="🔍 Search tasks..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              flex: 1,
              minWidth: "250px",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #ddd",
            }}
          />

          <button
            onClick={() =>
              setFilter("all")
            }
          >
            All
          </button>

          <button
            onClick={() =>
              setFilter("active")
            }
          >
            Active
          </button>

          <button
            onClick={() =>
              setFilter("completed")
            }
          >
            Completed
          </button>
        </div>

        {/* STATS */}

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              flex: 1,
              background: "#dbeafe",
              padding: "18px",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <h2>{activeCount}</h2>
            <p>Active Tasks</p>
          </div>

          <div
            style={{
              flex: 1,
              background: "#dcfce7",
              padding: "18px",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <h2>{completedCount}</h2>
            <p>Completed Tasks</p>
          </div>
        </div>

        {/* TASK LIST */}

        {filteredTasks.length === 0 ? (

          <div
            style={{
              textAlign: "center",
              padding: "50px",
              background: "#f9fafb",
              borderRadius: "15px",
              border:
                "2px dashed #d1d5db",
            }}
          >
            <h1
              style={{
                fontSize: "60px",
                marginBottom: "10px",
              }}
            >
              📋
            </h1>

            <h3>
              No Tasks Found
            </h3>

            <p>
              Create your first task
              to get started.
            </p>
          </div>

        ) : (

          <TaskList
            tasks={filteredTasks}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
            editTask={editTask}
          />

        )}

        {/* FOOTER */}

        <hr />

        <p
          style={{
            textAlign: "center",
            color: "#888",
            marginTop: "20px",
            lineHeight: "1.8",
          }}
        >
          Task Management Dashboard
          <br />
          Built for Studio Graphene
          Technical Assessment
        </p>

      </div>
    </>
  );
}

export default App;