import { useState } from "react";
import API from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Account created successfully");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-softWhite px-4">

      <div className="bg-white w-full max-w-sm md:max-w-md p-6 md:p-8 rounded-2xl shadow-lg border border-lilac/20">

        <h1 className="text-2xl md:text-3xl font-bold text-lilac mb-6 text-center">
          Create Account
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            className="w-full p-3 border rounded-lg outline-none focus:border-lilac"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            Register
          </button>

        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-lilac font-semibold">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;