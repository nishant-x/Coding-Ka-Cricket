import { useState } from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fieldClass =
  "w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-indigo-400";

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
    const updated = [...questions];

    if (field === "isMultipleSelect" && !value) {
      updated[index].correctOptionIndices = [
        updated[index].correctOptionIndices[0] || 0,
      ];
    }

    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const addOption = (qIndex) => {
    if (questions[qIndex].options.length >= 6) {
      toast.warning("Maximum 6 options allowed");
      return;
    }

    const updated = [...questions];
    updated[qIndex].options.push("");
    setQuestions(updated);
  };

  const removeOption = (qIndex, oIndex) => {
    const updated = [...questions];

    if (updated[qIndex].options.length <= 2) {
      toast.warning("Minimum 2 options required");
      return;
    }

    updated[qIndex].options.splice(oIndex, 1);

    updated[qIndex].correctOptionIndices = updated[qIndex].correctOptionIndices
      .filter((i) => i !== oIndex)
      .map((i) => (i > oIndex ? i - 1 : i));

    if (updated[qIndex].correctOptionIndices.length === 0) {
      updated[qIndex].correctOptionIndices = [0];
    }

    setQuestions(updated);
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
    if (questions.length === 1) {
      toast.warning("At least one question required");
      return;
    }

    setQuestions(questions.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    if (!selectedLeague) {
      toast.error("Please select a league");
      return false;
    }

    for (const [qIndex, question] of questions.entries()) {
      if (!question.question.trim()) {
        toast.error(`Question ${qIndex + 1} required`);
        return false;
      }

      const validOptions = question.options.filter((o) => o.trim());

      if (validOptions.length < 2) {
        toast.error(`Question ${qIndex + 1} needs at least 2 options`);
        return false;
      }

      if (question.correctOptionIndices.length === 0) {
        toast.error(`Question ${qIndex + 1} needs correct answer`);
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
      questions: questions.map((q) => ({
        question: q.question.trim(),
        options: q.options.filter((o) => o.trim()),
        isMultipleSelect: q.isMultipleSelect,
        correctOptionIndices: q.correctOptionIndices,
        creditPoints: q.creditPoints,
      })),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/addquiz`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(quizData),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        window.location.href = "/allquestions";
      } else {
        toast.error(data.message || "Error adding quiz");
      }
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        <h1 className="text-3xl font-bold text-white">Add Quiz</h1>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          {/* League */}
          <div>
            <label className="mb-1 block text-sm text-slate-300">League</label>
            <select
              className={fieldClass}
              value={selectedLeague}
              onChange={(e) => setSelectedLeague(e.target.value)}
            >
              <option value="">Select League</option>
              <option value="Python Premier League (PPL)">
                Python Premier League (PPL)
              </option>
              <option value="Java Premier League (JPL)">
                Java Premier League (JPL)
              </option>
            </select>
          </div>

          {questions.map((quiz, qIndex) => (
            <div
              key={qIndex}
              className="space-y-4 rounded-2xl border border-slate-700 bg-slate-950/70 p-4"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl text-cyan-300 font-semibold">
                  Question {qIndex + 1}
                </h2>

                <button
                  type="button"
                  onClick={() => removeQuestion(qIndex)}
                  className="text-red-400 flex items-center gap-2"
                >
                  <IoIosRemoveCircleOutline /> Remove
                </button>
              </div>

              {/* Question */}
              <input
                className={fieldClass}
                placeholder="Question"
                value={quiz.question}
                onChange={(e) =>
                  handleQuestionChange(qIndex, "question", e.target.value)
                }
              />

              {/* Options */}
              <div className="space-y-2">
                {quiz.options.map((opt, oIndex) => (
                  <div key={oIndex} className="flex gap-2">
                    <input
                      className={fieldClass}
                      placeholder={`Option ${oIndex + 1}`}
                      value={opt}
                      onChange={(e) =>
                        handleOptionChange(qIndex, oIndex, e.target.value)
                      }
                    />

                    {quiz.options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeOption(qIndex, oIndex)}
                        className="text-red-400"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addOption(qIndex)}
                  className="text-sm border px-3 py-1 rounded-lg"
                >
                  + Add Option
                </button>
              </div>

              {/* Answer Type */}
              <div className="space-y-2">
                <label className="text-sm text-slate-300">Answer Type</label>

                <div className="flex gap-4 text-sm">
                  <label className="flex gap-2">
                    <input
                      type="radio"
                      checked={!quiz.isMultipleSelect}
                      onChange={() =>
                        handleQuestionChange(qIndex, "isMultipleSelect", false)
                      }
                    />
                    Single Answer
                  </label>

                  <label className="flex gap-2">
                    <input
                      type="radio"
                      checked={quiz.isMultipleSelect}
                      onChange={() =>
                        handleQuestionChange(qIndex, "isMultipleSelect", true)
                      }
                    />
                    Multiple Answers
                  </label>
                </div>
              </div>

              {/* Correct Answers */}
              <div className="space-y-2">
                <label className="text-sm text-slate-300">
                  Correct Answer
                </label>

                {quiz.options.map((opt, oIndex) =>
                  opt.trim() ? (
                    <label
                      key={oIndex}
                      className="flex items-center gap-2 text-sm text-slate-200"
                    >
                      <input
                        type={quiz.isMultipleSelect ? "checkbox" : "radio"}
                        name={`correct-${qIndex}`}
                        checked={quiz.correctOptionIndices.includes(oIndex)}
                        onChange={(e) => {
                          const updated = [...questions];

                          if (quiz.isMultipleSelect) {
                            if (e.target.checked) {
                              updated[qIndex].correctOptionIndices.push(oIndex);
                            } else {
                              updated[qIndex].correctOptionIndices =
                                updated[qIndex].correctOptionIndices.filter(
                                  (i) => i !== oIndex
                                );
                            }
                          } else {
                            updated[qIndex].correctOptionIndices = [oIndex];
                          }

                          setQuestions(updated);
                        }}
                      />
                      {opt}
                    </label>
                  ) : null
                )}
              </div>

              {/* Credit */}
              <div>
                <label className="text-sm text-slate-300">
                  Credit Points
                </label>

                <input
                  className={fieldClass}
                  type="number"
                  min="1"
                  value={quiz.creditPoints}
                  onChange={(e) => {
                    const updated = [...questions];
                    updated[qIndex].creditPoints = Number(e.target.value);
                    setQuestions(updated);
                  }}
                />
              </div>
            </div>
          ))}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={addQuestion}
              className="border px-4 py-2 rounded-xl"
            >
              + Add Question
            </button>

            <button
              type="submit"
              className="bg-indigo-500 px-6 py-2 rounded-xl text-white"
            >
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