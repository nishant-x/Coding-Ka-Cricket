import React from "react";
import { motion } from "framer-motion";
import "./ProfileCard.css";
// import '@fortawesome/fontawesome-free/css/all.min.css';  

// Importing images
import sudhirImage from "../../assets/Facaltyimg/sudir.jpg";
import siddharthImage from "../../assets/Facaltyimg/siddharth.jpg";
import jyotiImage from "../../assets/Facaltyimg/jyoti.jpg";
import manishImage from "../../assets/Facaltyimg/Drmanishbillore.jpg";
import ajitImage from "../../assets/Facaltyimg/Ajitshrivastav.jpg";
import prachiImage from "../../assets/Facaltyimg/priyankabhatele.jpg";
import arvindImage from "../../assets/Facaltyimg/arvindjain.jpg";

const ProfileCard = () => {
  const profiles = [
    {
      name: "Mr. Sudhir Kumar Agrawal",
      title: "Chairman, Sagar Group",
      bio: "Visionary leader driving innovation and excellence in education and technology at Sagar Group.",
      imgSrc: sudhirImage,
      badges: ["fas fa-users", "fas fa-briefcase"],
      section: "chief_patron",
    },
    {
      name: "Mr. Siddharth Agrawal",
      title: "MD, Sagar Group",
      bio: "Leads Sagar Group's growth, focusing on technological advancements and educational success.",
      imgSrc: siddharthImage,
      badges: ["fas fa-building", "fas fa-chart-line"],
      section: "chief_patron",
    },
    {
      name: "Dr. Manish Billore",
      title: "Principal",
      bio: "Dedicated to academic excellence and student development with over two decades of leadership.",
      imgSrc: manishImage,
      badges: ["fas fa-graduation-cap", "fas fa-chalkboard-teacher"],
      section: "patron",
    },
    {
      name: "Dr. Ajit Shrivastav",
      title: "Head of Department (CSE)",
      bio: "Leads the CSE department, enhancing curriculum and guiding students in the tech field.",
      imgSrc: ajitImage,
      badges: ["fas fa-laptop-code", "fas fa-cogs"],
      section: "hod",
    },
    {
      name: "Priyanka Bhatele",
      title: "Head of AIML",
      bio: "Leads AIML, mentoring students and collaborating with industry leaders to shape AI and ML.",
      imgSrc: prachiImage,
      badges: ["fas fa-users", "fas fa-briefcase"],
      section: "hod",
    },
    {
      name: "Arvind Kumar Jain",
      title: "Head of IoT",
      bio: "Pioneers IoT innovations, preparing students to excel in connected technologies.",
      imgSrc: arvindImage,
      badges: ["fas fa-building", "fas fa-chart-line"],
      section: "hod",
    },
    {
      name: "Dr. Jyoti Deshmukh",
      title: "Group Director at SISTec",
      bio: "A leader in education and research, promoting academic excellence at SISTec.",
      imgSrc: jyotiImage,
      badges: ["fas fa-graduation-cap", "fas fa-lightbulb"],
      section: "patron",
    },
  ];


  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <div className="main_card_div" >
      <div className="card-titles">
        <h1>Ours Patrons</h1>
        <h3>Here are Our Patrons</h3>
      </div>
      {/* Chief Patrons Section */}

      <section className="section">
        <h2 className="section-heading">Chief Patrons</h2>
        <div className="card_collection">
          {profiles
            .filter((profile) => profile.section === "chief_patron")
            .map((profile, index) => (
              <motion.div
                className="content"
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of the component is in view
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              >
                <div className="card">
                  <div className="firstinfo">
                    <img src={profile.imgSrc} alt={profile.name} />
                    <div className="profileinfo">
                      <h1>{profile.name}</h1>
                      <h3>{profile.title}</h3>
                      <p className="bio">{profile.bio}</p>
                    </div>
                  </div>
                </div>
                <div className="badgescard">
                  {profile.badges.map((badge, badgeIndex) => (
                    <span className={`icon ${badge}`} key={badgeIndex}></span>
                  ))}
                </div>
              </motion.div>
            ))}
        </div>
      </section>

      {/* Patrons Section */}
      <section className="section">
        <h2 className="section-heading">Patrons</h2>
        <div className="card_collection">
          {profiles
            .filter((profile) => profile.section === "patron")
            .map((profile, index) => (
              <motion.div
                className="content"
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of the component is in view
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              >
                <div className="card">
                  <div className="firstinfo">
                    <img src={profile.imgSrc} alt={profile.name} />
                    <div className="profileinfo">
                      <h1>{profile.name}</h1>
                      <h3>{profile.title}</h3>
                      <p className="bio">{profile.bio}</p>
                    </div>
                  </div>
                </div>
                <div className="badgescard">
                  {profile.badges.map((badge, badgeIndex) => (
                    <span className={`icon ${badge}`} key={badgeIndex}></span>
                  ))}
                </div>
              </motion.div>
            ))}
        </div>
      </section>

      {/* Heads of Departments Section */}
      <section className="section">
        <h2 className="section-heading">Heads of Departments (HOD)</h2>
        <div className="card_collection">
          {profiles
            .filter((profile) => profile.section === "hod")
            .map((profile, index) => (
              <motion.div
                className="content"
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of the component is in view
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              >
                <div className="card">
                  <div className="firstinfo">
                    <img src={profile.imgSrc} alt={profile.name} />
                    <div className="profileinfo">
                      <h1>{profile.name}</h1>
                      <h3>{profile.title}</h3>
                      <p className="bio">{profile.bio}</p>
                    </div>
                  </div>
                </div>
                <div className="badgescard">
                  {profile.badges.map((badge, badgeIndex) => (
                    <span className={`icon ${badge}`} key={badgeIndex}></span>
                  ))}
                </div>
              </motion.div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default ProfileCard;
