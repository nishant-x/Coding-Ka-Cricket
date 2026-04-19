import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext/AuthContext";

const adminData = [
  { email: "jhadenishant@gmail.com", password: "Nishant@1234", userRole: "admin" },
  { email: "moderator@example.com", password: "securePassword456", userRole: "admin" },
];

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserRole } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const admin = adminData.find((user) => user.email === email && user.password === password);
    if (admin) {
      setUserRole("admin");
      navigate("/adminhomepage");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-8">
      <section className="w-full rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-soft">
        <h1 className="font-display text-3xl font-bold text-white">Admin Login</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm text-slate-300">Email</label>
            <input
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-indigo-400"
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm text-slate-300">Password</label>
            <input
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-indigo-400"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-2.5 text-sm font-semibold text-white" type="submit">
            Login
          </button>
        </form>
      </section>
    </main>
  );
};

export default AdminLogin;
