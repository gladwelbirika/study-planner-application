import { useEffect, useState } from "react";
import API from "../utils/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [deadline, setDeadline] = useState("");

  const token = localStorage.getItem("token");

  // FETCH TASKS
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // CREATE TASK
  const handleCreateTask = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/tasks",
        {
          title,
          description,
          priority,
          deadline,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Task created successfully");

      setTitle("");
      setDescription("");
      setPriority("low");
      setDeadline("");

      fetchTasks();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create task");
    }
  };

  // DELETE TASK
  const handleDeleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Task deleted successfully");
      fetchTasks();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete task");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      {/* CREATE TASK FORM */}
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br />

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <br />

        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <br />

        <button type="submit">Create Task</button>
      </form>

      <hr />

      {/* TASK LIST */}
      {tasks.map((task) => (
        <div key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <small>{task.priority}</small>

          <button onClick={() => handleDeleteTask(task._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;