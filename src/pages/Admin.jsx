import { useEffect, useState } from "react";
import API from "../utils/api";

function Admin() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // FETCH USERS
  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // FETCH TASKS
  const fetchTasks = async () => {
    try {
      const res = await API.get("/admin/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchTasks();
  }, []);

  // DELETE TASK
  const handleDeleteTask = async (id) => {
    try {
      await API.delete(`/admin/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTasks();
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      {/* USERS */}
      <h2>Users</h2>
      {users.map((user) => (
        <div key={user._id}>
          <p>{user.name} - {user.email}</p>
        </div>
      ))}

      <hr />

      {/* TASKS */}
      <h2>All Tasks</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} style={{ marginBottom: "10px" }}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <small>{task.priority}</small>

            <br />

            <button onClick={() => handleDeleteTask(task._id)}>
              Delete Task
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Admin;