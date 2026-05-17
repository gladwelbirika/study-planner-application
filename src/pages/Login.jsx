import { useState } from "react";
import API from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      console.log(res.data);

      // store auth data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      // ✅ FIX: use react navigation instead of full page reload
      const role = res.data.user.role;

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-softWhite px-4">

      <div className="bg-white w-full max-w-sm md:max-w-md p-6 md:p-8 rounded-2xl shadow-lg border border-lilac/20">

        <h1 className="text-2xl md:text-3xl font-bold text-lilac mb-6 text-center">
          StudySync Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            className="w-full p-3 border rounded-lg outline-none focus:border-lilac"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full p-3 border rounded-lg outline-none focus:border-lilac"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-lilac text-white py-3 rounded-lg hover:opacity-90 transition"
          >
            Login
          </button>

        </form>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-lilac font-semibold">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;