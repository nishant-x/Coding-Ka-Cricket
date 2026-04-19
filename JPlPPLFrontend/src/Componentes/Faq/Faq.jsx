import { motion } from "framer-motion";

const FAQ_DATA = [
  {
    q: "What is JPL/PPL?",
    a: "JPL (Java Premier League) and PPL (Python Premier League) are competitive coding leagues where students showcase skills through multiple rounds.",
  },
  {
    q: "How can I register for the competition?",
    a: "You can register through the official registration form on the website by filling in valid details.",
  },
  {
    q: "Who can participate in JPL/PPL?",
    a: "The event is for second-year students from SISTec-R and SISTec Gandhi Nagar campuses.",
  },
  {
    q: "What is the format of the competition?",
    a: "Rounds include Trial Over, Qualifier, Semi Final, and Final with a mix of individual and team-based challenges.",
  },
  {
    q: "Is there a registration fee?",
    a: "Yes, there is a registration fee of Rs. 20 per participant.",
  },
];

const Faq = () => {
  return (
    <motion.section
      id="faq"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-soft lg:p-10"
    >
      <div className="mb-8 text-center">
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">FAQs</h2>
        <p className="mt-2 text-sm text-slate-400">Quick answers before you participate</p>
      </div>

      <div className="space-y-3">
        {FAQ_DATA.map((item) => (
          <details key={item.q} className="group rounded-2xl border border-slate-700 bg-slate-950/60 p-4 open:border-indigo-400/60">
            <summary className="cursor-pointer list-none pr-8 font-medium text-slate-100">{item.q}</summary>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.a}</p>
          </details>
        ))}
      </div>
    </motion.section>
  );
};

export default Faq;
