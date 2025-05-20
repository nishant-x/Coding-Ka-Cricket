import React from "react";
import { motion } from "framer-motion";
import "./Faq.css";

const Faq = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, staggerChildren: 0.1 }, // Faster animation
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 }, // Faster animation
    },
  };

  return (
    <motion.section
      className="FAQ"
      id="faq"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Trigger animation on scroll
    >
      <div className="FQA_heading">
      <motion.h1 variants={itemVariants}>FAQs</motion.h1>
      <h3>Here is our FQA</h3>
      </div>
        

      <motion.details variants={itemVariants}>
        <summary>What is JPL/PPL?</summary>
        <p>
          JPL (Java Premier League) and PPL (Python Premier League) are
          competitive programming leagues where participants showcase their
          skills in Java and Python, respectively, through a series of rounds
          and challenges.
        </p>
      </motion.details>

      <motion.details variants={itemVariants}>
        <summary>How can I register for the competition?</summary>
        <p>
          You can register by filling out the registration form available on
          the competition website. Please make sure to provide accurate details
          to ensure a smooth registration process.
        </p>
      </motion.details>

      <motion.details variants={itemVariants}>
        <summary>Who can participate in JPL/PPL?</summary>
        <p>
          The competition is exclusively for 2nd-year students from Sagar
          Institute of Science Technology and Research (SISTEC-R) and SISTec
          Gandhi Nagar. If you're a 2nd-year student from either institute, you
          can participate in either JPL (Java Premier League) or PPL (Python
          Premier League), based on your preferred programming language.
        </p>
      </motion.details>

      <motion.details variants={itemVariants}>
        <summary>What is the format of the competition?</summary>
        <p>
          The competition consists of four rounds:
        </p>
        <ul>
          <li>
            <strong>Trial Over</strong>: 6 individual MCQ questions will be
            asked, and the top eleven players from each group will be selected to
            form random teams for the next round.
          </li>
          <li>
            <strong>Qualifier Round</strong>: Teams will compete against each
            other, solving assigned modules. The top teams will advance
            to the semi-final round.
          </li>
          <li>
            <strong>Semi Final Round</strong>: Teams will compete against each
            other, solving assigned modules. The top 2 teams will advance
            to the semi-final round.
          </li>
          <li>
            <strong>Final Round</strong>: The top two teams will
            compete on a level-up problem statement. The team with the
            highest score will win the Premier League.
          </li>
        </ul>
      </motion.details>

      <motion.details variants={itemVariants}>
        <summary>How are teams formed?</summary>
        <p>
          In Round 1, individual players will answer questions. Based on their
          performance, eleven players from each group will be selected to form
          random teams for the next round.
        </p>
      </motion.details>

      <motion.details variants={itemVariants}>
        <summary>What happens in the Qualifier round?</summary>
        <p>
          Teams will receive modules and work together to provide solutions.
          The top two teams based on their performance will advance to the
          final round.
        </p>
      </motion.details>

      <motion.details variants={itemVariants}>
        <summary>Can I participate in both JPL and PPL?</summary>
        <p>
          No, participants must choose between JPL (Java) and PPL (Python). You
          can only participate in one competition based on your preferred
          programming language.
        </p>
      </motion.details>

      <motion.details variants={itemVariants}>
        <summary>Is there a registration fee for the competition?</summary>
        <p>
          There is a 20 rupee per person fee just for basic facilities that we
          will provide from our end.
        </p>
      </motion.details>

      <motion.details variants={itemVariants}>
        <summary>What are the system requirements for the competition?</summary>
        <p>
          Participants will need a stable internet connection and a computer
          that can run Java or Python. Specific system requirements will be
          provided before the competition.
        </p>
      </motion.details>
    </motion.section>
  );
};

export default Faq;
