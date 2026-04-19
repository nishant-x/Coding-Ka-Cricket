import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import profilepic from "../../../assets/playerprofile.png";
import profilepic2 from "../../../assets/playerprofile2.png";

const ContestHomepage = () => {
  const location = useLocation();
  const { user } = location.state || {};
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, [user, navigate]);

  const userDetails = {
    name: user?.name || "N/A",
    enrollment: user?.enrollment || "N/A",
    email: user?.email || "N/A",
    college: user?.college || "N/A",
    year: user?.year || "N/A",
    branch: user?.branch || "N/A",
    participation: user?.league || "Unassigned",
  };

  const contestTitle =
    userDetails.participation === "Java Premier League (JPL)"
      ? "TrialOver: Java Premier League"
      : "TrialOver: Python Premier League";

  const contestPic = userDetails.participation === "Java Premier League (JPL)" ? profilepic : profilepic2;

  if (loading) {
    return <div className="mx-auto max-w-3xl px-4 py-12 text-center text-slate-200">Loading your dashboard...</div>;
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-soft lg:p-10">
        <h1 className="text-center font-display text-3xl font-bold text-white">{contestTitle}</h1>

        <div className="mt-8 grid gap-6 rounded-2xl border border-slate-700 bg-slate-950/60 p-5 sm:grid-cols-[220px_1fr]">
          <img src={contestPic} alt="User avatar" className="h-56 w-full rounded-2xl border border-slate-700 object-cover" />
          <div className="space-y-2 text-sm text-slate-200">
            <h2 className="font-display text-2xl font-semibold text-white">{userDetails.name}</h2>
            <p><span className="text-slate-400">Enrollment:</span> {userDetails.enrollment}</p>
            <p><span className="text-slate-400">Email:</span> {userDetails.email}</p>
            <p><span className="text-slate-400">College:</span> {userDetails.college}</p>
            <p><span className="text-slate-400">Year:</span> {userDetails.year}</p>
            <p><span className="text-slate-400">Branch:</span> {userDetails.branch}</p>
            <p><span className="text-slate-400">League:</span> <span className="font-semibold text-cyan-300">{userDetails.participation}</span></p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            className="rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-8 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
            onClick={() => navigate("/contestquiz", { state: { user: userDetails }, replace: true })}
          >
            Join Quiz
          </button>
        </div>
      </section>
    </main>
  );
};

export default ContestHomepage;
