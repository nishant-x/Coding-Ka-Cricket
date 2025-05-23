import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaSearch, FaSort, FaSortUp, FaSortDown, FaUniversity, FaUserGraduate, FaEnvelope,
  FaIdCard, FaCodeBranch, FaCalendarAlt, FaLayerGroup, FaTrophy, FaReceipt,
  FaClock, FaImage, FaDownload, FaStar
} from 'react-icons/fa';
import './viewparticipant.css';

export default function ParticipantsList() {
  const [participants, setParticipants] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/participants`)
      .then(res => {
        setParticipants(res.data);
        setFilteredParticipants(res.data);
      })
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  useEffect(() => {
    const results = participants.filter(participant =>
      Object.values(participant).some(
        val => val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredParticipants(results);
  }, [searchTerm, participants]);

  const requestSort = key => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredParticipants].sort((a, b) => {
      // Handle null values for sorting
      if (a[key] === null) return direction === 'asc' ? 1 : -1;
      if (b[key] === null) return direction === 'asc' ? -1 : 1;
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredParticipants(sortedData);
  };

  const getSortIcon = key => {
    if (sortConfig.key !== key) return <FaSort />;
    return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  const downloadCSV = () => {
    const headers = [
      'S.No', 'Name', 'Email', 'Enrollment', 'College', 'Branch',
      'Year', 'Section', 'League', 'Transaction', 'Quiz Score',
      'Time to Solve MCQ'
    ];

    const csvContent = [
      headers.join(','),
      ...filteredParticipants.map((participant, index) => [
        index + 1,
        `"${participant.name}"`,
        `"${participant.email}"`,
        `"${participant.enrollment}"`,
        `"${participant.college}"`,
        `"${participant.branch}"`,
        `"${participant.year}"`,
        `"${participant.section}"`,
        `"${participant.league}"`,
        `"${participant.transaction}"`,
        participant.quizScore || 'N/A',
        participant.timeToSolveMCQ || 'N/A',
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `participants_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="participants-container">
      <div className="header-section">
        <h2><FaUserGraduate /> Registered Participants</h2>
        <div className="action-buttons">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search participants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button onClick={downloadCSV} className="download-btn">
            <FaDownload /> Export CSV
          </button>
        </div>
      </div>
    <div className="stats-footer">
        <p>Total Participants: {participants.length}</p>
        <p>Showing: {filteredParticipants.length} records</p>
      </div>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th onClick={() => requestSort('name')}>
                <div className="th-content">
                  <FaUserGraduate /> Name {getSortIcon('name')}
                </div>
              </th>
              <th onClick={() => requestSort('email')}>
                <div className="th-content">
                  <FaEnvelope /> Email {getSortIcon('email')}
                </div>
              </th>
              <th onClick={() => requestSort('enrollment')}>
                <div className="th-content">
                  <FaIdCard /> Enrollment {getSortIcon('enrollment')}
                </div>
              </th>
              <th onClick={() => requestSort('college')}>
                <div className="th-content">
                  <FaUniversity /> College {getSortIcon('college')}
                </div>
              </th>
              <th onClick={() => requestSort('branch')}>
                <div className="th-content">
                  <FaCodeBranch /> Branch {getSortIcon('branch')}
                </div>
              </th>
              <th onClick={() => requestSort('year')}>
                <div className="th-content">
                  <FaCalendarAlt /> Year {getSortIcon('year')}
                </div>
              </th>
              <th onClick={() => requestSort('section')}>
                <div className="th-content">
                  <FaLayerGroup /> Section {getSortIcon('section')}
                </div>
              </th>
              <th onClick={() => requestSort('league')}>
                <div className="th-content">
                  <FaTrophy /> League {getSortIcon('league')}
                </div>
              </th>
              <th onClick={() => requestSort('transaction')}>
                <div className="th-content">
                  <FaReceipt /> Transaction {getSortIcon('transaction')}
                </div>
              </th>
              <th onClick={() => requestSort('quizScore')}>
                <div className="th-content">
                  <FaStar /> Score {getSortIcon('quizScore')}
                </div>
              </th>
              <th onClick={() => requestSort('timeToSolveMCQ')}>
                <div className="th-content">
                  <FaClock /> Time {getSortIcon('timeToSolveMCQ')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredParticipants.length > 0 ? (
              filteredParticipants.map((p, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{p.name}</td>
                  <td><a href={`mailto:${p.email}`}>{p.email}</a></td>
                  <td>{p.enrollment}</td>
                  <td>{p.college}</td>
                  <td>{p.branch}</td>
                  <td>{p.year}</td>
                  <td>{p.section}</td>
                  <td>{p.league}</td>
                  <td className="transaction-cell">{p.transaction}</td>
                  <td>{p.quizScore ?? 'N/A'}</td>
                  <td>{p.timeToSolveMCQ ?? 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" className="no-results">
                  No participants found matching your search
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="stats-footer">
        <p>Total Participants: {participants.length}</p>
        <p>Showing: {filteredParticipants.length} records</p>
      </div>
    </div>
  );
}