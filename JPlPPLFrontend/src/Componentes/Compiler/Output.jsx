import './Compiler.css';
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
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.error(error);
      alert(`An error occurred: ${error.message || "Unable to run code"}`);
    } finally {
      setIsLoading(false);
    }
  };

  const checkTestCases = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    let results = [];
    for (const { input, expectedOutput } of PROBLEM_STATEMENTS[1].testCases) {
      try {
        const result = await executeCode(language, sourceCode, input);

        if (result && result.run && result.run.output) {
          const output = result.run.output.trim();
          const isTestCasePassed = output === expectedOutput.trim();
          results.push({
            input,
            expectedOutput,
            output,
            isTestCasePassed,
          });
        } else {
          results.push({
            input,
            expectedOutput,
            output: "Undefined",
            isTestCasePassed: false,
          });
        }
      } catch (error) {
        console.error(error);
        results.push({
          input,
          expectedOutput,
          output: "Error during execution",
          isTestCasePassed: false,
        });
      }
    }
    setTestResults(results);
  };

  return (
    <div className="output_container">
      <h2 className="output_title">Problem Statement</h2>
      <div className="output_problemStatement">
        <h3>{PROBLEM_STATEMENTS[1].title}</h3>
        <p>{PROBLEM_STATEMENTS[1].description}</p>
      </div>

      <h3 className="output_testCaseTitle">First Test Case</h3>
      <div className="output_testCase">
        <p><strong>Input:</strong> {PROBLEM_STATEMENTS[1].testCases[1].input}</p>
        <p><strong>Expected Output:</strong> {PROBLEM_STATEMENTS[1].testCases[1].expectedOutput}</p>
      </div>

      <div className="output_actions">
        <div>
          <button
            onClick={runCode}
            className="output_runButton"
            disabled={isLoading}
          >
            {isLoading ? "Running..." : "Run Code"}
          </button>
          <div
            className={`output_display ${isError ? "error" : ""}`}
          >
            {output
              ? output.map((line, i) => <p key={i}>{line}</p>)
              : 'Click "Run Code" to see the output here'}
          </div>
        </div>
        <div>
          <button
            onClick={checkTestCases}
            className="output_checkButton"
          >
            Check Test Cases
          </button>
          <div className="output_testResults">
            <h3>Test Case Results</h3>
            <div>
              {testResults.length === 0
                ? "Click 'Check Test Cases' to see the results."
                : testResults.map((result, index) => (
                  <div key={index} className="output_testCaseResult">
                    <p><strong>Input:</strong> {result.input}</p>
                    <p><strong>Expected Output:</strong> {result.expectedOutput}</p>
                    <p><strong>Output:</strong> {result.output}</p>
                    <p className={result.isTestCasePassed ? "pass" : "fail"}>
                      Test {result.isTestCasePassed ? "Passed" : "Failed"}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Output;
