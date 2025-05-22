import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './viewparticipant.css'; // Optional: for styling

export default function ParticipantsList() {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    axios.get('http://VITE_BACKEND_URL/api/participants')
      .then(res => setParticipants(res.data))
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  return (
    <div className="participants-container">
      <h2>Registered Participants</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Enrollment</th>
            <th>College</th>
            <th>Branch</th>
            <th>Year</th>
            <th>Section</th>
            <th>League</th>
            <th>Transaction</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((p, index) => (
            <tr key={index}>
              <td>{p.name}</td>
              <td>{p.email}</td>
              <td>{p.enrollment}</td>
              <td>{p.college}</td>
              <td>{p.branch}</td>
              <td>{p.year}</td>
              <td>{p.section}</td>
              <td>{p.league}</td>
              <td>{p.transaction}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
