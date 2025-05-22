import React from 'react'
import './Adminhomepage.css'
import { Link } from 'react-router-dom'

export default function Adminhomepage() {
  return (
    <div className="admin-home">
      <h2>Welcome to admin home</h2>

      <div className="admin-buttons">
       <Link to="/Participants"><button>View Candidate List</button></Link>
        <Link to="/allquestions"><button>View Question Detail</button></Link>
        <Link to="/addquiz"><button>Add Quiz</button></Link>
      </div>
    </div>
  )
}
