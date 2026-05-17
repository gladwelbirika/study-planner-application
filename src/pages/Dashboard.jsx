import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

function Dashboard() {
  const navigate = useNavigate();

  const token = useMemo(() => localStorage.getItem("token"), []);

  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [deadline, setDeadline] = useState("");

  const [editingTaskId, setEditingTaskId] = useState(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
    window.location.reload();
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = { title, description, priority, deadline };

      if (editingTaskId) {
        await API.put(`/tasks/${editingTaskId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setEditingTaskId(null);
      } else {
        await API.post("/tasks", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
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

  const handleDeleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchTasks();
    } catch (error) {
      alert("Failed to delete task");
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await API.put(
        `/tasks/${task._id}`,
        { completed: !task.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchTasks();
    } catch (error) {
      alert("Failed to update task");
    }
  };

  return (
    <div className="min-h-screen bg-softWhite text-deepBlack px-4 md:px-10 py-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-lilac">
          StudySync Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-lilac text-white px-4 py-2 rounded-lg hover:opacity-80 w-full md:w-auto"
        >
          Logout
        </button>
      </div>

      {/* FORM */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-lilac/20 mb-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">

          <input
            className="p-2 border rounded"
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="p-2 border rounded"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="p-2 border rounded"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <input
            className="p-2 border rounded"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          <button
            type="submit"
            className="bg-lilac text-white py-2 rounded-lg col-span-1 md:col-span-2"
          >
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
              className="border border-lilac text-lilac py-2 rounded-lg col-span-1 md:col-span-2"
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      {/* TASKS */}
      {loading ? (
        <p className="text-center">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-center">No tasks found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-4 rounded-xl shadow border border-lilac/20"
            >
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-gray-600 text-sm">{task.description}</p>

              <p className="text-sm text-lilac mt-2">
                Priority: {task.priority}
              </p>

              <p className="text-sm mt-1">
                Status: {task.completed ? "Completed ✅" : "Pending ⏳"}
              </p>

              <div className="flex flex-col md:flex-row gap-2 mt-4">

                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded w-full"
                >
                  Delete
                </button>

                <button
                  onClick={() => handleToggleComplete(task)}
                  className="border border-lilac text-lilac px-3 py-1 rounded w-full"
                >
                  {task.completed ? "Pending" : "Complete"}
                </button>

                <button
                  onClick={() => {
                    setEditingTaskId(task._id);
                    setTitle(task.title);
                    setDescription(task.description);
                    setPriority(task.priority);
                    setDeadline(task.deadline?.split("T")[0]);
                  }}
                  className="bg-lilac text-white px-3 py-1 rounded w-full"
                >
                  Edit
                </button>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default Dashboard;