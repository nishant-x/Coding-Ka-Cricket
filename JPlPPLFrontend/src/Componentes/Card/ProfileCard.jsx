import { motion } from "framer-motion";
import sudhirImage from "../../assets/Facaltyimg/sudir.jpg";
import siddharthImage from "../../assets/Facaltyimg/siddharth.jpg";
import jyotiImage from "../../assets/Facaltyimg/jyoti.jpg";
import prachiImage from "../../assets/Facaltyimg/priyankabhatele.jpg";
import principal from "../../assets/Facaltyimg/principal.jpg";

const profiles = [
  {
    name: "Mr. Sudhir Kumar Agrawal",
    title: "Chairman, Sagar Group",
    bio: "Visionary leader driving innovation and excellence in education and technology at Sagar Group.",
    imgSrc: sudhirImage,
    section: "Chief Patrons",
  },
  {
    name: "Mr. Siddharth Agrawal",
    title: "MD, Sagar Group",
    bio: "Leads Sagar Group growth with focus on technology and educational success.",
    imgSrc: siddharthImage,
    section: "Chief Patrons",
  },
  {
    name: "Dr. Abhishek Choubey",
    title: "Principal",
    bio: "Dedicated to academic excellence and student development with strong leadership.",
    imgSrc: principal,
    section: "Patrons",
  },
  {
    name: "Dr. Jyoti Deshmukh",
    title: "Group Director at SISTec",
    bio: "Promotes research culture and academic excellence across institutions.",
    imgSrc: jyotiImage,
    section: "Patrons",
  },
  
  {
    name: "Priyanka Bhatele",
    title: "Head of CSE-AIML",
    bio: "Mentors students in AI and ML with practical, project-first learning.",
    imgSrc: prachiImage,
    section: "HOD",
  },
  
];

const ProfileCard = () => {
  const sections = ["Chief Patrons", "Patrons", "HOD"];

  return (
    <section className="space-y-10 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-soft lg:p-10">
      
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
          Our Patrons
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Leaders guiding Coding Ka Cricket
        </p>
      </div>

      {sections.map((section) => (
        <div key={section}>
          
          <h3 className="mb-6 text-center font-display text-xl font-semibold text-cyan-300">
            {section}
          </h3>

          {/* FLEX CONTAINER */}
          <div className="flex flex-wrap justify-center gap-6">
            
            {profiles
              .filter((profile) => profile.section === section)
              .map((profile) => (
                <motion.article
                  key={profile.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.35 }}

                  /* Max 3 per row */
                  className="w-full max-w-sm md:w-[48%] xl:w-[30%] rounded-2xl border border-slate-700 bg-slate-950/70 p-4 transition duration-300 hover:-translate-y-2 hover:border-indigo-400/70 hover:shadow-xl"
                >
                  
                  <img
                    src={profile.imgSrc}
                    alt={profile.name}
                    className="h-56 w-full rounded-xl object-cover object-center"
                  />

                  <h4 className="mt-4 font-display text-lg font-semibold text-white text-center">
                    {profile.name}
                  </h4>

                  <p className="text-sm font-medium text-indigo-300 text-center">
                    {profile.title}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-300 text-center">
                    {profile.bio}
                  </p>

                </motion.article>
              ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProfileCard;