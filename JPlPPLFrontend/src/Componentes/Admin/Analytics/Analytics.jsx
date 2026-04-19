import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCalendarAlt,
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaClock,
  FaDownload,
  FaSearch,
  FaTrophy,
  FaUniversity,
  FaUsers,
} from "react-icons/fa";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const chartLabelColor = "#e2e8f0";
const chartGrid = "rgba(148,163,184,0.2)";

export default function Analytics() {
  const [stats, setStats] = useState({
    totalParticipants: 0,
    participantsByLeague: {},
    averageScores: {},
    submissionTimes: [],
    collegeDistribution: {},
    dailyRegistrations: [],
    scoreDistribution: [],
  });
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const params = {};
        if (dateRange.start) params.startDate = dateRange.start;
        if (dateRange.end) params.endDate = dateRange.end;
        if (searchTerm) params.searchTerm = searchTerm;

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/analytics`, { params });
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [dateRange, searchTerm]);

  const exportData = () => {
    const dataStr = JSON.stringify(stats, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `quiz-analytics-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center text-slate-200">
        <p className="text-lg">Loading analytics data...</p>
      </div>
    );
  }

  const topLeague = Object.entries(stats.participantsByLeague).sort((a, b) => b[1] - a[1])[0];
  const topCollege = Object.entries(stats.collegeDistribution).sort((a, b) => b[1] - a[1])[0];

  const commonOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: chartLabelColor } },
    },
    scales: {
      x: { ticks: { color: chartLabelColor }, grid: { color: chartGrid } },
      y: { ticks: { color: chartLabelColor }, grid: { color: chartGrid }, beginAtZero: true },
    },
  };

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="flex items-center gap-2 font-display text-3xl font-bold text-white">
            <FaChartBar className="text-indigo-300" /> Quiz Analytics Dashboard
          </h1>
          <button onClick={exportData} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white">
            <FaDownload /> Export Data
          </button>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="relative">
            <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by college or league"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2 pl-10 pr-3 text-sm text-slate-100 outline-none focus:border-indigo-400"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-300">
            <FaCalendarAlt />
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none"
            />
          </label>

          <label className="flex items-center gap-2 text-sm text-slate-300">
            <FaCalendarAlt />
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none"
            />
          </label>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5"><FaUsers className="text-2xl text-indigo-300" /><h3 className="mt-2 text-sm text-slate-400">Total Participants</h3><p className="text-2xl font-bold text-white">{stats.totalParticipants.toLocaleString()}</p></article>
        <article className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5"><FaTrophy className="text-2xl text-cyan-300" /><h3 className="mt-2 text-sm text-slate-400">Top League</h3><p className="text-lg font-semibold text-white">{topLeague?.[0] || "N/A"}</p><p className="text-sm text-slate-400">{topLeague?.[1] || 0} participants</p></article>
        <article className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5"><FaClock className="text-2xl text-indigo-300" /><h3 className="mt-2 text-sm text-slate-400">Avg. Time</h3><p className="text-2xl font-bold text-white">{stats.submissionTimes.length ? (stats.submissionTimes.reduce((a, b) => a + b, 0) / stats.submissionTimes.length).toFixed(1) : "N/A"} mins</p></article>
        <article className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5"><FaUniversity className="text-2xl text-cyan-300" /><h3 className="mt-2 text-sm text-slate-400">Top College</h3><p className="text-lg font-semibold text-white">{topCollege?.[0] || "N/A"}</p><p className="text-sm text-slate-400">{topCollege?.[1] || 0} participants</p></article>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4"><h3 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-white"><FaChartBar /> Participants by League</h3><Bar data={{labels: Object.keys(stats.participantsByLeague), datasets: [{label: "Participants", data: Object.values(stats.participantsByLeague), backgroundColor: "#6366f1", borderRadius: 8}]}} options={{...commonOptions, plugins: {legend: {display: false}}}} /></article>
        <article className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4"><h3 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-white"><FaChartPie /> College Distribution</h3><Pie data={{labels: Object.keys(stats.collegeDistribution), datasets: [{data: Object.values(stats.collegeDistribution), backgroundColor: ["#6366f1", "#06b6d4", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"]}]}} options={{responsive: true, plugins: {legend: {position: "right", labels: {color: chartLabelColor}}}}} /></article>
        <article className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4 lg:col-span-2"><h3 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-white"><FaChartLine /> Daily Registrations</h3><Line data={{labels: stats.dailyRegistrations.map((r) => new Date(r.date).toLocaleDateString()), datasets: [{label: "Registrations", data: stats.dailyRegistrations.map((r) => r.count), borderColor: "#22d3ee", backgroundColor: "rgba(34,211,238,0.15)", fill: true, tension: 0.3}]}} options={commonOptions} /></article>
        {stats.scoreDistribution.length > 0 && <article className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4 lg:col-span-2"><h3 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-white"><FaChartBar /> Score Distribution</h3><Bar data={{labels: stats.scoreDistribution.map((b) => `${b.rangeStart}-${b.rangeEnd}`), datasets: [{label: "Participants", data: stats.scoreDistribution.map((b) => b.count), backgroundColor: "#06b6d4", borderRadius: 8}]}} options={{...commonOptions, plugins: {legend: {display: false}}}} /></article>}
      </section>
    </main>
  );
}
