import { useState } from "react";
import { executeCode } from "../../api";
import { PROBLEM_STATEMENTS } from "../constants";

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [testResults, setTestResults] = useState([]);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      setIsError(Boolean(result.stderr));
    } catch (error) {
      alert(`An error occurred: ${error.message || "Unable to run code"}`);
    } finally {
      setIsLoading(false);
    }
  };

  const checkTestCases = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    const results = [];
    for (const { input, expectedOutput } of PROBLEM_STATEMENTS[1].testCases) {
      try {
        const result = await executeCode(language, sourceCode, input);
        if (result?.run?.output) {
          const outputValue = result.run.output.trim();
          results.push({
            input,
            expectedOutput,
            output: outputValue,
            isTestCasePassed: outputValue === expectedOutput.trim(),
          });
        } else {
          results.push({ input, expectedOutput, output: "Undefined", isTestCasePassed: false });
        }
      } catch {
        results.push({ input, expectedOutput, output: "Error during execution", isTestCasePassed: false });
      }
    }
    setTestResults(results);
  };

  return (
    <aside className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4 text-sm text-slate-100">
      <h2 className="font-display text-xl font-semibold text-white">Problem Statement</h2>
      <div className="mt-2 rounded-xl border border-slate-700 bg-slate-950/70 p-3">
        <h3 className="font-semibold text-cyan-300">{PROBLEM_STATEMENTS[1].title}</h3>
        <p className="mt-1 text-slate-300">{PROBLEM_STATEMENTS[1].description}</p>
      </div>

      <h3 className="mt-4 font-semibold text-white">First Test Case</h3>
      <div className="mt-2 rounded-xl border border-slate-700 bg-slate-950/70 p-3 text-xs text-slate-300">
        <p><strong>Input:</strong> {PROBLEM_STATEMENTS[1].testCases[1].input}</p>
        <p><strong>Expected Output:</strong> {PROBLEM_STATEMENTS[1].testCases[1].expectedOutput}</p>
      </div>

      <div className="mt-4 grid gap-4">
        <div>
          <button onClick={runCode} className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white" disabled={isLoading}>
            {isLoading ? "Running..." : "Run Code"}
          </button>
          <div className={`mt-2 min-h-20 rounded-xl border p-3 text-xs ${isError ? "border-red-400/60 text-red-300" : "border-slate-700 text-slate-200"}`}>
            {output ? output.map((line, i) => <p key={i}>{line}</p>) : 'Click "Run Code" to see output'}
          </div>
        </div>

        <div>
          <button onClick={checkTestCases} className="rounded-lg border border-cyan-400/60 px-4 py-2 text-sm font-semibold text-cyan-300">
            Check Test Cases
          </button>
          <div className="mt-2 space-y-2 rounded-xl border border-slate-700 bg-slate-950/70 p-3 text-xs">
            {testResults.length === 0
              ? "Click 'Check Test Cases' to see results."
              : testResults.map((result, index) => (
                  <div key={index} className="rounded-lg border border-slate-700 p-2">
                    <p><strong>Input:</strong> {result.input}</p>
                    <p><strong>Expected:</strong> {result.expectedOutput}</p>
                    <p><strong>Output:</strong> {result.output}</p>
                    <p className={result.isTestCasePassed ? "text-emerald-300" : "text-red-300"}>
                      Test {result.isTestCasePassed ? "Passed" : "Failed"}
                    </p>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Output;
