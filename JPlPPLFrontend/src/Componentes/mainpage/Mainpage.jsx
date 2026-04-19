import { Link } from "react-router-dom";
import fullvideo from "../../assets/HOMEVIDEO.mp4";

const Mainpage = () => {
  return (
    <section className="space-y-6">
      <div id="top" className="overflow-hidden rounded-3xl border border-slate-800 shadow-soft">
        <video src={fullvideo} autoPlay muted loop className="h-[80vh] w-full object-cover sm:h-[70vh]" />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <article className="rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-slate-900 to-indigo-950 p-6 shadow-soft">
          <h3 className="font-display text-2xl font-semibold text-white">
            Join the <span className="text-indigo-300">Python Premier League</span>
          </h3>
          <p className="mt-3 text-sm text-slate-300">Compete in 3 exciting rounds and showcase your Python skills.</p>
          <Link
            to="/register"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400"
          >
            Get Started
            <span aria-hidden>→</span>
          </Link>
        </article>

        <article className="rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 to-cyan-950 p-6 shadow-soft">
          <h3 className="font-display text-2xl font-semibold text-white">
            Enter the <span className="text-cyan-300">Java Premier League</span>
          </h3>
          <p className="mt-3 text-sm text-slate-300">Prove your Java skills and claim the top spot.</p>
          <Link
            to="/register"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-cyan-400"
          >
            Join Now
            <span aria-hidden>→</span>
          </Link>
        </article>
      </div>
    </section>
  );
};

export default Mainpage;
