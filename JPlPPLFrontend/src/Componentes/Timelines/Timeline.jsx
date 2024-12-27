import React from "react";
import { motion } from "framer-motion";
import "./Timeline.css";

const Timeline = () => {
  const timelineData = [
    {
      time: "9:00 AM, Dec 12, 2024",
      title: "Kickoff of JPL & PPL",
      description:
        "The Java Premier League (JPL) and Python Premier League (PPL) were inaugurated, marking the beginning of an exciting competition exclusively for 2nd-year students of SISTEC-R and SISTec Gandhi Nagar. Participants were eager to showcase their programming skills and compete for the championship.",
      accentColor: "#41516C",
    },
    {
      time: "10:00 AM, Dec 12, 2024",
      title: "Round 1 - Super Over Round",
      description:
        "The Super Over Round began with 6 challenging questions for each participant. Two players from each group advanced to the next round, where teams were formed randomly for the upcoming competition.",
      accentColor: "#FBCA3E",
    },
    {
      time: "11:30 AM, Dec 13, 2024",
      title: "Round 2 - Knockout Match",
      description:
        "In the Knockout Match, randomly formed teams were assigned coding modules to solve. Teams showcased their problem-solving abilities, and the top two teams advanced to the final round.",
      accentColor: "#E24A68",
    },
    {
      time: "3:00 PM, Dec 14, 2024",
      title: "Round 3 - Final Round",
      description:
        "The Final Round featured the top two teams tackling a level-up problem statement. The competition was fierce, with each team striving to deliver the best solution. The team with the highest score was crowned the Premier League Champion.",
      accentColor: "#1B5F8C",
    },
    {
      time: "5:00 PM, Dec 14, 2024",
      title: "Closing Ceremony",
      description:
        "The JPL and PPL competitions concluded with an exciting closing ceremony. Winners were announced, and participants were celebrated for their hard work and enthusiasm. The event was a great success, inspiring students to hone their coding skills.",
      accentColor: "#4CADAD",
    },
  ];
  
  

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.div
      id="aboutevent"
      className="Ttimeline"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="div_TtimelineTitle">
      <h1 className="TtimelineTitle">Timeline </h1>
      <h3> Here is the time line</h3>
      </div>
      
      <div className="div_TtimelineList">
      <motion.ul className="TtimelineList" variants={containerVariants}>
        {timelineData.map((item, index) => (
          <motion.li
            key={index}
            className="TtimelineItem"
            style={{ "--accent-color": item.accentColor }}
            variants={itemVariants}
          >
            <div className="TtimelineDate">{item.time}</div>
            <div className="TtimelineItemTitle">{item.title}</div>
            <div className="TtimelineDescr">{item.description}</div>
          </motion.li>
          
        ))}
      </motion.ul>
      </div>
    </motion.div>
);
};

export default Timeline;
