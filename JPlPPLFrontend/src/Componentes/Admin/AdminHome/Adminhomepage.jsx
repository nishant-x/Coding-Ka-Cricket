import { Link } from "react-router-dom";
import { FaChartBar, FaPlusCircle, FaQuestionCircle, FaUsers } from "react-icons/fa";

const cards = [
  { to: "/Participants", icon: <FaUsers />, title: "Candidate List" },
  { to: "/allquestions", icon: <FaQuestionCircle />, title: "Question Details" },
  { to: "/addquiz", icon: <FaPlusCircle />, title: "Add New Quiz" },
  { to: "/analytics", icon: <FaChartBar />, title: "Analytics" },
];

export default function Adminhomepage() {
  return (
    <main className="mx-auto min-h-[70vh] max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-soft lg:p-10">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-white">Admin Dashboard</h1>
          <p className="mt-2 text-slate-400">Manage quiz content and participants</p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <Link key={card.to} to={card.to} className="group rounded-2xl border border-slate-700 bg-slate-950/70 p-6 text-center transition hover:-translate-y-1 hover:border-indigo-400/70">
              <div className="mx-auto w-fit rounded-xl bg-indigo-500/20 p-3 text-3xl text-indigo-300 group-hover:bg-indigo-500/30">
                {card.icon}
              </div>
              <p className="mt-4 font-display text-lg font-semibold text-white">{card.title}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
