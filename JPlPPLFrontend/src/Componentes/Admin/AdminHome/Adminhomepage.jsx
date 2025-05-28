import React from 'react'
import './Adminhomepage.css'
import { Link } from 'react-router-dom'
import { FaUsers, FaQuestionCircle, FaPlusCircle, FaChartBar } from 'react-icons/fa'

export default function Adminhomepage() {
  return (
    <div className="admin-home">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <p>Manage your quiz application</p>
      </div>

      <div className="admin-buttons">
        <Link to="/Participants">
          <button>
            <FaUsers className="button-icon" />
            <span>Candidate List</span>
          </button>
        </Link>
        <Link to="/allquestions">
          <button>
            <FaQuestionCircle className="button-icon" />
            <span>Question Details</span>
          </button>
        </Link>
        <Link to="/addquiz">
          <button>
            <FaPlusCircle className="button-icon" />
            <span>Add New Quiz</span>
          </button>
        </Link>
        <Link to="/analytics">
          <button>
            <FaChartBar className="button-icon" />
            <span>Analytics</span>
          </button>
        </Link>
      </div>
    </div>
  )
}