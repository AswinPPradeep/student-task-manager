
import { useEffect, useState } from "react";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} from "./services/api";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTasks() {
    try {
      setError("");
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message || "Unable to load tasks");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError("");

      const newTask = await addTask({
        title,
        subject,
        dueDate: dueDate || null,
      });

      setTasks((current) => [newTask, ...current]);
      setTitle("");
      setSubject("");
      setDueDate("");
    } catch (err) {
      setError(err.message || "Unable to add task");
    }
  }

  async function handleToggle(task) {
    try {
      setError("");

      const updatedTask = await updateTask(task._id, {
        completed: !task.completed,
      });

      setTasks((current) =>
        current.map((item) =>
          item._id === task._id ? updatedTask : item
        )
      );
    } catch (err) {
      setError(err.message || "Unable to update task");
    }
  }

  async function handleDelete(id) {
    try {
      setError("");
      await deleteTask(id);
      setTasks((current) =>
        current.filter((task) => task._id !== id)
      );
    } catch (err) {
      setError(err.message || "Unable to delete task");
    }
  }

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingCount = tasks.length - completedCount;

  return (
    <main className="app">
      <header className="header">
        <div>
          <p className="eyebrow">STUDENT PRODUCTIVITY</p>
          <h1>My Task Manager</h1>
          <p className="subtitle">
            Organise your studies, one task at a time.
          </p>
        </div>
        <div className="date-badge">
          <span>YOUR WORKSPACE</span>
          <strong>Stay focused.</strong>
        </div>
      </header>

      <section className="stats">
        <div className="stat-card">
          <span>Total tasks</span>
          <strong>{tasks.length}</strong>
        </div>
        <div className="stat-card">
          <span>Pending</span>
          <strong>{pendingCount}</strong>
        </div>
        <div className="stat-card">
          <span>Completed</span>
          <strong>{completedCount}</strong>
        </div>
      </section>

      <section className="content">
        <div className="panel form-panel">
          <h2>Add a new task</h2>
          <p className="panel-description">
            Enter the details of your next study task.
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Task title</label>
            <input
              id="title"
              type="text"
              placeholder="e.g. Study graphs in DSA"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />

            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              type="text"
              placeholder="e.g. Data Structures"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              required
            />

            <label htmlFor="dueDate">Due date (optional)</label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
            />

            <button className="primary-button" type="submit">
              + Add task
            </button>
          </form>
        </div>

        <div className="panel task-panel">
          <div className="task-heading">
            <div>
              <h2>Your tasks</h2>
              <p className="panel-description">
                Track your study progress.
              </p>
            </div>
            <span className="task-count">{tasks.length} tasks</span>
          </div>

          {error && <p className="error-message">{error}</p>}

          {loading ? (
            <p className="empty-state">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📝</span>
              <h3>No tasks yet</h3>
              <p>Add your first study task to get started.</p>
            </div>
          ) : (
            <div className="task-list">
              {tasks.map((task) => (
                <article
                  className={`task-item ${
                    task.completed ? "completed" : ""
                  }`}
                  key={task._id}
                >
                  <input
                    className="task-checkbox"
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggle(task)}
                    aria-label={`Mark ${task.title} as ${
                      task.completed ? "pending" : "completed"
                    }`}
                  />

                  <div className="task-details">
                    <h3>{task.title}</h3>
                    <p>{task.subject}</p>
                    {task.dueDate && (
                      <small>
                        Due:{" "}
                        {new Date(task.dueDate).toLocaleDateString()}
                      </small>
                    )}
                  </div>

                  <button
                    className="delete-button"
                    type="button"
                    onClick={() => handleDelete(task._id)}
                    aria-label={`Delete ${task.title}`}
                  >
                    Delete
                  </button>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer>Built with React, Express and MongoDB.</footer>
    </main>
  );
}

export default App;
