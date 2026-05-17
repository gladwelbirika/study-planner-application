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
    <div className="min-h-screen bg-softWhite text-deepBlack p-6">
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-lilac mb-6">
        Admin Dashboard
      </h1>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow border border-lilac/20">
          <h2 className="text-lg font-semibold">Users</h2>
          <p className="text-2xl text-lilac">{users.length}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border border-lilac/20">
          <h2 className="text-lg font-semibold">Tasks</h2>
          <p className="text-2xl text-lilac">{tasks.length}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border border-lilac/20">
          <h2 className="text-lg font-semibold">Completed</h2>
          <p className="text-2xl text-lilac">
            {tasks.filter((t) => t.completed).length}
          </p>
        </div>
      </div>

      {/* USERS TABLE */}
      <div className="bg-white p-4 rounded-xl shadow border border-lilac/20 mb-8">
        <h2 className="text-xl font-semibold mb-4">Users</h2>

        <div className="space-y-2">
          {users.map((user) => (
            <div
              key={user._id}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>

              <span className="text-sm text-lilac">
                {user.role}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* TASKS TABLE */}
      <div className="bg-white p-4 rounded-xl shadow border border-lilac/20">
        <h2 className="text-xl font-semibold mb-4">All Tasks</h2>

        {loading ? (
          <p>Loading...</p>
        ) : tasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="p-3 border rounded-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{task.title}</h3>
                  <p className="text-sm text-gray-500">
                    {task.user?.name} ({task.user?.email})
                  </p>
                  <p className="text-sm text-lilac">
                    {task.completed ? "Completed" : "Pending"}
                  </p>
                </div>

                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;