import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './viewparticipant.css'; // Optional: for styling

export default function ParticipantsList() {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/participants`);
      setParticipants(res.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const downloadCSV = () => {
    // CSV header
    const headers = ['Name', 'Email', 'Enrollment', 'College', 'Branch', 'Year', 'Section', 'League', 'Transaction ID'];
    
    // CSV data rows
    const csvRows = participants.map(participant => [
      `"${participant.name}"`,
      `"${participant.email}"`,
      `"${participant.enrollment}"`,
      `"${participant.college}"`,
      `"${participant.branch}"`,
      `"${participant.year}"`,
      `"${participant.section}"`,
      `"${participant.league}"`,
      `"${participant.transaction}"`
    ].join(','));

    // Combine header and rows
    const csvContent = [headers.join(','), ...csvRows].join('\n');

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'participants_list.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="participants-container">
      <div className="header-section">
        <h2>Registered Participants</h2>
        <button onClick={downloadCSV} className="download-button">
          Download as CSV
        </button>
      </div>
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