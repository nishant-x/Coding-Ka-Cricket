import React from "react";
import { motion } from "framer-motion";
import "./Guideline.css";

const Guideline = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.section
      className="guideline-section"
      id="guideline"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="guideline-heading">
        <motion.h1 variants={itemVariants}>Guidelines</motion.h1>
        <h3>Please read all the instructions carefully before participating</h3>
      </div>

      <motion.div className="guideline-list" variants={itemVariants}>
        <ul>
          <li>
            <strong>Eligibility:</strong> Only second-year students from SISTec Gandhi Nagar and SISTec Ratibad campuses are eligible to participate. This restriction ensures a fair and focused competition among peers of the same academic level.
          </li>

          <li>
            <strong>Competition Choice:</strong> Participants must choose between JPL (Java Premier League) or PPL (Python Premier League) based on their preferred programming language. Once selected, participants cannot switch competitions, so make your choice carefully.
          </li>

          <li>
            <strong>Registration Process:</strong> Interested students must complete the online registration form available on the event website or through official student coordinators. Ensure all details entered are correct and complete to avoid any issues during verification.
          </li>

          <li>
            <strong>Registration Fee:</strong> A minimal fee of ₹20 per participant is charged. This fee contributes to essential arrangements such as printed materials, certificates, and basic refreshments during the event.
          </li>

          <li>
            <strong>Initial Round (Trial Over):</strong> The first round consists of 6 individual MCQ-based technical questions. Participants will be scored individually, and top scorers from each group will move forward to form random teams for the upcoming rounds.
          </li>

          <li>
            <strong>Team Formation:</strong> Based on scores from the Trial Over, eleven top performers from each group will be selected and randomly divided into teams. This helps promote collaboration among participants and gives everyone a fair chance regardless of their previous group.
          </li>

          <li>
            <strong>Competition Rounds:</strong> The event follows a multi-round format—Trial Over, Qualifier Round, Semi-Final, and Final. In team-based rounds, participants will receive development modules to solve under time constraints. Each round evaluates teamwork, logic, and coding abilities.
          </li>

          <li>
            <strong>Module Guidelines:</strong> Modules will be designed to test real-world programming and problem-solving skills. Teams must submit working solutions within the allotted time. Partial solutions may receive partial credit based on their quality and functionality.
          </li>

          <li>
            <strong>Evaluation Criteria:</strong> Submissions will be judged based on code accuracy, optimal logic, efficiency, and team collaboration. Any team submitting plagiarized or copied code will be immediately disqualified.
          </li>

          <li>
            <strong>System Requirements:</strong> Participants must carry their own laptops with either Java or Python environments properly installed. A stable internet connection is also necessary. Assistance will be provided for minor technical issues, but participants are expected to manage their systems independently.
          </li>

          <li>
            <strong>Code of Conduct:</strong> All participants are expected to maintain discipline, fairness, and a positive competitive spirit. Misconduct, use of unauthorized resources, or misbehavior with coordinators or judges will result in immediate disqualification.
          </li>

          <li>
            <strong>Final Round Expectations:</strong> The top 2 teams from the Semi-Final will face off in the Final Round with an advanced problem statement that challenges their creativity and problem-solving depth. The team with the best solution will be crowned the winner of the league.
          </li>
        </ul>
      </motion.div>
    </motion.section>
  );
};

export default Guideline;
