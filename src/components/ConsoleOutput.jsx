import React from "react";

const formatMemory = (memoryKb) => {
  if (memoryKb === undefined || memoryKb === null) return "--";
  if (memoryKb < 1024) return `${memoryKb} KB`;
  return `${(memoryKb / 1024).toFixed(1)} MB`;
};

const normalizeResultText = (value) => {
  if (value === undefined || value === null || value === "") return "--";
  return String(value).trim();
};

const ConsoleOutput = ({
  publicTestCases = [],
  result = null,
  loading = false,
  error = null,
  onClose,
}) => {
  const resultCases = result?.testCaseResults || [];
  const hasRun = Boolean(result);
  const allPassed =
    hasRun &&
    resultCases.length > 0 &&
    resultCases.every((testCase) => testCase.passed);
  const hasFailure = (hasRun && !allPassed) || Boolean(error);

  const panelTone = hasFailure
    ? "bg-red-950/90 border-red-500/30"
    : allPassed || loading
      ? "bg-surface-container-high/90 border-white/5"
      : "bg-surface-container-high/90 border-white/5";
  const dotTone = hasFailure
    ? "bg-red-400 shadow-[0_0_10px_#f87171]"
    : allPassed
      ? "bg-green-400 shadow-[0_0_10px_#4ade80]"
      : loading
        ? "bg-yellow-300 shadow-[0_0_10px_#fde047] animate-pulse"
        : "bg-zinc-400 shadow-[0_0_10px_rgba(161,161,170,0.6)]";
  const title = hasFailure
    ? "Runtime Output"
    : allPassed
      ? "Console Output"
      : loading
        ? "Running Tests"
        : "Visible Test Cases";

  const neutralCases = publicTestCases.map((testCase, index) => ({
    id: `${testCase.input}-${index}`,
    input: testCase.input,
    expectedOutput: testCase.expectedOutput,
  }));

  return (
    <div
      className={`absolute bottom-24 right-8 left-8 backdrop-blur-xl p-5 rounded-xl shadow-2xl border transform translate-y-0 ${panelTone}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${dotTone}`} />
          <span className="text-xs font-bold uppercase tracking-widest text-white">
            {title}
          </span>
        </div>
        <button
          className="text-outline hover:text-white"
          onClick={onClose}
          type="button"
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
      </div>

      {loading && (
        <div className="bg-black/30 p-4 rounded-lg font-mono text-[11px] space-y-2 border border-white/5">
          <p className="text-yellow-200">Execution queued...</p>
          <p className="text-outline-variant">
            Waiting for judge results from the backend.
          </p>
        </div>
      )}

      {!loading && !hasRun && !error && (
        <div className="bg-black/30 p-4 rounded-lg font-mono text-[11px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 border border-white/5 max-h-72 overflow-y-auto custom-scrollbar">
          {neutralCases.length === 0 ? (
            <p className="text-outline">No visible public test cases yet.</p>
          ) : (
            neutralCases.map((testCase, index) => (
              <div
                key={testCase.id}
                className="space-y-1 border border-white/5 rounded-lg p-3"
              >
                <p className="text-zinc-300">Test Case {index + 1}</p>
                <p className="text-outline-variant break-words">
                  Input:{" "}
                  <span className="text-white whitespace-pre-wrap">
                    {normalizeResultText(testCase.input)}
                  </span>
                </p>
                <p className="text-outline-variant break-words">
                  Expected:{" "}
                  <span className="text-white whitespace-pre-wrap">
                    {normalizeResultText(testCase.expectedOutput)}
                  </span>
                </p>
              </div>
            ))
          )}
        </div>
      )}

      {!loading && hasFailure && (
        <div className="bg-black/70 p-4 rounded-lg font-mono text-[11px] space-y-3 border border-red-500/30 max-h-80 overflow-y-auto custom-scrollbar">
          {error && (
            <pre className="whitespace-pre-wrap text-red-300 bg-red-950/50 rounded-xl p-3">
              {error}
            </pre>
          )}
          {resultCases.length === 0 && (
            <pre className="whitespace-pre-wrap text-red-300 bg-red-950/50 rounded-xl p-3">
              {result.error || "Execution failed before test cases completed."}
            </pre>
          )}
          {resultCases.length > 0 &&
            resultCases.map((testCase, index) => {
              const passed = testCase.passed === true;
              return (
                <div
                  key={`${testCase.input}-${index}`}
                  className={`space-y-1 border-b last:border-b-0 pb-3 last:pb-0 ${
                    passed ? "border-white/5" : "border-red-500/20"
                  }`}
                >
                  <p className={passed ? "text-green-300" : "text-red-300"}>
                    {passed ? "PASS" : "FAIL"} Test Case {index + 1}
                  </p>
                  <p className="text-outline-variant break-words">
                    Input:{" "}
                    <span className="text-white whitespace-pre-wrap">
                      {normalizeResultText(testCase.input)}
                    </span>
                  </p>
                  <p className="text-outline-variant break-words">
                    Expected:{" "}
                    <span className="text-white whitespace-pre-wrap">
                      {normalizeResultText(testCase.expectedOutput)}
                    </span>
                  </p>
                  {!passed && (
                    <>
                      <p className="text-red-200 break-words">
                        Actual:{" "}
                        <span className="whitespace-pre-wrap">
                          {normalizeResultText(testCase.actualOutput)}
                        </span>
                      </p>
                      {testCase.error && (
                        <pre className="whitespace-pre-wrap text-red-300 bg-red-950/50 rounded-xl p-3 mt-2">
                          {testCase.error}
                        </pre>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          <p className="text-red-200 pt-1">
            Verdict:{" "}
            <span className="font-bold">{result.finalVerdict || "Failed"}</span>{" "}
            ({result.totalPassed || 0}/
            {result.totalTestCases || resultCases.length})
          </p>
        </div>
      )}

      {!loading && allPassed && (
        <div className="bg-black/30 p-4 rounded-lg font-mono text-[11px] space-y-2 border border-white/5 max-h-80 overflow-y-auto custom-scrollbar">
          {resultCases.map((testCase, index) => (
            <p key={`${testCase.input}-${index}`} className="text-green-300">
              PASS Test Case {index + 1}: {normalizeResultText(testCase.input)}
            </p>
          ))}
          <p className="text-outline-variant">------------------------------</p>
          <p className="text-white">
            Status:{" "}
            <span className="font-bold text-green-300">
              {result.finalVerdict || "Accepted"}
            </span>
          </p>
          <p className="text-outline-variant">
            Passed {result.totalPassed || resultCases.length}/
            {result.totalTestCases || resultCases.length} public test cases
          </p>
          <p className="text-outline-variant">
            Runtime: {result.totalTimeMs ?? "--"}ms
          </p>
          <p className="text-outline-variant">
            Memory: {formatMemory(result.totalMemoryKb)}
          </p>
        </div>
      )}
    </div>
  );
};

export default ConsoleOutput;
