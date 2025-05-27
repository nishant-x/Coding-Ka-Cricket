// Analytics.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  FaChartBar, 
  FaChartLine, 
  FaChartPie, 
  FaUsers, 
  FaTrophy,
  FaClock,
  FaUniversity,
  FaDownload,
  FaCalendarAlt,
  FaSearch
} from 'react-icons/fa';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './Analytics.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Analytics() {
  const [stats, setStats] = useState({
    totalParticipants: 0,
    participantsByLeague: {},
    averageScores: {},
    submissionTimes: [],
    collegeDistribution: {},
    dailyRegistrations: [],
    scoreDistribution: []
  });
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const params = {};
        if (dateRange.start) params.startDate = dateRange.start;
        if (dateRange.end) params.endDate = dateRange.end;
        if (searchTerm) params.searchTerm = searchTerm;

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/analytics`, {
          params
        });
        setStats(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        setLoading(false);
      }
    };
    
    fetchAnalytics();
  }, [dateRange, searchTerm]);

  const exportData = () => {
    const dataStr = JSON.stringify(stats, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `quiz-analytics-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading analytics data...</p>
      </div>
    );
  }

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h2><FaChartBar /> Quiz Analytics Dashboard</h2>
        
        <div className="controls">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Filter by college or league..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="date-range">
            <div className="date-input">
              <label><FaCalendarAlt /> From:</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              />
            </div>
            <div className="date-input">
              <label><FaCalendarAlt /> To:</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              />
            </div>
          </div>
          
          <button onClick={exportData} className="export-btn">
            <FaDownload /> Export Data
          </button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card">
          <FaUsers className="card-icon" />
          <h3>Total Participants</h3>
          <p>{stats.totalParticipants.toLocaleString()}</p>
        </div>
        
        <div className="card">
          <FaTrophy className="card-icon" />
          <h3>Top League</h3>
          <p>{Object.entries(stats.participantsByLeague).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}</p>
          <small>{Object.entries(stats.participantsByLeague).sort((a, b) => b[1] - a[1])[0]?.[1] || 0} participants</small>
        </div>
        
        <div className="card">
          <FaClock className="card-icon" />
          <h3>Avg. Time</h3>
          <p>{stats.submissionTimes.length ? 
              (stats.submissionTimes.reduce((a,b) => a + b, 0) / stats.submissionTimes.length).toFixed(1) : 
              'N/A'} mins</p>
        </div>
        
        <div className="card">
          <FaUniversity className="card-icon" />
          <h3>Top College</h3>
          <p>{Object.entries(stats.collegeDistribution).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}</p>
          <small>{Object.entries(stats.collegeDistribution).sort((a, b) => b[1] - a[1])[0]?.[1] || 0} participants</small>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-container">
          <h3><FaChartBar /> Participants by League</h3>
          <Bar
            data={{
              labels: Object.keys(stats.participantsByLeague),
              datasets: [{
                label: 'Participants',
                data: Object.values(stats.participantsByLeague),
                backgroundColor: '#6c63ff',
                borderRadius: 4
              }]
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false
                }
              }
            }}
          />
        </div>
        
        <div className="chart-container">
          <h3><FaChartPie /> College Distribution</h3>
          <Pie
            data={{
              labels: Object.keys(stats.collegeDistribution),
              datasets: [{
                data: Object.values(stats.collegeDistribution),
                backgroundColor: [
                  '#6c63ff', '#ff6584', '#ffb347', '#47b8ff', '#9d65ff',
                  '#63ff6c', '#ff4765', '#b347ff', '#47fff8', '#ff9d65'
                ],
                borderWidth: 1
              }]
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'right'
                }
              }
            }}
          />
        </div>
        
        <div className="chart-container">
          <h3><FaChartLine /> Daily Registrations</h3>
          <Line
            data={{
              labels: stats.dailyRegistrations.map(r => new Date(r.date).toLocaleDateString()),
              datasets: [{
                label: 'Registrations',
                data: stats.dailyRegistrations.map(r => r.count),
                borderColor: '#6c63ff',
                backgroundColor: 'rgba(108, 99, 255, 0.1)',
                fill: true,
                tension: 0.3
              }]
            }}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        </div>

        {stats.scoreDistribution.length > 0 && (
          <div className="chart-container">
            <h3><FaChartBar /> Score Distribution</h3>
            <Bar
              data={{
                labels: stats.scoreDistribution.map(b => `${b.rangeStart}-${b.rangeEnd}`),
                datasets: [{
                  label: 'Participants',
                  data: stats.scoreDistribution.map(b => b.count),
                  backgroundColor: '#47b8ff'
                }]
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}