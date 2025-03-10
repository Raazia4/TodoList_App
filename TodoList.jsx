import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TodoList = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [dateTime, setDateTime] = useState(new Date());
  const [theme, setTheme] = useState("light"); // Default theme
  const [editingId, setEditingId] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  // Load tasks & theme from LocalStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const savedTheme = localStorage.getItem("theme") || "light";
    setTasks(savedTasks);
    setTheme(savedTheme);
  }, []);

  // Save tasks & theme to LocalStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("theme", theme);
  }, [tasks, theme]);

  // Update Date & Time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Toggle Theme Mode
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Add Task
  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
    setTask("");
  };

  // Mark as Complete
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Start Editing Task
  const startEditing = (id, text) => {
    setEditingId(id);
    setEditedTask(text);
  };

  // Save Edited Task
  const saveEditedTask = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editingId ? { ...task, text: editedTask } : task
      )
    );
    setEditingId(null);
    setEditedTask("");
  };

  // Get filtered tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return true;
  });

  // Export Tasks
  const exportTasks = () => {
    const dataStr = JSON.stringify(tasks);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tasks.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Import Tasks
  const importTasks = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedTasks = JSON.parse(e.target.result);
        setTasks(importedTasks);
      } catch (error) {
        alert("Invalid file format!");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className={`container mt-4 p-4 shadow rounded ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}>
      {/* Theme Toggle */}
      <div className="text-end">
        <button className="btn btn-outline-primary" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>

      {/* Live Date & Time */}
      <h5 className="text-center text-muted">
        {dateTime.toLocaleDateString()} | {dateTime.toLocaleTimeString()}
      </h5>

      <h2 className="text-center mb-4 text-primary">📝 To-Do List</h2>

      {/* Task Input & Add Button */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control shadow-sm"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="btn btn-success shadow-sm" onClick={addTask}>
          ➕ Add Task
        </button>
      </div>

      {/* Filter Options */}
      <div className="mb-3 text-center">
        <button
          className={`btn mx-1 ${filter === "All" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        <button
          className={`btn mx-1 ${filter === "Completed" ? "btn-success" : "btn-outline-success"}`}
          onClick={() => setFilter("Completed")}
        >
          ✅ Completed
        </button>
        <button
          className={`btn mx-1 ${filter === "Pending" ? "btn-warning" : "btn-outline-warning"}`}
          onClick={() => setFilter("Pending")}
        >
          ⏳ Pending
        </button>
      </div>

      {/* Task List */}
      <ul className="list-group">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((t) => (
            <li
              key={t.id}
              className={`list-group-item d-flex justify-content-between align-items-center shadow-sm ${
                theme === "dark" ? "bg-secondary text-white" : ""
              }`}
            >
              <div className="d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  checked={t.completed}
                  onChange={() => toggleComplete(t.id)}
                />
                {editingId === t.id ? (
                  <input
                    type="text"
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                    className="form-control form-control-sm"
                  />
                ) : (
                  <span style={{ textDecoration: t.completed ? "line-through" : "none" }}>
                    {t.text}
                  </span>
                )}
              </div>
              <div>
                {editingId === t.id ? (
                  <button className="btn btn-sm btn-success me-2" onClick={saveEditedTask}>💾 Save</button>
                ) : (
                  <button className="btn btn-sm btn-warning me-2" onClick={() => startEditing(t.id, t.text)}>✏️ Edit</button>
                )}
                <button className="btn btn-sm btn-danger" onClick={() => deleteTask(t.id)}>🗑</button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-muted">No tasks to show...</p>
        )}
      </ul>

      {/* Export & Import */}
      <div className="text-center mt-3">
        <button className="btn btn-info me-2" onClick={exportTasks}>📤 Export Tasks</button>
        {/* <input type="file" className="form-control d-inline-block w-auto" onChange={importTasks} /> */}
      </div>
    </div>
  );
};

export default TodoList;