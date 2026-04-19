import { FaRegIdBadge } from "react-icons/fa";
import { BiSolidCricketBall } from "react-icons/bi";
import { RiTeamFill } from "react-icons/ri";
import { MdSportsCricket } from "react-icons/md";
import { GiTrophy, GiLaurelsTrophy } from "react-icons/gi";

const ProcessFlow = () => {
  const steps = [
    { id: 1, title: "Registration", description: "Sign up to secure your spot in the competition.", icon: <FaRegIdBadge /> },
    { id: 2, title: "Trial Over", description: "Prove your skills in a rapid Q&A to advance.", icon: <BiSolidCricketBall /> },
    { id: 3, title: "Team Formation", description: "Collaborate and strategize with your team.", icon: <RiTeamFill /> },
    { id: 4, title: "Qualifier Round", description: "Compete to solve modules and reach the semis.", icon: <MdSportsCricket /> },
    { id: 5, title: "Semi-Final", description: "Battle with top teams to reach the final.", icon: <GiTrophy /> },
    { id: 6, title: "Final", description: "Top 2 teams compete for the championship.", icon: <GiLaurelsTrophy /> },
  ];

  return (
    <section id="processflow" className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-soft lg:p-10">
      <div className="mb-8 text-center">
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Process Flow</h2>
        <p className="mt-2 text-sm text-slate-400">Your journey from registration to finals</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {steps.map((step) => (
          <article key={step.id} className="group rounded-2xl border border-slate-700 bg-slate-950/60 p-5 transition hover:-translate-y-1 hover:border-indigo-400/60">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-indigo-500/20 p-3 text-2xl text-indigo-300 group-hover:bg-indigo-500/30">{step.icon}</div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300">Step {step.id}</p>
                <h3 className="mt-1 font-display text-lg font-semibold text-white">{step.title}</h3>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-300">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProcessFlow;
