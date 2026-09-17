import React, { useEffect, useState } from "react";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from "./services/api";

function App() {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [error, setError] = useState("");

  async function loadTasks() {
    try {
      setError("");

      const data = await getTasks();

      setTasks(data);
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleCreateTask(event) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      setError("");

      const task = await createTask(
        title,
        description
      );

      setTasks((currentTasks) => [
        task,
        ...currentTasks
      ]);

      setTitle("");

      setDescription("");
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleToggleTask(task) {
    try {
      const updatedTask = await updateTask(
        task.id,
        {
          title: task.title,
          description: task.description,
          completed: !task.completed
        }
      );

      setTasks((currentTasks) =>
        currentTasks.map((currentTask) =>
          currentTask.id === updatedTask.id
            ? updatedTask
            : currentTask
        )
      );
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleDeleteTask(id) {
    try {
      await deleteTask(id);

      setTasks((currentTasks) =>
        currentTasks.filter(
          (task) => task.id !== id
        )
      );
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Arial"
      }}
    >
      <h1>Task Manager</h1>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleCreateTask}>
        <div>
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
          />
        </div>

        <br />

        <div>
          <textarea
            placeholder="Task description"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
          />
        </div>

        <br />

        <button type="submit">
          Add Task
        </button>
      </form>

      <hr />

      <h2>Tasks</h2>

      {tasks.length === 0 && (
        <p>No tasks found.</p>
      )}

      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "10px"
          }}
        >
          <h3>{task.title}</h3>

          <p>
            {task.description}
          </p>

          <p>
            Status:{" "}
            {task.completed
              ? "Completed"
              : "Pending"}
          </p>

          <button
            onClick={() =>
              handleToggleTask(task)
            }
          >
            {task.completed
              ? "Mark Pending"
              : "Mark Completed"}
          </button>

          <button
            onClick={() =>
              handleDeleteTask(task.id)
            }
            style={{
              marginLeft: "10px"
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;