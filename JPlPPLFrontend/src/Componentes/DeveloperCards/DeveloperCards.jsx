import { useEffect, useState } from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import PiyushImage from "../../assets/coders/piyush.jpg";
import KrishImage from "../../assets/coders/krish.jpg";
import RajImage from "../../assets/coders/raj.png";
import NishantImage from "../../assets/coders/nishant.jpg";

const cards = [
  {
    name: "Piyush Jain",
    role: "MERN Developer",
    imageUrl: PiyushImage,
    linkedinUrl: "https://www.linkedin.com/in/p4piyush",
    instagramUrl: "https://www.instagram.com/p4p.iyush/",
    githubUrl: "https://github.com/p4p-iyush",
  },
  {
    name: "RajKumar Lodhi",
    role: "UI/UX Designer",
    imageUrl: RajImage,
    linkedinUrl: "https://www.linkedin.com/in/rajkumar-lodhi-90181b339/",
    instagramUrl: "https://www.instagram.com/ll._.raj_.ll/",
    githubUrl: "https://github.com/rajxxlodhi",
  },
  {
    name: "Krish Signhai",
    role: "MERN Developer",
    imageUrl: KrishImage,
    linkedinUrl: "https://www.linkedin.com/in/krish-singhai",
    instagramUrl: "https://www.instagram.com/krish_singhai_",
    githubUrl: "https://github.com/Krishsinghai",
  },
  {
    name: "Nishant Jhade",
    role: "MERN Developer",
    imageUrl: NishantImage,
    linkedinUrl: "https://www.linkedin.com/in/nishant-jhade-6b9a2b27b/",
    instagramUrl: "https://www.instagram.com/_nishanttt.zd__/",
    githubUrl: "https://github.com/nishant-x",
  },
];

const DeveloperCard = ({ card }) => (
  <article className="rounded-2xl border border-slate-700 bg-slate-950/70 p-4 shadow-soft transition hover:-translate-y-1 hover:border-indigo-400/70">
    <img src={card.imageUrl} alt={card.name} className="h-52 w-full rounded-xl object-cover" />
    <h3 className="mt-4 font-display text-lg font-semibold text-white">{card.name}</h3>
    <p className="text-sm text-cyan-300">{card.role}</p>
    <div className="mt-4 flex gap-2 text-slate-200">
      <a className="rounded-lg border border-slate-700 p-2 hover:border-indigo-400 hover:text-indigo-300" href={card.linkedinUrl} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
      <a className="rounded-lg border border-slate-700 p-2 hover:border-indigo-400 hover:text-indigo-300" href={card.instagramUrl} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
      <a className="rounded-lg border border-slate-700 p-2 hover:border-indigo-400 hover:text-indigo-300" href={card.githubUrl} target="_blank" rel="noopener noreferrer"><FaGithub /></a>
    </div>
  </article>
);

const DeveloperCards = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return undefined;
    const timer = setInterval(() => setActiveIndex((prev) => (prev + 1) % cards.length), 2800);
    return () => clearInterval(timer);
  }, [isMobile]);

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-soft lg:p-10">
      <div className="mb-8 text-center">
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Our Developers</h2>
        <p className="mt-2 text-sm text-slate-400">Meet the team behind this platform</p>
      </div>

      {isMobile ? (
        <div>
          <DeveloperCard card={cards[activeIndex]} />
          <div className="mt-4 flex justify-center gap-2">
            {cards.map((card, idx) => (
              <button
                key={card.name}
                type="button"
                aria-label={`Go to ${card.name}`}
                onClick={() => setActiveIndex(idx)}
                className={`h-2.5 w-2.5 rounded-full ${idx === activeIndex ? "bg-indigo-400" : "bg-slate-600"}`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <DeveloperCard key={card.name} card={card} />
          ))}
        </div>
      )}
    </section>
  );
};

export default DeveloperCards;
