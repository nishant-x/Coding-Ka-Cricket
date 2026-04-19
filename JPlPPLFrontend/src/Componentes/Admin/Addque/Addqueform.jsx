import { useState } from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import ClipLoader from "react-spinners/ClipLoader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fieldClass = "w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-indigo-400";

const Addqueform = () => {
  const [testCases, setTestCases] = useState([{ input: "", expectedOutput: "" }]);
  const [loading, setLoading] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState("");

  const handleTestCaseChange = (index, field, value) => {
    const updatedTestCases = [...testCases];
    updatedTestCases[index][field] = value;
    setTestCases(updatedTestCases);
  };

  const addTestCase = () => setTestCases([...testCases, { input: "", expectedOutput: "" }]);
  const removeTestCase = (index) => setTestCases(testCases.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const questionData = {
      league: selectedLeague,
      question: e.target.question.value,
      description: e.target.description.value,
      testCases,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/add-question`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(questionData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Question added successfully!");
        window.location = "/allquestions";
      } else {
        toast.error(data.message || "Error adding question! Please try again.");
      }
    } catch {
      toast.error("Error submitting form! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-soft">
        <h1 className="font-display text-3xl font-bold text-white">Add Questions</h1>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="league" className="mb-1 block text-sm text-slate-300">League</label>
            <select className={fieldClass} id="league" value={selectedLeague} onChange={(e) => setSelectedLeague(e.target.value)} required>
              <option value="">Select League</option>
              <option value="Python Premier League (PPL)">Python Premier League (PPL)</option>
              <option value="Java Premier League (JPL)">Java Premier League (JPL)</option>
            </select>
          </div>

          <div>
            <label htmlFor="question" className="mb-1 block text-sm text-slate-300">Question Title</label>
            <input className={fieldClass} type="text" id="question" name="question" required />
          </div>

          <div>
            <label htmlFor="description" className="mb-1 block text-sm text-slate-300">Description</label>
            <textarea className={fieldClass} id="description" name="description" rows="5" required />
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-cyan-300">Test Cases</p>
            {testCases.map((testCase, index) => (
              <div key={index} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
                <input
                  className={fieldClass}
                  type="text"
                  placeholder={`Input ${index + 1}`}
                  value={testCase.input}
                  onChange={(e) => handleTestCaseChange(index, "input", e.target.value)}
                  required
                />
                <input
                  className={fieldClass}
                  type="text"
                  placeholder={`Expected Output ${index + 1}`}
                  value={testCase.expectedOutput}
                  onChange={(e) => handleTestCaseChange(index, "expectedOutput", e.target.value)}
                  required
                />
                {testCases.length > 1 && (
                  <button type="button" className="rounded-xl border border-red-400/50 px-3 py-2 text-lg text-red-300" onClick={() => removeTestCase(index)}>
                    <IoIosRemoveCircleOutline />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button type="button" className="rounded-xl border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-indigo-400" onClick={addTestCase}>
            + Add Test Case
          </button>

          <div>
            {loading ? (
              <ClipLoader color="#818cf8" size={34} />
            ) : (
              <button className="rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-2.5 text-sm font-semibold text-white" type="submit">
                Submit
              </button>
            )}
          </div>
        </form>
      </section>
      <ToastContainer />
    </main>
  );
};

export default Addqueform;
