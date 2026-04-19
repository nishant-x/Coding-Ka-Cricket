import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const contactCards = [
  {
    icon: <FaPhoneAlt />,
    title: "Helpline Numbers",
    subtitle: "Available for all your support queries.",
    lines: ["+91 7879261234", "+91 9827666677", "+91 9049415191"],
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Address",
    subtitle: "Visit us at the campus.",
    lines: ["SISTec-R Sikandrabad, Ratibad", "Bhopal, Madhya Pradesh, 462044"],
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    subtitle: "Mail us and we will get back soon.",
    lines: ["rohitbansal@sistec.ac.in", "himanshuyadav@sistec.ac.in", "priyankabhatele@sistec.ac.in"],
  },
];

const ContactUs = () => {
  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-soft lg:p-10">
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">How Can We Assist You?</h1>
        <p className="mt-2 text-slate-300">Your satisfaction is our priority.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {contactCards.map((card) => (
            <article key={card.title} className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5">
              <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-cyan-300">{card.icon}{card.title}</h2>
              <p className="mt-2 text-sm text-slate-400">{card.subtitle}</p>
              <div className="mt-3 space-y-1 text-sm text-slate-200">
                {card.lines.map((line) => <p key={line}>{line}</p>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-soft lg:grid-cols-2 lg:p-10">
        <div>
          <h2 className="font-display text-3xl font-bold text-white">Contact Us</h2>
          <div className="mt-4 rounded-2xl border border-slate-700 bg-slate-950/40 p-2">
            <DotLottieReact
              src="https://lottie.host/57881042-52c5-4b51-abc0-c7af5a257ec9/B7oZCt6Jb0.lottie"
              loop
              autoplay
            />
          </div>
        </div>

        <form className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input type="text" placeholder="Name" className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-indigo-400" />
            <input type="email" placeholder="Email" className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-indigo-400" />
          </div>
          <input type="text" placeholder="Subject" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-indigo-400" />
          <textarea rows="6" placeholder="Message" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-indigo-400" />
          <button type="submit" className="rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]">
            Send
          </button>
        </form>
      </section>
    </main>
  );
};

export default ContactUs;
