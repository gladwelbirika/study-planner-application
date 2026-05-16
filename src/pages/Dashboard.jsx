import { useEffect, useState } from "react";
import API from "../utils/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [deadline, setDeadline] = useState("");

  const [editingTaskId, setEditingTaskId] = useState(null);

  const token = localStorage.getItem("token");

  const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

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

  // CREATE / UPDATE TASK
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title,
        description,
        priority,
        deadline,
      };

      if (editingTaskId) {
        await API.put(`/tasks/${editingTaskId}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Task updated successfully");
        setEditingTaskId(null);
      } else {
        await API.post("/tasks", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Task created successfully");
      }

      setTitle("");
      setDescription("");
      setPriority("low");
      setDeadline("");

      fetchTasks();
    } catch (error) {
      alert(error.response?.data?.message || "Operation failed");
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

      <button onClick={handleLogout}>
       Logout
       </button>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
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

        <button type="submit">
          {editingTaskId ? "Update Task" : "Create Task"}
        </button>

        {editingTaskId && (
          <button
            type="button"
            onClick={() => {
              setEditingTaskId(null);
              setTitle("");
              setDescription("");
              setPriority("low");
              setDeadline("");
            }}
          >
            Cancel Edit
          </button>
        )}
      </form>

      <hr />

      {/* TASK LIST */}
      {tasks.map((task) => (
        <div key={task._id} style={{ marginBottom: "10px" }}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <small>{task.priority}</small>

          <br />

          <button onClick={() => handleDeleteTask(task._id)}>
            Delete
          </button>

          <button
            onClick={() => {
              setEditingTaskId(task._id);
              setTitle(task.title);
              setDescription(task.description);
              setPriority(task.priority);
              setDeadline(task.deadline?.split("T")[0]);
            }}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;