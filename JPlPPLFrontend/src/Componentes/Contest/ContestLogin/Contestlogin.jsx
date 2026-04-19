import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext/AuthContext";
import toast from "react-hot-toast";

const ContestLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUserRole } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/contestlogin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, enrollment: password }),
      });

      const data = await response.json();

      if (response.ok) {
        const score = data.user?.quizScore;
        if (score === null || score === undefined || score === -1) {
          setUserRole("user");
          toast.success("Login successful! Redirecting...");
          setTimeout(() => navigate("/contesthomepage", { state: { user: data.user } }), 1500);
        } else if (score >= 0) {
          toast.error("You have already attempted the quiz.");
        } else {
          toast.error("Invalid user data.");
        }
      } else {
        toast.error(data.error || "Invalid credentials. Please try again.");
      }
    } catch {
      toast.error("Server error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative mx-auto flex min-h-[80vh] max-w-md items-center px-4 py-8">
      <section className="w-full rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-soft backdrop-blur">
        <div className="mb-6 text-center">
          <h1 className="font-display text-3xl font-bold text-white">Quiz Contest Login</h1>
          <p className="mt-2 text-sm text-slate-400">Enter your credentials to join the competition</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm text-slate-300">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-indigo-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm text-slate-300">Password</label>
            <input
              type="text"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-indigo-400"
            />
          </div>

          <button type="submit" className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white" disabled={isLoading}>
            {isLoading ? "Joining..." : "Join Now"}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-slate-400">
          New to quiz? <button className="text-cyan-300 hover:underline" onClick={() => toast("Contact admin for enrollment help")}>Create account</button>
        </p>
      </section>
    </main>
  );
};

export default ContestLogin;
