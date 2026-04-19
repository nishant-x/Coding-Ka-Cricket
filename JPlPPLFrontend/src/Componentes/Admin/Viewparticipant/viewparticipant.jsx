import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCalendarAlt,
  FaClock,
  FaCodeBranch,
  FaDownload,
  FaEnvelope,
  FaImage,
  FaLayerGroup,
  FaSearch,
  FaSort,
  FaSortDown,
  FaSortUp,
  FaStar,
  FaTrophy,
  FaUniversity,
  FaUserGraduate,
} from "react-icons/fa";

export default function ParticipantsList() {
  const [participants, setParticipants] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/participants`)
      .then((res) => {
        setParticipants(res.data);
        setFilteredParticipants(res.data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  useEffect(() => {
    const results = participants.filter((participant) =>
      Object.values(participant).some((val) => val && val.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredParticipants(results);
  }, [searchTerm, participants]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });

    const sortedData = [...filteredParticipants].sort((a, b) => {
      if (a[key] === null) return direction === "asc" ? 1 : -1;
      if (b[key] === null) return direction === "asc" ? -1 : 1;
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredParticipants(sortedData);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort className="inline" />;
    return sortConfig.direction === "asc" ? <FaSortUp className="inline" /> : <FaSortDown className="inline" />;
  };

  const downloadCSV = () => {
    const headers = [
      "S.No",
      "Name",
      "Email",
      "Enrollment",
      "College",
      "Branch",
      "Year",
      "Section",
      "League",
      "Transaction",
      "Quiz Score",
      "Time to Solve MCQ",
    ];

    const csvContent = [
      headers.join(","),
      ...filteredParticipants.map((participant, index) =>
        [
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
          participant.quizScore || "N/A",
          participant.timeToSolveMCQ || "N/A",
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", `participants_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewScreenshot = (screenshot) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/${screenshot}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="mx-auto max-w-[96rem] px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="flex items-center gap-2 font-display text-2xl font-bold text-white sm:text-3xl">
            <FaUserGraduate className="text-indigo-300" /> Registered Participants
          </h1>
          <button onClick={downloadCSV} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white">
            <FaDownload /> Export CSV
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className="relative w-full max-w-sm">
            <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search participants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2 pl-10 pr-3 text-sm text-slate-100 outline-none focus:border-indigo-400"
            />
          </div>
          <p className="text-sm text-slate-300">Total: {participants.length}</p>
          <p className="text-sm text-slate-300">Showing: {filteredParticipants.length}</p>
        </div>

        <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-700">
          <table className="min-w-full divide-y divide-slate-700 text-sm">
            <thead className="bg-slate-950 text-slate-200">
              <tr>
                <th className="px-3 py-2 text-left">S.No</th>
                <th className="cursor-pointer px-3 py-2 text-left" onClick={() => requestSort("name")}><FaUserGraduate className="mr-1 inline" /> Name {getSortIcon("name")}</th>
                <th className="cursor-pointer px-3 py-2 text-left" onClick={() => requestSort("email")}><FaEnvelope className="mr-1 inline" /> Email {getSortIcon("email")}</th>
                <th className="px-3 py-2 text-left">Enrollment</th>
                <th className="cursor-pointer px-3 py-2 text-left" onClick={() => requestSort("college")}><FaUniversity className="mr-1 inline" /> College {getSortIcon("college")}</th>
                <th className="cursor-pointer px-3 py-2 text-left" onClick={() => requestSort("branch")}><FaCodeBranch className="mr-1 inline" /> Branch {getSortIcon("branch")}</th>
                <th className="cursor-pointer px-3 py-2 text-left" onClick={() => requestSort("year")}><FaCalendarAlt className="mr-1 inline" /> Year {getSortIcon("year")}</th>
                <th className="cursor-pointer px-3 py-2 text-left" onClick={() => requestSort("section")}><FaLayerGroup className="mr-1 inline" /> Section {getSortIcon("section")}</th>
                <th className="cursor-pointer px-3 py-2 text-left" onClick={() => requestSort("league")}><FaTrophy className="mr-1 inline" /> League {getSortIcon("league")}</th>
                <th className="px-3 py-2 text-left">Transaction</th>
                <th className="cursor-pointer px-3 py-2 text-left" onClick={() => requestSort("quizScore")}><FaStar className="mr-1 inline" /> Score {getSortIcon("quizScore")}</th>
                <th className="cursor-pointer px-3 py-2 text-left" onClick={() => requestSort("timeToSolveMCQ")}><FaClock className="mr-1 inline" /> Time {getSortIcon("timeToSolveMCQ")}</th>
                <th className="px-3 py-2 text-left"><FaImage className="mr-1 inline" /> Screenshot</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/40 text-slate-200">
              {filteredParticipants.length > 0 ? (
                filteredParticipants.map((p, index) => (
                  <tr key={`${p.enrollment}-${index}`}>
                    <td className="px-3 py-2">{index + 1}</td>
                    <td className="px-3 py-2">{p.name}</td>
                    <td className="px-3 py-2"><a href={`mailto:${p.email}`} className="text-cyan-300 hover:underline">{p.email}</a></td>
                    <td className="px-3 py-2">{p.enrollment}</td>
                    <td className="px-3 py-2">{p.college}</td>
                    <td className="px-3 py-2">{p.branch}</td>
                    <td className="px-3 py-2">{p.year}</td>
                    <td className="px-3 py-2">{p.section}</td>
                    <td className="px-3 py-2">{p.league}</td>
                    <td className="px-3 py-2">{p.transaction}</td>
                    <td className="px-3 py-2">{p.quizScore ?? "N/A"}</td>
                    <td className="px-3 py-2">{p.timeToSolveMCQ ?? "N/A"}</td>
                    <td className="px-3 py-2">
                      {p.screenshot && (
                        <button onClick={() => handleViewScreenshot(p.screenshot)} className="rounded-lg border border-indigo-400/60 px-3 py-1 text-xs text-indigo-300">
                          View
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="13" className="px-3 py-6 text-center text-slate-400">
                    No participants found matching your search
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
