import { Link } from "react-router-dom";
import fullvideo from "../../assets/HOMEVIDEO.mp4";

const Mainpage = () => {
  return (
    <section className="space-y-6">
      <div id="top" className="overflow-hidden rounded-3xl border border-slate-800 shadow-soft">
        <video src={fullvideo} autoPlay muted loop className="h-[80vh] w-full object-cover sm:h-[70vh]" />
      </div>

      <div className="w-full">
  <article className="rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-slate-900 to-indigo-950 p-6 shadow-soft">
    <h3 className="font-display text-2xl font-semibold text-white">
      <span className="text-indigo-300">Coding Ka Cricket</span>
    </h3>
    <p className="mt-2 text-xs font-medium uppercase tracking-widest text-indigo-400">
      Java Premier League & Python Premier League
    </p>
    <p className="mt-3 text-sm text-slate-300">
      The pitch is set, the code is ready! Compete in 3 exciting rounds
      and showcase your programming skills.
    </p>

    {/* JPL & PPL Side by Side */}
    <div className="mt-4 grid grid-cols-2 gap-3">

      {/* JPL */}
      <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-4 space-y-1">
        <p className="text-sm font-semibold text-indigo-300">⚔️ Java Premier League (JPL)</p>
        <p className="text-sm text-slate-400">📅 <span className="text-white font-medium">12th May 2026</span></p>
        <p className="text-sm text-slate-400">🎯 <span className="text-white font-medium">CSE Students Only</span></p>
      </div>

      {/* PPL */}
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 space-y-1">
        <p className="text-sm font-semibold text-emerald-300">⚔️ Python Premier League (PPL)</p>
        <p className="text-sm text-slate-400">📅 <span className="text-white font-medium">13th May 2026</span></p>
        <p className="text-sm text-slate-400">🎯 <span className="text-white font-medium">CS / IT / IoT / AIML / AI&DS Students Only</span></p>
      </div>

    </div>

    <Link
      to="/register"
      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400"
    >
      Join the League
      <span aria-hidden>→</span>
    </Link>
  </article>
      </div>
    </section>
  );
};

export default Mainpage;
