import { useState } from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fieldClass = "w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-indigo-400";

const AddQuizForm = () => {
  const [selectedLeague, setSelectedLeague] = useState("");
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", ""],
      isMultipleSelect: false,
      correctOptionIndices: [0],
      creditPoints: 1,
    },
  ]);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === "isMultipleSelect") {
      if (!value && updatedQuestions[index].correctOptionIndices.length > 1) {
        updatedQuestions[index].correctOptionIndices = [updatedQuestions[index].correctOptionIndices[0]];
      }
    }
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswersChange = (qIndex, e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => parseInt(option.value, 10));
    if (selectedOptions.length === 0) {
      toast.warning("Please select at least one correct answer");
      return;
    }

    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].correctOptionIndices = selectedOptions;
    setQuestions(updatedQuestions);
  };

  const addOption = (qIndex) => {
    if (questions[qIndex].options.length >= 6) {
      toast.warning("Maximum 6 options allowed per question");
      return;
    }
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.push("");
    setQuestions(updatedQuestions);
  };

  const removeOption = (qIndex, oIndex) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[qIndex].options.length <= 2) {
      toast.warning("Questions must have at least 2 options");
      return;
    }

    updatedQuestions[qIndex].options.splice(oIndex, 1);
    updatedQuestions[qIndex].correctOptionIndices = updatedQuestions[qIndex].correctOptionIndices
      .filter((i) => i !== oIndex)
      .map((i) => (i > oIndex ? i - 1 : i));

    if (updatedQuestions[qIndex].correctOptionIndices.length === 0) {
      updatedQuestions[qIndex].correctOptionIndices = [0];
    }
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", ""],
        isMultipleSelect: false,
        correctOptionIndices: [0],
        creditPoints: 1,
      },
    ]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) setQuestions(questions.filter((_, i) => i !== index));
    else toast.warning("You need at least one question");
  };

  const validateForm = () => {
    if (!selectedLeague) {
      toast.error("Please select a league");
      return false;
    }

    for (const [qIndex, question] of questions.entries()) {
      if (!question.question.trim()) {
        toast.error(`Question ${qIndex + 1} is required`);
        return false;
      }

      const validOptions = question.options.filter((opt) => opt.trim() !== "");
      if (validOptions.length < 2) {
        toast.error(`Question ${qIndex + 1} needs at least 2 options`);
        return false;
      }

      if (question.correctOptionIndices.length === 0) {
        toast.error(`Question ${qIndex + 1} must have at least one correct answer`);
        return false;
      }

      for (const correctIndex of question.correctOptionIndices) {
        if (!question.options[correctIndex]?.trim()) {
          toast.error(`Question ${qIndex + 1} has a correct answer pointing to empty option`);
          return false;
        }
      }

      if (!question.isMultipleSelect && question.correctOptionIndices.length !== 1) {
        toast.error(`Question ${qIndex + 1} must have exactly one correct answer for single-select`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const quizData = {
      selectedLeague,
      questions: questions.map((question) => ({
        question: question.question.trim(),
        options: question.options.filter((opt) => opt.trim() !== ""),
        isMultipleSelect: question.isMultipleSelect,
        correctOptionIndices: question.correctOptionIndices,
        creditPoints: question.creditPoints,
      })),
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/addquiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizData),
      });
      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        window.location.href = "/allquestions";
      } else {
        toast.error(data.message || "Error adding quiz.");
      }
    } catch {
      toast.error("Server error.");
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-soft">
        <h1 className="font-display text-3xl font-bold text-white">Add Quiz</h1>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="league" className="mb-1 block text-sm text-slate-300">League</label>
            <select className={fieldClass} id="league" value={selectedLeague} onChange={(e) => setSelectedLeague(e.target.value)} required>
              <option value="">Select League</option>
              <option value="Python Premier League (PPL)">Python Premier League (PPL)</option>
              <option value="Java Premier League (JPL)">Java Premier League (JPL)</option>
            </select>
          </div>

          {questions.map((quiz, qIndex) => {
            const validOptions = quiz.options.filter((opt) => opt.trim() !== "");

            return (
              <div key={qIndex} className="space-y-4 rounded-2xl border border-slate-700 bg-slate-950/70 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="font-display text-xl font-semibold text-cyan-300">Question {qIndex + 1}</h2>
                  <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-red-400/50 px-3 py-1.5 text-sm text-red-300" onClick={() => removeQuestion(qIndex)}>
                    <IoIosRemoveCircleOutline /> Remove
                  </button>
                </div>

                <div>
                  <label className="mb-1 block text-sm text-slate-300" htmlFor={`question-${qIndex}`}>Question Text</label>
                  <input className={fieldClass} id={`question-${qIndex}`} type="text" value={quiz.question} onChange={(e) => handleQuestionChange(qIndex, "question", e.target.value)} required />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm text-slate-300">Options</p>
                    <button type="button" className="rounded-lg border border-slate-600 px-3 py-1 text-xs text-slate-200" onClick={() => addOption(qIndex)} disabled={quiz.options.length >= 6}>
                      + Add Option
                    </button>
                  </div>

                  <div className="space-y-2">
                    {quiz.options.map((option, oIndex) => (
                      <div key={oIndex} className="flex items-center gap-2">
                        <input
                          className={fieldClass}
                          type="text"
                          placeholder={`Option ${oIndex + 1}`}
                          value={option}
                          onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                        />
                        {quiz.options.length > 2 && (
                          <button type="button" className="rounded-lg border border-red-400/50 px-3 py-2 text-red-300" onClick={() => removeOption(qIndex, oIndex)} title="Remove option">
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="mb-1 text-sm text-slate-300">Answer Type</p>
                    <label className="flex items-center gap-2 text-sm text-slate-200">
                      <input type="radio" name={`answerType-${qIndex}`} checked={!quiz.isMultipleSelect} onChange={() => handleQuestionChange(qIndex, "isMultipleSelect", false)} />
                      Single Correct Answer
                    </label>
                    <label className="mt-1 flex items-center gap-2 text-sm text-slate-200">
                      <input type="radio" name={`answerType-${qIndex}`} checked={quiz.isMultipleSelect} onChange={() => handleQuestionChange(qIndex, "isMultipleSelect", true)} />
                      Multiple Correct Answers
                    </label>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm text-slate-300">
                      {quiz.isMultipleSelect ? "Correct Options" : "Correct Option"}
                    </label>
                    <select
                      multiple={quiz.isMultipleSelect}
                      className={fieldClass}
                      value={quiz.correctOptionIndices.map(String)}
                      onChange={(e) => handleCorrectAnswersChange(qIndex, e)}
                      required
                      size={Math.min(4, validOptions.length) || 1}
                    >
                      {quiz.options.map((opt, oIndex) =>
                        opt.trim() ? (
                          <option key={oIndex} value={oIndex}>
                            {opt.trim()}
                          </option>
                        ) : null
                      )}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm text-slate-300">Credit Points</label>
                  <input
                    className={fieldClass}
                    type="number"
                    min="1"
                    value={quiz.creditPoints}
                    onChange={(e) => {
                      const updated = [...questions];
                      updated[qIndex].creditPoints = Math.max(1, parseInt(e.target.value || "1", 10));
                      setQuestions(updated);
                    }}
                    required
                  />
                </div>
              </div>
            );
          })}

          <div className="flex flex-wrap gap-3">
            <button type="button" className="rounded-xl border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-200" onClick={addQuestion}>
              + Add Question
            </button>
            <button className="rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-2.5 text-sm font-semibold text-white" type="submit">
              Submit Quiz
            </button>
          </div>
        </form>
      </section>

      <ToastContainer position="bottom-right" autoClose={5000} />
    </main>
  );
};

export default AddQuizForm;
