import React from "react";
import "./ProcessFlow.css";
import { FaRegIdBadge } from "react-icons/fa";
import { BiSolidCricketBall } from "react-icons/bi";
import { RiTeamFill } from "react-icons/ri";
import { MdSportsCricket } from "react-icons/md";
import { GiTrophy, GiLaurelsTrophy } from "react-icons/gi";

const ProcessFlow = () => {
  const steps = [
    {
      id: 1,
      title: "Registration",
      description: "Sign up to secure your spot in the competition.",
      icon: <FaRegIdBadge />,
    },
    {
      id: 2,
      title: "Trial Over",
      description: "Prove your skills in a rapid Q&A to advance.",
      icon: <BiSolidCricketBall />,
    },
    {
      id: 3,
      title: "Team Formation",
      description: "Collaborate and strategize with your team.",
      icon: <RiTeamFill />,
    },
    {
      id: 4,
      title: "Qualifier Round",
      description: "Compete to solve modules and reach the semi-finals.",
      icon: <MdSportsCricket />,
    },
    {
      id: 5,
      title: "Semi-Final",
      description: "Battle for the championship with top teams.",
      icon: <GiTrophy />,
    },
    {
      id: 6,
      title: "Final",
      description: "Battle for the championship with top 2 teams.",
      icon: <GiLaurelsTrophy />,
    }
  ];

  return (
    <div className="process-flow-container" id="processflow">
      <div className="Process_heading">
        <h1 className="Process-head"> Process Flow </h1>
        <h3>Here is our ProcessFlow</h3>
      </div>

      <div className="Processing_steps_collection">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`process-step ${index % 2 === 0 ? "align-left" : "align-right"} step-${step.id}`}
          >
            <div className="step-icon">{step.icon}</div>
            <div className="step-content">
              <div className="step-header">
                <span className="step-number">Step {step.id}</span>
                <h3 className="step-title">{step.title}</h3>
              </div>
              <p className="step-description">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessFlow;