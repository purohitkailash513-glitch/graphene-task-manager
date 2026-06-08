export default function TaskItem({
  task,
  deleteTask,
  toggleTask,
  editTask,
}) {

  const isOverdue =
    task.dueDate &&
    !task.completed &&
    new Date(task.dueDate) < new Date();

  const handleEdit = () => {

    const newTitle = prompt(
      "Edit Task Title",
      task.title
    );

    if (!newTitle) return;

    const newDescription =
      prompt(
        "Edit Description",
        task.description
      );

    editTask(
      task.id,
      newTitle,
      newDescription
    );
  };

  const handleDelete = () => {

    const confirmDelete =
      window.confirm(
        "Delete this task?"
      );

    if (confirmDelete) {
      deleteTask(task.id);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        padding: "20px",
        marginBottom: "15px",
        background: "#fff",
        borderRadius: "16px",
        boxShadow:
          "0 4px 15px rgba(0,0,0,0.08)",
        border:
          "1px solid #e5e7eb",
      }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() =>
          toggleTask(task.id)
        }
        style={{
          width: "18px",
          height: "18px",
        }}
      />

      <div
        style={{
          flex: 1,
          textAlign: "left",
          textDecoration:
            task.completed
              ? "line-through"
              : "none",
          opacity:
            task.completed
              ? 0.8
              : 1,
        }}
      >
        <h3
          style={{
            margin: "0 0 8px 0",
            color:
              isOverdue
                ? "#dc2626"
                : "#111827",
          }}
        >
          {task.title}
        </h3>

        <p
          style={{
            margin: "0 0 10px 0",
            color: "#6b7280",
          }}
        >
          {task.description}
        </p>

        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <span>
            📅 {
              task.dueDate
                ? new Date(
                    task.dueDate
                  ).toLocaleDateString()
                : "No Due Date"
            }
          </span>

          <span
            style={{
              padding:
                "4px 10px",
              borderRadius:
                "20px",
              background:
                task.completed
                  ? "#dcfce7"
                  : "#fef3c7",
              color:
                task.completed
                  ? "#166534"
                  : "#92400e",
              fontWeight:
                "600",
            }}
          >
            {task.completed
              ? "Completed"
              : "Pending"}
          </span>

          {isOverdue && (
            <span
              style={{
                padding:
                  "4px 10px",
                borderRadius:
                  "20px",
                background:
                  "#fee2e2",
                color:
                  "#b91c1c",
                fontWeight:
                  "600",
              }}
            >
              Overdue
            </span>
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          onClick={handleEdit}
          style={{
            background:
              "#f59e0b",
            color: "white",
            border: "none",
            padding:
              "10px 16px",
            borderRadius:
              "10px",
            cursor: "pointer",
            fontWeight:
              "600",
          }}
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          style={{
            background:
              "#ef4444",
            color: "white",
            border: "none",
            padding:
              "10px 16px",
            borderRadius:
              "10px",
            cursor: "pointer",
            fontWeight:
              "600",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}