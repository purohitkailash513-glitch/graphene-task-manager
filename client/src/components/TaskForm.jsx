import { useState } from "react";

export default function TaskForm({ addTask }) {
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;
addTask({
  title,
  description,
  dueDate
});

setTitle("");
setDescription("");
setDueDate("");
   
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

     <input
  type="text"
  placeholder="Description"
  value={description}
  onChange={(e) =>
    setDescription(e.target.value)
  }
/>

<input
  type="date"
  value={dueDate}
  onChange={(e) =>
    setDueDate(e.target.value)
  }
/>

<button type="submit">
  Add Task
</button>
    </form>
  );
}
