import { motion } from "framer-motion";

const timelineData = [
  {
    time: "9:00 AM, Dec 12, 2024",
    title: "Kickoff of JPL & PPL",
    description:
      "The leagues were inaugurated for second-year students of SISTec-R and SISTec Gandhi Nagar.",
    accentColor: "#6366f1",
  },
  {
    time: "10:00 AM, Dec 12, 2024",
    title: "Round 1 - Super Over",
    description: "Participants solved 6 questions and top performers moved ahead.",
    accentColor: "#f59e0b",
  },
  {
    time: "11:30 AM, Dec 13, 2024",
    title: "Round 2 - Knockout",
    description: "Randomly formed teams solved coding modules for final qualification.",
    accentColor: "#ef4444",
  },
  {
    time: "3:00 PM, Dec 14, 2024",
    title: "Round 3 - Final",
    description: "Top teams solved advanced problem statements in the championship round.",
    accentColor: "#06b6d4",
  },
  {
    time: "5:00 PM, Dec 14, 2024",
    title: "Closing Ceremony",
    description: "Winners were announced and participants were celebrated.",
    accentColor: "#22c55e",
  },
];

const Timeline = () => {
  return (
    <motion.section id="aboutevent" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-soft lg:p-10">
      <div className="mb-8 text-center">
        <h2 className="font-display text-3xl font-bold text-white">Timeline</h2>
        <p className="mt-2 text-sm text-slate-400">Major milestones of the event</p>
      </div>

      <div className="space-y-4">
        {timelineData.map((item) => (
          <article key={item.time + item.title} className="rounded-2xl border border-slate-700 bg-slate-950/70 p-4" style={{ borderLeftColor: item.accentColor, borderLeftWidth: "4px" }}>
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300">{item.time}</p>
            <h3 className="mt-1 font-display text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{item.description}</p>
          </article>
        ))}
      </div>
    </motion.section>
  );
};

export default Timeline;
