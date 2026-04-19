import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link } from "react-router-dom";

const IntroText = () => {
  const text = "Welcome to Coding Ka Cricket".split(" ");

  return (
    <section id="intro" className="grid items-center gap-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-soft lg:grid-cols-2 lg:p-10">
      <div>
        <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
          {text.map((word, i) => (
            <motion.span
              key={word + i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i / 14 }}
              viewport={{ once: true }}
              className="mr-2 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.18 }}
          viewport={{ once: true }}
          className="mt-5 text-sm leading-7 text-slate-300 sm:text-base"
        >
          Get ready for an exciting coding journey. The Java Premier League and Python Premier League are designed to sharpen your problem-solving, teamwork, and programming skills through fun competitive rounds.
        </motion.p>

        <Link
          to="/register"
          className="mt-7 inline-flex rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.02]"
        >
          Register Now
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-700 bg-slate-950/40 p-2">
        <DotLottieReact
          src="https://lottie.host/602dd5e1-ea3b-4827-8704-2d4af89bf49b/UJ2EOksxOY.lottie"
          loop
          autoplay
        />
      </div>
    </section>
  );
};

export default IntroText;
