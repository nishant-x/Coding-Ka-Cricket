import { useState } from "react";
import { useNavigate } from "react-router-dom";
import payment from "../../assets/paymentQR/newQRPushpendra.png";

const inputBase =
  "w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-indigo-400";

const Register = () => {
  const [college, setCollege] = useState("");
  const [branch, setBranch] = useState("");
  const [sectionCount, setSectionCount] = useState(1);
  const [errors, setErrors] = useState({});
  const [screenshot, setScreenshot] = useState(null);
  const [year, setYear] = useState("");
  const [league, setLeague] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const branchesByCollege = {
    "SISTec-GN": ["CSE", "CSE - Cyber Security", "CSE - AIML", "CSE - AIDS"],
    "SISTec-R": ["CSE", "CSE - AIML"],
    "SISTec-E": ["CSE", "CSE - IoT"],
  };

  const leagues = [
    "Java Premier League (JPL)",
    "Python Premier League (PPL)",
  ];

  const handleCollegeChange = (e) => {
    setCollege(e.target.value);
    setBranch("");
    setSectionCount(1);
  };

  const handleBranchChange = (e) => {
    const selectedBranch = e.target.value;
    setBranch(selectedBranch);

    if (college === "SISTec-GN" && selectedBranch === "CSE") {
      setSectionCount(4);
    } else if (college === "SISTec-R" && selectedBranch === "CSE") {
      setSectionCount(3);
    } else {
      setSectionCount(1);
    }
  };

  const handleScreenshotChange = (e) => {
    const file = e.target.files[0];
    setScreenshot(file);

    if (file && file.size > 5000000) {
      setErrors((prev) => ({
        ...prev,
        screenshot: "File size should not exceed 5MB",
      }));
    } else {
      setErrors((prev) => {
        const { screenshot, ...rest } = prev;
        return rest;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const enrollmentRegex = /^[0-9]{12}$/;

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const enrollment = document.getElementById("enrollment").value.trim();
    const transaction = document.getElementById("transaction").value.trim();

    if (!name) {
      newErrors.name = "Name is required";
    }

    if (!email || !emailRegex.test(email)) {
      newErrors.email = "Valid email is required";
    }

    if (!phone || !phoneRegex.test(phone)) {
      newErrors.phone = "Valid 10-digit phone number is required";
    }

    if (!enrollment || !enrollmentRegex.test(enrollment)) {
      newErrors.enrollment = "Enrollment number must be 12 digits";
    }

    if (!transaction) {
      newErrors.transaction = "Transaction ID is required";
    }

    if (!league) {
      newErrors.league = "Please select a league";
    }

    if (!screenshot) {
      newErrors.screenshot = "Screenshot of payment is required";
    } else if (screenshot.size > 5000000) {
      newErrors.screenshot = "File size should not exceed 5MB";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();

    formData.append("name", document.getElementById("name").value.trim());
    formData.append("email", document.getElementById("email").value.trim());
    formData.append("phone", phone);
    formData.append(
      "enrollment",
      document.getElementById("enrollment").value.trim()
    );
    formData.append("college", college);
    formData.append("branch", branch);
    formData.append("year", year);
    formData.append("section", document.getElementById("section").value);
    formData.append("league", league);
    formData.append(
      "transaction",
      document.getElementById("transaction").value.trim()
    );
    formData.append("screenshot", screenshot);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/registration`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        navigate("/");
      } else {
        alert(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid gap-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-soft lg:grid-cols-2 lg:p-10">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Register for Coding Ka Cricket
          </h1>

          <p className="mt-4 text-slate-300">
            The ultimate coding competition where programming meets sports
            spirit.
          </p>

          <div className="mt-6 space-y-3 text-sm text-slate-200">
            <p className="rounded-xl border border-slate-700 bg-slate-950/60 p-3">
              Exciting prizes for winners
            </p>
            <p className="rounded-xl border border-slate-700 bg-slate-950/60 p-3">
              30/05/2025 - JPL, 31/05/2025 - PPL
            </p>
            <p className="rounded-xl border border-slate-700 bg-slate-950/60 p-3">
              SISTec-R Campus, Ratibad, Bhopal
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5 sm:p-6">
          <h2 className="text-2xl font-semibold text-white">
            Registration Form
          </h2>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">

            {/* Name */}
            <div>
              <label className="mb-1 block text-sm text-slate-300">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                className={`${inputBase} ${
                  errors.name ? "border-red-400" : ""
                }`}
              />
              {errors.name && (
                <span className="text-xs text-red-300">{errors.name}</span>
              )}
            </div>

            {/* Email + Phone */}
            <div className="grid gap-4 sm:grid-cols-2">

              <div>
                <label className="mb-1 block text-sm text-slate-300">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className={`${inputBase} ${
                    errors.email ? "border-red-400" : ""
                  }`}
                />
                {errors.email && (
                  <span className="text-xs text-red-300">{errors.email}</span>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm text-slate-300">
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  maxLength={10}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit number"
                  className={`${inputBase} ${
                    errors.phone ? "border-red-400" : ""
                  }`}
                />
                {errors.phone && (
                  <span className="text-xs text-red-300">{errors.phone}</span>
                )}
              </div>
            </div>

            {/* Enrollment */}
            <div>
              <label className="mb-1 block text-sm text-slate-300">
                Enrollment Number
              </label>
              <input
                id="enrollment"
                type="text"
                maxLength={12}
                placeholder="12-digit enrollment"
                className={`${inputBase} ${
                  errors.enrollment ? "border-red-400" : ""
                }`}
              />
              {errors.enrollment && (
                <span className="text-xs text-red-300">
                  {errors.enrollment}
                </span>
              )}
            </div>

            {/* College + Year */}
            <div className="grid gap-4 sm:grid-cols-2">

              <select
                value={college}
                onChange={handleCollegeChange}
                className={inputBase}
                required
              >
                <option value="">Select College</option>
                <option value="SISTec-GN">SISTec-GN</option>
                <option value="SISTec-R">SISTec-R</option>
                <option value="SISTec-E">SISTec-E</option>
              </select>

              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className={inputBase}
                required
              >
                <option value="">Select Year</option>
                <option value="2nd Year">2nd Year</option>
              </select>
            </div>

            {/* Branch */}
            {college && (
              <select
                value={branch}
                onChange={handleBranchChange}
                className={inputBase}
                required
              >
                <option value="">Select Branch</option>
                {branchesByCollege[college].map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            )}

            {/* Section */}
            {branch && (
              <select id="section" required className={inputBase}>
                {[...Array(sectionCount)].map((_, i) => {
                  const letter = String.fromCharCode(65 + i);
                  return (
                    <option key={letter} value={`Section ${letter}`}>
                      Section {letter}
                    </option>
                  );
                })}
              </select>
            )}

            {/* Payment QR */}
            {year && (
              <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4 text-center">
                <p className="text-sm text-slate-300">
                  Please make the payment of ₹20
                </p>

                <img
                  src={payment}
                  alt="QR"
                  className="mx-auto mt-3 h-52 w-52 rounded-lg border border-slate-700"
                />
              </div>
            )}

            {/* League */}
            <select
              value={league}
              onChange={(e) => setLeague(e.target.value)}
              className={`${inputBase} ${
                errors.league ? "border-red-400" : ""
              }`}
              required
            >
              <option value="">Select League</option>
              {leagues.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>

            {/* Transaction */}
            <input
              id="transaction"
              type="text"
              placeholder="Enter transaction ID"
              className={`${inputBase} ${
                errors.transaction ? "border-red-400" : ""
              }`}
              required
            />

            {errors.transaction && (
              <span className="text-xs text-red-300">
                {errors.transaction}
              </span>
            )}

            {/* Screenshot */}
            <input
              type="file"
              accept="image/*"
              onChange={handleScreenshotChange}
              className={`${inputBase}`}
            />

            {errors.screenshot && (
              <span className="text-xs text-red-300">
                {errors.screenshot}
              </span>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white hover:scale-[1.01]"
            >
              Register Now
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Register;