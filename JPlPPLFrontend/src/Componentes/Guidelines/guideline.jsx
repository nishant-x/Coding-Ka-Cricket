import { motion } from "framer-motion";

const guidelines = [
  "Eligibility: Only second-year students from SISTec Gandhi Nagar and SISTec Ratibad campuses can participate.",
  "Competition Choice: CSE Students choose only JPL and CS  / IT / IOT / AIML / AIDS students choose only PPL.",
  "Registration Process: Fill the online form carefully with accurate details.",
  "Registration Fee: Rs. 100 per participant.",
  "Super Over: 6 in questions; top scorers move ahead.",
  "Team Formation: Top 11 Qualified students are grouped into teams for advanced rounds.",
  "Rounds: Super Over, Qualifier, Semi-Final(Top 4 teams), and Final.",
  "Evaluation: Accuracy, efficiency, teamwork, and originality.",
  "System Requirements: Bring your own laptop with Java or Python setup.",
  "Code of Conduct: Fair play and discipline are mandatory.",
];

const Guideline = () => {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-soft lg:p-10"
      >
        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">Guidelines</h1>
          <p className="mt-2 text-sm text-slate-400">Please read all instructions before participating</p>
        </div>

        <ol className="space-y-3">
          {guidelines.map((item, idx) => (
            <li key={item} className="rounded-xl border border-slate-700 bg-slate-950/70 p-4 text-sm leading-6 text-slate-200">
              <span className="mr-2 font-semibold text-cyan-300">{idx + 1}.</span>
              {item}
            </li>
          ))}
        </ol>
      </motion.section>
    </main>
  );
};

export default Guideline;
