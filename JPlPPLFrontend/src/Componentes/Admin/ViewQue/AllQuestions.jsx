import { useEffect, useState } from "react";
import axios from "axios";

const cardClass = "rounded-2xl border border-slate-700 bg-slate-950/70 p-4";

const Allquestions = () => {
  const [problems, setProblems] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProblems();
    fetchQuizzes();
  }, []);

  const fetchProblems = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/allquestions`);
      setProblems(response.data);
    } catch (error) {
      console.error("There was an error fetching the problems!", error);
    }
  };

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/allquizzes`);
      setQuizzes(response.data);
    } catch (error) {
      console.error("There was an error fetching the quizzes!", error);
    }
  };

  const removeProblem = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/delete-question/${id}`);
      fetchProblems();
    } catch (error) {
      console.error("Error removing the problem:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeQuiz = async (id, league) => {
    setLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/delete-quiz/${id}`, { data: { league } });
      fetchQuizzes();
    } catch (error) {
      console.error("Error removing the quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-soft">
        <h1 className="font-display text-3xl font-bold text-white">All Problem Statements</h1>
        {loading && <p className="mt-3 text-sm text-cyan-300">Updating...</p>}

        <div className="mt-6 grid gap-4">
          {problems.map((problem) => (
            <article key={problem._id} className={cardClass}>
              <h2 className="font-display text-xl font-semibold text-white">{problem.title}</h2>
              <p className="mt-2 text-sm text-slate-300">{problem.description}</p>
              <button className="mt-4 rounded-lg border border-red-400/50 px-4 py-2 text-sm text-red-300" onClick={() => removeProblem(problem._id)}>
                Remove
              </button>
            </article>
          ))}
        </div>

        <button onClick={() => (window.location.href = "/add-question")} className="mt-5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white">
          Add New Problem
        </button>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-soft">
        <h1 className="font-display text-3xl font-bold text-white">All Quizzes</h1>

        <div className="mt-6 space-y-4">
          {quizzes.map((quiz) => (
            <article key={quiz._id} className={cardClass}>
              <h2 className="font-display text-xl font-semibold text-cyan-300">{quiz.selectedLeague}</h2>
              <div className="mt-3 space-y-3">
                {quiz.questions.map((q, index) => (
                  <div key={`${quiz._id}-${index}`} className="rounded-xl border border-slate-700 bg-slate-900/70 p-3">
                    <p className="font-medium text-slate-100">Q{index + 1}. {q.question}</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
                      {q.options.map((option, i) => (
                        <li key={`${quiz._id}-${index}-${i}`} className={q.correctOptionIndex === i + 1 ? "font-semibold text-cyan-300" : ""}>
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <button className="mt-4 rounded-lg border border-red-400/50 px-4 py-2 text-sm text-red-300" onClick={() => removeQuiz(quiz._id, quiz.selectedLeague)}>
                Delete Quiz
              </button>
            </article>
          ))}
        </div>

        <button onClick={() => (window.location.href = "/addquiz")} className="mt-5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white">
          Add New Quiz
        </button>
      </section>
    </main>
  );
};

export default Allquestions;
